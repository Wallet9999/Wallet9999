<template>
    <button @click="handleClick" class="back-button">
        <span>&larr;</span> Назад
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BackButton',
    emits: ['back'],
    setup(_, { emit }) {
        const handleClick = () => {
            emit('back');
        };

        return { handleClick };
    }
});
</script>

<style scoped>
.back-button {
    background-color: #1f2124;
    color: #edeff2;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.back-button:hover {
    background-color: #3a3d42;
}
</style>
