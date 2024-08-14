<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('incomeSections.incomeSections')"
                     :description="$t('incomeSections.fromHereControlOverIncomeSections')"/>
       <indexTable :searchText="$t('incomeSections.SearchForARating')"
                  :emptyTableText="$t('incomeSections.thereAreNoSections')"
                  :localData="true"
                  :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                  :buttonRole="$user.role.incomes_add"
                  :cloumns="[
                   {column: 'name',    title:$t('incomeSections.sectionName') ,type: 'text' , sort: true },
                   {column: 'income_section_id',    title:$t('incomeSections.fatherSection') ,type: 'link', to:'incomeSection', sort: true, link: false },
                   {column: 'options', title:$t('incomeSections.settings'), type: 'options', options: [
                   {name: 'edit',   role: $user.admin || $user.role.incomes_edit},
                   {name: 'delete', role: $user.admin || $user.role.incomes_delete},
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
        path: '/incomeSections'
      }
    },
    components: {
      indexHeader,
      indexTable
    }
  }

</script>
