const config = {
  plugins: process.env.NODE_ENV === 'production' || !process.env.SANITY_STUDIO_MODE 
    ? ["@tailwindcss/postcss"] 
    : [],
};

export default config;
