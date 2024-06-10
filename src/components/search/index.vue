<template>
    <div class="search">
        <div class="search__input">
            <SearchIcon class="search__icon"/>
            <input class="search__search" placeholder="Find" type="text">
        </div>
        <nuxt-link class="search__link" to="/">
            <InternetLogo class="search__link_icon"/>
        </nuxt-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InternetLogo from '@/assets/icons/internet.svg?component'
import SearchIcon from '@/assets/icons/search_gray.svg?component'

export default defineComponent({
name: 'search',
components: {
    InternetLogo,
    SearchIcon
}
})
</script>

<style lang="scss" scoped>
    .search {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;

        &__input {
            border: 2px solid #22262C;
            border-radius: 8px;
            width: 107px;
            height: 36px;
            font-size: 12px;
            position: relative;
            display: flex;
        }

        &__input:hover {
            width: 167px !important;
        }

        &__icon {
            display: block;
            width: 16px;
            height: 16px;
            position: absolute;
            top: 50%;
            left: 7px;
            transform: translateY(-50%);
        }

        &__search {
            font-weight: 700;
            color: white;
            padding-left: 30px;
        }

        &__search::placeholder {
            color: #6F7378 !important;
        }

        &__link {
            border: 2px solid #22262C;
            border-radius: 8px;
            width: 36px;
            height: 36px;
            position: relative;
        }
        
        &__link {
            display: flex;
            align-items: center;
            justify-content: center; 
            transition: 0.3s ease;
        }

        &__link:hover {
            opacity: 0.6;
        } 
    }
        
</style>
