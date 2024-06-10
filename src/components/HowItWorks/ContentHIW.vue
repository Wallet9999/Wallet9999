<template>
    <div class="content__wrap">
        <div class="content__hiw">
            <div class="content__hiw_block" style="background: #E3F5ED"></div>
            <div class="content__hiw_title">
                <nuxt-link 
                    to=""
                    class="content__hiw_icon"
                >
                    <ContentIcon />
                </nuxt-link>
                <h2>How to exchange?</h2>
            </div>
        </div>
        <div class="content__hiw">
            <div class="content__hiw_block" style="background: #E2EDFD"></div>
            <div class="content__hiw_title">
                <nuxt-link 
                    to=""
                    class="content__hiw_icon"
                >
                    <ContentIcon />
                </nuxt-link>
                <h2>How to Send Tokens using the QR code
                    on the withdrawl page </h2>
            </div>
        </div>
        <div class="content__hiw">
            <div class="content__hiw_block" style="background: #F5EEE3"></div>
            <div class="content__hiw_title">
                <nuxt-link 
                    to=""
                    class="content__hiw_icon"
                >
                    <ContentIcon />
                </nuxt-link>
                <h2>How to Deposit Fiat?</h2>
            </div>
        </div>
    </div>
</template>
  
<script>
    import ContentIcon from '@/assets/icons/video.svg?component'

    export default {
        name: 'ContentHIM',
        components: {
            ContentIcon
        }
    }
</script>

<style lang="scss" scoped>
    .content__wrap {
        margin-top: 20px;
    }
    .content__hiw {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        box-shadow: 0px 1px 5px rgba(132, 141, 161, 0.3);
        border-radius: 13px;
        margin-top: 15px;
        padding: 10px;

        &_block {
            width: 100%;
            height: 134px;
            border-radius: 8px;
        }

        &_title {
            display: flex;
            justify-content: start;
            align-items: center;
            width: 100%;
            margin-top: 10px;

            & h2 {
                font-weight: 800;
                font-size: 15px;
                line-height: 19px;
                letter-spacing: -0.03em;
                color: #646686;
                max-width: 269px;
                margin-left: 13px;
            }
        }

        &_icon {
            width: 36px;
            height: 36px;
            box-shadow: 0px 1px 5px rgba(132, 141, 161, 0.3);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.3s ease 0s;

            &:hover {
                box-shadow: none;
                opacity: 0.8;
            }
        }
    }
</style>
  