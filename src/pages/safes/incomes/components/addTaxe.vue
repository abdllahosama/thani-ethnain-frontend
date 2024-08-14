<template>
    <div class="modal fade show">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="sm-stop-edit" v-if="loading"></div>
                <div class="modal-card card">
                    <div class="card-header">
                        <h4 class="card-header-title">
                            {{$t('components.incomes.CreateATaxRate')}}
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
                                        {{$t('components.incomes.nameTheTaxRate')}}
                                    </label>
                                    <div class="add-input col-md-10">
                                        <input type="text" class="form-control" v-model="tax.name" :class="{ 'is-invalid' : errors.name}" @change="errors.name = false">
                                        <span><i class="far fa-pen-square"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group row">
                                    <label class="col-md-2">
                                        {{$t('components.incomes.theAverage')}}
                                    </label>
                                    <div class="add-input col-md-10">
                                        <input type="number" class="form-control" v-model="tax.rate" :class="{ 'is-invalid' : errors.rate}" @change="errors.rate = false" min="1" max="100">
                                        <span><i class="far fa-percentage"></i></span>
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
                                    {{$t('components.incomes.colse')}}
                                </button>
                                <button @click="createَQuotation()" class="btn btn-dark" v-if="!loading">
                                    <i class="far fa-save"></i>
                                    {{$t('components.incomes.create')}}
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
                tax: {},
                errors: {
                    name: false,
                    rate: false
                },
                loading: false
            }
        },
        methods: {
            createَQuotation() {
                var error = 0;
                if (typeof this.tax.name === 'undefined' || this.tax.name == '') {
                    error = 1;
                    this.errors.name = true;
                }
                if (typeof this.tax.rate === 'undefined' || this.tax.rate == '' || this.tax.rate < 1 || this.tax.rate > 100) {
                    error = 1;
                    this.errors.rate = true;
                }
                if (error == 0) {
                    this.loading = true;
                    var key = (new Date()).getTime().toString() + Math.floor(Math.random() * 999)
                    this.tax.ofline = true
                    this.tax.upload_key = key
                    axios.post(this.$linkGnirator('/taxes'), {data: [this.tax]})
                    .then(response => {
                        this.loading = false;
                        this.$parent.model = false;
                        this.$parent.$parent.model = 0;
                        this.$parent.item.tax_id = 0;
                        this.$updateDatabase(['taxes']);
                    });
                }
            },
            colse() {
                this.$parent.model = false;
                this.$parent.$parent.model = 0;
                this.$parent.item.tax_id = 0;
            }
        }
    }

</script>
