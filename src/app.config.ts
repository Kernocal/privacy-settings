import { defineAppConfig } from '#imports'

// Define types for your config
declare module 'wxt/utils/define-app-config' {
    export interface WxtAppConfig {
        theme?: 'light' | 'dark'
        browserName: string
    }
}

export default defineAppConfig({
    theme: 'dark',
    browserName: import.meta.env.BROWSER,
})

// import { getAppConfig } from '#imports';

// console.log(getAppConfig()); // { theme: "dark" }
