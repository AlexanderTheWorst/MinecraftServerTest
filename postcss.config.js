import tailwindcss from '@tailwindcss/vite'
import autoprefixer from 'autoprefixer'

export default {
    plugins: [
      tailwindcss,  // This enables Tailwind CSS
      autoprefixer,  // This automatically adds vendor prefixes to your CSS
    ],
  }
  