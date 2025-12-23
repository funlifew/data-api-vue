<script setup>
    const props = defineProps({
        users: Array,
        isLoading: false,
    });

    const emit = defineEmits(['edit', 'delete']);
</script>

<template>
    <div
        class="
            space-y-3
            overflow-y-auto
            sm:hidden
        "
    >
        <template v-if="isLoading">
            <div
                v-for="i in 5"
                :key="i"
                class="
                    border
                    rounded-xl
                    p-3
                    shadow-sm
                    animate-pulse
                    flex
                    gap-3
                "
            >
                <div
                    class="
                        w-12 h-12
                        bg-gray-300
                        rounded-full
                        flex-shrink-0
                    "
                ></div>

                <div
                    class="flex-1 space-y-2"
                >
                    <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div class="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div class="h-3 bg-gray-200 rounded w-2/3"></div>
                    <div
                        class="flex gap-2 mt-2"
                    >
                        <div class="flex-1 h-8 bg-gray-300 rounded"></div>
                        <div class="flex-1 h-8 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>
        </template>

        <template v-else>
            <div
                v-for="user in users"
                :key="user.email"
                class="border rounded-xl p-3 shadow-sm flex gap-3"
            >
                <img
                    :src="user.picture.thumbnail"
                    class="w-12 h-12 rounded-full flex-shrink-0"
                />
                <div class="flex-1 min-w-0">
                    <p class="font-semibold truncate">{{ user.name.first }} {{ user.name.last }}</p>
                    <p class="text-sm text-gray-500 truncate">{{ user.email }}</p>
                    <p class="text-sm text-gray-500">{{ user.phone }}</p>

                    <div class="flex gap-2 mt-2">
                        <button
                            class="
                                flex-1
                                border
                                rounded
                                py-1
                                text-blue-600
                            "
                            @click="$emit('edit', user)"
                        >
                            Edit
                        </button>

                        <button
                            class="
                                flex-1
                                border
                                rounded
                                py-1
                                text-red-600
                            "
                            @click="$emit('delete', user)"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>