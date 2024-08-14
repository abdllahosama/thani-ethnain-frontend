<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="$t('suppliers.suppliers')"
          :description="$t('suppliers.suppliersDescription')"
          :showExport="'true'"
          :exportLink="path + '/export/excel'"
          :showImport="'true'"
          :explanationPath="path + '/explaination'"
        />
        <indexTable
          :searchText="$t('suppliers.searchForSupplier')"
          :emptyTableText="$t('suppliers.thereAreNoSuppliers')"
          :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
          :buttonRole="$user.admin || $user.role.suppliers_add"
          :localData="true"
          :cloumns="[
            {column: 'id',    title: 'كود' ,type: 'mainLink' , sort: true },
            {
              column: 'name',
              title: $t('suppliers.supplierName'),
              type: 'mainLink',
              sort: true,
            },
            {
              column: 'mobile',
              title: $t('suppliers.phoneNumber'),
              type: 'text',
              sort: true,
              icon: 'phone'
            },
            {
              column: 'balance',
              title: $t('suppliers.balance'),
              type: 'text',
              sort: true,
              icon: 'usd-square'
            },
            {
              column: 'stat',
              title: $t('suppliers.active'),
              type: 'stat',
              sort: true,
              hideMobile: true
            },
            {
              column: 'options',
              title: $t('suppliers.actions'),
              type: 'options',
              options: [
                { name: 'show' },
                {
                  name: 'edit',
                  role: $user.admin || $user.role.suppliers_edit,
                },
                {
                  name: 'link',
                  role:
                  $site.purchasePayments_allow &&
                    ($user.admin ||
                      $user.role.purchase_payments_add),
                  title: $t('suppliers.AddABatch'),
                  icon: 'dollar-sign',
                  link: '/purchasePayments/create?supplier_id=',
                },
                {
                  name: 'link',
                  role:
                  $site.bills_allow &&
                    ($user.admin||$user.role.bills_add),
                  title: $t('suppliers.AddAPurchaseBill'),
                  icon: 'file-invoice-dollar',
                  link: '/bills/create?supplier_id=',
                },
                {
                  name: 'link',
                  role:
                    $site.purchaseOrders_allow &&
                    ($user.admin ||
                      $user.role.purchase_orders_add),
                  title: $t('suppliers.AddAPurchaseOrder'),
                  icon: 'briefcase',
                  link: '/purchaseorders/create?supplier_id=',
                },
                {
                  name: 'delete',
                  role:
                    $user.admin || $user.role.suppliers_delete,
                },
              ],
            },
          ]"
          :deleteText="{
            attention: $t('allerts.Attention'),
            areYouReallySureToDeleteTheItem: $t('allerts.AreYoureallySureYouDeletedTheResourceIfYouDeleteTheResourceAllInvoicesAndProcessesWillBedeleted'),
            close: $t('allerts.close'),
            confirm: $t('allerts.confirm'),
            loading: $t('allerts.loading'),
          }"
        />
      </div>
    </div>
    <!-- / .row -->
    <importForm v-if="importShow"></importForm>
  </div>
</template>
<script>
import indexHeader from "@/elements/index/indexHeader.vue";
import indexTable from "@/elements/index/indexTable.vue";
import importForm from "./components/importForm.vue";

export default {
  data() {
    return {
      path: "/suppliers",
      importShow: false
    };
  },
  methods: {
    importForm() {
      this.importShow = true;
    },
  },
  components: {
    indexHeader,
    indexTable,
    importForm,
  },
};
</script>
