<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="$t('products.products')"
          :description="$t('products.fromHereYouCanControlYourProducts')"
          :showExport="'true'"
          :exportLink="path + '/export/excel'"
          :showBarcode="'true'"
          :barcodePath="'productsBarcode'"
          :goldBarcodePath="'goldBarcode'"
          :showImport="'true'"
          :explanationPath="path + '/explaination'"
        />
        <indexTable
          :searchText="$t('products.searchForAPproduct')"
          :emptyTableText="$t('products.thereAreNoProducts')"
          :buttonRole="$user.admin || $user.role.products_add"
          :localData="true"
          :emptyTableSubText="
            $t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
          "
          :cloumns="[
            {
              column: 'name',
              title: $t('products.ProductName'),
              type: 'mainLink',
              sort: true,
            },
            {
              column: 'code',
              title: $t('products.ProductCode'),
              type: 'text',
              sort: true,
              icon: 'file-code',
            },
            {
              column: 'section_id',
              title: $t('products.category'),
              type: 'link',
              to: 'section',
              sort: true,
              link: false,
              icon: 'folders',
            },
            {
              column: 'price',
              title: $t('products.price'),
              type: 'text',
              sort: true,
              icon: 'usd-square',
            },
            {
              column: 'cost',
              title: $t('products.cost'),
              type: 'text',
              sort: true,
              icon: 'dollar-sign',
            },
            {
              column: 'options',
              title: $t('products.settings'),
              type: 'options',
              options: [
                { name: 'show' },
                {
                  name: 'edit',
                  role: $user.admin || $user.role.customers_edit,
                },
                {
                  name: 'delete',
                  role: $user.admin || $user.role.customers_delete,
                },
              ],
            },
          ]"
          :deleteText="{
            attention: $t('allerts.Attention'),
            areYouReallySureToDeleteTheItem: $t(
              'allerts.areYouReallySureToDeleteTheProduct'
            ),
            close: $t('allerts.close'),
            confirm: $t('allerts.confirm'),
            loading: $t('allerts.loading'),
          }"
        />
      </div>
    </div>
    <importForm v-if="importShow" />
  </div>
</template>
<script>
import indexHeader from "@/elements/index/indexHeader.vue";
import indexTable from "@/elements/index/indexTable.vue";

import importForm from "./components/importForm.vue";

export default {
  data() {
    return {
      path: "/products",
      importShow: false,
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
