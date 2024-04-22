import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
    }
,
    extend: {
      colors: {
        'dark-blue': '#242d62',
        'saddle-brown': '#FBA834',
      },
    },
  },
  plugins: [
  ],
};
export default config;
