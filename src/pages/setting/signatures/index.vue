<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('signatures.signatures')"
                     :description="$t('signatures.fromControlYourLights')"/>
         <indexTable :searchText="$t('signatures.search')"
                    :emptyTableText="$t('signatures.thereSignatures')"
                    :buttonRole="$user.role.products_add"
                    :localData="true"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :cloumns="[
                     {column: 'name',    title:$t('signatures.jobTitle') ,type: 'text' , sort: true },
                     {column: 'options', title:$t('sections.settings'), type: 'options', options: [
                         {name: 'edit',   role: $user.admin || $user.role.signatures_edit},
                         {name: 'delete', role: $user.admin || $user.role.signatures_delete},
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
        path: '/signatures'
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>
