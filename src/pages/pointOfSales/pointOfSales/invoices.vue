<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="d-flex  mt-3">
                    <div class="ml-auto">
                        <h2 class="mb-3">
                            {{$t('pointOfSales.invoices.pointOfSalesInvoices')}}
                        </h2>
                        <p class="text-muted">
                            {{$t('pointOfSales.invoices.fromHereYouCanControlPOSInvoices')}}
                        </p>
                    </div>
                    <router-link :to="'/pointofsales/' + this.$route.params.id" class="btn btn-primary add-btn">
                        <i class="fas fa-cash-register mr-2"></i> 
                        {{$t('pointOfSales.invoices.PointOfSaleOffer')}}
                    </router-link>
                </div>
                <indexTable 
                    :searchText="$t('invoices.searchForAnInvoice')"
                    :statusSearch="true"
                    :statusModel="'order_type'"
                    :statusValues="[
                        { title: $t('pointOfSales.invoices.type'), value: '' },
                        { title: $t('pointOfSales.invoices.Receipt'), value: 0 },
                        { title: $t('pointOfSales.invoices.connecting'), value: 1 },
                        { title: $t('pointOfSales.invoices.hall'), value: 2 },
                    ]"
                    :emptyTableText="$t('pointOfSales.invoices.thereAreNoInvoices')"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :filter="{point_of_sale_id: $route.params.id}"
                    :withoutAdd="true"
                    localDatabaseTable="pointOfSalesInvoices"
                    table="pointOfSalesInvoices"
                    deleteRoute="/invoices"
                    :cloumns="[
                        {column: 'order_number',    title: $t('pointOfSales.invoices.BillNumber') ,type: 'text' , sort: true, link: false },
                        {column: 'date',    title: $t('pointOfSales.invoices.theDateOfTheInvoice') ,type: 'text' , sort: true },
                        {column: 'customer_id',    title: $t('invoices.customerName') ,type: 'link', to:'customer', sort: true, link: false},
                        {column: 'order_type',    title: $t('pointOfSales.invoices.type') ,type: 'status' , sort: true ,  values: [
                            { title: $t('pointOfSales.invoices.Receipt'), value: 0, color: 'success'},
                            { title: $t('pointOfSales.invoices.connecting'), value: 1, color: 'dark' },
                            { title: $t('pointOfSales.invoices.hall'), value: 2, color: 'primary' },
                        ]},
                        {column: 'total',    title: $t('invoices.cost') ,type: 'text' , sort: true },
                        {column: 'options', title: $t('invoices.settings'), type: 'options', options: [
                            {name: 'showPointOfSale'},
                            {name: 'edit',   role: $user.admin || $user.role.invoices_edit},
                            {name: 'invoiceLink',   role: $user.admin || $user.role.sale_returns_add, title: $t('pointOfSales.invoices.ReturnSale'), icon: 'exchange', link:'/saleReturns/create?invoice_id='},
                            {name: 'printPointOfSale',   role: true},
                            {name: 'delete', role: $user.admin || $user.role.invoices_delete},
                        ]}
                    ]"
                    :deleteText="{
                        attention: $t('allerts.Attention'),
                        areYouReallySureToDeleteTheItem: $t('allerts.areYouReallySureToDeleteTheItem'),
                        close: $t('allerts.close'),
                        confirm: $t('allerts.confirm'),
                        loading: $t('allerts.loading'),
                    }" 
                />
            </div>
        </div>
        <invoiceShow v-if="show"/>
    </div>
</template>
<script>
    import indexTable from '@/elements/index/indexTable.vue'
    import invoiceShow from './components/invoiceShow.vue'
    export default {
        data() {
            return {
                path: '/pointofsales/invoices/show',
                type: 'index',
                show: false,
                invoice: null
            }
        },
        methods: {
            showPos (id) {
                this.show = true
                var myel = this;
                setTimeout(function() {
                    var invoice = myel.$getPosInvoice(id)
                    invoice.quotationItems =  invoice.invoiceItems
                    invoice.quotationItems.forEach(el => {el.product_name = el.name})
                    invoice.subtotal = parseFloat(invoice.subTotal)
                    myel.invoice = invoice
                }, 20);
            },
        },
        components: {
            indexTable,
            invoiceShow
        }

    };

</script>
