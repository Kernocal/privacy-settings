<script lang='ts'>
    import type { SettingItem } from 'lib/items.svelte'
    import { i18n } from '#imports'
    import { settingsCategories, webRTCPolicies } from 'lib/items.svelte'
    import { capitalise } from 'lib/string'

    const collapsed = $state<Record<string, boolean>>({})
    const browserName = capitalise(import.meta.env.BROWSER)
    const brand = browserName === 'Chrome' ? 'Google' : 'Microsoft'
    const serviceProvider = browserName === 'Chrome' ? 'Google' : 'Microsoft (plus Google)'

</script>

{#snippet itemDetails(item: SettingItem)}
    {@const setting = item.setting}
    <label class={[
        'p-3 border border-surface-border rounded-lg bg-surface-panel flex cursor-pointer transition-colors hover:(border-surface-border-hover bg-surface-panel-hover) items-start justify-between',
        typeof setting.value === 'string' ? 'flex-col gap-2' : 'gap-4',
    ]}>
        <span class='flex flex-1 flex-col'>
            <div class='flex gap-2 items-center'>
                <span class='text-sm font-medium'>{item.label}</span>
            </div>
            <span class='text-xs text-on-surface-muted leading-relaxed mt-1'>{i18n.t(item.descriptionKey as any, [browserName, serviceProvider])}</span>
        </span>

        <div class={['flex flex-col items-end gap-1.5', typeof setting.value === 'string' && 'w-full']}>
            {#if typeof item.defaultValue === 'boolean'}
                <span class='text-xs text-on-surface-subtle font-bold mb-2 px-1 py-0.5 border border-surface-border rounded bg-black/20'>
                    Default: {item.defaultValue === true ? 'On' : 'Off'}
                </span>
            {/if}

            <div class={['flex items-center relative', typeof setting.value === 'string' && 'w-full']}>
                {#if typeof setting.value === 'string'}
                    <select
                        bind:value={setting.value}
                        class='text-xs text-on-surface px-2 py-1.5 outline-none border border-surface-border rounded bg-surface-panel w-full transition disabled:opacity-50 focus:(ring-1 ring-accent)'
                    >
                        {#each webRTCPolicies as policy (policy.value)}
                            <option value={policy.value}>{policy.label}</option>
                        {/each}
                    </select>
                {:else if typeof setting.value === 'boolean'}
                    <input type='checkbox' bind:checked={setting.value} class='peer sr-only' />
                    <div class='rounded-full bg-surface-border h-5 w-10 transition-colors peer-checked:bg-accent peer-disabled:opacity-50'></div>
                    <div class='rounded-full bg-on-surface h-3 w-3 shadow-sm transition-transform left-1 top-1 absolute peer-checked:translate-x-5'></div>
                {/if}
            </div>
        </div>
    </label>
{/snippet}

<div class='text-on-surface font-sans p-6 bg-surface-bg min-h-screen'>
    <div class='mx-auto max-w-md'>
        <header class='mb-8'>
            <h2 class='text-xl tracking-tight font-bold'>
                Internal Browser Privacy Controls
            </h2>
            <p class='text-md text-on-surface-muted mt-2'><strong>Disclaimer:</strong> This extension is not affiliated with {brand}.</p>
            <p class='text-md text-on-surface-muted'>All settings are managed within the browser using the <code>browser.privacy</code> extension API.</p>
            <a
                href={browserName === 'Edge' ? 'https://learn.microsoft.com/en-us/microsoft-edge/extensions/developer-guide/api-support' : 'https://developer.chrome.com/docs/extensions/reference/api/privacy'}
                class='text-sm text-accent py-2 transition-colors hover:(text-accent-hover underline)'>
                Learn more about the browser.privacy API
            </a>
        </header>

        <div class='space-y-8'>
            {#each Object.values(settingsCategories) as category (category.name)}
                {@const categoryLabel = capitalise(category.name)}
                <section class='shadow-3xl p-5 rounded-xl bg-surface-panel transition-all'>
                    <button
                        onclick={() => collapsed[category.name] = !collapsed[category.name]}
                        class='group/header flex w-full items-center justify-between'
                        aria-expanded={!collapsed[category.name]}
                    >
                        <h2 class='text-lg font-bold flex gap-2 items-center'>
                            {categoryLabel}
                        </h2>
                        <div class={[
                            'text-on-surface-subtle transition-transform duration-300 group-hover/header:text-accent',
                            collapsed[category.name] ? 'rotate-180' : '',
                        ]}>
                            <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6' /></svg>
                        </div>
                    </button>

                    {#if !collapsed[category.name]}
                        <div class='mt-4'>
                            <p class='text-sm text-on-surface-muted mb-4'>{i18n.t(category.descriptionKey as any, [browserName, serviceProvider])}</p>
                            <div class='space-y-3'>
                                {#each Object.values(category.items) as item (item.label)}
                                    {@const isControllable = ['controllable_by_this_extension', 'controlled_by_this_extension'].includes(item.setting.levelOfControl)}
                                    {#if item.setting.ready && isControllable}
                                        {@render itemDetails(item)}
                                    {/if}
                                {/each}
                            </div>
                        </div>
                    {/if}
                </section>
            {/each}
        </div>
    </div>
</div>
