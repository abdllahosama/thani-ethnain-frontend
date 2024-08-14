<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="d-flex  mt-3">
                    <div class="ml-auto">
                        <h2 class="mb-3">
                            {{$t('pointOfSales.expenses.pointOfSalesExpenses')}}
                        </h2>
                        <p class="text-muted">
                            {{$t('pointOfSales.expenses.fromHereYouCanControlPOSExpenses')}}
                        </p>
                    </div>
                    <router-link :to="'/pointofsales/' + this.$route.params.id" class="btn btn-primary add-btn">
                        <i class="fas fa-cash-register mr-2"></i> 
                        {{$t('pointOfSales.invoices.PointOfSaleOffer')}}
                    </router-link>
                </div>
                <indexTable :searchText="$t('expenses.SearchForAllowance')"
                     :emptyTableText="$t('expenses.thereAreNoExpenses')"
                     :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                     :filter="{point_of_sale_id: $route.params.id, count: 2000}"
                     :buttonRole="$user.role.expenses_add"
                     deleteRoute="/expenses"
                     localDatabaseTable="expenses"
                     :addPopUp="true"
                     table="expenses"
                     :cloumns="[
                         {column: 'code',               title: $t('expenses.PerDiem'),type: 'text',sort: true},
                         {column: 'date',               title: $t('expenses.expenseDate') ,type: 'text' , sort: true },
                         {column: 'expense_section_id', title: $t('expenses.section') ,type: 'link', to:'expenseSection', sort: true, link: false},
                         {column: 'description',        title: $t('expenses.thatsAbout') ,type: 'text' , sort: true },
                         {column: 'cost',               title: $t('expenses.amount') ,type: 'text' , sort: true },

                         {column: 'options', title: $t('expenses.settings'), type: 'options', options: [
                             {name: 'show'},
                             {name: 'edit',   role: $user.admin || $user.role.expenses_edit},
                             {name: 'delete', role: $user.admin || $user.role.expenses_delete},
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
        <expenseForm v-if="showAddPopUp" />
    </div>
</template>
<script>
    import indexTable from '@/elements/index/indexTable.vue'
    import expenseForm from "./components/popUp/expenseForm.vue"
    export default {
        data() {
            return {
                path: '/pointOfSales/expenses/show',
                showAddPopUp: false
            }
        },
        components: {
            indexTable,
            expenseForm
        }

    };

</script>
