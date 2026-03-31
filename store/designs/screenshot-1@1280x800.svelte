<script lang='ts'>
    import icon from '../assets/icon.png'

    const { t, captures } = $props()
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  :global(body) {
    margin: 0;
  }

  .screenshot {
    width: 1280px;
    height: 800px;
    background: linear-gradient(145deg, #0a1a08, #122d0e 40%, #0d200a);
    display: flex;
    overflow: hidden;
    font-family: 'Inter', Arial, Helvetica, sans-serif;
    position: relative;
  }

  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 64px 56px;
    gap: 32px;
    z-index: 1;
  }

  .branding {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .branding img {
    width: 56px;
    height: 56px;
    object-fit: contain;
    filter: drop-shadow(0 2px 12px rgba(15, 61, 10, 0.3));
  }

  .branding span {
    font-size: 24px;
    font-weight: 700;
    font-style: italic;
    color: #a8e090;
    letter-spacing: -0.01em;
  }

  .headline {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .headline h1 {
    margin: 0;
    font-size: 44px;
    font-weight: 700;
    line-height: 1.1;
    color: #ffffff;
    letter-spacing: -0.02em;
  }

  .headline h1 em {
    font-style: italic;
    color: #a8e090;
  }

  .headline p {
    margin: 0;
    font-size: 17px;
    font-weight: 400;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.65);
    max-width: 420px;
  }

  .features {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .feature {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
  }

  .feature .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #6abf4b;
    flex-shrink: 0;
  }

  .right {
    width: 560px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    z-index: 1;
  }

  .sidebar-frame {
    position: relative;
    width: 400px;
    height: 720px;
    margin-right: 40px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.08),
      0 24px 80px rgba(0, 0, 0, 0.5),
      0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .sidebar-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
  }

  .glow {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(106, 191, 75, 0.12) 0%, transparent 70%);
    top: 50%;
    right: 180px;
    transform: translateY(-50%);
    z-index: 0;
    pointer-events: none;
  }
</style>

<div class='screenshot'>
    <div class='glow'></div>

    <div class='left'>
        <div class='branding'>
            <img src={icon} alt={t.name}>
            <span>{t.name}</span>
        </div>

        <div class='headline'>
            <h1>{t.headline.replace(t.headlineEmphasis, '')}<em>{t.headlineEmphasis}</em></h1>
            <p>{t.description}</p>
        </div>

        <div class='features'>
            <div class='feature'><div class='dot'></div>{t.featureToggle}</div>
            <div class='feature'><div class='dot'></div>{t.featureCookies}</div>
            <div class='feature'><div class='dot'></div>{t.featureWebRTC}</div>
            <div class='feature'><div class='dot'></div>{t.featureDefaults}</div>
        </div>
    </div>

    <div class='right'>
        <div class='sidebar-frame'>
            <img src={captures.sidebar} alt='Privacy Controls sidebar panel'>
        </div>
    </div>
</div>
