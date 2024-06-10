<template>
  <!-- TradingView Widget END -->

  <div class="user-nft">
    <UserProfile :user="user" />
  </div>
  <UserArts />
</template>


<script lang="ts">
import { defineComponent } from "vue";
import UserProfile from "@/components/UserProfile/index.vue";
import FooterMenu from "@/components/FooterMenu/index.vue";
import UserArts from "@/components/UserArts/index.vue";
import Search from "@/components/search/index.vue";

interface User {
  image: string;
  name: string;
}

export default defineComponent({
  name: "UserNFT",
  components: {
    UserProfile,
    UserArts,
    Search,
    FooterMenu,
  },
  data() {
    return {
      user: {
        image: "/path/to/user-image.jpg",
        name: "Chelovek s Luni",
      } as User,
    };
  },
});
</script>



<style scoped>

.user-nft {
  background: linear-gradient(180deg, #1a1a1a 0%, #22262c 100%);
  border-radius: 0px 0px 23px 23px;
}

</style>
