<template>
    <div>
        <DataTable :value="tableData" responsiveLayout="scroll">

            <Column field="username" header="Nation" :sortable="true" class="field nation"></Column>


        </DataTable>
    </div>
</template>

<script>
import DataService from "../service/DataService";

export default {
    name: 'Player',
    data() {
        return {
            tableData: null,
        }
    },

    dataService: null,
    created() {
        this.dataService = new DataService();
    },
    mounted() {
        const id = this.$route.params.id
        this.dataService.getPlayerValues(id).then(data => this.tableData = data);
    },


}
</script>

<style lang="scss">
@media only screen and (min-width: 600px) {
    .container {
        margin: auto;
        width: 50%;

    }

    .short_name {
        color: #FFA726;
    }
}


@media only screen and (max-width: 600px) {
    .container {
        width: 100%;

    }
}

// .tier,
// .icon,
// .nation {
//     width: 120px;
// }
</style>