// Paper data for visualization
// Nodes and links loaded from separate files for maintainability
window.paperData = {
  meta: {
    get totalAnalyzed() {
      return window.paperNodes?.length || 0;
    },
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
