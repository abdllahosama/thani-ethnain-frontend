<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('quotations.quotations')"
                     :description="$t('quotations.fromHereYouCanControlTheOffers')" />
        <indexTable :searchText="$t('quotations.searchForAnQuotation')"
                    :emptyTableText="$t('quotations.thereAreNoOffers')"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :buttonRole="$user.role.quotations_add"
                    :statusSearch="true"
                    :statusValues="[
                          {title: $t('quotations.situation'), value: ''},
                          {title: $t('quotations.all'), value: ''},
                          {title: $t('quotations.draft'), value: 0},
                          {title: $t('quotations.sent'), value: 1},
                          {title: $t('quotations.seen'), value: 2},
                          {title: $t('quotations.approved'), value: 3},
                          {title: $t('quotations.rejected'), value: 4},
                          {title: $t('quotations.canceled'), value: 5},
                          ]"
                    :cloumns="[
                           {column: 'code',    title: $t('quotations.quotation') ,type: 'mainLink' , sort: true },
                           {column: 'date',    title: $t('quotations.quotationdate') ,type: 'text' , sort: true },
                           {
                             column: 'client_type',
                             title: $t('quotations.customerName'),
                             type: 'clintLink',
                             sort: false,
                           },
                           {column: 'total',    title: $t('quotations.cost') ,type: 'text' , sort: true },
                           {column: 'status',    title: $t('quotations.situation') ,type: 'status' , sort: true ,  values: [
                             {title: $t('quotations.draft'), value: 0, color: 'dark'},
                             {title: $t('quotations.sent'), value: 1, color: 'primary'},
                             {title: $t('quotations.seen'), value: 2, color: 'primary'},
                             {title: $t('quotations.approved'), value: 3, color: 'success'},
                             {title: $t('quotations.rejected'), value: 4, color: 'danger'},
                             {title: $t('quotations.canceled'), value: 5, color: 'danger'},
                           ]},
                           {column: 'options', title: $t('quotations.settings'), type: 'options', options: [
                               {name: 'show'},
                               {name: 'edit',   role: $user.admin || $user.role.quotations_edit},
                               {name: 'file'},
                               {name: 'outLink',   role: true},
                               {name: 'printQuotation',   role: true},
                               {name: 'download',   role: true},
                               {name: 'delete', role: $user.admin || $user.role.quotations_delete},
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
        path: '/quotations',
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }
</script>
