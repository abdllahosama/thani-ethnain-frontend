<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('marketers.marketers')"
                     :description="$t('marketers.FromHereYouCanControlTheMarketers')"/>
         <indexTable :searchText="$t('marketers.SearchForAMarketer')"
                    :emptyTableText="$t('marketers.ThereAreNoMarketers')"
                    :buttonRole="true"
                    :localData="true"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :cloumns="[
                     {column: 'name',    title:$t('marketers.marketerName') ,type: 'text' , sort: true },
                     {column: 'balance', title:$t('marketers.balance')      ,type: 'text'     , sort: true },
                     {column: 'options', title:$t('marketers.settings'), type: 'options', options: [
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
                   }"
                   />
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
        path: '/marketers'
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>
