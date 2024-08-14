<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-header-title">{{$t('components.stores.Withdrawals')}}</h4>
                <router-link :to="'/storesWithdrawals/create?store_id=' + $route.params.id" class="btn btn-sm btn-primary" v-if=" $site.salesPayments_allow && ($user.admin || $user.role.sales_payments_add)">
                    <i class="fas fa-plus"></i> {{$t('components.stores.addition')}}
                </router-link>
            </div>
            <indexTable :searchText="$t('storesWithdrawals.searchForAnstoresWithdrawalsOperations')"
                    :emptyTableText="$t('storesWithdrawals.thereAreNostoresWithdrawalsOperations')"
                    :filter="{store_id: $route.params.id}"
                    :withoutCard="true"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :cloumns="[
                                  {column: 'code',    title: $t('storesWithdrawals.operation') ,type: 'mainLink' , sort: true },
                                  {column: 'store_id',    title: $t('storesWithdrawals.storeName'), type: 'link', to:'store', sort: true, link: true},
                                  {column: 'date',    title: $t('storesWithdrawals.theDateOfTheOperation') ,type: 'text' , sort: true },
                                  {column: 'description',    title: $t('storesWithdrawals.description') ,type: 'text' , sort: true },
                                  {column: 'options', title: $t('storesWithdrawals.settings'), type: 'options', options: [
                                      {name: 'show'},
                                      {name: 'edit',   role: $user.admin || $user.role.stores_withdrawals_edit},
                                      {name: 'printStoresWithdrawal',   role: true},
                                      {name: 'delete', role: $user.admin || $user.role.stores_withdrawals_delete},
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
                path: '/storesWithdrawals',
            }
        },
        components: {
            indexTable
        }

    };

</script>
