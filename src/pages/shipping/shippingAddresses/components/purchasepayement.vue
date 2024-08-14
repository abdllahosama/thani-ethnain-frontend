<template>
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.customersPurchasePayments.purchasePayments')}}</h4>
        <router-link
          class="btn btn-sm btn-primary"
          v-if="
            $parent.item.stat == 1 &&
            $site.purchasePayments_allow &&
            ($user.admin ||
              $user.role.purchase_payments_add)
          "
          title="$t('components.customersPurchasePayments.AddABatch')"
          :to="'/purchasePayments/create?customer_id=' + $route.params.id"
        >
          <i class="fas fa-plus"></i> {{$t('components.customersPurchasePayments.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$t('components.customersPurchasePayments.FindABatch')"
        :withoutCard="true"
        :emptyTableText="
          $parent.$t('components.customersPurchasePayments.thereAreNoPurchasePayments')
        "
        :filter="{customer_id: $route.params.id}"
        :emptyTableSubText="
          $parent.$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :cloumns="[
          { column: 'code', title: $t('components.customersPurchasePayments.Payment'), type: 'mainLink', sort: true },
          {
            column: 'client_type',
            title: $t('components.customersPurchasePayments.supplierName'),
            type: 'clintLink',
            sort: true,
          },
          {
            column: 'date',
            title: $parent.$t('components.customersPurchasePayments.paymentDate'),
            type: 'text',
            sort: true,
          },
          {
            column: 'bill_id',
            title: $parent.$t('components.customersPurchasePayments.bill'),
            type: 'linkInvoice',
            to: 'bill',
            sort: true,
            link: true,
          },
          {
            column: 'description',
            title: $parent.$t('components.customersPurchasePayments.thatsAbout'),
            type: 'text',
            sort: true,
          },
          {
            column: 'cost',
            title: $parent.$t('components.customersPurchasePayments.amount'),
            type: 'text',
            sort: true,
          },
          {
            column: 'options',
            title: $parent.$t('components.customersPurchasePayments.settings'),
            type: 'options',
            options: [
              { name: 'show' },
              {
                name: 'edit',
                role:
                  $user.admin ||
                  $user.role.purchase_payments_edit,
              },
              { name: 'printPurchasePayment', role: true },
              { name: 'download', role: true },
              {
                name: 'delete',
                role:
                  $user.admin ||
                  $user.role.purchase_payments_delete,
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
import axios from "axios";

import indexTable from "@/elements/index/indexTable.vue";
export default {
  data() {
    return {
      path: "/purchasePayments",
    };
  },
  components: {
    indexTable,
  },
};
</script>
