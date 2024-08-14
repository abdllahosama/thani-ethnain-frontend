<template>
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.safes.purchasePayments')}}</h4>
        <router-link
          class="btn btn-sm btn-primary"
          v-if="
            $parent.item.stat == 1 &&
            $site.purchasePayments_allow &&
            ($user.admin ||
              $user.role.purchase_payments_add)
          "
          title="$t('components.safes.addBatch')"
          :to="'/purchasePayments/create?safe_id=' + $route.params.id"
        >
          <i class="fas fa-plus"></i> {{$t('components.safes.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$t('components.safes.searchForBatch')"
        :withoutCard="true"
        :emptyTableText="
          $t('purchasePayments.thereAreNoPurchasePayments')
        "
        :filter="{safe_id: $route.params.id}"
        :emptyTableSubText="
          $t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :cloumns="[
          { column: 'code', title: $t('components.safes.Paid'), type: 'mainLink', sort: true },
           {column: 'client_type',    title: $t('purchaseCheques.supplierName') ,type: 'clintLink', sort: true},
          {
            column: 'date',
            title: $t('purchasePayments.paymentDate'),
            type: 'text',
            sort: true,
          },
          {
            column: 'bill_id',
            title: $t('purchasePayments.bill'),
            type: 'linkInvoice',
            to: 'bill',
            sort: true,
            link: true,
          },
          {
            column: 'description',
            title: $t('purchasePayments.thatsAbout'),
            type: 'text',
            sort: true,
          },
          {
            column: 'cost',
            title: $t('purchasePayments.amount'),
            type: 'text',
            sort: true
          },
          {
            column: 'options',
            title: $t('purchasePayments.settings'),
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
      path: "/purchasePayments",
    };
  },
  components: {
    indexTable,
  },
};
</script>
