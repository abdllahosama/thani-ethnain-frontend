<template>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-12">
          <indexHeader
            :title="$t('purchaseDiscounts.purchaseDiscounts')"
            :description="$t('purchaseDiscounts.fromHereYouCanControlThepurchaseDiscounts')"
          />
          <indexTable
            :searchText="$t('purchaseDiscounts.FindAPurchaseDiscount')"
            :emptyTableText="$t('purchaseDiscounts.thereAreNopurchaseDiscounts')"
            :buttonRole="$user.role.purchase_payments_add"
            :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
            :statusSearch="true"
            :statusValues="[
              { title: $t('orders.situation'), value: ''},
              { title: $t('orders.all'), value: ''},
              { title: $t('invoices.draft'), value: 0 },
              { title: $t('invoices.approved'), value: 1 },
            ]"
            :cloumns="[
              { column: 'code', title: $t('purchaseDiscounts.Discount'), type: 'mainLink', sort: true },
              { column: 'client_type', title: $t('purchaseDiscounts.supplierName'),type: 'clintLink',sort: true, },
              {
                column: 'date',
                title: $t('purchaseDiscounts.date'),
                type: 'text',
                sort: true,
              },
              {
                column: 'description',
                title: $t('purchaseDiscounts.thatsAbout'),
                type: 'text',
                sort: true,
              },
              {
                column: 'cost',
                title: $t('purchaseDiscounts.amount'),
                type: 'text',
                sort: true,
              },
              {column: 'status', title: $t('bills.situation') ,type: 'status' , sort: true ,  values: [
                  {title: $t('invoices.draft'), value: 0, color: 'dark'},
                  {title: $t('invoices.approved'), value: 1, color: 'success'},
                ]
              },
              {
                column: 'options',
                title: $t('purchaseDiscounts.settings'),
                type: 'options',
                options: [
                  { name: 'show' },
                  {name: 'printPurchaseDiscount',   role: true},
                  {
                    name: 'edit',
                    role:
                      $user.admin ||
                      $user.role.purchase_payments_edit,
                  },
                  {name: 'file'},
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
    </div>
  </template>
  <script>
  
  import indexHeader from "@/elements/index/indexHeader.vue";
  import indexTable from "@/elements/index/indexTable.vue";
  
  export default {
    data() {
      return {
        path: "/purchaseDiscounts",
      };
    },
    components: {
      indexHeader,
      indexTable,
    },
  };
  </script>