const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
	content: ["../**/*.html"],
	theme: {
		container: {
			center: true,
			padding: "1rem",
		},
		colors: {
			blue: "#0C90D9",
			yellow: "#EFDF00",
			transparent: "transparent",
			current: "currentColor",
			black: colors.black,
			white: colors.white,
			gray: {
				100: "#F2F2F2",
				300: "#D9D9D6",
				500: "#8C8C8B",
				700: "#656666",
				900: "#3E3F40",
			},
		},
		extend: {
			fontFamily: {
				sans: ["NouvelR", ...defaultTheme.fontFamily.sans],
			},
			transitionTimingFunction: {
				"in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
				"out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
