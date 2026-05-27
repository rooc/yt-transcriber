/**
 * Keyboard module.
 *
 * Keyboard shortcuts and event handling.
 */

import {
	currentVideoId,
	isSegmentRepeatMode,
	currentGrammarData,
	vocabularWords,
} from './state.js';
import { togglePause, rewindBack, rewindForward, restartVideo, toggleFullscreen, toggleSegmentRepeat, replayCurrentSegment } from './player.js';
import { toggleDual, renderTranscriptLine } from './transcript.js';
import { toggleLearned } from './learned.js';
import { showGrammarModal } from './grammar.js';
import { showVocabularModal } from './vocabular.js';
import { setStatus } from './utils.js';

/**
 * Setup keyboard event listeners.
 */
export function setupKeyboardHandlers() {
	document.addEventListener("keydown", handleKeyDown);

	// Logo click handler to open shortcuts modal
	const logoHeader = document.getElementById("logoHeader");
	if (logoHeader) {
		logoHeader.addEventListener("click", openShortcutsModal);
	}

	// Close shortcuts modal when clicking outside
	const shortcutsModal = document.getElementById("shortcutsModal");
	if (shortcutsModal) {
		shortcutsModal.addEventListener("click", function(event) {
			if (event.target === shortcutsModal) {
				closeShortcutsModal();
			}
		});
	}
}

/**
 * Open the keyboard shortcuts reference modal.
 */
export function openShortcutsModal() {
	const modal = document.getElementById("shortcutsModal");
	if (modal) {
		modal.classList.add("active");
	}
}

/**
 * Close the keyboard shortcuts reference modal.
 */
export function closeShortcutsModal() {
	const modal = document.getElementById("shortcutsModal");
	if (modal) {
		modal.classList.remove("active");
	}
}

/**
 * Check if any modal is currently open.
 * @returns {boolean}
 */
function isModalOpen() {
	const grammarModal = document.getElementById("grammarModal");
	const summaryModal = document.getElementById("summaryModal");
	const vocabularModal = document.getElementById("vocabularModal");
	const shortcutsModal = document.getElementById("shortcutsModal");
	return (grammarModal && grammarModal.classList.contains("active")) ||
		(summaryModal && summaryModal.classList.contains("active")) ||
		(vocabularModal && vocabularModal.classList.contains("active")) ||
		(shortcutsModal && shortcutsModal.classList.contains("active"));
}

/**
 * Handle keyboard shortcuts.
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleKeyDown(e) {
	// Skip video controls when any modal is open (modal handles its own keys)
	if (isModalOpen()) return;

	// Space - Pause/Play
	if (e.code === "Space") {
		e.preventDefault();
		togglePause();
		return;
	}

	// Arrow Left - Rewind 5s or previous timestamp (in segment repeat mode)
	if (e.code === "ArrowLeft") {
		e.preventDefault();
		rewindBack();
		return;
	}

	// Arrow Right - Forward 5s or next timestamp (in segment repeat mode)
	if (e.code === "ArrowRight") {
		e.preventDefault();
		rewindForward();
		return;
	}

	// D - Toggle dual translation
	if (e.code === "KeyD" && !e.ctrlKey && !e.metaKey) {
		e.preventDefault();
		toggleDual(renderTranscriptLine);
		return;
	}

	// F - Toggle fullscreen
	if (e.code === "KeyF" && !e.ctrlKey && !e.metaKey) {
		e.preventDefault();
		toggleFullscreen();
		return;
	}

	// L - Toggle learned status
	if (e.code === "KeyL" && !e.ctrlKey && !e.metaKey) {
		e.preventDefault();
		toggleLearned(currentVideoId);
		return;
	}

	// R - Toggle segment repeat
	if (e.code === "KeyR" && !e.ctrlKey && !e.metaKey) {
		e.preventDefault();
		toggleSegmentRepeat();
		return;
	}

	// G - Open first grammar sentence popup
	if (e.code === "KeyG" && !e.ctrlKey && !e.metaKey) {
		e.preventDefault();
		if (currentGrammarData.length > 0) {
			showGrammarModal(0);
		} else {
			setStatus("No grammar sentences available");
			setTimeout(() => setStatus(""), 2000);
		}
		return;
	}

	// V - Open first vocabulary word popup
	if (e.code === "KeyV" && !e.ctrlKey && !e.metaKey) {
		e.preventDefault();
		if (vocabularWords.length > 0) {
			showVocabularModal(0);
		} else {
			setStatus("No vocabulary words saved");
			setTimeout(() => setStatus(""), 2000);
		}
		return;
	}

	// ? - Show keyboard shortcuts reference
	if (e.code === "Slash" && e.shiftKey) {
		e.preventDefault();
		openShortcutsModal();
		return;
	}

	// Enter - Replay current segment (only in repeat mode)
	if (e.code === "Enter" && isSegmentRepeatMode) {
		e.preventDefault();
		replayCurrentSegment();
		return;
	}
}

// Make shortcuts modal functions available globally for onclick handlers
window.openShortcutsModal = openShortcutsModal;
window.closeShortcutsModal = closeShortcutsModal;
