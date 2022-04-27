<template>
    <div>
        <DataTable :value="expected" class="p-datatable-sm" responsiveLayout="scroll" :paginator="true" :rows="10"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 25]" sortField="expDamage" :sortOrder="-1">
            <Column field="short_name" header="Name" :sortable="true">

            </Column>
            <Column header="Image" :sortable="true" class="field icon">
                <template #body="{ data }">
                    <img :src="data.images.contour_icon" :alt="data.images.contour_icon" />
                </template>
            </Column>
            <Column field="nation" header="Nation" :sortable="true" class="field nation"></Column>

            <Column field="tier" header="Tier" :sortable="true" class="field tier"></Column>
            <Column field="expDamage" header="eDamage" :sortable="true"></Column>
            <Column field="expFrag" header="eFrag" :sortable="true"></Column>
            <Column field="expSpot" header="eSpot" :sortable="true"></Column>
            <Column field="expDef" header="eDef" :sortable="true"></Column>
            <Column field="expWinRate" header="eWinrate" :sortable="true"></Column>
        </DataTable>
    </div>
</template>

<script>
import ExpectedService from "../service/ExpectedService";

export default {
    name: 'Expected',
    data() {
        return {
            expected: null
        }
    },
    expectedService: null,
    created() {
        this.expectedService = new ExpectedService();
    },
    mounted() {
        this.expectedService.getExpectedValues().then(data => this.expected = data);
    }
}
</script>

<style lang="scss">
.tier,
.icon,
.nation {
    width: 120px;
}
</style>