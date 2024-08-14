<template>

    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-12">
          <indexHeader :title="$t('capitals.safes')"
                       :description="$t('capitals.safesDescription')" />
          <indexTable :searchText="$t('capitals.SearchForOrigin')"
                      :emptyTableText="$t('capitals.thereAreNosafes')"
                      :buttonRole="$user.role.capitals_add"
                      :localData="true"
                      :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                      :cloumns="[
                         {column: 'name',    title:$t('capitals.customerName') ,type: 'mainLink' , sort: true },
                         {column: 'cost',  title:$t('capitals.balance')  ,type: 'text'     , sort: true, icon: 'money-bill-wave' },
                         {column: 'date', title: $t('capitals.PurchaseDate')      ,type: 'text'     , sort: true, icon: 'calendar-alt' },
                         {column: 'stat',    title:$t('capitals.active')       ,type: 'stat'     , sort: true, hideMobile: true },
                         {column: 'options', title:$t('capitals.actions'), type: 'options', options: [
                             {name: 'show'},
                             {name: 'edit',   role: $user.admin || $user.role.customers_edit},
                             {name: 'delete', role: $user.admin || $user.role.customers_delete},
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
          path: '/capitals'
        }
      },
      components: {
        indexHeader,
        indexTable
      }
    }
  
  </script>