<script setup>
import { computed } from 'vue';

    const props = defineProps({
        page: Number,
        totalPages: Number,
    });

    const visiblePages = computed(() => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(2, props.page - 2);
        let end = Math.min(props.totalPages - 1, props.page + 2);
        if (props.page <= 3) end = Math.min(6, props.totalPages - 1);
        if(props.page >= props.totalPages - 2) start = Math.max(props.totalPages - 5, 2);
        for(let i = start; i <= end; i++) pages.push(i);
        return pages;
    });
</script>

<template>
    <div>
        <!-- Mobile -->
        <div class="flex justify-between items-center sm:hidden mt-4">
            <button 
                class="px-3 py-1 border rounded"
                @click="$emit('change', page - 1)"
                :disabled="page === 1"
            >Prev</button>
            <span class="text-sm">{{ page }} / {{ totalPages }}</span>
            <button 
                class="px-3 py-1 border rounded"
                @click="$emit('change', page + 1)"
                :disabled="page === totalPages"
            >Next</button>
        </div>

        <!-- Desktop -->
        <div class="hidden sm:flex flex-wrap justify-end items-center gap-2 mt-4">
            <button
                class="px-3 py-1 border rounded"
                :class="page===1 && 'bg-gray-200'"
                @click="$emit('change', 1)"
            >1</button>

            <span v-if="visiblePages[0] > 2">...</span>

            <button
                v-for="p in visiblePages"
                :key="p"
                class="px-3 py-1 border rounded"
                :class="page===p && 'bg-gray-200'"
                @click="$emit('change', p)"
            >
                {{ p }}
            </button>

            <span v-if="visiblePages.at(-1) < totalPages - 1">...</span>
            <button v-if="totalPages > 1" class="px-3 py-1 border rounded" :class="page===totalPages && 'bg-gray-200'" @click="$emit('change', totalPages)">{{ totalPages }}</button>
        </div>
    </div>
</template>