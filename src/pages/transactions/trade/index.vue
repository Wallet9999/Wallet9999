<template>
  <div class="header__trade">
    <HeaderTrade />
    <ClientOnly fallback="Loading chart..." fallback-tag="span">
        <TradingView />
    </ClientOnly>
    <InputTrade />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import HeaderTrade from "@/components/HeaderTrade/index.vue";
import InputTrade from "@/components/InputTrade/index.vue";
import TradingView from "@/components/widgets/TradingView/index.vue";

export default defineComponent({
  name: "Trade",
  components: {
    HeaderTrade,
    InputTrade,
    TradingView
  },
});
</script>

<style lang="scss" scoped>
.header__trade {
  width: 100%;
  padding: 23px;
}
</style>
