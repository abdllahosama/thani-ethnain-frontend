<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-header-title">{{$t('components.bankAccountsSafesWithdrawals.WithdrawalsFromTheBankAccount')}}</h4>
                <router-link :to="'/safesWithdrawals/create?safe_id=' + $route.params.id" class="btn btn-sm btn-primary" v-if="$parent.item.stat == 1 && $site.salesPayments_allow && ($user.admin || $user.role.sales_payments_add)">
                    <i class="fas fa-plus"></i> {{$t('components.bankAccountsSafesWithdrawals.addition')}}
                </router-link>
            </div>
            <indexTable :searchText="$parent.$t('components.bankAccountsSafesWithdrawals.searchForWithdrawals')"
                      :withoutCard="true"
                     :emptyTableText="$parent.$t('components.bankAccountsSafesWithdrawals.thereAreNoWithdrawalsOperations')"
                     :emptyTableSubText="$parent.$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                     :filter="{safe_id: $route.params.id}"
                     :cloumns="[
                         {column: 'code',    title: $parent.$t('components.bankAccountsSafesWithdrawals.operation') ,type: 'mainLink' , sort: true },
                         {column: 'safe_id',    title:$parent.$t('components.bankAccountsSafesWithdrawals.safes'),      type: 'link', to:'safe', sort: true, link: true},
                         {column: 'date',    title: $parent.$t('components.bankAccountsSafesWithdrawals.withdrawalsDate') ,type: 'text' , sort: true },
                         {column: 'description',    title: $parent.$t('components.bankAccountsSafesWithdrawals.thatsAbout') ,type: 'text' , sort: true },
                         {column: 'cost',    title: $parent.$t('components.bankAccountsSafesWithdrawals.amount') ,type: 'text' , sort: true },
                         {column: 'options', title: $parent.$t('components.bankAccountsSafesWithdrawals.settings'), type: 'options', options: [
                             {name: 'show'},
                             {name: 'edit',   role: $user.admin || $user.role.safes_withdrawals_edit},
                             {name: 'delete', role: $user.admin || $user.role.safes_withdrawals_delete},
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
                path: '/safesWithdrawals',
            }
        },
        components: {
            indexTable
        }

    };

</script>
