<script setup>
import { watch } from 'vue';

    const props = defineProps({
        modelValue: String,
    });

    const emits = defineEmits(['update:modelValue']);

    watch(() => props.modelValue, val => emits('update:modelValue', val));
</script>

<template>
    <div class="
        relative
        w-full
        sm:w-64
    ">
        <i class="
            bx bxs-search
            absolute
            left-3 top-1/2
            -translate-y-1/2
            text-gray-500
        "></i>

        <input
            v-model="modelValue"
            type="text"
            placeholder="Search users..."
            class="
                pl-10 pr-4 py-2
                border
                rounded-lg
                focus:outline-none
                focus:ring
                w-full
            "
            
        />
    </div>
</template>