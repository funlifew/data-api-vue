<script setup>
    const props = defineProps({
        users: Array,
        isLoading: Boolean,
    });
    
    const emit = defineEmits(['edit', 'delete']);
</script>

<template>
    <div
        class="
            hidden
            sm:block
            overflow-y-auto
        "
    >
        <table
            class="
                w-full min-w-[600px]
                text-left
                border-collapse
            "
        >
            <thead
                class="sticky top-0 bg-white border-b"
            >
                <tr class="text-gray-600">
                    <th class="py-3">User</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th class="text-right">Actions</th>
                </tr>
            </thead>

            <tbody v-if="isLoading">
                <tr
                    v-for="i in 10"
                    :key="i"
                    class="animate-pulse border-b"
                >
                    <td class="py-4 px-2 flex items-center gap-3">
                        <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div>
                            <div class="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                            <div class="h-3 w-20 bg-gray-200 rounded"></div>
                        </div>
                    </td>
                    <td><div class="h-4 w-32 bg-gray-300 rounded"></div></td>
                    <td><div class="h-4 w-24 bg-gray-300 rounded"></div></td>
                    <td class="text-right">
                        <div class="flex justify-end gap-2">
                            <div class="w-8 h-8 bg-gray-300 rounded"></div>
                            <div class="w-8 h-8 bg-gray-300 rounded"></div>
                        </div>
                    </td>
                </tr>
            </tbody>

            <tbody v-else>
                <tr
                    v-for="user in users"
                    :key="user.email"
                    class="border-b hover:bg-gray-50"
                >
                    <td class="py-4 px-2 flex items-center gap-3">
                        <img :src="user.picture.thumbnail" class="w-10 h-10 rounded-full">
                        <p class="font-medium">{{ user.name.first }} {{ user.name.last }}</p>
                    </td>
                    <td class="px-2 text-sm">{{ user.email }}</td>
                    <td class="px-2 text-sm">{{ user.phone }}</td>
                    <td class="text-right">
                        <button
                            class="text-blue-500 hover:bg-blue-50 rounded"
                            @click="$emit('edit', user)"
                        >
                            Edit
                        </button>

                        <button
                            class="text-red-500 hover:bg-red-50 rounded"
                            @click="$emit('delete', user)"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>