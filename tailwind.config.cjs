module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#ade746'
      },
      backgroundImage: {
        'room1': "url('/src/assets/vr_room3.jpeg')",
        'room2': "url('/src/assets/vr_room1.jpeg')",
        'room3': "url('/src/assets/vr_room2.jpeg')",
        'room4': "url('/src/assets/vr_room4.jpeg')",
      }

    },
  },
  plugins: [],
}
