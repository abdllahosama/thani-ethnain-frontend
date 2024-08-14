<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('cities.cities')"
                     :description="$t('cities.FromHereYouCanControlTheListOfCities')"/>
       <indexTable :searchText="$t('cities.FindTheListOfCities')"
                  :emptyTableText="$t('cities.ThereIsNoListOfCities')"
                  :localData="true"
                  :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                  :buttonRole="$user.role.sales_payments_add || $user.role.purchase_payments_add  || $user.role.expenses_add"
                  :cloumns="[
                   {column: 'name',    title:$t('cities.TheNameOfTheCity') ,type: 'text' , sort: true },
                   {column: 'code',    title:$t('cities.CityCode') ,type: 'text' , sort: true },
                   {column: 'price',    title:$t('cities.ShippingPrice') ,type: 'text' , sort: true }, 
                   {column: 'cost',    title:$t('cities.ShippingCost') ,type: 'text' , sort: true },
                   {column: 'options', title:$t('cities.Settings'), type: 'options', options:[
                       {name: 'edit',   role: $user.admin || $user.role.sales_payments_edit || $user.role.purchase_payments_edit  || $user.role.expenses_edit},
                       {name: 'delete', role: $user.admin || $user.role.sales_payments_delete || $user.role.purchase_payments_delete  || $user.role.expenses_delete},
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
        path: '/cities'
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>
