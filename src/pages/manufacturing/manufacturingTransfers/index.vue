<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="$t('manufacturingTransfers.ManufacturingTransfers')"
          :description="$t('manufacturingTransfers.FromHereYouCanControlManufacturingTransfers')"
        />
        <indexTable
          :searchText="$t('manufacturingTransfers.SearchForAnOperation')"
          :emptyTableText="$t('manufacturingTransfers.ThereAreNoTransfersWithManufacturingProcesses')"
          :emptyTableSubText="
            $t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
          "
          :buttonRole="$user.role.projects_withdrawals_add"
          :cloumns="[
            { column: 'code', title: $t('manufacturingTransfers.operation'), type: 'mainLink', sort: true },
            {
              column: 'project_id',
              title: $t('manufacturingTransfers.TheNameOfTheManufacturingProcess'),
              type: 'link',
              to: 'project',
              sort: true,
              link: true,
            },
            {
              column: 'from_manufacture_id',
              title: $t('manufacturingTransfers.FromAProject'),
              type: 'link',
              to: 'manufacture',
              sort: true,
              link: true,
            },
             {
              column: 'to_manufacture_id',
              title: $t('manufacturingTransfers.ToAProject'),
              type: 'link',
              to: 'manufacture',
              sort: true,
              link: true,
            },
            {
              column: 'date',
              title: $t('manufacturingTransfers.theDateOfTheOperation'),
              type: 'text',
              sort: true,
            },
            {
              column: 'total',
              title: $t('manufacturingTransfers.Total'),
              type: 'text',
              sort: true,
              after: $option.currency,
            },
            {
              column: 'description',
              title: $t('manufacturingTransfers.thatAbout'),
              type: 'text',
              sort: true,
            },
            {
              column: 'options',
              title: $t('manufacturingTransfers.settings'),
              type: 'options',
              options: [
                { name: 'show' },
                {
                  name: 'edit',
                  role:
                    $user.admin ||
                    $user.role.projects_withdrawals_edit,
                },
                { name: 'printprojectsWithdrawal', role: true },
                {
                  name: 'delete',
                  role:
                    $user.admin ||
                    $user.role.projects_withdrawals_delete,
                },
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
      path: "/manufacturingTransfers"
    };
  },
  components: {
    indexHeader,
    indexTable,
  },
};
</script>
