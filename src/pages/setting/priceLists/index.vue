<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('priceLists.PriceLists')"
                     :description="$t('priceLists.FromHereYouCanControlThePriceLists')"/>
         <indexTable :searchText="$t('priceLists.SearchForAPriceList')"
                    :emptyTableText="$t('priceLists.ThereAreNoPriceLists')"
                    :buttonRole="$user.role.products_add"
                    :localData="true"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :cloumns="[
                     {column: 'name',    title: $t('priceLists.PriceListName') ,type: 'text' , sort: true },
                     {column: 'options', title: $t('sections.settings'), type: 'options', options: [
                         {name: 'edit',   role: $user.admin || $user.role.products_edit},
                         {name: 'delete', role: $user.admin || $user.role.products_delete},
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

  import axios from 'axios'

  import indexHeader from '@/elements/index/indexHeader.vue'
  import indexTable from '@/elements/index/indexTable.vue'
  export default {
    data() {
      return {
        path: '/priceLists',
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>
