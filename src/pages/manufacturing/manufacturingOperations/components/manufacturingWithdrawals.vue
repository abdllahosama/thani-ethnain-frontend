<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('manufacturingOperations.Withdrawals')}}</h4>
        <router-link
          :to="'/manufacturingWithdrawals/create?manufacturing_operation_id' + $route.params.id"
          class="btn btn-sm btn-primary"
        >
          <i class="fas fa-plus"></i> {{$t('manufacturingOperations.addition')}}
        </router-link>
      </div>
      <indexTable :searchText="$t('manufacturingWithdrawals.SearchForAnOperation')"
        :emptyTableText="$t('manufacturingWithdrawals.ThereAreNoWithdrawalsWithManufacturingProcesses')"
        :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
        :filter="{manufacturing_operation_id: $route.params.id}"
        :withoutCard="true"
        :cloumns="[
          {column: 'code',    title: $t('manufacturingWithdrawals.operation') ,type: 'mainLink' , sort: true },
          {column: 'manufacturing_operation_id',    title: $t('manufacturingWithdrawals.TheNameOfTheManufacturingProcess') ,type: 'linkInvoice', to:'manufacturingOperation', sort: true, link: true},
          {column: 'store_id',    title: $t('manufacturingWithdrawals.storeName'), type: 'link', to:'store', sort: true, link: true},
          {column: 'date',    title: $t('manufacturingWithdrawals.theDateOfTheOperation') ,type: 'text' , sort: true },
          {column: 'price',    title: $t('manufacturingWithdrawals.price') ,type: 'text' , sort: true },
          {column: 'description',    title: $t('manufacturingWithdrawals.thatAbout') ,type: 'text' , sort: true },
          {column: 'options', title: $t('manufacturingWithdrawals.settings'), type: 'options', options: [
              {name: 'show'},
              {name: 'edit',   role: $user.admin || $user.role.projects_withdrawals_edit},
              {name: 'printprojectsWithdrawal',   role: true},
              {name: 'delete', role: $user.admin || $user.role.projects_withdrawals_delete},
          ]}
        ]"
        :deleteText="{
          attention: $t('allerts.Attention'),
          areYouReallySureToDeleteTheItem: $t('allerts.areYouReallySureToDeleteTheItem'),
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
      path: "/manufacturingWithdrawals"
    };
  },
  components: {
    indexTable,
  },
};
</script>
