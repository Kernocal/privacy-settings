<script lang='ts'>
    import icon from '../assets/icon.png'
</script>

<style>
  :global(body) {
    margin: 0;
  }

  .tile {
    width: 440px;
    height: 280px;
    background: linear-gradient(145deg, #0a1a08, #122d0e 40%, #0d200a);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }

  .glow {
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(106, 191, 75, 0.15) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .icon {
    width: 120px;
    height: 120px;
    object-fit: contain;
    filter: drop-shadow(0 4px 24px rgba(106, 191, 75, 0.3));
    z-index: 1;
  }

  .toggles {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 14px;
    z-index: 1;
  }

  .toggles-left {
    left: 36px;
    top: 50%;
    transform: translateY(-50%);
  }

  .toggles-right {
    right: 36px;
    top: 50%;
    transform: translateY(-50%);
  }

  .toggle {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .toggle-track {
    width: 32px;
    height: 18px;
    border-radius: 9px;
    position: relative;
  }

  .toggle-track.on {
    background: #3a8f2a;
  }

  .toggle-track.off {
    background: #2a3a28;
    border: 1px solid #3a4a38;
  }

  .toggle-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    position: absolute;
    top: 2px;
  }

  .toggle-track.on .toggle-thumb {
    background: #a8e090;
    right: 2px;
    box-shadow: 0 0 6px rgba(168, 224, 144, 0.4);
  }

  .toggle-track.off .toggle-thumb {
    background: #5a6a58;
    left: 2px;
  }

  .toggle-line {
    height: 3px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.08);
  }

  .line-w1 { width: 48px; }
  .line-w2 { width: 36px; }
  .line-w3 { width: 42px; }
  .line-w4 { width: 32px; }
  .line-w5 { width: 40px; }
  .line-w6 { width: 52px; }

  .dots {
    position: absolute;
    bottom: 24px;
    display: flex;
    gap: 6px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #3a8f2a;
  }

  .dot.active {
    background: #a8e090;
    box-shadow: 0 0 8px rgba(168, 224, 144, 0.4);
  }
</style>

<div class='tile'>
    <div class='glow'></div>

    <div class='toggles toggles-left'>
        <div class='toggle'>
            <div class='toggle-line line-w1'></div>
            <div class='toggle-track off'><div class='toggle-thumb'></div></div>
        </div>
        <div class='toggle'>
            <div class='toggle-line line-w2'></div>
            <div class='toggle-track on'><div class='toggle-thumb'></div></div>
        </div>
        <div class='toggle'>
            <div class='toggle-line line-w3'></div>
            <div class='toggle-track off'><div class='toggle-thumb'></div></div>
        </div>
    </div>

    <img class='icon' src={icon} alt=''>

    <div class='toggles toggles-right'>
        <div class='toggle'>
            <div class='toggle-track on'><div class='toggle-thumb'></div></div>
            <div class='toggle-line line-w4'></div>
        </div>
        <div class='toggle'>
            <div class='toggle-track off'><div class='toggle-thumb'></div></div>
            <div class='toggle-line line-w5'></div>
        </div>
        <div class='toggle'>
            <div class='toggle-track on'><div class='toggle-thumb'></div></div>
            <div class='toggle-line line-w6'></div>
        </div>
    </div>

    <div class='dots'>
        <div class='dot active'></div>
        <div class='dot'></div>
        <div class='dot'></div>
    </div>
</div>
