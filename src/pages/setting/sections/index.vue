<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('sections.sections')"
                     :description="$t('sections.fromHereYouCanControlProductSections')"/>
         <indexTable :searchText="$t('sections.SearchForARating')"
                    :emptyTableText="$t('sections.thereAreNoCategories')"
                    :buttonRole="$user.role.products_add"
                    :localData="true"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :cloumns="[
                     {column: 'name',    title:$t('sections.sectionName') ,type: 'text' , sort: true },
                     {column: 'parent_id',    title:$t('sections.fatherSection') ,type: 'link', to:'section', sort: true, link: false },
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
        path: '/sections'
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>
