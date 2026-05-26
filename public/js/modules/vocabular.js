/**
 * Vocabular module.
 *
 * Manages saved vocabulary words in the sidebar.
 */

import {
	vocabularWords,
	isVocabularPanelCollapsed,
	vocabData,
	setVocabularWords,
	setIsVocabularPanelCollapsed,
} from './state.js';
import { saveVocabular } from './api.js';

let currentVocabularModalIndex = -1;

/**
 * Render vocabular words in the sidebar panel.
 */
export function renderVocabularWords() {
	const container = document.getElementById("vocabularWords");
	const countEl = document.getElementById("vocabularCount");
	
	if (countEl) {
		countEl.textContent = vocabularWords.length > 0 ? `(${vocabularWords.length})` : "";
	}
	
	if (!vocabularWords || vocabularWords.length === 0) {
		container.innerHTML = 'Click words in transcript to add them here';
		return;
	}
	
	let html = '<div class="vocabular-tags">';
	vocabularWords.forEach((item, index) => {
		html += `
			<div class="vocabular-tag" data-index="${index}" title="Click to see details">
				<span class="vocabular-tag-text">${item.word}</span>
				<span class="vocabular-tag-remove" data-index="${index}" title="Remove">
					<span class="material-icons">close</span>
				</span>
			</div>
		`;
	});
	html += '</div>';
	
	container.innerHTML = html;
	
	// Add click handlers for tags (show modal)
	container.querySelectorAll('.vocabular-tag').forEach(tag => {
		tag.addEventListener('click', (e) => {
			// Don't trigger if clicking the remove button
			if (e.target.closest('.vocabular-tag-remove')) return;
			const index = parseInt(tag.dataset.index);
			showVocabularModal(index);
		});
	});
	
	// Add click handlers for remove buttons
	container.querySelectorAll('.vocabular-tag-remove').forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.stopPropagation();
			const index = parseInt(btn.dataset.index);
			removeVocabularWord(index);
		});
	});
}

/**
 * Add a word to the vocabular list.
 * @param {string} word - Spanish word
 * @param {string} translation - English translation
 * @param {string} pos - Part of speech
 * @param {string} context - Original sentence context
 */
export function addVocabularWord(word, translation, pos, context) {
	// Check if word already exists
	const exists = vocabularWords.some(item => item.word === word);
	if (exists) return;
	
	const newItem = { word, translation, pos, context };
	const newList = [...vocabularWords, newItem];
	setVocabularWords(newList);
	renderVocabularWords();
	saveVocabular();
	
	// Auto-expand panel when adding first word
	if (newList.length === 1 && isVocabularPanelCollapsed) {
		toggleVocabularPanel();
	}
}

/**
 * Remove a word from the vocabular list.
 * @param {number} index - Index of the word to remove
 */
export function removeVocabularWord(index) {
	const newList = vocabularWords.filter((_, i) => i !== index);
	setVocabularWords(newList);
	renderVocabularWords();
	saveVocabular();
}

/**
 * Show vocabular modal for a specific word.
 * @param {number} index - Index of the vocabular word
 */
export function showVocabularModal(index) {
	const item = vocabularWords[index];
	if (!item) return;
	
	currentVocabularModalIndex = index;
	
	const modal = document.getElementById("vocabularModal");
	const content = document.getElementById("vocabularModalContent");
	
	const posHtml = item.pos ? `<div class="vocabular-modal-pos">${item.pos}</div>` : '';
	const contextHtml = item.context ? `<div class="vocabular-modal-context">${item.context}</div>` : '';
	
	content.innerHTML = `
		<div class="vocabular-modal-item">
			<div class="vocabular-modal-icon">
				<span class="material-icons">translate</span>
			</div>
			<div class="vocabular-modal-text">
				<div class="vocabular-modal-word">${item.word}</div>
				${posHtml}
				<div class="vocabular-modal-translation">${item.translation}</div>
				${contextHtml}
			</div>
		</div>
	`;
	
	modal.classList.add("active");
}

/**
 * Close the vocabular modal.
 */
export function closeVocabularModal() {
	const modal = document.getElementById("vocabularModal");
	modal.classList.remove("active");
}

/**
 * Toggle the vocabular panel collapsed state.
 */
export function toggleVocabularPanel() {
	setIsVocabularPanelCollapsed(!isVocabularPanelCollapsed);
	
	const content = document.getElementById("vocabularContent");
	const icon = document.getElementById("vocabularToggleIcon");
	
	content.classList.toggle("collapsed", isVocabularPanelCollapsed);
	icon.textContent = isVocabularPanelCollapsed ? "expand_more" : "expand_less";
	
	saveVocabular();
}

/**
 * Handle click on a vocabulary word in the transcript.
 * @param {string} word - The Spanish word clicked
 */
export function handleVocabWordClick(word) {
	const vocabEntry = vocabData[word];
	if (!vocabEntry) return;
	
	const translation = typeof vocabEntry === 'string' 
		? vocabEntry 
		: (vocabEntry?.translation || word);
	const pos = typeof vocabEntry === 'object' ? vocabEntry.pos : '';
	const context = typeof vocabEntry === 'object' ? vocabEntry.context : '';
	
	addVocabularWord(word, translation, pos, context);
}

// Make functions available globally for onclick handlers
window.toggleVocabularPanel = toggleVocabularPanel;
window.closeVocabularModal = closeVocabularModal;

// --- Keyboard Navigation ---

document.addEventListener('keydown', function(event) {
	const modal = document.getElementById("vocabularModal");
	if (!modal.classList.contains("active")) return;
	
	if (vocabularWords.length === 0) return;
	
	if (event.key === "ArrowLeft") {
		event.preventDefault();
		let prevIndex = currentVocabularModalIndex - 1;
		if (prevIndex < 0) prevIndex = vocabularWords.length - 1;
		showVocabularModal(prevIndex);
	} else if (event.key === "ArrowRight") {
		event.preventDefault();
		let nextIndex = currentVocabularModalIndex + 1;
		if (nextIndex >= vocabularWords.length) nextIndex = 0;
		showVocabularModal(nextIndex);
	}
});
