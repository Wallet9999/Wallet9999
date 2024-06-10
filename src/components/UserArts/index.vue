<template>
    <div class="arts">
        <div class="arts__header">
            <h6 class="arts__header-title">
                Arts
            </h6>
            <Search />
        </div>
        <ul class="arts__cards">
            <li class="arts__card">
                <CardImg class="arts__card_img"/>
                <h2 class="arts__card_title">Solomun Ganges</h2>
                <div class="arts__card_items">
                    <div class="arts__card_item">
                        <p>Price</p>
                        <span>0,075 ETH</span>
                    </div>
                    <div class="arts__card_item">
                        <p>Highest Bid</p>
                        <span>0,099 ETH</span>
                    </div>
                    <div class="arts__card_item">
                        <button><PointsIcon/></button>
                    </div>
                </div>
            </li>
            <li class="arts__card">
                <CardImg class="arts__card_img"/>
                <h2 class="arts__card_title">Solomun Ganges</h2>
                <div class="arts__card_items">
                    <div class="arts__card_item">
                        <p>Price</p>
                        <span>0,075 ETH</span>
                    </div>
                    <div class="arts__card_item">
                        <p>Highest Bid</p>
                        <span>0,099 ETH</span>
                    </div>
                    <div class="arts__card_item">
                        <button><PointsIcon/></button>
                    </div>
                </div>
            </li>
            <li class="arts__card">
                <CardImg class="arts__card_img"/>
                <h2 class="arts__card_title">Solomun Ganges</h2>
                <div class="arts__card_items">
                    <div class="arts__card_item">
                        <p>Price</p>
                        <span>0,075 ETH</span>
                    </div>
                    <div class="arts__card_item">
                        <p>Highest Bid</p>
                        <span>0,099 ETH</span>
                    </div>
                    <div class="arts__card_item">
                        <button><PointsIcon/></button>
                    </div>
                </div>
            </li>
            <li class="arts__card">
                <CardImg class="arts__card_img"/>
                <h2 class="arts__card_title">Solomun Ganges</h2>
                <div class="arts__card_items">
                    <div class="arts__card_item">
                        <p>Price</p>
                        <span>0,075 ETH</span>
                    </div>
                    <div class="arts__card_item">
                        <p>Highest Bid</p>
                        <span>0,099 ETH</span>
                    </div>
                    <div class="arts__card_item">
                        <button><PointsIcon/></button>
                    </div>
                </div>
            </li>
            <li class="arts__card">
                <CardImg class="arts__card_img"/>
                <h2 class="arts__card_title">Solomun Ganges</h2>
                <div class="arts__card_items">
                    <div class="arts__card_item">
                        <p>Price</p>
                        <span>0,075 ETH</span>
                    </div>
                    <div class="arts__card_item">
                        <p>Highest Bid</p>
                        <span>0,099 ETH</span>
                    </div>
                    <div class="arts__card_item">
                        <button><PointsIcon/></button>
                    </div>
                </div>
            </li>
            <li class="arts__card">
                <CardImg class="arts__card_img"/>
                <h2 class="arts__card_title">Solomun Ganges</h2>
                <div class="arts__card_items">
                    <div class="arts__card_item">
                        <p>Price</p>
                        <span>0,075 ETH</span>
                    </div>
                    <div class="arts__card_item">
                        <p>Highest Bid</p>
                        <span>0,099 ETH</span>
                    </div>
                    <div class="arts__card_item">
                        <button><PointsIcon/></button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import InternetLogo from '@/assets/icons/internet.svg?component'
    import SearchIcon from '@/assets/icons/search_gray.svg?component'
    import PointsIcon from '@/assets/icons/points.svg?component'
    import CardImg from '@/assets/icons/gray_max.svg?component'

    export default defineComponent({
        components: { 
            InternetLogo,
            SearchIcon,
            PointsIcon,
            CardImg
         }
    })     
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/variables';
    @import '@/assets/scss/utils';

    .arts {
        position: relative;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        gap: px-to-rem(16);
        width: 100%;
        padding: px-to-rem(20) px-to-rem(10);
        background-color: $color-white;
        padding: 23px;

        &__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__header-title {
            color: $color-black-light;
            font-size: px-to-rem(15);
            font-weight: 700;
        }

        &__search_block {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
       
        &__search_input {
            border: 2px solid $color-grey;
            border-radius: 8px;
            width: 107px;
            height: 36px;
            font-size: 12px;
            position: relative;
            display: flex;
        }

        &__search_input:hover {
            width: 167px !important;
        }

        &__search_icon {
            display: block;
            width: 16px;
            height: 16px;
            position: absolute;
            top: 50%;
            left: 7px;
            transform: translateY(-50%);
        }

        &__cards {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 38px 0;
        }

        &__card {
            width: 160px;
            height: auto;
        }

        &__card_img {
            width: 100%;
            height: auto;
            display: block;
            background: linear-gradient(180deg, #2B2E35 0%, #51586A 100%);
            border-radius: 13px;
        }

        &__card_title {
            font-weight: 700;
            font-size: 14px;
            color: $color-black-light;
            margin-top: 11px;
        }

        &__card_items {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }

        &__card_item {
            display: flex;
            align-items: start;
            justify-content: center;
            flex-direction: column;
            margin-top: 11px;
        }

        &__card_item p {
            font-weight: 700;
            font-size: 7px;
            color: $color-grey-dark;
        }

        &__card_item span {
            font-weight: 700;
            font-size: 10px;
            line-height: 14px;
            color: $color-blue;
        }

        &__card_item button {
            margin-top: -10px;
        }
    }
</style>
