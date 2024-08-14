<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="$t('bills.bills')"
          :description="$t('bills.fromHereYouCanControlPurchaseInvoices')"
        />
        <indexTable
          :searchText="$t('bills.searchForABill')"
          :emptyTableText="$t('bills.thereAreNoBills')"
          :emptyTableSubText="
            $t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
          "
          :buttonRole="$user.role.bills_add"
          :statusSearch="true"
          :statusValues="[
            { title: $t('bills.situation'), value: '' },
            { title: $t('bills.all'), value: '' },
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
                { title: $t('bills.driven'), value: 1, color: 'success' },
                { title: $t('bills.canceled'), value: 2, color: 'danger' },
              ],
            },
            {
              column: 'options',
              title: $t('bills.settings'),
              type: 'options',
              options: [
                { name: 'show' },
                { name: 'edit', role: $user.admin || $user.role.bills_edit },
                { name: 'file' },
                {
                  name: 'invoiceLink',
                  role: $user.admin || $user.role.purchase_returns_add,
                  title: $t('bills.ReturnBuying'),
                  icon: 'exchange',
                  link: '/purchaseReturns/create?bill_id=',
                },
                {
                  name: 'invoiceLink',
                  role: true,
                  title: $t('bills.BarcodePrint'),
                  icon: 'barcode-alt',
                  link: '/productsBarcode/bill/',
                },
                { name: 'outLink', role: true },
                { name: 'printBill', role: true },
                { name: 'download', role: true },
                {
                  name: 'delete',
                  role: $user.admin || $user.role.bills_delete,
                },
              ],
            },
          ]"
          :deleteText="{
            attention: $t('allerts.Attention'),
            areYouReallySureToDeleteTheItem: $t(
              'allerts.areYouReallySureToDeleteTheItem'
            ),
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
      path: "/bills",
    };
  },
  components: {
    indexHeader,
    indexTable,
  },
};
</script>
