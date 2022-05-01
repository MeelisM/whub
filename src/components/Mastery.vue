<template>
    <div class="container">
        <DataTable :value="tableData" class="p-datatable-sm" responsiveLayout="scroll" :paginator="true" :rows="20"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]" sortField="mastery.3" :sortOrder="-1">
            <Column field="short_name" header="Name" :sortable="true">
                <template #body="slotProps">
                    <div :class="checkIfPremium(slotProps.data)">
                        {{ slotProps.data.short_name }}
                    </div>
                </template>
            </Column>
            <Column header="Image" class="field icon">
                <template #body="{ data }">
                    <img :src="data.images.contour_icon" :alt="data.images.contour_icon">
                </template>
            </Column>
            <Column field="nation" header="Nation" :sortable="true" class="field nation"></Column>

            <Column field="tier" header="Tier" :sortable="true" class="field tier"></Column>
            <Column field="mastery.0" header="3rd class" :sortable="true"></Column>
            <Column field="mastery.1" header="2nd class" :sortable="true"></Column>
            <Column field="mastery.2" header="1st class" :sortable="true"></Column>
            <Column field="mastery.3" header="Ace Tanker" :sortable="true"></Column>
        </DataTable>
    </div>
</template>

<script>
import DataService from "../service/DataService";

export default {
    name: 'mastery',
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
        this.dataService.getMasteryValues().then(data => this.tableData = data);
    },

    methods: {
        checkIfPremium(data) {
            return [
                {
                    'short_name': data.is_premium == true

                }
            ]
        }
    }
}
</script>

<style lang="scss">
@media only screen and (min-width: 600px) {
    .container {
        margin: auto;
        width: 50%;

    }

    .short_name {
        color: #FFA726
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