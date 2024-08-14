<template>
    <div class="modal fade show">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="sm-stop-edit" v-if="loading"></div>
                <div class="modal-card card">
                    <div class="card-header">
                        <!-- Title -->
                        <h4 class="card-header-title">
                             دفع الشيك
                        </h4>
                        <!-- Close -->
                        <button type="button" class="close" @click="colse()">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group row">
                                    <label class="col-sm-12">
                                      الخزينة
                                    </label>
                                    <div class="icon-input col-md-12">
                                        <span>
                                            <i class="far fa-treasure-chest"></i>
                                        </span>
                                        <select class="form-control" v-model="data.safe_id" :class="{ 'is-invalid' : errors.safe_id}">
                                            <option value="0">اختر خزينة</option>
                                            <optgroup label="الخزائن">
                                                <option v-for="safe in $database.safes" :key="safe.id" :value="safe.id">{{safe.name}}</option>
                                            </optgroup>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group row">
                                    <label class="col-sm-12">
                                        الملاحظات
                                    </label>
                                    <div class="col-md-12">
                                        <textarea class="form-control" v-model="data.notes"></textarea>
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
                                <!-- Link -->
                                <button class="btn btn-outline-danger" @click="colse()">
                                    <i class="far fa-times"></i>
                                    {{$t('invoices.form.colse')}}
                                </button>
                                <button @click="createَPay()" class="btn btn-dark" v-if="!loading">
                                    <i class="far fa-save"></i>
                                    {{$t('invoices.form.create')}}
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
                data: {
                    id : this.$parent.payId,
                    safe_id: 0,
                    notes: ''

                },
                errors: {
                    safe_id: false
                },



                showError: false,
                loading: false
            }
        },
        methods: {
            createَPay() {
                var error = 0;
                if (typeof this.data.safe_id === 'undefined' || this.data.safe_id < 1) {
                    error = 1;
                    this.errors.safe_id = true;
                }
                if (error == 0) {
                    this.loading = true;
                    axios.post(this.$linkGnirator('/purchasecheques/update/stat'), this.data)
                        .then(response => {
                            this.loading = false;
                            this.$parent.$parent.aletText = "تم دفع الشيك بنجاح";
                            this.$parent.$parent.alertType = "success";
                            this.$parent.getItems();
                            this.colse();
                            return response;
                        });
                }
            },
            colse() {
                this.$parent.payForm = false;
            },
        },
        mounted() {
          this.$updateDatabase(['safes'])
          var cheque = this.$parent.items.find(el => el.id == this.data.id);
          this.data.notes = cheque.notes;
        }
    }

</script>
