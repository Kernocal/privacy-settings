![extension image](store/exports/assets/github/sidepanel.png "Extension sidepanel")

## Browser Privacy Controls
<p float="left">
<a href="https://chrome.google.com/webstore/detail/eckcihheoilcibochhhmnenhobabbhce" style="text-decoration: none;">
<img src="publish/assets/github/chrome.png" height="56" title="install from the Chrome Web Store">
</a>
<a href="https://microsoftedge.microsoft.com/addons/detail/mjdggenongadpakianjddhlkaklmjceh" style="text-decoration: none;">
<img src="publish/assets/github/edge.png" height="56" title="install from the Edge Store">
</a>
</p>

Manage Chromium-based browser's privacy settings using the <code>browser.privacy</code> API provided to extensions.

The API has three categories with properties to be changed:
- Services: Spelling Service, Safe Browsing, Password Saving
- Websites: Third Party Cookies, Referrers headers, Do Not Track headers
- Network: Network Prediction Service, WebRTC Policy

Zero data collection.


Note: It should work on any Chromium-based browser, but has only been tested on Chrome and Edge.


This extension is not affiliated with Google or Microsoft.

### Building

To build and load the extension from source run:

```
degit Kernocal/privacy-settings <folder-name>

pnpm install

pnpm run build

go to chrome://extensions/ (enable developer mode)

load unpacked folder <folder-name>/.output/chrome-mv3
```


### Acknowledgements

[Aklinker1](https://github.com/sponsors/aklinker1) making extension development fun:
- [WXT](https://wxt.dev/)
- [webext-core](https://github.com/aklinker1/webext-core)
- [publish-browser-extension](https://github.com/aklinker1/publish-browser-extension)

[Antfu's](https://github.com/sponsors/antfu) really cool projects:
- [eslint-config](https://github.com/antfu/eslint-config)
- [UnoCSS](https://unocss.dev/)
- [unimport](https://github.com/unjs/unimport)

[Svelte](https://svelte.dev/)