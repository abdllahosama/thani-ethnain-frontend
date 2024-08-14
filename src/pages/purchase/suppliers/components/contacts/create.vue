<template>
    <div class="modal fade show">
        <div class="modal-dialog modal-dialog-centered  big-model">
            <div class="modal-content">
                <div class="modal-card card">
                    <div class="card-header">
                        <!-- Title -->
                        <h4 class="card-header-title">
                            {{$t('suppliers.show.createContact')}}
                        </h4>
                        <!-- Close -->
                        <button type="button" class="close" @click="colseCreateForm()">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="col-md-4">
                                        {{$t('suppliers.show.name')}}
                                    </label>
                                    <input type="text" class="form-control form-control-sm col-md-6" v-model="contact.name" :class="{ 'is-invalid' : errors.name}" @change="errors.name = false">
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-4">
                                        {{$t('suppliers.show.occupation')}}
                                    </label>
                                    <input type="text" class="form-control form-control-sm col-md-6" v-model="contact.job">
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-4">
                                        {{$t('suppliers.show.email')}}
                                    </label>
                                    <input type="text" class="form-control form-control-sm col-md-6" v-model="contact.email">
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-4">
                                        {{$t('suppliers.show.telephone')}}
                                    </label>
                                    <input type="text" class="form-control form-control-sm col-md-6" v-model="contact.telephone">
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-4">
                                        {{$t('suppliers.show.phone')}}
                                    </label>
                                    <input type="text" class="form-control form-control-sm col-md-6" v-model="contact.mobile">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="col-md-4">
                                        {{$t('suppliers.show.Linkedin')}}
                                    </label>
                                    <input type="text" class="form-control form-control-sm col-md-6" v-model="contact.linkedin">
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-4">
                                        {{$t('suppliers.show.facebook')}}
                                    </label>
                                    <input type="text" class="form-control form-control-sm col-md-6" v-model="contact.facebook">
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-4">
                                        {{$t('suppliers.show.twitter')}}
                                    </label>
                                    <input type="text" class="form-control form-control-sm col-md-6" v-model="contact.twitter">
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-4">
                                        {{$t('suppliers.show.googleplus')}}
                                    </label>
                                    <input type="text" class="form-control form-control-sm col-md-6" v-model="contact.google_plus">
                                </div>
                            </div>
                        </div>


                        <div class="form-group">
                            <label>
                                {{$t('suppliers.show.note')}}
                            </label>
                            <textarea class="form-control" v-model="contact.note"></textarea>
                        </div>

                    </div>
                    <div class="card-footer card-footer-boxed">
                        <div class="row align-items-center justify-content-between">
                            <div class="col-auto">
                            </div>
                            <div class="col-auto">
                                <!-- Link -->
                                <button class="btn btn-primary" @click="clearCreateForm()">
                                    <i class="far fa-eraser"></i>
                                    {{$t('suppliers.show.remove')}}
                                </button>
                                <button class="btn btn-outline-danger" @click="colseCreateForm()">
                                    <i class="far fa-times"></i>
                                    {{$t('suppliers.show.close')}}
                                </button>
                                <button @click="createContacts()" class="btn btn-dark">
                                    <i class="far fa-check"></i>
                                    {{$t('suppliers.show.create')}}
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
                contact: {
                    user_type: 2,
                    user_id: this.$route.params.id,
                },
                errors: {
                    name: false
                }
            }
        },
        methods: {
            createContacts() {
                var error = 0;
                if (typeof this.contact.name === 'undefined' || this.contact.name == '') {
                    error = 1;
                    this.errors.name = true;
                }
                if (error == 0) {
                    axios.post(this.$linkGnirator('/contacts'), this.contact)
                        .then(response => {
                            this.$parent.contacts.unshift(response.data.contact);
                            this.$parent.create = null;
                            this.$parent.$parent.$parent.model = 0;
                            this.clearCreateForm();
                        });
                }
            },
            colseCreateForm() {
                this.$parent.create = null;
                this.$parent.$parent.$parent.model = 0;
            },
            clearCreateForm() {
                this.contact = {
                    user_type: 1,
                    user_id: this.$route.params.id,
                };
                this.errors = {
                    name: false
                };
            }
        }
    }

</script>
