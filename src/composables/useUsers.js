import { ref, computed, onMounted } from 'vue'

export function useUsers(perPage = 20, totalUsersCount = 1000) {
    // Basic Datas
    const users = ref([]);
    const isLoading = ref(false);
    // Current Page
    const page = ref(1);
    const totalUsers = ref(totalUsersCount);
    const search = ref('');
    const error = ref(null);

    const totalPages = computed(() => Math.ceil(totalUsers.value / perPage));

    // Fetching users from randomuser.me
    const fetchUsers = async() => {
        isLoading.value = true;
        error.value = null;
        try{
            const res = await fetch(
                `https://randomuser.me/api/?page=${page.value}&results=${perPage}&inc=name,email,phone,picutre`
            );

            if (!res.ok) throw new Error(`HTTP Error! status: ${res.status}`);
            const data = await res.json();
            users.value = data.results;
        } catch(err){
            console.error(err);
            error.value = err.message || "Something went wrong!";
        } finally {
            isLoading.value = false;
        }
    }

    // Filter users for searching
    const filteredUsers = computed(() => 
        users.value.filter(u => 
            `${u.name.first} ${u.name.last} ${u.email}`.toLowerCase().includes(search.value.toLowerCase())
        )
    );

    const changePage = (p) => {
        // Guard Clause
        if (p < 1 || p > totalPages.value) return;
        page.value = p;
        fetchUsers();
    }

    onMounted(fetchUsers);


    return {
        users,
        isLoading,
        search,
        page,
        totalPages,
        filteredUsers,
        changePage,
        fetchUsers,
        error
    }
}