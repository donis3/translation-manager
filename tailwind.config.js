const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	//Always compiled classes
	safelist: [],
	theme: {
		extend: {
			animation: { 'spin-slow': 'spin 2s linear infinite' },
			fontFamily: {
				sans: ['Poppins', ...defaultTheme.fontFamily.sans],
				title: ['Oswald', ...defaultTheme.fontFamily.serif],
			},
		},
	},
	plugins: [require('daisyui')],
	// daisyUI config (optional)
	daisyui: {
		styled: true,
		themes: ['light', 'dark'],
		darkTheme: 'dark',
	},
	fontFamily: {
		sans: ['Oswald', 'sans-serif'],
	},
};
