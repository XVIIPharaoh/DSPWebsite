const { createApp } = Vue;

createApp({
  data() {
    return {
      parsedData: []
    };
  },
  methods: {
    signOut() {
      window.location.href = 'LogIn.html';
    },

    /**
     * Converts an Excel time serial number (a decimal from 0 to 1)
     * into a 12-hour time format string (e.g., "1:30PM").
     * @param {number | string} serial - The decimal time value from Excel or a pre-formatted string.
     * @returns {string} The formatted time string.
     */
    formatExcelTime(serial) {
      // If the value from Excel is not a number, it might be an empty cell or already text.
      if (typeof serial !== 'number' || isNaN(serial)) {
        return serial || ""; // Return the existing text or an empty string.
      }

      // Excel's epoch starts on 1899-12-30. We create a date and add the fractional day value.
      // We use UTC methods to avoid any local timezone offsets during conversion.
      const excelEpoch = new Date(Date.UTC(1899, 11, 30));
      const date = new Date(excelEpoch.getTime() + serial * 24 * 60 * 60 * 1000);

      // Extract hours and minutes from the calculated date
      let hours = date.getUTCHours();
      let minutes = date.getUTCMinutes();

      // Determine the AM/PM suffix
      const ampm = hours >= 12 ? 'PM' : 'AM';

      // Convert from 24-hour to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // The hour '0' should be displayed as '12'

      // Pad the minutes with a leading zero if they are less than 10
      minutes = minutes < 10 ? '0' + minutes : minutes;

      // Return the final time string, e.g., "12:43PM"
      return `${hours}:${minutes}${ampm}`;
    },

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
          
          // Use `raw: true` to ensure we get the original decimal value for time fields.
          const json = XLSX.utils.sheet_to_json(worksheet, { raw: true });

          // Map over the data and format each row
          this.parsedData = json.map(row => {
            return {
              DA: row.DA || "",
              TBA: row.TBA || "",
              Status: row.STATUS || "",
              // Use our custom function to format the time from the raw decimal value
              Time: this.formatExcelTime(row.TIME), 
              RouteNumber: row.ROUTENUMBER || ""
            }
          });

        } catch (error) {
          console.error("Error reading Excel file:", error);
          // You could add an on-screen error message here for the user
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }
}).mount('#app');
