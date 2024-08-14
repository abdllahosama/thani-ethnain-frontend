<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-header-title">{{$t('components.bankAccountsSalesChaques.salesCheques')}}</h4>
                <router-link :to="'/salesCheques/create?safe_id=' + $route.params.id" class="btn btn-sm btn-primary" v-if="$parent.item.stat == 1 && $site.salesPayments_allow && ($user.admin || $user.role.sales_payments_add)">
                    <i class="fas fa-plus"></i> {{$t('components.bankAccountsSalesChaques.addition')}}
                </router-link>
            </div>
            <indexTable :searchText="$t('components.bankAccountsSalesChaques.FindACheck')"
                        :withoutCard="true"
                        :emptyTableText="$parent.$t('components.bankAccountsSalesChaques.thereAreNosalesCheques')"
                        :filter="{safe_id: $route.params.id}"
                        :emptyTableSubText="$parent.$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                        :cloumns="[
                            {column: 'code',    title: $t('components.bankAccountsSalesChaques.batch') ,type: 'mainLink' , sort: true },
                            {column: 'customer_id',    title: $t('components.bankAccountsSalesChaques.customerName') ,type: 'link', to:'customer', sort: true, link: true},
                            {column: 'created_date',    title: $t('components.bankAccountsSalesChaques.RegistrationDate') ,type: 'text' , sort: true },
                            {column: 'date',    title: $parent.$t('components.bankAccountsSalesChaques.paymentDate') ,type: 'text' , sort: true },
                            {column: 'description',    title: $parent.$t('components.bankAccountsSalesChaques.thatsAbout') ,type: 'text' , sort: true },
                            {column: 'cost',    title: $parent.$t('components.bankAccountsSalesChaques.amount') ,type: 'text' , sort: true },
                            {column: 'payment_method_id',    title: $t('components.bankAccountsSalesChaques.PaymentMethod') ,type: 'link', to:'paymentMethod', sort: true, link: false},
                            {column: 'stat',    title: $t('components.bankAccountsSalesChaques.active') ,type: 'status', sort: true,  values: [
                              {title: $t('components.bankAccountsSalesChaques.Waiting'), value: 0, color: 'info'},
                              {title: $t('components.bankAccountsSalesChaques.driven'), value: 1, color: 'success'},
                            ]},
                            {column: 'options', title: $parent.$t('components.bankAccountsSalesChaques.settings'), type: 'options', options: [
                                {name: 'show'},
                                {name: 'edit',   role: $user.admin || $user.role.sales_cheques_edit},
                                {name: 'pay',   role: $user.admin || $user.role.sales_cheques_edit},
                                {name: 'delete', role: $user.admin || $user.role.sales_cheques_delete},
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
                path: '/salesCheques',
            }
        },
        components: {
            indexTable
        }

    };

</script>
