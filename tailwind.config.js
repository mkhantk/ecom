/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				"max-sm": { max: "640px" }, // Up to 640px
				"max-md": { max: "768px" }, // Up to 768px
				"max-lg": { max: "1024px" }, // Up to 1024px
				"max-xl": { max: "1280px" }, // Up to 1280px
				"max-2xl": { max: "1536px" }, // Up to 1536px
			},
		},
	},
	plugins: [],
};
