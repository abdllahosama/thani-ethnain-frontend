<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12">
            <indexHeader :title="$t('stores.stores')"
                         :description="$t('stores.fromHereYouCanControlYourProductStores')"
                         :explanationPath="path + '/explaination'"
                         :showBarcode="'true'"
                         :barcodePath="'productsBarcode'"/>
           <indexTable :searchText="$t('stores.SearchForAStore')"
                       :emptyTableText="$t('stores.thereAreNoStores')"
                       :buttonRole="$user.role.stores_add"
                       :localData="true"
                       :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                       :cloumns="[
                        {column: 'id',    title: 'كود' ,type: 'mainLink' , sort: true },
                        {column: 'name',    title:$t('stores.storeName') ,type: 'mainLink' , sort: true },
                        {column: 'country', title:$t('stores.country')     ,type: 'text'     , sort: true, icon: 'city' },
                        {column: 'city',    title:$t('stores.city')       ,type: 'text'     , sort: true, icon: 'building' },
                        {column: 'stat',    title:$t('stores.active')      ,type: 'stat'     , sort: true, hideMobile: true },
                        {column: 'options', title:$t('stores.settings'), type: 'options', options: [
                           {name: 'show'},
                           {name: 'edit',   role: $user.admin || $user.role.stores_edit},
                           {name: 'link',   role: $site.storesTransfers_allow && ($user.admin|| $user.role.stores_transfers_add), title: $t('stores.MoveFromTheStore'), icon: 'suitcase', link:'/storesTransfers/create?from_store_id='},
                           {name: 'link',   role: $site.storesDeposits_allow && ($user.admin|| $user.role.stores_deposits_add), title: $t('stores.DepositToTheStore'), icon: 'donate', link:'/storesDeposits/create?store_id='},
                           {name: 'link',   role: $site.storesWithdrawals_allow && ($user.admin|| $user.role.stores_withdrawals_add), title: $t('stores.EnglishPullOutOfTheStore'), icon: 'money-bill-alt', link:'/storesWithdrawals/create?store_id='},
                           {name: 'moveStore',   role: $site.storesTransfers_allow && ($user.admin|| $user.role.stores_transfers_add), title: 'نقل كامل البضاعة الي مخزن', icon: 'suitcase'},
                           {name: 'delete', role: $user.admin || $user.role.stores_delete},
                           
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

    import indexHeader from '@/elements/index/indexHeader.vue';
    import indexTable from '@/elements/index/indexTable.vue';

    export default {
        data() {
            return {
                path: '/stores'
            }
        },
        components: {
            indexHeader,
            indexTable
        }

    };

</script>
