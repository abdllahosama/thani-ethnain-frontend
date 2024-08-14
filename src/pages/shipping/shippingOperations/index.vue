<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="$t('shippingOperations.shippingOperations')"
          :description="$t('shippingOperations.FromHereYouCanControlShipments')"
        />
        <indexTable
          :searchText="$t('shippingOperations.searchForOperation')"
          :emptyTableText="$t('shippingOperations.NoShipments')"
          :emptyTableSubText="
            $t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
          "
          :buttonRole="$user.role.shippingOperations_add"
          :statusSearch="true"
          :statusValues="[
            { title: $t('shippingOperations.situation'), value: '' },
            { title: $t('shippingOperations.all'), value: '' },
            { title: $t('shippingOperations.draft'), value: 0 },
            { title: $t('shippingOperations.sent'), value: 1 },
            { title: $t('shippingOperations.seen'), value: 2 },
            { title: $t('shippingOperations.driven'), value: 3 },
            { title: $t('shippingOperations.canceled'), value: 4 },
          ]"
          :cloumns="[
            {
              column: 'code',
              title: $t('shippingOperations.operationCode'),
              type: 'mainLink',
              sort: true,
            },
            {
              column: 'client_type',
              title: $t('shippingOperations.customerName'),
              type: 'clintLink',
              sort: false,
            },
            {
              column: 'date',
              title: $t('shippingOperations.date'),
              type: 'text',
              sort: true,
            },
            {
              column: 'invoice_id',
              title: $t('shippingOperations.invoiceCode'),
              type: 'linkInvoice',
              to:'invoice',
              sort: true,
              link: true
            },
            {
              column: 'tracking_number',
              title: $t('shippingOperations.trackingNumber'),
              type: 'text',
              sort: true,
            },
            {
              column: 'status',
              title: $t('shippingOperations.theStatus'),
              type: 'status',
              sort: true,
              values: [
                { title: $t('shippingOperations.draft'), value: 0, color: 'dark' },
                { title: $t('shippingOperations.sent'), value: 1, color: 'primary' },
                { title: $t('shippingOperations.seen'), value: 2, color: 'primary' },
                { title: $t('shippingOperations.driven'), value: 3, color: 'success' },
                { title: $t('shippingOperations.canceled'), value: 4, color: 'danger' },
              ],
            },
            {
              column: 'options',
              title: $t('shippingOperations.settings'),
              type: 'options',
              options: [
                { name: 'show' },
                { name: 'edit', role: $user.admin || $user.role.shippingOperations_edit },
                { name: 'printInvoice', role: true },
                { name: 'delete', role: $user.admin || $user.role.shippingOperations_delete },
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
      path: "/shippingOperations"
    };
  },
  components: {
    indexHeader,
    indexTable,
  },
};
</script>
