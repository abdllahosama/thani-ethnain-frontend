<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="$t('manufacturingModels.ManufacturingModels')"
          :description="$t('manufacturingModels.FromHereYouCanControlManufacturingModels')"
        />

        <indexTable
          :searchText="$t('manufacturingModels.SearchForAModel')"
          :emptyTableText="$t('manufacturingModels.ThereAreNoModels')"
          :localData="true"
          :buttonRole="
            $user.admin || $user.role.manufacturing_models_add
          "
          :emptyTableSubText="$t('manufacturingModels.TryAddingItemsToTheTableAndTryAgain')"
          :cloumns="[
            {
              column: 'name',
              title: $t('manufacturingModels.FormName'),
              type: 'mainLink',
              sort: true,
            },
            {
              column: 'day',
              title: $t('manufacturingModels.FormTime'),
              type: 'text',
              sort: true,
              after: $t('manufacturingModels.day')
            },
            {
              column: 'expected_cost',
              title: $t('manufacturingModels.expectedCost'),
              type: 'text',
              sort: true
            },
            {
              column: 'expected_price',
              title: $t('manufacturingModels.expectedPrice'),
              type: 'text',
              sort: true
            },
            {
              column: 'status',
              title: $t('manufacturingModels.Status'),
              type: 'status',
              sort: true,
              values: [
                { title: $t('manufacturingModels.ItIsOpen'), value: 0, color: 'dark' },
                { title: $t('manufacturingModels.InProgress'), value: 1, color: 'primary' },
                { title: $t('manufacturingModels.Very'), value: 2, color: 'success' },
                { title: $t('manufacturingModels.canceled'), value: 3, color: 'danger' },
              ],
            },
            {
              column: 'options',
              title: $t('manufacturingModels.Settings'),
              type: 'options',
              options: [
                { name: 'show' },
                { name: 'edit', role: $user.admin || $user.role.manufacturing_models_edit },
                { name: 'delete', role: $user.admin || $user.role.manufacturing_models_delete },
              ],
            },
          ]"
          :deleteText="{
            attention: $t('allerts.Attention'),
            areYouReallySureToDeleteTheItem:
              $t('allerts.areYouReallySureToDeleteTheItem'),
            close: $t('allerts.close'),
            confirm: $t('allerts.confirm'),
            loading: $t('allerts.loading'),
          }"
        />
      </div>
    </div>
  </div>
</template>
<script>

import indexHeader from "@/elements/index/indexHeader.vue";
import indexTable from "@/elements/index/indexTable.vue";

export default {
  data() {
    return {
      path: "/manufacturingModels",
    };
  },
  components: {
    indexHeader,
    indexTable,
  },
};
</script>
