<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-header-title">{{$t('components.bankAccountsToSafesTransfers.TransfersToTheBankAccount')}}</h4>
                <router-link :to="'/safesTransfers/create?safe_id=' + $route.params.id" class="btn btn-sm btn-primary" v-if="$parent.item.stat == 1 && $site.salesPayments_allow && ($user.admin || $user.role.sales_payments_add)">
                    <i class="fas fa-plus"></i> {{$t('components.bankAccountsToSafesTransfers.addition')}}
                </router-link>
            </div>
             <indexTable :searchText="$parent.$t('components.bankAccountsToSafesTransfers.searchForTransfer')"
                     :emptyTableText="$parent.$t('components.bankAccountsToSafesTransfers.thereAreNoWithdrawalsOperations')"
                     :filter="{safe_id: $route.params.id}"
                     :withoutCard="true"
                     :emptyTableSubText="$parent.$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                     :cloumns="[
                         {column: 'code',    title: $parent.$t('components.bankAccountsToSafesTransfers.operation') ,type: 'mainLink' , sort: true },
                         {column: 'from_safe_id',    title: $parent.$t('components.bankAccountsToSafesTransfers.fromSafeTransefrs'), element:'fromSafe' ,type: 'link', to: 'safe', sort: true, link: true},
                         {column: 'to_safe_id',    title: $parent.$t('components.bankAccountsToSafesTransfers.toSafeTransefrs'), element:'toSafe' ,type: 'link', to: 'safe', sort: true, link: true},
                         {column: 'date',    title: $parent.$t('components.bankAccountsToSafesTransfers.transferDate') ,type: 'text' , sort: true },
                         {column: 'description',    title: $parent.$t('components.bankAccountsToSafesTransfers.thatsAbout') ,type: 'text' , sort: true },
                         {column: 'cost',    title: $parent.$t('components.bankAccountsToSafesTransfers.amount') ,type: 'text' , sort: true },
                         {column: 'options', title: $parent.$t('components.bankAccountsToSafesTransfers.settings'), type: 'options', options: [
                             {name: 'show'},
                             {name: 'edit',   role: $user.admin || $user.role.safes_transfers_edit},
                             {name: 'delete', role: $user.admin || $user.role.safes_transfers_delete},
                         ]}
                       ]"
                     :deleteText="{
                        attention: $parent.$t('allerts.Attention'),
                        areYouReallySureToDeleteTheItem: $parent.$t('allerts.areYouReallySureToDeleteTheItem'),
                        close: $parent.$t('allerts.close'),
                        confirm: $parent.$t('allerts.confirm'),
                        loading: $parent.$t('allerts.loading'),
                       }" />
        </div>
    </div>
</template>
<script>
    import indexTable from "@/elements/index/indexTable.vue";
    export default {
        data() {
            return {
                path: '/safesTransfers',
            }
        },
        components: {
            indexTable
        }

    };

</script>
