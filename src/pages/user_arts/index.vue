<template>
  <div class="user-nft">
    <UserProfile :user="user" />
  </div>
  <UserArts />
</template>

<script  lang="ts">
import { defineComponent } from 'vue'
import UserProfile from '@/components/UserProfile/index.vue'
import UserArts from '@/components/UserArts/index.vue'

interface User {
  image: string
  name: string
}

export default defineComponent({
  name: 'UserNFT',
  components: {
    UserProfile,
    UserArts
  },
  data() {
    return {
      user: {
        image: '/path/to/user-image.jpg',
        name: 'Chelovek s Luni',
      } as User
    }
  }
})
</script>

<style scoped>
.user-nft {
  background: linear-gradient(180deg, #1A1A1A 0%, #22262C 100%);
  border-radius: 0px 0px 23px 23px;
}
</style>
