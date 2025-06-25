const { createApp } = Vue;

createApp({
  data() {
    return {
      username: '',
      password: '',
      statusMessage: ''
    };
  },
  methods: {
    login() {
      if (this.username === 'admin' && this.password === '1234') {
        // Redirect to home page on success
      window.location.href = 'HomePage.html';
      } else {
        this.statusMessage = 'Invalid credentials';
      }
    }
  }
}).mount('#app');
