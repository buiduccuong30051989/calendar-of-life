/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			gridTemplateColumns: {
				24: "repeat(24, minmax(0, 1fr))",
        48: "repeat(48, minmax(0, 1fr))",
        56: "repeat(56, minmax(0, 1fr))",
			},
		},
	},
	plugins: [],
};
