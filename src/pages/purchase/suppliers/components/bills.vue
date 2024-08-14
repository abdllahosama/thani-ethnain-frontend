<template>
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.suppliers.purchaseInvoices')}}</h4>
        <router-link
          class="btn btn-sm btn-primary"
          :to="'/bills/create?supplier_id=' + $route.params.id"
          v-if="
            $parent.item.stat == 1 &&
            $site.bills_allow &&
            ($user.admin || $user.role.bills_add)
          "
        >
          <i class="fas fa-plus"></i> {{$t('components.suppliers.addition')}}
        </router-link>
      </div>

      <indexTable
        :searchText="$t('bills.searchForABill')"
        :withoutCard="true"
        :emptyTableText="$t('bills.thereAreNoBills')"
        :filter="{supplier_id: $route.params.id}"
        :emptyTableSubText="
          $t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :statusSearch="true"
        :statusValues="[
          { title: $t('quotations.situation'), value: '' },
          { title: $t('quotations.all'), value: '' },
          { title: $t('bills.open'), value: 0 },
          { title: $t('bills.driven'), value: 1 },
          { title: $t('bills.canceled'), value: 2 },
        ]"
        :cloumns="[
          {
            column: 'code',
            title: $t('bills.bill'),
            type: 'mainLink',
            sort: true,
          },
          {
            column: 'date',
            title: $t('bills.theDateOfTheInvoice'),
            type: 'text',
            sort: true,
          },
          {
            column: 'client_type',
            title: $t('bills.supplierName'),
            type: 'clintLink',
            sort: true,
          },
          {
            column: 'total',
            title: $t('bills.cost'),
            type: 'text',
            sort: true,
          },
          {
            column: 'rest',
            title: $t('bills.balance'),
            type: 'text',
            sort: true,
          },
          {
            column: 'status',
            title: $t('bills.situation'),
            type: 'status',
            sort: true,
            values: [
              { title: $t('bills.open'), value: 0, color: 'dark' },
              {
                title: $t('bills.driven'),
                value: 1,
                color: 'success',
              },
              {
                title: $t('bills.canceled'),
                value: 2,
                color: 'danger',
              },
            ],
          },
          {
            column: 'options',
            title: $t('bills.settings'),
            type: 'options',
            options: [
              { name: 'show' },
              {
                name: 'edit',
                role:
                  $user.admin ||
                  $user.role.bills_edit,
              },
              { name: 'outLink', role: true },
              { name: 'printBill', role: true },
              { name: 'download', role: true },
              {
                name: 'delete',
                role:
                  $user.admin ||
                  $user.role.bills_delete,
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
      path: "/bills",
    };
  },
  components: {
    indexTable,
  },
};
</script>
