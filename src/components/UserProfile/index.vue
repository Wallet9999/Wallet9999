<template>
        <div class="user-profile">
            <div class="user-profile__wrap">
                <div class="user-profile__left">
                    <UserImg  
                        :src="user.image" 
                        alt="" 
                        class="user-profile__image" 
                    />
                </div>
                <div class="user-profile__right">
                    <h6 class="user-profile__name">
                        {{ user.name }}
                        <span class="user-profile__icon_wrap"><int-icon-black class="user-profile__icon" /></span>
                    </h6>
                    <p class="user-profile__followers">Followers <span>13 858</span></p>
                    <div class="user-profile__sum_wrap">
                        <div class="user-profile__sum">
                            <p>12,545 ETH</p>
                            <span>$ 1,512,154.00</span>
                        </div>
                        <div class="user-profile__link">
                            <linkIcon />
                        </div>
                    </div>
                </div>
            </div>
            <div class="user-profile__footer_wrap">
                <div class="user-profile__footer_addres">
                    <p>Address</p>
                    <span>0x85d2..f58w</span>
                </div>
                <div class="user-profile__buttons">
                    <button class="user-profile__button user-profile__button--buy">Buy</button>
                    <button class="user-profile__button user-profile__button--follow">Follow</button>
                </div>
            </div>
        </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import intIconBlack from '@/assets/icons/internet_black.svg?component'
  import linkIcon from '@/assets/icons/group_1321315181.svg?component'
  import UserImg from '@/assets/icons/gray_min.svg?component'
  
  export default defineComponent({
    name: 'UserProfile',
    components: {
      intIconBlack,
      linkIcon,
      UserImg
    },
    props: {
      user: {
        type: Object,
        required: true
      }
    }
  })
  </script>
  
  <style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .user-profile {
        display: flex;
        align-items: start;
        flex-direction: column;
        background: linear-gradient(180deg, #1c1d1e 0%, #22262C 100%);
        border-radius: 0px 0px 23px 23px;
        box-shadow: 0 2px 4px $color-white;
        padding: 25px;
        gap: 10px;

        &__wrap {
            display: flex;
            align-items: start;
            flex-direction: row;
            width: 100%;
            justify-content: space-between;
        }

        &__left {
            margin-right: 16px;
        }
        
        &__image {
            background: linear-gradient(180deg, #2B2E35 0%, #51586A 100%);
            border-radius: 18px;
            width: 116px;
            height: 116px;
            display: block;
        }
    
        &__right {
            display: flex;
            flex-direction: column;
            width: 58%;
        }
        
        &__name {
            display: flex;
            align-items: center;
            font-size: 20px;
            font-weight: bold;
            margin: 0;
        }

        &__icon_wrap {
            width: 20px;
            height: 20px;
            background-color: $color-blue;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 9px;
        }
        
        &__description {
            margin: 8px 0;
            color: #666;
        }
    
        &__button {
            padding: 8px 16px;
            margin-top: 8px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            color: $color-black;
        }

        &__followers {
            font-weight: 700;
            font-size: 9px;
            color: $color-grey-dark;
            margin-top: 6px;
        }

        &__followers span {
            font-weight: 700;
            font-size: 9px;
            line-height: 11px;
            color: $color-black;
            margin-left: 5px;
        }

        &__sum_wrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px;
        }

        &__sum p {
            font-weight: 700;
            font-size: 21px;
            line-height: 26px;
            color: $color-blue;
        }

        &__sum span{
            font-weight: 700;
            font-size: 10px;
            line-height: 13px;
            color: #8E97B0;
        }

        &__footer_wrap {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 21px;
        }

        &__footer_addres {
            display: flex;
            flex-direction: column;
            justify-content: end;
            margin-top: 10px;
        }

        &__footer_addres p {
            font-weight: 700;
            font-size: 9px;
            color: #8E97B0;
        }

        &__footer_addres span {
            font-weight: 700;
            font-size: 13px;
            color: $color-black;
            margin-top: 5px;
        }

        &__buttons {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        &__button {
            width: 94px;
            height: 40px;
            transition: 0.3s ease 0s;
            margin: 0;
        }

        &__button:hover {
           opacity: 0.6;
        }

        &__button--buy {
            background: $color-blue;
            border-radius: 8px;
            font-weight: 700;
            font-size: 13px;
            line-height: 16px;
            text-align: center;
            color: $color-white;
            text-transform: uppercase;
        }

        &__button--follow {
            border: 2px solid $color-grey-dark;
            border-radius: 8px;
            font-weight: 700;
            font-size: 13px;
            text-align: center;
            color: $color-blue;
        }
    }
  </style>
  