<template>
    <div class="modal fade show">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="sm-stop-edit" v-if="loading"></div>
                <div class="modal-card card">
                    <div class="card-header">
                        <h4 class="card-header-title">
                            {{$parent.$t('quotations.form.convertToInvoice')}}
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
                                        {{$t('invoices.form.ProductStore')}}
                                    </label>
                                    <div class="icon-input col-md-12">
                                        <span>
                                            <i class="far fa-store-alt"></i>
                                        </span>
                                        <select type="text" class="form-control" v-model="quotation.store_id" :class="{ 'is-invalid' : errors.store_id}" @change="errors.store_id = false">
                                            <option value="">{{$t('invoices.form.ChooseAStore')}}</option>
                                            <option v-for="store in $database.stores" :key="store.id" :value="store.id">{{store.name}}</option>
                                        </select>
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
                                            <option :value="invoiceGroup.id" v-for="invoiceGroup in $database.invoiceGroups" :key="invoiceGroup.id">{{invoiceGroup.name}}</option>
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
                                <button @click="convertToInvoce()" class="btn btn-dark" v-if="!loading">
                                    <i class="far fa-save"></i>
                                    {{$t('popup.create')}}
                                </button>
                                <button class="btn btn-dark" v-if="loading">
                                    {{$t('allerts.loading')}} <span class="loading-s1 sm-j">.</span><span class="loading-s2 sm-j">.</span><span class="loading-s3 sm-j">.</span>
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
                    date: new Date().toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0,10),
                    invoice_group : this.$option.invoice_invoice_group_id,
                    store_id: ''
                },
                errors: {
                    invoice_group : false,
                    store_id: false
                },
                loading: false
            }
        },
        methods: {
            convertToInvoce() {
                var error = 0;
                if (typeof this.quotation.invoice_group === 'undefined' || this.quotation.invoice_group == '') {
                    error = 1;
                    this.errors.invoice_group = true;
                }
                if (typeof this.quotation.store_id === 'undefined' || this.quotation.store_id == '') {
                    error = 1;
                    this.errors.store_id = true;
                }
                if (error == 0) {
                    this.loading = true;
                    axios.post(this.$linkGnirator('/quotations/' + this.$route.params.id + '/convert'), this.quotation)
                        .then(response => {
                            this.loading = false;
                            this.$parent.convertToInvoce = false;
                            this.$parent.$parent.model = 0;
                            this.$parent.$parent.aletText = this.$t('allerts.invoiceSuccessfullyAdde');
                            this.$parent.$parent.alertType = "success";
                            this.$router.push('/invoices/' + response.data);
                        });
                }
            },
            colse() {
                this.$parent.convertToInvoce = false;
                this.$parent.$parent.model = 0;
            }
        },
    }

</script>
