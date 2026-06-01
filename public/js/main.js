/**
 * Main application entry point.
 *
 * Initializes all modules and orchestrates the application.
 */

import {
	currentVideoId,
	setCurrentVideoId,
	setIsSegmentRepeatMode,
	videoProgress,
	availableTranscripts,
	setActiveIndex,
	setAvailableTranscripts,
	learnedVideos,
} from './modules/state.js';
import { 
	loadLearnedVideos, 
	loadVideoProgress, 
	loadStats,
	loadVocabular,
	loadAvailableTranscripts as loadTranscriptsAPI,
	fetchTranscript,
	fetchTranslation,
	fetchVocab,
	fetchGrammar,
	saveVideoProgress,
} from './modules/api.js';
import { setStatus } from './modules/utils.js';
import { loadVideo, startSync, onPlayerStateChange } from './modules/player.js';
import { renderTranscriptLists, getLastWatchedVideo, getSavedProgress, toggleLearned, toggleLearnedPanel } from './modules/learned.js';
import { updateStatsDisplay } from './modules/stats.js';
import { renderGrammarSentences, loadSummary, setupModalHandlers } from './modules/grammar.js';
import { renderVocabularWords } from './modules/vocabular.js';
import { setupKeyboardHandlers } from './modules/keyboard.js';
import { endWatchSession } from './modules/stats.js';
import { renderTranscriptLine } from './modules/transcript.js';

/**
 * Load a video by its ID and all associated data.
 * @param {string} videoId - YouTube video ID
 * @param {Object} options - Options including autoPlay
 */
export async function loadByVideoId(videoId, options = {}) {
	const { autoPlay = true } = options;
	// Save progress for previous video and end watch session
	if (currentVideoId && currentVideoId !== videoId) {
		endWatchSession();
		await saveVideoProgress(currentVideoId, player, -1);
		// Reset segment repeat mode when switching videos
		setIsSegmentRepeatMode(false);
		const segmentRepeatBtn = document.getElementById("segmentRepeatBtn");
		const fsSegmentRepeatBtn = document.getElementById("fsSegmentRepeatBtn");
		const vfSegmentRepeatBtn = document.getElementById("vfSegmentRepeatBtn");
		if (segmentRepeatBtn) segmentRepeatBtn.classList.remove("active");
		if (fsSegmentRepeatBtn) fsSegmentRepeatBtn.classList.remove("active");
		if (vfSegmentRepeatBtn) vfSegmentRepeatBtn.classList.remove("active");
	}

	setCurrentVideoId(videoId);
	
	// Update active tag
	document.querySelectorAll(".transcript-tag").forEach((tag) => {
		tag.classList.remove("active");
	});
	const activeTag = document.getElementById(`tag-${videoId}`);
	if (activeTag) activeTag.classList.add("active");

	// Load video and data
	await loadVideoAndData(videoId, options);
}

/**
 * Load video player and all associated data.
 * @param {string} videoId - YouTube video ID
 * @param {Object} options - Options including autoPlay
 */
async function loadVideoAndData(videoId, options = {}) {
	const { autoPlay = true } = options;
	const titleEl = document.getElementById("videoTitle");
	const transcript = availableTranscripts.find((t) => t.videoId === videoId);
	
	if (transcript && transcript.fullTitle) {
		titleEl.textContent = transcript.fullTitle;
	} else {
		titleEl.textContent = `Video: ${videoId}`;
	}
	
	// Update grammar panel title to show which video it belongs to
	const grammarTitleEl = document.getElementById("grammarVideoTitle");
	if (grammarTitleEl) {
		if (transcript && transcript.fullTitle) {
			grammarTitleEl.textContent = `— ${transcript.fullTitle}`;
		} else {
			grammarTitleEl.textContent = "";
		}
	}
	
	// Set the href to the YouTube video URL
	if (transcript && transcript.sourceUrl) {
		titleEl.href = transcript.sourceUrl;
	} else {
		titleEl.href = `https://www.youtube.com/watch?v=${videoId}`;
	}

	// Load all data
	await Promise.all([
		fetchTranscript(videoId),
		fetchTranslation(videoId),
		fetchVocab(videoId),
		fetchGrammar(videoId),
		loadSummary(videoId),
	]);

	// Update grammar display
	import('./modules/state.js').then(state => {
		renderGrammarSentences(state.currentGrammarData);
	});

	// Load video player
	const savedProgress = getSavedProgress(videoId, videoProgress);
	
	loadVideo(videoId, {
		savedProgress,
		autoPlay,
		onReady: () => {
			startSync();
		}
	});
}

/**
 * Toggle sidebar collapse/expand state.
 */
export function toggleSidebar() {
	const wrapper = document.getElementById('sidebarWrapper');
	
	if (!wrapper) return;
	
	const isCollapsed = wrapper.classList.toggle('collapsed');
	
	// Save state to localStorage
	localStorage.setItem('sidebarCollapsed', isCollapsed ? '1' : '0');
}

/**
 * Initialize sidebar state from localStorage.
 */
function initSidebar() {
	const wrapper = document.getElementById('sidebarWrapper');
	
	if (!wrapper) return;
	
	const isCollapsed = localStorage.getItem('sidebarCollapsed') === '1';
	if (isCollapsed) {
		wrapper.classList.add('collapsed');
	}
	
	// Restore custom width if saved
	const savedWidth = localStorage.getItem('sidebarWidth');
	if (savedWidth && !isCollapsed) {
		wrapper.style.setProperty('--sidebar-width', savedWidth);
	}
}

/**
 * Setup sidebar resize functionality.
 */
function setupSidebarResize() {
	const wrapper = document.getElementById('sidebarWrapper');
	const resizeHandle = document.getElementById('sidebarResize');
	
	if (!wrapper || !resizeHandle) return;
	
	let isResizing = false;
	let startX = 0;
	let startWidth = 0;
	
	function handleStart(e) {
		if (wrapper.classList.contains('collapsed')) return;
		
		isResizing = true;
		startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
		startWidth = wrapper.getBoundingClientRect().width;
		
		resizeHandle.classList.add('dragging');
		document.body.style.cursor = 'ew-resize';
		document.body.style.userSelect = 'none';
		
		// Prevent text selection during resize
		wrapper.style.pointerEvents = 'none';
	}
	
	function handleMove(e) {
		if (!isResizing) return;
		
		const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
		const delta = clientX - startX;
		const newWidth = Math.max(256, Math.min(window.innerWidth * 0.5, startWidth + delta));
		
		wrapper.style.setProperty('--sidebar-width', `${newWidth}px`);
	}
	
	function handleEnd() {
		if (!isResizing) return;
		
		isResizing = false;
		resizeHandle.classList.remove('dragging');
		document.body.style.cursor = '';
		document.body.style.userSelect = '';
		wrapper.style.pointerEvents = '';
		
		// Save width to localStorage
		const currentWidth = wrapper.getBoundingClientRect().width;
		localStorage.setItem('sidebarWidth', `${currentWidth}px`);
	}
	
	// Mouse events
	resizeHandle.addEventListener('mousedown', handleStart);
	document.addEventListener('mousemove', handleMove);
	document.addEventListener('mouseup', handleEnd);
	
	// Touch events for mobile
	resizeHandle.addEventListener('touchstart', handleStart);
	document.addEventListener('touchmove', handleMove);
	document.addEventListener('touchend', handleEnd);
}

/**
 * Initialize the application.
 */
async function init() {
	// Initialize sidebar state first
	initSidebar();
	
	// Load persisted data
	await loadLearnedVideos();
	await loadVideoProgress();
	await loadStats();
	
	// Load transcript list
	const transcripts = await loadTranscriptsAPI();
	setAvailableTranscripts(transcripts);
	
	// Render transcript lists
	renderTranscriptLists(loadByVideoId);
	
	// Update stats display
	updateStatsDisplay();
	
	// Load vocabular words
	await loadVocabular();
	renderVocabularWords();
	
	// Setup modal handlers
	setupModalHandlers();
	
	// Setup keyboard handlers
	setupKeyboardHandlers();
	
	// Load last watched video only if it's in available (unlearned) transcripts
	const lastVideoId = getLastWatchedVideo(videoProgress);
	const unlearnedVideoIds = transcripts
		.filter(t => !learnedVideos.includes(t.videoId))
		.map(t => t.videoId);
	
	if (lastVideoId && unlearnedVideoIds.includes(lastVideoId)) {
		loadByVideoId(lastVideoId);
	}
}

/**
 * Handle page unload - save progress.
 */
window.addEventListener("beforeunload", () => {
	import('./modules/state.js').then(state => {
		endWatchSession();
		saveVideoProgress(state.currentVideoId, state.player, state.activeIndex);
	});
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}

// Setup resize handlers after DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', setupSidebarResize);
} else {
	setupSidebarResize();
}

// Make toggleLearned and toggleLearnedPanel available globally for onclick handlers
window.toggleLearned = toggleLearned;
window.toggleLearnedPanel = toggleLearnedPanel;
window.togglePause = () => import('./modules/player.js').then(m => m.togglePause());
window.restartVideo = () => import('./modules/player.js').then(m => m.restartVideo());
window.toggleFullscreen = () => import('./modules/player.js').then(m => m.toggleFullscreen());
window.toggleSegmentRepeat = () => import('./modules/player.js').then(m => m.toggleSegmentRepeat(renderTranscriptLine));
window.toggleDual = () => import('./modules/transcript.js').then(m => m.toggleDual(renderTranscriptLine));
window.renderTranscriptLine = renderTranscriptLine;
window.toggleSidebar = toggleSidebar;
