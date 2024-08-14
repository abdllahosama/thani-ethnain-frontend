<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('invoiceStatus.invoiceStatus')"
                     :description="$t('invoiceStatus.FromHereYouCanControlTheStatusesOfYourGroups')"/>
         <indexTable :searchText="$t('invoiceStatus.SearchForACase')"
                    :emptyTableText="$t('invoiceStatus.ThereAreNoCases')"
                    :localData="true"
                    :buttonRole="true"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :cloumns="[
                     {column: 'name',    title:$t('invoiceStatus.StatusName') ,type: 'text' , sort: true },
                     {column: 'stat',    title:$t('invoiceStatus.theStatus')      ,type: 'stat'     , sort: true, hideMobile: true },
                     {column: 'options', title:$t('invoiceStatus.Settings'), type: 'options', options: [
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
        path: '/invoiceStatus'
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>
