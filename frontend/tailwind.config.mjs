import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			scrollbar: ["rounded"],
			fontFamily: {
				sans: ["StudioFeixenSans", ...fontFamily.sans],
				mono: ["StudioFeixenMono", "Source Code Pro", ...fontFamily.mono],
				alt: ["Courier", ...fontFamily.sans],
				edgy: ["StudioFeixenEdgy", ...fontFamily.sans],
			},
		},
	},

	plugins: [require("@tailwindcss/typography"), require("tailwind-scrollbar")],
	variants: {},
};
