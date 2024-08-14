<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('unitsCoefficients.unitsCoefficients')"
                     :description="$t('unitsCoefficients.fromHereYouCanCntrolYourUnitTransactions')"/>
       <indexTable :searchText="$t('unitsCoefficients.parameterSearch')"
                  :emptyTableText="$t('unitsCoefficients.thereAreNoTransactions')"
                  :localData="true"
                  :buttonRole="$user.role.products_add"
                  :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                  :cloumns="[
                   {column: 'name',    title: $t('unitsCoefficients.nameparameter') ,type: 'text' , sort: true },
                   {column: 'options', title: $t('units.settings'), type: 'options', options: [
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
        path: '/unitsCoefficients',
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>
