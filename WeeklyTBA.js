const { createApp } = Vue;

createApp({
  data() {
    return {
      parsedData: []
    };
  },
  methods: {
    // 🔹 Sign Out Function
    signOut() {
      window.location.href = 'LogIn.html';  // Redirects to login page
    },

    // 🔹 Excel File Upload Handler
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);

          this.parsedData = json.map(row => ({
            DA: row.DA || "",
            TBA: row.TBA || "",
            Status: row.Status || "",
            Time: row.Time || "",
            RouteNumber: row.RouteNumber || ""
          }));
        } catch (error) {
          alert("Error reading Excel file. Please check formatting.");
          console.error(error);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }
}).mount('#app');
