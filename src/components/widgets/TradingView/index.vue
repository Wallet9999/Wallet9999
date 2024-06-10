<template>
  <div class="tradingview-widget-container" style="height:100%;width:100%">
    <div id="tradingview-widget" style="height:calc(100% - 32px);width:100%"></div>
    <div class="tradingview-widget-container__copyright">
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'TradingViewWidget',
  setup() {
    onMounted(() => {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.async = true;
      const widgetConfig = {
        "height": "300",
        "width": "auto",
        "symbol": "BINANCE:BTCUSDT",
        "interval": "15",
        "timezone": "Europe/Istanbul",
        "theme": "dark",
        "backgroundColor": "rgba(28, 29, 30, 1)",
        "style": "1",
        "locale": "en",
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
  }
      script.innerHTML = JSON.stringify(widgetConfig);
      const appendElement = document.getElementById('tradingview-widget')
      if (!appendElement) return;
      appendElement.appendChild(script);
    });
  },
});
</script>

<style scoped>
/* Your styles here */
</style>