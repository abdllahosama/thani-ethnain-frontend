<template>
    <div class="modal fade show">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-card card">
                    <div class="card-header">
                        <h4 class="card-header-title">
                            {{$t('invoices.form.addInvoice')}}
                        </h4>
                        <button type="button" class="close" @click="colse()">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group row">
                                    <label class="col-sm-12">
                                        {{$t('invoices.form.customerName')}}
                                    </label>
                                    <div class="icon-input col-md-12">
                                        <span>
                                            <i class="far fa-user-alt"></i>
                                        </span>
                                        <div class="search-input">
                                            <input type="text" class="form-control" v-model="search" @blur="blurSearch()" :class="{ 'is-invalid' : errors.name}" @change="errors.name = false">
                                            <ul class="list-unstyled search-selects" v-if="searchCustomers.length > 0">
                                                <li v-for="customer in searchCustomers" :key="customer.id" @click="changeCustomer(customer.id, customer.name)">{{customer.name}}</li>
                                            </ul>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group row">
                                    <label class="col-sm-12">
                                        {{$t('invoices.form.ProductStore')}}
                                    </label>
                                    <div class="icon-input col-md-12">
                                        <span>
                                            <i class="far fa-store-alt"></i>
                                        </span>
                                        <div class="search-input">
                                            <select type="text" class="form-control" v-model="quotation.store_id" :class="{ 'is-invalid' : errors.store_id}" @change="errors.store_id = false">
                                                <option value="">{{$t('invoices.form.ChooseAStore')}}</option>
                                                <option v-for="store in stores" :key="store.id" :value="store.id">{{store.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group row">
                                    <label class="col-sm-12">
                                        {{$t('invoices.form.invoiceDate')}}
                                    </label>
                                    <div class="icon-input col-md-12">
                                        <span>
                                            <i class="far fa-calendar"></i>
                                        </span>
                                        <input type="date" class="form-control" v-model="quotation.date">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group row">
                                    <label class="col-sm-12">
                                        {{$t('invoices.form.quotationGroup')}}
                                    </label>
                                    <div class="icon-input col-md-12">
                                        <span>
                                            <i class="far fa-code-branch"></i>
                                        </span>
                                        <select  class="form-control" v-model="quotation.invoice_group" :class="{ 'is-invalid' : errors.invoice_group}" @change="errors.invoice_group = false"> 
                                            <option value="">{{$t('invoices.form.selectGroup')}}</option>
                                            <option :value="invoiceGroup.id" v-for="invoiceGroup in invoiceGroups" :key="invoiceGroup.id">{{invoiceGroup.name}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer card-footer-boxed">
                        <div class="row align-items-center justify-content-between">
                            <div class="col-auto">
                            </div>
                            <div class="col-auto">
                                <button class="btn btn-outline-danger" @click="colse()">
                                    <i class="far fa-times"></i>
                                    {{$t('popup.colse')}}
                                </button>
                                <button @click="createَQuotation()" class="btn btn-dark">
                                    <i class="far fa-save"></i>
                                    {{$t('popup.create')}}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    
    export default {
        data() {
            return {
                quotation: {
                    customer_id : 0,
                    customer_name : '',
                    date: new Date().toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0,10),
                    invoice_group : this.$option.invoice_invoice_group_id,
                    store_id: ''
                },
                errors: {
                    name : false,
                    store_id: false,
                    invoice_group : false
                },
                search : '',
                searchCustomers : {},
                noSearch : false,
                invoiceGroups: {},
                stores: {}
            }
        },
        methods: {
            getInvoiceGroups() {
                axios
                    .get(this.$linkGnirator('/invoiceGroupsItems'))
                    .then(response => {
                        this.invoiceGroups = response.data;
                    });
            },
            getStores() {
                axios
                    .get(this.$linkGnirator('/storesItems'))
                    .then(response => {
                        this.stores = response.data;
                    });
            },
            createَQuotation() {
                var error = 0;
                if (typeof this.search === 'undefined' || this.search == '') {
                    error = 1;
                    this.errors.name = true;
                }
                if (typeof this.quotation.store_id === 'undefined' || this.quotation.store_id == '') {
                    error = 1;
                    this.errors.store_id = true;
                }
                if (typeof this.quotation.invoice_group === 'undefined' || this.quotation.invoice_group == '') {
                    error = 1;
                    this.errors.invoice_group = true;
                }
                if (error == 0) {
                    axios.post(this.$linkGnirator('/invoices'), this.quotation)
                        .then(response => {
                            this.$parent.add = 0;
                            this.$parent.$parent.model = 0;
                            this.$parent.$parent.aletText = this.$t('allerts.invoiceSuccessfullyAdde');
                            this.$parent.$parent.alertType = "success";
                            this.$router.push('/invoices/' + response.data + '/edit');
                        });
                }
            },
            colse() {
                this.$parent.invoiceForm = false;
            },
            changeCustomer (id, name) {
                this.searchCustomers = {};
                this.quotation.customer_id   = id;
                this.quotation.customer_name = name;
                this.noSearch= true;

                this.search = name;
                
            },
            blurSearch () {
             setTimeout(() => {this.searchCustomers = {};}, 200);
            }
        },
        mounted() {
            this.getInvoiceGroups();
            this.getStores();
        },
        watch: {
            search : function(val) {
                this.quotation.customer_name = val;
                if(val != '' && this.noSearch == false) {
                    this.quotation.customer_id = 0;
                    clearTimeout(this.awaitingSearch);
                    this.awaitingSearch = setTimeout(() => {
                            axios.get(this.$linkGnirator('/customers/search/' + val))
                            .then(response => {
                                this.searchCustomers = response.data;
                            });
                        }, 300);
                } else if (val == '') {
                    this.quotation.customer_id = 0; 
                } else {
                        clearTimeout(this.awaitingSearch);
                        this.searchCustomers = {};
                        this.noSearch = false;
                    }
            }
        }
    }

</script>
