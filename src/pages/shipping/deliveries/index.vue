<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('deliveries.freightForwarders')"
                     :description="$t('deliveries.FromHereYouCanControlTheShippingAgents')"/>
         <indexTable :searchText="$t('deliveries.LookingForAShippingRepresentative')"
                    :emptyTableText="$t('deliveries.ThereAreNoShippingAgents')"
                    :localData="true"
                    :buttonRole="true"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :cloumns="[
                     {column: 'name',     title:$t('deliveries.ShippingRepresentativeIsName') ,type: 'text' , sort: true },
                     {column: 'safe_id',  title:$t('deliveries.Treasury') ,type: 'link', to:'safe', sort: true, link: true },
                     {column: 'balance',  title:$t('deliveries.balance')      ,type: 'text'     , sort: true },
                     {column: 'options',  title:$t('deliveries.settings'), type: 'options', options: [
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
        path: '/deliveries'
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>
