import type { StoreDetails } from '../modules/validate-store/types'

const description = `\
Open source extension that allows you to configure internal browser privacy settings through the privacy API provided to extensions.

The API has three categories with properties to be changed:
- Services: Spelling Service, Safe Browsing, Password Saving
- Websites: Third Party Cookies, Referrers headers, Do Not Track headers
- Network: Network Prediction Service, WebRTC Policy

Zero data collection.
Source on GitHub`
const repo = 'https://github.com/Kernocal/privacy-settings'

export const storeData = {
    common: {
        description,
        privacyPolicyUrl: 'https://github.com/Kernocal/extensions/blob/main/PRIVACY.md',
        screenshots: [
            { path: 'store/exports/1g1280x800.png', width: 1280, height: 800 },
        ],
        smallPromoTile: { path: 'store/exports/small-tile-440x280.png', width: 440, height: 280 },
        largePromoTile: null,
        promoVideoUrl: null,
        websiteUrl: repo,
        matureContent: false,
    },
    chrome: {
        category: 'Privacy & Security',
        icon: { path: 'store/exports/chrome-128.png', width: 128, height: 128 },
        officialUrl: null,
        supportUrl: `${repo}/issues/new?template=bug-report.md`,
        singlePurpose: 'Easily configure Chrome\'s privacy settings provided by chrome.privacy API',
        permissionJustifications: {
            privacy: 'Needed to interact with Chrome\'s privacy settings',
            sidePanel: 'Needed to provide the UI',
        },
        remoteCode: false,
    },
    edge: {
        category: 'Accessibility',
        icon: { path: 'store/exports/edge-300.png', width: 300, height: 300 },
        searchTerms: ['privacy', 'settings', 'privacy settings', 'privacy controls', 'privacy manager', 'browser privacy', 'browser settings'],
        supportContact: `${repo}/issues/new?template=bug-report.md`,
        collectsPersonalData: false,
    },
} satisfies StoreDetails
