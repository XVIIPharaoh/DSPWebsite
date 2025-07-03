const { createApp } = Vue;

createApp({
  data() {
    return {
      summaryItems: []
    };
  },
  methods: {
    signOut() {
      window.location.href = 'LogIn.html';
    },
    loadSummaryFeed() {
      const savedData = localStorage.getItem('activitySummaryFeed');
      if (savedData) {
        // The data is saved with the most recent first, so no need to sort.
        this.summaryItems = JSON.parse(savedData);
      }
    },
    formatTimestamp(isoString) {
      if (!isoString) return '';
      const date = new Date(isoString);
      // Formats to "Jul 2, 2025, 3:30 PM"
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
  },
  mounted() {
    this.loadSummaryFeed();
  }
}).mount('#app');
