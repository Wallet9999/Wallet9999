<template>
  <div class="dropdown">
    <button @click="toggleDropdown" class="dropdown-toggle">
      {{ selectedItem ? selectedItem : 'Select item' }}
      <ArrowDown class="dropdown-arrow-icon"/>
    </button>
    <ul v-if="isOpen" class="dropdown-menu">
      <li v-for="item in items" :key="item" @click="selectItem(item)">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref} from 'vue';
import ArrowDown from '@/assets/icons/arrow_down.svg?component';

export default defineComponent({
  name: 'DropDown',
  components: {
    ArrowDown
  },
  setup() {
    const isOpen: Ref<boolean> = ref(false);
    const selectedItem: Ref<string | null> = ref(null);
    const items: Ref<string[]> = ref(['BTC/USDT', 'BTC/USDT', 'BTC/USDT']);

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const selectItem = (item: string) => {
      selectedItem.value = item;
      isOpen.value = false;
    };

    return { isOpen, selectedItem, items, toggleDropdown, selectItem };
  },
});
</script>
  
<style lang="scss" scoped>
.dropdown {
  position: relative;
  display: inline-block;

  &-toggle {
    background-color: #1b1c1d;
    color: #edeff2;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
  }

  &-menu {
    display: block;
    position: absolute;
    background-color: #1f2124;
    border: 1px solid #3a3d42;
    z-index: 1;
    min-width: 100%;
    padding: 5px;
    text-align: center;

    & li {
      list-style-type: none;
      padding: 8px 12px;
      cursor: pointer;
    }

    & li:hover {
      background-color: #3a3d42;
    }
  }
}
</style>
  