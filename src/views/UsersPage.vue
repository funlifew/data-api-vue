<template>
    <div class="min-h-screen flex items-start md:items-center justify-center px-2 sm:px-4 py-4">
        <div class="w-full max-w-[1000px] max-h-[600px] md:h-[600px] bg-white rounded-xl shadow p-4 md:p-6 flex flex-col">

            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                <h1 class="text-2xl font-bold">Users</h1>
                <SearchInput v-model="search"/>
            </div>

            <!-- Error message -->
            <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded mb-3">
                {{ error }}
            </div>

            <!-- Mobile Cards -->
            <UserCardList :users="filteredUsers" :isLoading="isLoading" @edit="openEdit" @delete="openDelete"/>

            <!-- Desktop Table -->
            <UserTable :users="filteredUsers" :isLoading="isLoading" @edit="openEdit" @delete="openDelete"/>

            <!-- Pagination -->
            <PaginationButton :page="page" :totalPages="totalPages" @change="changePage"/>

            <!-- Modal -->
            <UserModal v-if="showModal" :show="showModal" :modalType="modalType" :user="selectedUser" @close="closeModal" @confirm="confirmAction"/>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useUsers } from '@/composables/useUsers'
    import UserTable from '@/components/UserTable.vue'
    import UserCardList from '@/components/UserCardList.vue'
    import UserModal from '@/components/UserModal.vue'
    import PaginationButton from '@/components/PaginationButton.vue'
    import SearchInput from '@/components/SearchInput.vue'

    const {
        users,
        isLoading,
        search,
        page,
        totalPages,
        filteredUsers,
        changePage
    } = useUsers()

    const showModal = ref(false)
    const modalType = ref('edit')
    const selectedUser = ref(null)

    const openEdit = user => {
        modalType.value = 'edit'
        selectedUser.value = JSON.parse(JSON.stringify(user))
        showModal.value = true
    }

    const openDelete = user => {
        modalType.value = 'delete'
        selectedUser.value = user
        showModal.value = true
    }

    const confirmAction = () => {
        if (modalType.value === 'delete') {
            users.value = users.value.filter(u => u !== selectedUser.value)
        } else {
            const index = users.value.findIndex(u => u.email === selectedUser.value.email)
            users.value[index] = selectedUser.value
        }
        closeModal()
    }

    const closeModal = () => showModal.value = false;
</script>
