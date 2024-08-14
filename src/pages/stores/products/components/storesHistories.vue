<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">
          {{$t('stores.form.storeOperations')}}
        </h4>
      </div>
      <indexTable :emptyTableText="$t('products.thereAreNoProducts')"
                  :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                  :filter="{product_id: $route.params.id}"
                  :withoutCard="true"
                  :cloumns="[
                             {column: 'store_id', title:$t('stores.storeName')     ,type: 'link', to:'store', sort: true, link: true},
                             {column: 'quantity',    title:$t('components.products.quantity')       ,type: 'text'},
                             {column: 'opreation',    title:$t('components.products.theOperation')   ,type: 'opreation'},
                             {column: 'date',    title:$t('quotations.form.date')       ,type: 'text'},
                             {column: 'type',    title:$t('components.products.operationType')  ,type: 'storeStat'},
                           ]"
                   />
    </div>
  </div>
</template>

<script>
  import indexTable from '@/elements/index/indexTable.vue'
  export default {
    data() {
      return {
        path: '/storesHistories',
      }
    },
    components: {
      indexTable
    }
  }

</script>
