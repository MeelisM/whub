<template>
    <div class="container">
        <div class="search">
            <InputText v-model="searchInput" class="input" placeholder="Enter name" />
            <router-link :to="'/player/' + searchInput"><Button icon="pi pi-search" class="p-button-secondary" />
            </router-link>
        </div>
        {{ searchInput }}
    </div>
</template>


<script>

export default {
    name: 'Search',
    data() {
        return {
            searchInput: ""
        }
    },
    methods: {
        //
    }
}

</script>

<style lang="scss" scoped>
.container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .input {
        width: 25rem;
    }
}
</style>