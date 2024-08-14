<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="$t('invoices.invoices')"
          :description="$t('invoices.fromHereYouCanControlSalesInvoices')"
        />
        <indexTable
          :searchText="$t('invoices.searchForAnInvoice')"
          :emptyTableText="$t('invoices.thereAreNoBills')"
          :emptyTableSubText="
            $t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
          "
          :buttonRole="$user.role.invoices_add"
          :statusSearch="true"
          :statusValues="[
            { title: $t('quotations.situation'), value: '' },
            { title: $t('quotations.all'), value: '' },
            { title: $t('invoices.draft'), value: 0 },
            { title: $t('invoices.sent'), value: 1 },
            { title: $t('invoices.seen'), value: 2 },
            { title: $t('invoices.driven'), value: 3 },
            { title: $t('invoices.canceled'), value: 4 },
          ]"
          :cloumns="[
            {
              column: 'code',
              title: $t('invoices.invoice'),
              type: 'mainLink',
              sort: true,
            },
            {
              column: 'date',
              title: $t('invoices.theDateOfTheInvoice'),
              type: 'text',
              sort: true,
            },
            {
              column: 'client_type',
              title: $t('invoices.customerName'),
              type: 'clintLink',
              sort: false,
            },
            {
              column: 'total',
              title: $t('invoices.cost'),
              type: 'text',
              sort: true,
            },
            {
              column: 'rest',
              title: $t('invoices.balance'),
              type: 'text',
              sort: true,
            },
            {
              column: 'status',
              title: $t('invoices.situation'),
              type: 'status',
              sort: true,
              values: [
                { title: $t('invoices.draft'), value: 0, color: 'dark' },
                { title: $t('invoices.sent'), value: 1, color: 'primary' },
                { title: $t('invoices.seen'), value: 2, color: 'primary' },
                {
                  title: $t('invoices.driven'),
                  value: 3,
                  color: 'success',
                },
                {
                  title: $t('invoices.canceled'),
                  value: 4,
                  color: 'danger',
                },
              ],
            },
            {
              column: 'options',
              title: $t('invoices.settings'),
              type: 'options',
              options: [
                { name: 'show' },
                {
                  name: 'edit',
                  role: $user.admin || $user.role.invoices_edit,
                },
                {name: 'file'},
                {name: 'invoiceLink',   role: $user.admin || $user.role.sale_returns_add, title: $t('invoices.ReturnSale'), icon: 'exchange', link:'/saleReturns/create?invoice_id='},
                { name: 'outLink', role: true },
                { name: 'printInvoice', role: true },
                { name: 'download', role: true },
                {
                  name: 'delete',
                  role: $user.admin || $user.role.invoices_delete,
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
      path: "/invoices",
    };
  },
  components: {
    indexHeader,
    indexTable,
  },
};
</script>
