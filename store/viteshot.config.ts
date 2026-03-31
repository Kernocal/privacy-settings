import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'viteshot'

export default defineConfig({
    screenshots: {
        css: ['assets/style.css'],
    },
    plugins: [svelte()],
})
