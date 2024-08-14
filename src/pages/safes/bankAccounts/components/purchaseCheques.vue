<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-header-title">{{$t('components.bankAccountsPurchaseCheques.purchaseCheques')}}</h4>
                <router-link :to="'/purchaseCheques/create?safe_id=' + $route.params.id" class="btn btn-sm btn-primary" v-if="$parent.item.stat == 1 && $site.salesPayments_allow && ($user.admin || $user.role.sales_payments_add)">
                    <i class="fas fa-plus"></i> {{$t('components.bankAccountsPurchaseCheques.addition')}}
                </router-link>
            </div>
            <indexTable :searchText="$t('components.bankAccountsPurchaseCheques.FindACheck')"
                        :withoutCard="true"
                        :emptyTableText="$parent.$t('components.bankAccountsPurchaseCheques.thereAreNosalesCheques')"
                        :filter="{safe_id: $route.params.id}"
                        :emptyTableSubText="$parent.$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                        :cloumns="[
                            {column: 'code',    title: $t('components.bankAccountsPurchaseCheques.batch') ,type: 'mainLink' , sort: true },
                            {column: 'client_type',    title: $t('purchaseCheques.supplierName') ,type: 'clintLink', sort: true},
                            {column: 'created_date',    title: $t('components.bankAccountsPurchaseCheques.RegistrationDate') ,type: 'text' , sort: true },
                            {column: 'date',    title: $parent.$t('components.bankAccountsPurchaseCheques.paymentDate') ,type: 'text' , sort: true },
                            {column: 'description',    title: $parent.$t('components.bankAccountsPurchaseCheques.thatsAbout') ,type: 'text' , sort: true },
                            {column: 'cost',    title: $parent.$t('components.bankAccountsPurchaseCheques.amount') ,type: 'text' , sort: true },
                            {column: 'payment_method_id',    title: $t('components.bankAccountsPurchaseCheques.PaymentMethod') ,type: 'link', to:'paymentMethod', sort: true, link: false},
                            {column: 'stat',    title: $t('components.bankAccountsPurchaseCheques.active') ,type: 'status', sort: true,  values: [
                              {title: $t('components.bankAccountsPurchaseCheques.Waiting'), value: 0, color: 'info'},
                              {title: $t('components.bankAccountsPurchaseCheques.driven'), value: 1, color: 'success'},
                            ]},
                            {column: 'options', title: $parent.$t('components.bankAccountsPurchaseCheques.settings'), type: 'options', options: [
                                {name: 'show'},
                                {name: 'edit',   role: $user.admin || $user.role.sales_cheques_edit},
                                {name: 'pay',   role: $user.admin  || $user.role.sales_cheques_edit},
                                {name: 'delete', role: $user.admin || $user.role.sales_cheques_delete},
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
                path: '/purchaseCheques',
            }
        },
        components: {
            indexTable
        }

    };

</script>
