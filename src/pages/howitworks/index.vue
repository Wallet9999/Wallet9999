<template>
    <div class="how_wrap">
      <HeaderHIW />
      <ContentHIW />
    </div>
  </template>
  
<script>
    import HeaderHIW from '@/components/HowItWorks/HeaderHIW.vue'
    import ContentHIW from '@/components/HowItWorks/ContentHIW.vue' 


    export default {
        components: {
            HeaderHIW,
            ContentHIW
        },
    }
</script>

<style lang="scss" scoped>
    .how_wrap {
        padding: 0 18px;
    }
</style>