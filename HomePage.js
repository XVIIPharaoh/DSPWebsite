const { createApp } = Vue;

createApp({
  data() {
    return {
      liveFeedItems: []
    };
  },
  methods: {
    signOut() {
      window.location.href = 'LogIn.html';
    },
    loadLiveFeed() {
      const savedData = localStorage.getItem('rescueLogData');
      if (savedData) {
        this.liveFeedItems = JSON.parse(savedData);
      }
    }
  },
  mounted() {
    this.loadLiveFeed();
  }
}).mount('#app');
