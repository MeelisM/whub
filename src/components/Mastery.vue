<template>
    <div class="container">
        <div v-if="loading" class="spinner-container">
            <ProgressSpinner class="spinner" style="width:6rem;height:6rem" strokeWidth="5" fill="var(--surface-ground)"
                animationDuration=".5s" />
        </div>
        <DataTable v-if="!loading" :value="tableData" class="p-datatable-sm" responsiveLayout="scroll" :paginator="true"
            :rows="10" paginatorTemplate="CurrentPageReport  PrevPageLink PageLinks NextPageLink  RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 20, 50]" sortField="mastery.3" :sortOrder="-1">

            <Column class="field icon">
                <template #body="{ data }">
                    <img :src="data.images.contour_icon" :alt="data.images.contour_icon">
                </template>
            </Column>
            <Column field="short_name" header="Name" :sortable="true">
                <template #body="slotProps">
                    <div :class="checkPremium(slotProps.data)">
                        {{ slotProps.data.short_name }}
                    </div>
                </template>
            </Column>
            <Column field="nation" header="Nation" :sortable="true" class="field nation">
                <template #body="slotProps">
                    <div :class="checkNation(slotProps.data)">

                    </div>
                </template>
            </Column>
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
    name: 'Mastery',
    data() {
        return {
            tableData: null,
            loading: false,
        }
    },
    dataService: null,
    created() {
        this.dataService = new DataService();
    },
    mounted() {
        this.loading = true;
        this.dataService.getMasteryValues().then(data => { this.tableData = data, this.loading = false; });

    },

    methods: {
        checkNation(data) {
            return [
                {
                    'ussr': data.nation == 'ussr'
                }
            ]
        },
        checkPremium(data) {
            return [
                {
                    'premium': data.is_premium == true,

                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    margin: auto;
    width: 80%;


    .spinner-container {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}


@media only screen and (min-width: 600px) {




    .premium {
        color: #FFA726
    }

    .p-datatable .p-datatable-loading-icon {
        color: #FFA726;
    }

    .ussr {
        background-image: url('/ussr.png');
        height: 1.5rem;
        width: 1.5rem;
        background-size: contain;
        display: block;
    }


}


@media only screen and (max-width: 600px) {
    .container {
        width: 100%;
        padding-bottom: 5rem;

    }


}

// .tier,
// .icon,
// .nation {
//     width: 120px;
// }
</style>