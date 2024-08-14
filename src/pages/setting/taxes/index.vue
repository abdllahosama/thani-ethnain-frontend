<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('taxes.taxRates')"
                     :description="$t('taxes.fromHereYouCanControlTaxRateUnits')"/>
         <indexTable :searchText="$t('taxes.SearchForATax')"
                    :emptyTableText="$t('taxes.thereIsNoTaxRates')"
                    :localData="true"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :buttonRole="true"
                    :cloumns="[
                     {column: 'name',    title:$t('taxes.nameTheTaxRate') ,type: 'text' , sort: true },
                     {column: 'rate',    title:$t('taxes.taxRate') ,type: 'text' , sort: true, after: '%' },
                     {column: 'options', title:$t('taxes.settings'), type: 'options', options: [
                         {name: 'edit',   role: true},
                         {name: 'delete', role: true},
                     ]}
                   ]"
                   :deleteText="{
                    attention: $t('allerts.Attention'),
                    areYouReallySureToDeleteTheItem: $t('allerts.areYouReallySureToDeleteTheItem'),
                    close: $t('allerts.close'),
                    confirm: $t('allerts.confirm'),
                    loading: $t('allerts.loading'),
                   }" />
      </div>
    </div>
  </div>

</template>
<script>

  import indexHeader from '@/elements/index/indexHeader.vue'
  import indexTable from '@/elements/index/indexTable.vue'
  export default {
    data() {
      return {
        path: '/taxes'
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>
