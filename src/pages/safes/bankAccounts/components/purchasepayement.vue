<template>
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <h4 class="card-header-title"> {{$t('components.bankAccountsPurchasePayement.purchasePayments')}} </h4>
                <router-link class="btn btn-sm btn-primary "   v-if="$parent.item.stat == 1 && $site.purchasePayments_allow && ($user.admin || $user.role.purchase_payments_add)" title="$t('components.bankAccountsPurchasePayement.AddABatch')" :to="'/purchasePayments/create?safe_id=' + $route.params.id">
                    <i class="fas fa-plus"></i> {{$t('components.bankAccountsPurchasePayement.addition')}}
                </router-link>
            </div>
            <indexTable :searchText="$t('components.bankAccountsPurchasePayement.FindABatch')"
                        :withoutCard="true"
                        :emptyTableText="$parent.$t('components.bankAccountsPurchasePayement.thereAreNoPurchasePayments')"
                        :emptyTableSubText="$parent.$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                        :filter="{safe_id: $route.params.id}"
                        :cloumns="[
                            {column: 'code',    title: $t('components.bankAccountsPurchasePayement.batch') ,type: 'mainLink' , sort: true },
                            {column: 'client_type',    title: $t('components.bankAccountsPurchasePayement.supplierName') ,type: 'clintLink', sort: true},
                            {column: 'date',    title: $parent.$t('components.bankAccountsPurchasePayement.paymentDate') ,type: 'text' , sort: true },
                            {column: 'bill_id',    title: $parent.$t('components.bankAccountsPurchasePayement.bill') ,type: 'linkInvoice', to:'bill', sort: true, link: true},
                            {column: 'description',    title: $parent.$t('components.bankAccountsPurchasePayement.thatsAbout') ,type: 'text' , sort: true },
                            {column: 'cost',    title: $parent.$t('components.bankAccountsPurchasePayement.amount') ,type: 'text' , sort: true },
                            {column: 'options', title: $parent.$t('components.bankAccountsPurchasePayement.settings'), type: 'options', options: [
                                {name: 'show'},
                                {name: 'edit',   role: $user.admin || $user.role.purchase_payments_edit},
                                {name: 'printPurchasePayment',   role: true},
                                {name: 'download',   role: true},
                                {name: 'delete', role: $user.admin || $user.role.purchase_payments_delete},
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
                path: '/purchasePayments',
            }
        },
      
        components: {
          indexTable
        }

    };

</script>
