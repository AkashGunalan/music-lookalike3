export default {
	content: [
	  "./index.html",
	  "./src/**/*.{js,jsx,ts,tsx}"
	],
	theme: {
	  extend: {
		fontFamily: {
		  montserrat: ["Montserrat", "sans-serif"],
		  lato: ["Lato", "sans-serif"],
		  poppins: ["Poppins", "sans-serif"],
		  inria: ["Inria Sans", "sans-serif"],
		  figtree: ["Figtree", "sans-serif"],
		  spotify: ["Spotify Mix UI", "sans-serif"]
		},
		colors: {
		  background: "var(--background)",
		  primary: "var(--primary)",
		  accent: "var(--accent)",
		  "accent-dark": "var(--accent-dark)",
		  "accent-text": "var(--accent-text)",
		  border: "var(--border)",
		  hover: "var(--hover)"
		},
	  }
	},
	plugins: []
  };
  