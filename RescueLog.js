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
      // --- Main data saving ---
      const entriesToSave = this.entries
        .map((entry, index) => ({ ...entry, section: this.sections[index] }))
        .filter(entry => entry.time || entry.notes || entry.dispatcher);
      localStorage.setItem('rescueLogData', JSON.stringify(entriesToSave));

      // --- NEW: Summary data saving ---
      this.saveSummary(entriesToSave);

      // --- Show confirmation message ---
      this.showStatusMessage = true;
      setTimeout(() => {
        this.showStatusMessage = false;
      }, 2000);
    },
    saveSummary(savedEntries) {
      if (savedEntries.length === 0) return;

      // Create a summary text
      const updatedSections = savedEntries.map(e => e.section);
      let summaryText = `Updated ${updatedSections.slice(0, 2).join(', ')}`;
      if (updatedSections.length > 2) {
        summaryText += ` and ${updatedSections.length - 2} other sections.`;
      } else {
        summaryText += '.';
      }

      // Create the new summary object
      const newSummary = {
        type: 'Rescue Log',
        timestamp: new Date().toISOString(),
        summaryText: summaryText,
        link: 'RescueLog.html'
      };

      // Get existing feed, add new item, and save
      const feed = JSON.parse(localStorage.getItem('activitySummaryFeed') || '[]');
      feed.unshift(newSummary); // Add to the beginning
      localStorage.setItem('activitySummaryFeed', JSON.stringify(feed));
    },
    loadEntries() {
      const savedData = localStorage.getItem('rescueLogData');
      const loadedEntries = savedData ? JSON.parse(savedData) : [];
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
  mounted() {
    this.loadEntries();
  }
}).mount('#app');
