import { resolve } from 'node:path'
import { defineConfig } from 'wxt'

export default defineConfig({
    manifest: ({ browser }) => {
        return {
            name: browser === 'chrome' ? '__MSG_extension_chrome_name__' : '__MSG_extension_edge_name__',
            description: browser === 'chrome' ? '__MSG_extension_description_chrome__' : '__MSG_extension_description_edge__',
            default_locale: 'en',
            permissions: [
                'privacy',
                'sidePanel',
            ],
        }
    },
    // autoIcons: {
    //     sizes: [128, 300],
    // },
    srcDir: 'src',
    modules: ['@wxt-dev/unocss', '@wxt-dev/module-svelte', '@wxt-dev/i18n/module', '@wxt-dev/auto-icons'],
    alias: {
        lib: resolve('src/lib/'),
    },
    webExt: {
        binaries: {
            chrome: 'C:/Users/Kern/AppData/Local/Chromium/Application/chrome.exe',
            edge: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
        },
        keepProfileChanges: true,
        chromiumProfile: resolve('.wxt/chrome-data'),
    },
})
