<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.customersSalesPayments.salesPayments')}}</h4>
        <router-link
          :to="'/salesPayments/create?customer_id=' + $route.params.id"
          class="btn btn-sm btn-primary"
          v-if="
            $parent.item.stat == 1 &&
            $site.salesPayments_allow &&
            ($user.admin ||
              $user.role.sales_payments_add)
          "
        >
          <i class="fas fa-plus"></i> {{$t('components.customersSalesPayments.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$t('components.customersSalesPayments.FindABatch')"
        :withoutCard="true"
        :emptyTableText="
          $parent.$t('components.customersSalesPayments.thereAreNoSalesPayments')
        "
        :filter="{customer_id: $route.params.id}"
        :emptyTableSubText="
          $parent.$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :cloumns="[
          { column: 'code', title: $t('components.customersSalesPayments.Payment'), type: 'mainLink', sort: true },
          {
            column: 'client_type',
            title: $t('components.customersSalesPayments.customerName'),
            type: 'clintLink',
            sort: true,
          },
          {
            column: 'date',
            title: $parent.$t('components.customersSalesPayments.paymentDate'),
            type: 'text',
            sort: true,
          },
          {
            column: 'invoice_id',
            title: $parent.$t('components.customersSalesPayments.invoice'),
            type: 'linkInvoice',
            to: 'invoice',
            sort: true,
            link: true,
          },
          {
            column: 'description',
            title: $parent.$t('components.customersSalesPayments.thatsAbout'),
            type: 'text',
            sort: true,
          },
          {
            column: 'cost',
            title: $parent.$t('components.customersSalesPayments.amount'),
            type: 'text',
            sort: true,
          },
          {
            column: 'options',
            title: $parent.$t('components.customersSalesPayments.settings'),
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
          attention: $parent.$t('allerts.Attention'),
          areYouReallySureToDeleteTheItem:
            $parent.$t('allerts.areYouReallySureToDeleteTheItem'),
          close: $parent.$t('allerts.close'),
          confirm: $parent.$t('allerts.confirm'),
          loading: $parent.$t('allerts.loading'),
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
