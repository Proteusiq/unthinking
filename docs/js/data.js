// Paper data for visualization
// Nodes and links loaded from separate files for maintainability
window.paperData = {
  meta: {
    totalAnalyzed: 183,
    lastUpdated: '2026-02-09',
  },
  // Nodes loaded from nodes.js
  get nodes() {
    return window.paperNodes || [];
  },
  // Links loaded from links.js
  get links() {
    return window.paperLinks || [];
  },
};
