<template>
    <div class="how-it-works">
      <h2 class="how-it-works_title">How it Works?</h2>
        <nuxt-link
            to="/"
            class="how-it-works_link"
        >
            Support
            <ChatIcon class="how-it-works_icon" />
        </nuxt-link>
    </div>
  </template>
  
  <script>
        import ChatIcon from '@/assets/icons/chat.svg?component'

        export default {
            name: 'HowItWorks',
            components: {
                ChatIcon
            }
        }
  </script>
  
  <style lang="scss" scoped>
    .how-it-works {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &_title {
            font-weight: 800;
            font-size: 17px;
            letter-spacing: -0.03em;
            color: #191B1E;
        }

        &_link {
            background: #FFFFFF;
            box-shadow: 0px 1px 5px rgba(132, 141, 161, 0.3), 0px -1px 0px rgba(255, 255, 255, 0.25);
            border-radius: 11px;
            font-style: normal;
            font-weight: 700;
            font-size: 15px;
            color: #363853;
            padding: 9px 10px;
            transition: 0.3s ease 0s;

            &:hover {
                opacity: 0.6;
            }
        }

        &_icon {
            margin-left: 7px;
        }
    }
  </style>
  