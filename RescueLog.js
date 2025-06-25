const { createApp } = Vue;

createApp({
  data() {
    return {
      sections: [
        "Sweepers", "Mikerun", "Dropped Routes / Reductions", "Flex", "Adhocs", "Rabbit list",
        "Schedule", "Work Summary Tool", "Work Summary Tool (Bold)", "Driveroo First Check",
        "Driveroo Follow-up Check", "Daily TBA's", "Proper Parking Sequence",
        "Daily Quality Metrics Check", "Daily Safety Check", "Roster", "Routes"
      ],
      dispatchers: ["None","Shawn", "Tereque", "Adrian", "Robert", "Aaron", "Vida", "Monica", "Freddy"],
      entries: Array(17).fill().map(() => ({
        time: "",
        notes: "",
        dispatcher: ""
      }))
    };
  },
  methods: {
  signOut() {
    window.location.href = 'LogIn.html';
  },
  setCurrentTime(index) {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    // Pad with leading zero if needed
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Format to HH:MM for <input type="time">
    this.entries[index].time = `${hours}:${minutes}`;
  }
}

}).mount('#app');
