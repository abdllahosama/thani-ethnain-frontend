<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-header-title">{{$t('components.bankAccountsSafesDeposits.DepositsToTheBankAccount')}}</h4>
                <router-link :to="'/safesDeposits/create?safe_id=' + $route.params.id" class="btn btn-sm btn-primary" v-if="$parent.item.stat == 1 && $site.salesPayments_allow && ($user.admin || $user.role.sales_payments_add)">
                    <i class="fas fa-plus"></i> {{$t('components.bankAccountsSafesDeposits.addition')}}
                </router-link>
            </div>
            <indexTable :searchText="$t('components.bankAccountsSafesDeposits.SearchForAProcess')"
                     :withoutCard="true"
                     :emptyTableText="$t('components.bankAccountsSafesDeposits.ThereAreCurrentlyNoDeposits')"
                     :filter="{safe_id: $route.params.id}"
                     :emptyTableSubText="$t('components.bankAccountsSafesDeposits.TryAddingSomeAndTryAgain')"
                     :cloumns="[
                         {column: 'code',       title: $t('components.bankAccountsSafesDeposits.operation') ,      type: 'mainLink' , sort: true },
                         {column: 'safe_id',    title:$t('components.bankAccountsSafesDeposits.Treasury'),      type: 'link', to:'safe', sort: true, link: true},
                         {column: 'date',       title: $t('components.bankAccountsSafesDeposits.date') ,    type: 'text' , sort: true },
                         {column: 'description',title: $t('components.bankAccountsSafesDeposits.thatAbout') ,   type: 'text' , sort: true },
                         {column: 'cost',       title: $t('components.bankAccountsSafesDeposits.theAmount') ,     type: 'text' , sort: true },
                         {column: 'options',    title: $t('components.bankAccountsSafesDeposits.settings'),    type: 'options', options: [
                             {name: 'show'},
                             {name: 'edit',   role: $user.admin || $user.role.safes_deposits_edit},
                             {name: 'delete', role: $user.admin || $user.role.safes_deposits_delete},
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
                path: '/safesDeposits',
            }
        },
        components: {
            indexTable
        }

    };

</script>
