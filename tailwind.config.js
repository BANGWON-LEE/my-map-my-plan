/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', // ✅ 이거 꼭 있어야 함
    './src/components/**/*.{js,ts,jsx,tsx}', // ✅ 컴포넌트도 포함
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
