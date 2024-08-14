<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('manufacturingOperations.Deposits')}}</h4>
        <router-link
          :to="'/manufacturingDeposits/create?manufacturing_operation_id=' + $route.params.id"
          class="btn btn-sm btn-primary"
        >
          <i class="fas fa-plus"></i> {{$t('manufacturingOperations.addition')}}
        </router-link>
      </div>

      <indexTable
          :searchText="$t('manufacturingDeposits.SearchForAnOperation')"
          :emptyTableText="$t('manufacturingDeposits.ThereAreNoWithdrawalsWithManufacturingProcesses')"
          :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
          :filter="{manufacturing_operation_id: $route.params.id}"
          :withoutCard="true"
          :cloumns="[
            {
              column: 'code',
              title: $t('manufacturingDeposits.operation'),
              type: 'mainLink',
              sort: true,
            },
            {column: 'manufacturing_operation_id',    title: $t('manufacturingDeposits.TheCodeOfTheOperation') ,type: 'linkInvoice', to:'manufacturingOperation', sort: true, link: true},
            {
              column: 'store_id',
              title: $t('manufacturingDeposits.TheNameOfTheStore'),
              type: 'link',
              to: 'store',
              sort: true,
              link: true,
            },
            {
              column: 'date',
              title: $t('manufacturingDeposits.theDateOfTheOperation'),
              type: 'text',
              sort: true,
            },
            {
              column: 'cost',
              title: $t('manufacturingDeposits.cost'),
              type: 'text',
              sort: true
            },
            {
              column: 'description',
              title: $t('manufacturingDeposits.thatAbout'),
              type: 'text',
              sort: true,
            },
            {
              column: 'options',
              title: $t('manufacturingDeposits.settings'),
              type: 'options',
              options: [
                { name: 'show' },
                {
                  name: 'edit',
                  role:
                    $user.admin ||
                    $user.role.manufacturing_deposits_edit,
                },
                { name: 'printmanufacturingDeposit', role: true },
                {
                  name: 'delete',
                  role:
                    $user.admin ||
                    $user.role.manufacturing_deposits_delete,
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
</template>
<script>
import indexTable from "@/elements/index/indexTable.vue";

export default {
  data() {
    return {
      path: "/manufacturingDeposits",
    };
  },
  components: {
    indexTable,
  },
};
</script>
