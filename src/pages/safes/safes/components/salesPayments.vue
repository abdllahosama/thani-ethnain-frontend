<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.safes.salePayments')}}</h4>
        <router-link
          :to="'/salesPayments/create?safe_id=' + $route.params.id"
          class="btn btn-sm btn-primary"
          v-if="
            $parent.item.stat == 1 &&
            $site.salesPayments_allow &&
            ($user.admin ||
              $user.role.sales_payments_add)
          "
        >
          <i class="fas fa-plus"></i> {{$t('components.safes.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$t('components.safes.searchBatch')"
        :withoutCard="true"
        :emptyTableText="$t('salesPayments.thereAreNoSalesPayments')"
        :filter="{safe_id: $route.params.id}"
        :emptyTableSubText="
          $t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :cloumns="[
          { column: 'code', title: $t('components.safes.Paid'), type: 'mainLink', sort: true },
          { column: 'client_type',    title: $t('purchaseCheques.supplierName') ,type: 'clintLink', sort: true},
          {
            column: 'date',
            title: $t('salesPayments.paymentDate'),
            type: 'text',
            sort: true,
          },
          {
            column: 'invoice_id',
            title: $t('salesPayments.invoice'),
            type: 'linkInvoice',
            to: 'invoice',
            sort: true,
            link: true,
          },
          {
            column: 'description',
            title: $t('salesPayments.thatsAbout'),
            type: 'text',
            sort: true,
          },
          {
            column: 'cost',
            title: $t('salesPayments.amount'),
            type: 'text',
            sort: true
          },
          {
            column: 'options',
            title: $t('salesPayments.settings'),
            type: 'options',
            options: [
              { name: 'show' },
              {
                name: 'edit',
                role:
                  $user.admin ||
                  $user.role.sales_payments_edit,
              },
              { name: 'printSalesPayment', role: true },
              { name: 'download', role: true },
              {
                name: 'delete',
                role:
                  $user.admin ||
                  $user.role.sales_payments_delete,
              },
            ],
          },
        ]"
        :deleteText="{
          attention: $t('allerts.Attention'),
          areYouReallySureToDeleteTheItem:
            $t('allerts.areYouReallySureToDeleteTheItem'),
          close: $t('allerts.close'),
          loading: $t('allerts.loading'),
          confirm: $t('allerts.confirm'),
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
      path: "/salesPayments",
    };
  },
  components: {
    indexTable,
  },
};
</script>
