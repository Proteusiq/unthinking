// Paper data for visualization
// Nodes and links loaded from separate files for maintainability
window.paperData = {
  meta: {
    get totalAnalyzed() {
      return window.paperNodes?.length || 0;
    },
    get supports() {
      return window.paperNodes?.filter(n => n.stance === 'supports').length || 0;
    },
    get challenges() {
      return window.paperNodes?.filter(n => n.stance === 'challenges').length || 0;
    },
    get balanced() {
      return window.paperNodes?.filter(n => n.stance === 'balanced').length || 0;
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
