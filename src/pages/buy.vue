<template>
    <header>
        <a class="logo" href="/">
        </a>
        <div class="burger">
        </div>
    </header>
    <div class="send__modal_wrap">
        <div class="send__modal_title">
            <h2>BUY NEXTA WITH CREDIT CARD</h2>
            <p>USING P2P SERVICES  YOU CAN DEPOSIT THE BALANCE</p>
        </div>
        <div class="steps__wrap">
            <div class="step__block">
                <div class="step_title title_center">
                    <h2>1 step:<span> Choose the Currency</span></h2>
                </div>
                <ul class="card__items">
                    <li @click="onClickFiat(fiatKey)" :key="fiatKey" v-for="(fiat, fiatKey) in deposit.fiats">
                        <label class="card__item">
                            <input type="radio" name="radio" class="radio">
                            <!-- {{fiat}} -->
                            <img v-if="true" :src="flags[fiatKey]" alt="">
                            <p>{{ String(fiatKey).toUpperCase() }}</p>
                        </label>
                    </li>
                </ul>
                <div class="step__items">
                    <div class="step__item_sum">
                        <div class="step_title title_left">
                            <h2>2 step:</br><span> HOW MUCH TRANSFER </span></h2>
                        </div>
                        <div class="input__wrap">
                            <input 
                                v-model="form.amount.value"
                                class="step__item_input"
                                type="number"
                                placeholder="Enter amount"
                            >
                            <span>127,824 NEXTA</span>
                        </div>
                    </div>
                    <div class="step__item_number">
                        <div class="step_title title_left">
                            <h2>3 step:</br><span> 4 NUMBERS your card</span></h2>
                        </div>
                        <div class="input__wrap card_input">
                            <CardIcon class="card_input_icon"/>
                            <input
                                v-model="form.card_digits.value"
                                class="step__item_input number_card"
                                maxlength="4" 
                                placeholder="✱ ✱ ✱ ✱"
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div class="number__card_wrap">
                <div class="number__card">
                    <p>TRANSFER MONEY</p>
                    <span>{{ card }}</span>
                </div>
                <button @click="copyCardToClipboard">
                    <IconCopy class="copy_icon"/>
                    <span>Click to Copy</span>
                </button>
            </div>
            <button 
                class="payment__btn"
                @click="onClickDeposit"
            >
                Confirm Payment
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import { useNuxtApp } from '#imports'
    import type BlockchainSelector from '@/components/ui/BlockchainSelector/index.vue'

    import type { IResponseBlockchain } from '@/shared/api/types/Deposit.interface'
    import { defineComponent } from '#imports'

    import { useDepositStore } from '@/stores/deposit'
    import { useUserStore } from '@/stores/user'
    import { useCopyText } from '@/composables/useCopyText'

    import VueQrcode from '@chenfengyuan/vue-qrcode'

    import IconDeposit from '@/assets/icons/deposit.svg?component'
    import CardIcon from '@/assets/icons/card_icon.svg?component'
    import IconCopy from '@/assets/icons/icon_copy.svg?component'

    // const { $client } = useNuxtApp()

    export default defineComponent({
        components: {
            VueQrcode,
            IconDeposit,
            IconCopy,
            CardIcon
        },
        setup (_props, { expose }) {
            const compBlockchainSelector = ref<InstanceType<typeof BlockchainSelector>>()
            const deposit = useDepositStore()
            const user = useUserStore()
            const copy = useCopyText()
            const wallet = useWallet()
            const visible = ref(false)
            const tokenId = ref('')
            const selectedToken = ref('')
            const card = ref('1234 5687 1566 1322')
            const networkLoading = ref(false)
            const blockchains = ref<IResponseBlockchain[]>([])
            const form = reactive({
                currency: {
                    value: ''
                },
                amount: {
                    value: '',
                },
                card_digits: {
                    value: '',
                }
            })
            const flags = ref({
                'uah': 'http://s1.iconbird.com/ico/1012/Flag/w64h641351181729Ukraine.png',
                'amd': 'http://s1.iconbird.com/ico/1012/Flag/w64h641351180713Armenia.png',
                'usd': 'http://s1.iconbird.com/ico/1012/Flag/w64h641351181744UnitedStates.png',
                'eur': 'http://s1.iconbird.com/ico/1012/Flag/w64h641351181015EuropeanUnion.png',
                'rub': 'http://s1.iconbird.com/ico/1012/Flag/w64h641351181539Russia.png',
                'try': 'http://s1.iconbird.com/ico/1012/Flag/w64h641351181712Turkey.png'
            })
            onMounted(() => {
                deposit.getFiats()
            })

            wallet.getWalletHistory({page: 1, limit: 10})

            const { $client } = useNuxtApp()

            const onClickFiat = async (currency: keyof typeof deposit.fiats) => {
                card.value = deposit.fiats[currency]
                form.currency.value = currency
            }

            const onClickDeposit = async () => {
                const resp = await $client.deposit.createFiatDeposit({
                    currency: form.currency.value,
                    amount: Number(form.amount.value),
                    card_digits: form.card_digits.value.toString()
                })
                navigateTo('https://app.nexta.casa/transactions', {external: true})
            }

            const copyCardToClipboard = async () => {
                try {
                await navigator.clipboard.writeText(card.value);
                console.log('Card copied successfully!'); // Optional: Log success message
                } catch (error) {
                console.error('Failed to copy card:', error); // Optional: Log error message
                // Handle errors (e.g., display an error message to the user)
                }
            }

            watch(() => visible.value, async (value) => {
                if (value) return undefined

                tokenId.value = ''
                deposit.reset()
                await user.getUser()
            })

            return {
                compBlockchainSelector,
                deposit,
                copy,
                visible,
                tokenId,
                selectedToken,
                onClickFiat,
                networkLoading,
                blockchains,
                card,
                form,
                flags,
                copyCardToClipboard,
                onClickDeposit
            }
        }
    })
</script>

<style lang="css">
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap');

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    padding: 0;
    font-family: "Plus Jakarta Sans", sans-serif;
}

p, h2, ul {
    margin: 0;
    padding: 0;
}

input:active, input:hover, input:focus {
    outline: 0;
    outline-offset: 0;
}

li {
    list-style: none;
}

header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    height: 62px;
    position: relative;
    z-index: 5;
}

/* Send modal */
.send__modal_wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100dvh;
    background-color: #191B1E;
    border-radius: 1.375rem 1.375rem 0 0;
    box-shadow: 0 -1.25rem 2.75rem 0 rgba(54, 56, 83, 0.15);
    pointer-events: all;
    padding: 80px 17px 0 17px;
    transition: 0.3s ease 0s;
}

.close {
    padding: 20px 0;
}

.close span{
    width: 25%;
    height: 0.375rem;
    background-color: #E0E3E7;
    border-radius: 6.25rem;
    margin: 0 auto;
    display: block;
}

.send__modal_title h2 {
  font-size: 19px;
  font-weight: 800px;
  color: white;
  text-align: center;
  padding-bottom: 9px;
}

.send__modal_title p {
    font-weight: 800;
    font-size: 12px;
    color: white;
    text-align: center;
    line-height: 11.34px;
}

.step_title h2 {
    font-weight: 800;
    font-size: 12px;
    letter-spacing: 0.05em;
    color: white;
    margin-top: 35px;
    text-transform: uppercase;
}

.title_center {
    text-align: center;
}

.step_title h2 span {
    color: #F0AB26;
    line-height: 15px;
}


/* Token items */
.card__items {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 9px;
    margin-top: 17px;
}

.card__items li {
    width: 82px;
    height: 100%;
}

  
.card__item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    user-select: none;
    cursor: pointer;
    border-radius: 15px;
    transition: 0.3s ease; 
    width: 100%;
    height: 100%;
    color: white;
    text-align: center;
    padding: 12px 0;
    border: 2px solid #3A3F4A;
}

.card__item img {
    width: 36px;
    height: 36px;
    margin-bottom: 10px;
}

.card__item:hover {
    border: 2px solid #191B1E;
    background: #191B1E;
    color: #F0AB26;
    border: 2px solid #F0AB26;
}

.card__item p {
    text-align: center;
    font-size: 17px;
    font-weight: 600;
}

.card__item .radio {
    display: none; 
}

.check__card {
    display: flex;
    align-items: center; 
}


/* Step items */
.step__items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}

.title_left {
    height: 100%;
}

.input__wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    border-radius: 15px;
    border: 2px solid #3A3F4A;
    padding: 12px 12px 12px 17px;
    width: 171px;
    margin-top: 13px;
}

.card_input {
    flex-direction: row;
    justify-content: space-between;
    height: 61px;
    gap: 15px;
}

.card_input_icon {
    width: 32px;
    height: 24px;
}

.input__wrap span {
    font-size: 11px;
    margin: 0;
    text-align: start;
    width: 100%;
    margin-top: 3px;
    color: #F0AB26;
}

.step__item_input {
    font-size: 16px;
    color: white;
    width: 100%;
}

/* Number card */
.number__card_wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #3A3F4A;
    border-radius: 13px;
    margin-top: 29px;
}

.number__card {
    padding: 12px;
    width: 100%;
    border-bottom: 2px solid #191B1E;
}

.number__card p {
    font-weight: 800;
    font-size: 9px;
    text-align: center;
    letter-spacing: 0.4em;
    color: #F0AB26;
    margin: 12px 0 15px 0;
}

.number__card span {
    font-weight: 700;
    font-size: 14px;
    text-align: center;
    letter-spacing: 0.5em;
    color: #fff;
    width: 100%;
    display: block;
}

.number__card_wrap button {
    background: none;
    border: none;
    margin: 13px 0;
    font-size: 14px;
    font-weight: 600;
    color: #F0AB26;
    width: 100%;
    height: 100%;
}

.number__card_wrap button span {
    position: relative;
}

.payment__btn {
    width: 100%;
    border: none;
    background: #F0AB26;
    box-shadow: 0px -1px 0px rgba(255, 255, 255, 0.25);
    border-radius: 16px;
    padding: 15px 0;
    font-size: 18px;
    color: #191B1E;
    font-weight: bold;
    margin-top: 39px;
}

/* Hide the inner spinner (up arrow) */
::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Hide the Mozilla-specific spinner (if applicable) */
input[type="number"]::-moz-placeholder {
  display: none;
}

.copy_icon {
    margin-bottom: -2px;
    margin-right: 5px;
}

</style>
