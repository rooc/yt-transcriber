/**
 * Application entry point.
 *
 * Bootstraps the HTTP server on PORT (default 9090).
 *
 * Usage:
 *   node server.js          → start the web server
 */
const http = require('http');
const fs = require('fs');
const { PORT, TRANSCRIPTS_DIR, VOCAB_DIR, GRAMMAR_DIR, SUMMARY_DIR, DATA_DIR } = require('./src/config');
const { setupRoutes } = require('./src/routes');

// Ensure required directories exist at startup (in ~/Sync/Data)
[TRANSCRIPTS_DIR, VOCAB_DIR, GRAMMAR_DIR, SUMMARY_DIR, DATA_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// === HTTP SERVER ===
const server = http.createServer(setupRoutes);

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Transcripts folder: ${TRANSCRIPTS_DIR}`);
});
