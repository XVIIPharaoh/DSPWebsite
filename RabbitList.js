const { createApp } = Vue;

createApp({
  data() {
    return {
      // The list of all drivers for the dropdown menus
      drivers: [
        "Gustavo Rebolloso", "Yazmin Coronado", "Mustaffa Anderson", "Souleymane Zampaligre",
        "Shawn Turner", "Manuel Robles Gonzales", "Terequa Hixson", "Dixon Peri", "Andy Peri",
        "Mike Garcia", "Adolf Ortuno", "German Gorrosquieta", "Adrian Rios", "Tung Do",
        "Jaden Jackson", "David Montano", "Robert Flores", "Quanterio Jackson",
        "Mohamed Zampaligre", "Jazzlynn Knight", "Lamarque Joseph", "Ajayasia Guillory",
        "George Molina", "George Xiquin Lopez", "Cevion Figures", "Mohammad Javed Iqbal",
        "Jaylen Alfred", "Mansa Kalu", "Christopher Cedillo", "Whitney Morris",
        "Marco Garcia Hernandez", "Michael Belmarez", "Dulse Coronado", "Tyler McClanahan",
        "Briiana Gorrell", "Jason Ferman", "Anthony Black", "Jeremy Gabriel", "Dennis Miles",
        "Jefferson Ferman", "Edward Sanchez", "Anthony Roque Gutierrez", "Aaron Reyna",
        "Jeremiah Oats", "Cynthia Morfin", "Ashton Irving", "Keiana Taylor",
        "Brandi Bermudes", "Hailey Davis", "Daniel Ramires", "David Guerra", "Amyah Murray",
        "Jdarion Thomas", "Clay Phoenix", "Davyon Henderson", "Canaan Sharlow", "Dawnn Ford", "Gavien Dixon"
      ],
      // Generate an array of numbers from 1 to 71 for the phone dropdown
      phoneNumbers: Array.from({ length: 71 }, (_, i) => i + 1),
      
      // Data for the left-side table, matching the PDF
      vanList1: [
        { name: 'G03' }, { name: 'EV01' }, { name: 'EV02' }, { name: 'EV03' }, { name: 'EV04' },
        { name: 'EV05' }, { name: 'EV06' }, { name: 'EV08' }, { name: 'EV09' }, { name: 'EV10' },
        { name: 'EV11' }, { name: 'EV12' }, { name: 'EV13' }, { name: 'EV15' }, { name: 'EV16' },
        { name: 'EV17' }
      ].map(van => ({ ...van, ...this.createEmptyRowData() })),

      // Data for the right-side table, matching the PDF
      vanList2: [
        { name: 'EV18' }, { name: 'EV19' }, { name: 'EV20' }, { name: 'EV21' }, { name: 'EV22' },
        { name: 'EV23' }, { name: 'EV24' }, { name: 'EV25' }, { name: 'EV26' }, { name: 'EV27' },
        { name: 'EV28' }, { name: 'EV29' }, { name: 'EV30' }, { name: 'EV31' }, { name: 'EV32' },
        { name: 'LMR 01' }
      ].map(van => ({ ...van, ...this.createEmptyRowData() })),

      notes: 'EV BATTERIES - (G3, EV01, EV02, EV03, EV05, EV08, EV17, EV19, EV25, EV26)',
      currentDate: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()
    };
  },
  methods: {
    // Returns a blank object for row data with individual clock-out times
    createEmptyRowData() {
      return { 
        driver1: '', 
        driver2: '', 
        phone1: '', 
        phone2: '', 
        clockOutTime1: null, // Time for driver 1
        clockOutTime2: null, // Time for driver 2
        showDriver2: false,
        showPhone2: false
      };
    },
    // Sets the clock-out time for a specific driver in a specific van row
    clockOut(van, driverIndex) {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });

      if (driverIndex === 1) {
        van.clockOutTime1 = formattedTime;
      } else if (driverIndex === 2) {
        van.clockOutTime2 = formattedTime;
      }
    },
    // Standard sign-out function
    signOut() {
      window.location.href = 'LogIn.html';
    }
  }
}).mount('#app');
