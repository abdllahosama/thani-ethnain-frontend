<template>
    <div class="modal fade show">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-card card">
                    <div class="card-header">
                        <!-- Title -->
                        <h4 class="card-header-title">
                            {{$t('components.products.importFromExcelFile')}}
                        </h4>
                        <!-- Close -->
                        <button type="button" class="close" @click="colse()">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group row">
                                    <label class="col-sm-12">
                                        {{$t('components.products.chooseExcelFile')}}
                                    </label>
                                    <div class="icon-input col-md-12">
                                        <span>
                                            <i class="far fa-upload"></i>
                                        </span>
                                        <div class="search-input">
                                            <input type="file" id="file" ref="file" class="form-control" @change="handleFileUpload()" :class="{ 'is-invalid' : errors.file}">
                                        </div>
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
                                <button @click="importFile()" class="btn btn-dark">
                                    <i class="far fa-save"></i>
                                    {{$t('invoices.form.create')}}
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
                file: '',
                errors: {
                    file: false
                }
            }
        },
        methods: {
            handleFileUpload() {
                this.file = this.$refs.file.files[0];
                this.errors.file = false;
            },
            importFile() {
                var error = 0;
                if (typeof this.file === 'undefined' || this.file == '') {
                    error = 1;
                    this.errors.file = true;
                }
                if (error == 0) {
                    let formData = new FormData();
                    formData.append('file', this.file);
                    axios.post(this.$linkGnirator('/products/import/excel'),
                        formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    ).then(response => {
                        this.$parent.$parent.aletText = this.$t('components.products.productsBeenImportedSuccessfully');
                        this.$parent.$parent.alertType = "success";
                        this.colse();
                        this.$parent.gettem();
                        return response;
                    });
                }
            },
            colse() {
                this.$parent.importShow = false;
            }
        },
        mounted() {}
    }

</script>
