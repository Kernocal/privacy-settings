import { browser } from '#imports'
import { backgroundLogger } from 'lib/logger'

export default defineBackground(() => {
    browser.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(error => backgroundLogger.error(error))
    // backgroundLogger.info('services', browser.privacy.services)
    // backgroundLogger.info('network', browser.privacy.network)
    // backgroundLogger.info('websites', browser.privacy.websites)
})
