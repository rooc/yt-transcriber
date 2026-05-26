/**
 * Vocabulary module.
 *
 * Vocabulary highlighting, tooltips, and word wrapping.
 */

import { vocabData } from './state.js';
import { handleVocabWordClick } from './vocabular.js';

/**
 * Wrap vocabulary words in transcript text with tooltip spans.
 * @param {string} text - Original transcript text
 * @returns {string} HTML with vocabulary words wrapped
 */
export function wrapVocabWords(text) {
	if (!vocabData || Object.keys(vocabData).length === 0) return text;

	const matches = [];
	const sorted = Object.keys(vocabData).sort((a, b) => b.length - a.length);

	for (const word of sorted) {
		const regex = new RegExp(`(^|[^\\wáéíóúüñÁÉÍÓÚÜÑ])(${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})(?=[^\\wáéíóúüñÁÉÍÓÚÜÑ]|$)`, "gi");
		let match;
		while ((match = regex.exec(text)) !== null) {
			const start = match.index + match[1].length;
			const end = start + word.length;
			const overlaps = matches.some(m => (start < m.end && end > m.start));
			if (!overlaps) {
				matches.push({ start, end, word, text: match[2] });
			}
		}
	}

	matches.sort((a, b) => b.start - a.start);

	let result = text;
	for (const match of matches) {
		const vocabEntry = vocabData[match.word];
		// Handle both old format (string) and new format (object)
		const translation = typeof vocabEntry === 'string' 
			? vocabEntry 
			: (vocabEntry?.translation || match.word);
		
		let tooltipContent = translation.replace(/"/g, '&quot;');
		
		const before = result.slice(0, match.start);
		const after = result.slice(match.end);
		const wrapped = `<span class="vocab-word" data-en="${tooltipContent}" data-word="${match.word.replace(/"/g, '&quot;')}">${match.text}</span>`;
		result = before + wrapped + after;
	}

	return result;
}

/**
 * Attach click handlers to vocab words in a container element.
 * Must be called after the transcript HTML is inserted into the DOM.
 * @param {HTMLElement} container - The transcript container element
 */
export function attachVocabClickHandlers(container) {
	if (!container) return;
	container.querySelectorAll('.vocab-word').forEach(el => {
		el.addEventListener('click', (e) => {
			e.preventDefault();
			const word = el.dataset.word;
			if (word) handleVocabWordClick(word);
		});
	});
}
