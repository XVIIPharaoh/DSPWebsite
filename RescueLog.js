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
      dispatchers: ["None", "Shawn", "Tereque", "Adrian", "Robert", "Aaron", "Vida", "Monica", "Freddy"],
      
      // --- THIS IS THE FIX ---
      // Initialize the 'entries' array with its full structure of 17 empty objects.
      entries: Array(17).fill().map(() => ({ time: "", notes: "", dispatcher: "" })),
      
      showStatusMessage: false
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
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      this.entries[index].time = `${hours}:${minutes}`;
    },
    saveAllEntries() {
      // Filter out any entries that are completely empty
      const entriesToSave = this.entries
        .map((entry, index) => ({ ...entry, section: this.sections[index] })) // Add section title
        .filter(entry => entry.time || entry.notes || entry.dispatcher);

      // Save to localStorage
      localStorage.setItem('rescueLogData', JSON.stringify(entriesToSave));

      // Show a confirmation message
      this.showStatusMessage = true;
      setTimeout(() => {
        this.showStatusMessage = false;
      }, 2000); // Hide after 2 seconds
    },
    loadEntries() {
      const savedData = localStorage.getItem('rescueLogData');
      const loadedEntries = savedData ? JSON.parse(savedData) : [];

      // Re-create the full 17-entry structure, populating it with saved data
      this.entries = this.sections.map((sectionName) => {
        const foundEntry = loadedEntries.find(e => e.section === sectionName);
        return {
          time: foundEntry?.time || "",
          notes: foundEntry?.notes || "",
          dispatcher: foundEntry?.dispatcher || ""
        };
      });
    }
  },
  // This is a lifecycle hook that runs when the Vue app is ready
  mounted() {
    this.loadEntries();
  }
}).mount('#app');
