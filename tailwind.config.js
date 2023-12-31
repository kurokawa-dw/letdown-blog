/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
			fontFamily: {
				'body': ['Noto Sans JP', 'sans-serif'],
				'accent': ['YuGothic', 'sans-serif']
			},
			width: {
				'main': 'clamp(0vw, 1000px, 90vw)' //最小値、理想値、最大値
			}
    },
  },
  plugins: [
		require('@tailwindcss/forms'),
	],
}
