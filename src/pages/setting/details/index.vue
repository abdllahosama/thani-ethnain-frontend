<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('details.ProductDetails')"
                     :description="$t('details.FromHereYouCanControlTheProductPreferences')"/>
         <indexTable :searchText="$t('details.SearchForAnItem')"
                    :emptyTableText="$t('details.NoProductDetails')"
                    :localData="true"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :buttonRole="$user.role.products_add"
                    :cloumns="[
                     {column: 'name',    title: $t('details.ProductDetailName') ,type: 'text' , sort: true },
                     {column: 'options', title: $t('details.Settings'), type: 'options', options: [
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
  import indexHeader from '@/elements/index/indexHeader.vue'
  import indexTable from '@/elements/index/indexTable.vue'
  export default {
    data() {
      return {
        path: '/details'
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>
