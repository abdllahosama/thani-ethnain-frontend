<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('sectionsAccount.sectionsAccount')"
                     :description="$t('sectionsAccount.fromHereYouCanControlAccountClassifications')"/>
         <indexTable :searchText="$t('sections.SearchForARating')"
                    :emptyTableText="$t('sections.thereAreNoCategories')"
                    :buttonRole="$user.role.products_add"
                    :localData="true"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :cloumns="[
                     {column: 'name',    title:$t('sections.sectionName') ,type: 'text' , sort: true },
                     {column: 'options', title:$t('sections.settings'), type: 'options', options: [
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
        path: '/sectionsAccounts'
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>
