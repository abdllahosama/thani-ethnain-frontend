<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('invoiceGroups.groupsNumbering')"
                     :description="$t('invoiceGroups.fromHereYouCanControlTheNumberingOfYourGroups')"/>
         <indexTable :searchText="$t('invoiceGroups.SearchForNumbering')"
                    :emptyTableText="$t('invoiceGroups.thereIsNoNumbering')"
                    :localData="true"
                    :buttonRole="true"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :cloumns="[
                     {column: 'name',    title:$t('invoiceGroups.theName') ,type: 'text' , sort: true },
                     {column: 'prefix',    title:$t('invoiceGroups.thePrefix') ,type: 'text' , sort: true },
                     {column: 'next_id',    title:$t('invoiceGroups.nextNumber') ,type: 'text' , sort: true },
                     {column: 'left_pad',    title:$t('invoiceGroups.leftMargin') ,type: 'text' , sort: true },
                     {column: 'prefix_year',    title:$t('invoiceGroups.yearPrefix') ,type: 'trueOrFalse' , sort: true},
                     {column: 'prefix_month',    title:$t('invoiceGroups.theMonthPrefix') ,type: 'trueOrFalse' , sort: true},
                     {column: 'options', title:$t('invoiceGroups.settings'), type: 'options', options: [
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
        path: '/invoiceGroups'
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>
