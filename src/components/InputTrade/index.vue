<template>
    <div class="trade-component">
        <div class="available-balance">
            <span class="label">Available</span>
            <span class="balance">9,500.0564107 USDT</span>
            <button class="add-balance">
                <span>+</span>
            </button>
        </div>
        <div class="trade-inputs">
            <div class="input-group">
                <div class="input-container">
                    <span class="currency">Price</span>
                    <input type="number" id="price" v-model="price" />
                    <span class="currency currency_size">USDT</span>
                </div>
            </div>
            <div class="input-group">
                <div class="input-container">
                    <span class="currency">Amount</span>
                    <input type="number" id="amount" v-model="amount" />
                    <span class="currency currency_size">BTC</span>
                </div>
            </div>
            <div class="input-group">
                <div class="input-container input-container-bg">
                    <span class="currency">Total</span>
                    <input type="number" id="total" :value="total" readonly />
                    <span class="currency currency_size">USDT</span>
                </div>
            </div>
        </div>
        <div class="trade-buttons">
            <button @click="buyBTC(10)" class="btn btn-x10">Buy BTC X10</button>
            <button @click="buyBTC(50)" class="btn btn-x50">Buy BTC X50</button>
            <button @click="buyBTC(100)" class="btn btn-x100">Buy BTC X100</button>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import PlusIcon from '@/assets/icons/plus_small.svg?component';

export default defineComponent({
    name: 'TradeComponent',
    components: {
        PlusIcon
    },
    setup() {
        const price = ref(0);
        const amount = ref(0);
        const total = computed(() => price.value * amount.value);

        const buyBTC = (multiplier: number) => {
            console.log(`Buying BTC with multiplier X${multiplier}`);
        };

        return {
            price,
            amount,
            total,
            buyBTC,
        };
    },
});
</script>

<style lang="scss" scoped>
.trade-component {
    color: #edeff2;
    margin-top: 30px;

    .available-balance {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;

        .label {
            font-weight: bold;
            font-weight: 700;
            font-size: 15px;
        }

        .balance {
            margin-left: auto;
            margin-right: 7px;
            font-weight: 400;
            font-size: 15px;
            color: #50AF95;
        }

        .add-balance {
            color: #292D34;
            cursor: pointer;
            font-size: 13px;
            background-color: #ffc107;
            border-radius: 50%;
            width: 13px;
            height: 13px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 2px;
            transition: 0.3s ease 0s;

            &:hover {
                opacity: 0.6;
            }

            & span {
                margin-top: -2px;
            }
        }
    }

    .trade-inputs {
        .input-group {
            margin-bottom: 10px;

            label {
                display: block;
                margin-bottom: 5px;
            }

            .input-container {
                display: flex;
                align-items: center;
                background-color: #292D34;
                padding: 10px 7px;
                color: #848E9C;
                border-radius: 4px;
                border: 3px solid #292D34;

                &-bg {
                    background-color: #191B1E;
                    border: 3px solid #292D34;
                }

                input {
                    flex: 1;
                    background: none;
                    border: none;
                    color: #edeff2;
                    text-align: end;
                    margin-right: 10px;
                }
            }
        }
    }

    .trade-buttons {
        display: flex;
        justify-content: space-between;
        gap: 15px;

        .btn {
            padding: 11px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            flex: 1;
            font-weight: 700;
            font-size: 12px;
            color: #191B1E;
            margin-top: 10px;
            transition: 0.3s ease 0s;

            &:hover {
                opacity: 0.6;
            }

            &-x10 {
                background-color: #50AF95;
            }

            &-x50 {
                background-color: #50AF95;
            }

            &-x100 {
                background-color: #ffc107;
            }
        }
    }
}

.currency {
    text-align: end;
}

.currency_size {
    width: 40px;
}</style>
  