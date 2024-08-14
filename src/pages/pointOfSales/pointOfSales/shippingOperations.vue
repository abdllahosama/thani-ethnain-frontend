<template>
    <div class="container-fluid shipping-table">
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="d-flex  mt-3">
                    <div class="ml-auto">
                        <h2 class="mb-3">
                            {{$t('shippingOperations.shippingOperations')}}
                        </h2>
                        <p class="text-muted">
                            {{$t('shippingOperations.FromHereYouCanControlShipments')}}
                        </p>
                    </div>
                    <router-link :to="'/pointofsales/' + this.$route.params.id" class="btn btn-primary add-btn">
                        <i class="fas fa-cash-register mr-2"></i> 
                        {{$t('pointOfSales.invoices.PointOfSaleOffer')}}
                    </router-link>
                </div>
            </div>
            <div class="col-lg-9">
                <indexTable :searchText="$t('shippingOperations.searchForOperation')"
                :class="'box-table'"
                :statusSearch="true"
                    :statusValues="[
                        { title: $t('shippingOperations.orderStatus'), value: '' },
                        { title: $t('shippingOperations.beingProcessed'), value: 0 },
                        { title: $t('shippingOperations.delivery'), value: 1 },
                        { title: $t('shippingOperations.paid'), value: 2},
                    ]"
                    :emptyTableText="$t('shippingOperations.NoShipments')"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :filter="{point_of_sale_id: $route.params.id}"
                    localDatabaseTable="shippingOperations"
                    :timeTable="true"
                    :key="reload"
                    deleteRoute="/shippingOperations"
                    table="shippingOperations"
                    :withoutAdd="true"
                    :popUpMargin="true"
                    :cloumns="[
                            {
                                column: 'customer_id',
                                title: $t('shippingOperations.customerName'),
                                type: 'link',
                                to:'customer',
                                sort: true,
                                link: false
                            },
                            {
                                column: 'date',
                                title: $t('shippingOperations.date'),
                                type: 'text',
                                sort: true,
                            },
                            {
                            column: 'out_date',
                            title: $t('shippingOperations.outDate'),
                            type: 'text',
                            sort: true,
                            },
                            {
                            column: 'invoice_id',
                            title: $t('shippingOperations.invoiceCode'),
                            type: 'linkInvoice',
                            to:'invoice',
                            sort: true,
                            link: false
                            },
                            {
                            column: 'address1',
                            title: $t('shippingOperations.addres1'),
                            type: 'text',
                            sort: true,
                            },
                            {column: 'total',    title: $t('pointOfSales.invoices.total') ,type: 'text', sort: true},
                            {column: 'delivry_id',    title: $t('pointOfSales.invoices.DeliveryRepresentative') ,type: 'link', to:'delivery', sort: true, link: false},
                            {column: 'status',    title: $t('shippingOperations.orderStatus') ,type: 'status' , sort: true ,  values: [
                                { title: $t('shippingOperations.beingProcessed'), value: 0, color: 'dark'},
                                { title: $t('shippingOperations.delivery'), value: 1, color: 'primary' },
                                { title: $t('shippingOperations.paid'), value: 2, color: 'success' },
                            ]},
                            {
                            column: 'options',
                            title: $t('shippingOperations.settings'),
                            type: 'options',
                            options: [
                                {name: 'showShipping'},
                                {name: 'shippingPay'},
                                { name: 'edit', role: $user.admin || $user.role.shippingOperations_edit },
                                { name: 'printShippingOperation', role: true },
                                { name: 'delivaryPointOfSale',   role: true},
                                { name: 'delete', role: $user.admin || $user.role.shippingOperations_delete },
                            ],
                            },
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
            <div class="col-lg-3">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-header-title">
                            <i class="fal fa-rocket"></i>{{$t('shippingOperations.availablePilots')}}
                        </h4>
                    </div>
                    <div class="table-responsive">
                        <div class="delivery-container" v-for="(delivary, index) in $deliveries[$route.params.id].filter(el => !el.onWay).sort(this.$dynamicSort({orderBy: 'inDate', orderType: 'desc'}))" :key="index">
                            <div class="delivary-item">
                                <p class="title">{{delivary.name}}</p>
                                <p class="text">{{$dateFormat(delivary.inDate, 'time')}}</p>
                            </div>
                            <div class="badge badge-success"> {{$t('shippingOperations.effective')}} </div>
                        </div>
                        <div class="pos-sidebar-empty-table delivary-empty" v-if="$deliveries[$route.params.id].filter(el => !el.onWay).length == 0">
                             {{$t('shippingOperations.noDelegatesAvailable')}}
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header"><h4 class="card-header-title"><i class="far fa-shipping-fast"></i>{{$t('shippingOperations.theMessengersAreOnTheWay')}}</h4></div>
                    <div class="table-responsive">
                        <div class="delivery-container" v-for="(delivary, index) in $deliveries[$route.params.id].filter(el => el.onWay).sort(this.$dynamicSort({orderBy: 'outDate', orderType: 'asc'}))" :key="index">
                            <div class="delivary-item">
                                <p class="title">{{delivary.name}}</p>
                                <p class="text">{{$dateFormat(delivary.outDate, 'time')}}</p>
                            </div>
                            <div class="badge badge-primary"> {{$t('shippingOperations.onMyWay')}}</div>
                            <button class="btn btn-light returned-btn" title="$t('shippingOperations.arrival')" @click="$returnDelivary($route.params.id, delivary.id)">
                                <i class="fas fa-undo"></i>
                            </button>
                        </div>
                        <div class="pos-sidebar-empty-table delivary-empty" v-if="$deliveries[$route.params.id].filter(el => el.onWay).length == 0">
                            {{$t('shippingOperations.thereAreNoDelegatesOutside')}}
                       </div>
                    </div>
                </div>
            </div>
        </div>
        <changeDelivary v-if="changeShippingOperation != null" :ofline="ofline"/>
        <payDelivary v-if="payShippingOperation != null" :ofline="ofline"/>
        <shippingShow v-if="showShippingOp"/>
        <invoiceShow v-if="show"/>
    </div>
</template>
<script>
    import indexTable from '@/elements/index/indexTable.vue'
    import changeDelivary   from './components/changeDelivary.vue';
    import payDelivary   from './components/payDelivary.vue';
    import invoiceShow from './components/invoiceShow.vue'
    export default {
        data() {
            return {
                path: '/pointOfSales/shippingOperations/show',
                type: 'index',
                changeShippingOperation: null,
                payShippingOperation: null,
                ofline: false,
                reload: 0,
                showShippingOp: false,
                shippingOperation: null,
                show: false,
                invoice: null
            }
        },
        methods: {
            changeDelivary (id, ofline) {
                this.changeShippingOperation = id;
                if (ofline) {
                    this.ofline = true;
                } else {
                    this.ofline = false;
                }
            },
            pay (id, ofline) {
                this.payShippingOperation = id;
                if (ofline) {
                    this.ofline = true;
                } else {
                    this.ofline = false;
                }
            },
            showShipping (id, ofline) {
                this.show = true
                var fakeId = 0
                if (ofline) {
                    let shippingOperation = this.$localDatabase.shippingOperations[id]
                    let invoice = this.$localDatabase.pointOfSalesInvoices.find(el => el.upload_key == shippingOperation.refrance_invoice)
                    fakeId = invoice.upload_key
                } else {
                    let data = JSON.parse(localStorage.getItem('pointOfSales/shippingOperations/showCashe'))
                    let items = data.data
                    let item = items.find(el => el.id == id)
                    fakeId = item.invoice.upload_key
                }
                var myel = this
                setTimeout(function() {
                    var invoice = myel.$getPosInvoice(fakeId)
                    invoice.quotationItems =  invoice.invoiceItems
                    invoice.quotationItems.forEach(el => {el.product_name = el.name})
                    invoice.subtotal = parseFloat(invoice.subTotal)
                    myel.invoice = invoice
                }, 20);
            }
        },
        mounted() {
            this.$intPosDeliveries(this.$route.params.id)
        },
        components: {
            indexTable,
            changeDelivary,
            payDelivary,
            invoiceShow
        }

    };

</script>
