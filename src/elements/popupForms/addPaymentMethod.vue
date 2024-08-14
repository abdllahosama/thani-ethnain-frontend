<template>
    <div class="modal fade show">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="sm-stop-edit" v-if="loading"></div>
                <div class="modal-card card">
                    <div class="card-header">
                        <h4 class="card-header-title">
                            {{$t('paymentMethods.form.createAPaymentMethod')}}
                        </h4>
                        <button type="button" class="close" @click="colse()">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group row">
                                    <label class="col-md-2">
                                        {{$t('paymentMethods.form.theNameOfThePaymentMethod')}}
                                    </label>
                                    <div class="add-input col-md-10">
                                        <input type="text" class="form-control" v-model="paymentMethod.name" :class="{ 'is-invalid' : errors.name}" @change="errors.name = false">
                                        <span><i class="far fa-pen-square"></i></span>
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
                                <button @click="createَQuotation()" class="btn btn-dark" v-if="!loading">
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
                paymentMethod: {},
                errors: {
                    name: false
                },
                loading: false
            }
        },
        methods: {
            createَQuotation() {
                var error = 0;
                if (typeof this.paymentMethod.name === 'undefined' || this.paymentMethod.name == '') {
                    error = 1;
                    this.errors.name = true;
                }
                if (error == 0) {
                    this.loading = true;
                    var key = (new Date()).getTime().toString() + Math.floor(Math.random() * 999)
                    this.paymentMethod.ofline = true
                    this.paymentMethod.upload_key = key
                    axios.post(this.$linkGnirator('/paymentMethods'), {data: [this.paymentMethod]})
                    .then(response => {
                        this.loading = false;
                        this.$parent.model = false;
                        this.$parent.$parent.model = 0;
                        this.$updateDatabase(['paymentMethods']);
                        this.$parent.item.payment_method_id = 0;
                    });
                }
            },
            colse() {
                this.$parent.model = false;
                this.$parent.$parent.model = 0;
                this.$parent.item.payment_method_id = 0;
            }
        }
    }

</script>
