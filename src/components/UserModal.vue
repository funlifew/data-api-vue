<script setup>
    const props = defineProps({
        show: Boolean,
        modalType: String,
        user: Object,
    });

    const emit = defineEmits(['close', 'confirm']);
</script>

<template>
    <div
        class="fixed inset-0 bg-black/50 flex items-center justify-center"
        v-if="show"
    >
        <div
            class="
                bg-white
                rounded-xl
                w-full max-w-md max-h-[90vh]
                p-6 mx-2
                overflow-y-auto
            "
        >
            <h2 class="text-lg font-bold mb-4">{{ modalType === 'edit' ? 'Edit User' : "Delete User" }}</h2>

            <div
                v-if="modalType === 'edit'"
                class="space-y-3"
            >
                <input v-model="user.name.first" type="text" class="w-full border p-2 rounded">
                <input v-model="user.name.last" type="text" class="w-full border p-2 rounded">
                <input v-model="user.email" type="text" class="w-full border p-2 rounded">
            </div>
            <p v-else class="text-gray-600">Are you sure you want to delete this user?</p>

            <div class="flex justify-end gap-2 mt-6">
                <button
                    class="px-4 py-2 border rounded"
                    @click="$emit('close')"
                >
                    Cancel
                </button>
                <button
                    class="px-4 py-2 rounded text-white"
                    :class="modalType === 'edit' ? 'bg-blue-600' : 'bg-red-600'"
                    @click="$emit('confirm')"
                >
                    Confirm
                </button>
            </div>
        </div>
    </div>
</template>