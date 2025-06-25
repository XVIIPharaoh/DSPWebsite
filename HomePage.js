const { createApp } = Vue;

createApp({
  data() {
    return {
      userMessage: ''
    };
  },
  methods: {
    signOut() {
      // Redirect back to login page
      window.location.href = 'LogIn.html';
    }
  }
}).mount('#app');