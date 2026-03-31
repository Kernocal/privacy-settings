<script lang='ts'>
    import icon from '../assets/icon.png'
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap');

  :global(body) {
    margin: 0;
  }

  .tile {
    width: 440px;
    height: 280px;
    background: #c7ebaf;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    overflow: hidden;
    font-family: 'Inter', Arial, Helvetica, sans-serif;
  }

  .tile img {
    width: 120px;
    height: 120px;
    object-fit: contain;
    filter: drop-shadow(0 2px 8px rgba(15, 61, 10, 0.15));
  }

  .tile .title {
    font-size: 28px;
    font-weight: 700;
    font-style: italic;
    color: #1d5c14;
    letter-spacing: -0.01em;
  }
</style>

<div class='tile'>
    <img src={icon} alt='Privacy Controls'>
    <span class='title'>Privacy Controls</span>
</div>
