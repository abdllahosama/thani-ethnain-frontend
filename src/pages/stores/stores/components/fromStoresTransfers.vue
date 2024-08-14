<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-header-title">{{$t('components.stores.transfersFromWarehouse')}}</h4>
                <router-link :to="'/storesTransfers/create?store_id=' + $route.params.id" class="btn btn-sm btn-primary" v-if=" $site.salesPayments_allow && ($user.admin || $user.role.sales_payments_add)">
                    <i class="fas fa-plus"></i> {{$t('components.stores.addition')}}
                </router-link>
            </div>
             <indexTable :searchText="$t('storesTransfers.searchForAnStoresTransfersOperations')"
                    :emptyTableText="$t('storesTransfers.thereAreNostoresTransfersOperations')"
                    :filter="{store_id: $route.params.id}"
                    :withoutCard="true"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :cloumns="[
                                  {column: 'code',    title: $t('storesTransfers.operation') ,type: 'mainLink' , sort: true },
                                  {column: 'from_store_id',    title: $t('storesTransfers.fromStoreName'), element:'fromStore', type: 'link', to:'store', sort: true, link: true},
                                  {column: 'to_store_id',    title: $t('storesTransfers.toStoreName'), element:'toStore', type: 'link', to:'store', sort: true, link: true},
                                  {column: 'date',    title: $t('storesTransfers.theDateOfTheOperation') ,type: 'text' , sort: true },
                                  {column: 'description',    title: $t('storesTransfers.description') ,type: 'text' , sort: true },
                                  {column: 'options', title: $t('storesTransfers.settings'), type: 'options', options: [
                                      {name: 'show'},
                                      {name: 'edit',   role: $user.admin || $user.role.stores_transfers_edit},
                                      {name: 'printStoresTransfer',   role: true},
                                      {name: 'delete', role: $user.admin || $user.role.stores_transfers_delete},
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
</template>
<script>
    import indexTable from "@/elements/index/indexTable.vue";
    export default {
        data() {
            return {
                path: '/storesTransfers',
            }
        },
        components: {
            indexTable
        }

    };

</script>
