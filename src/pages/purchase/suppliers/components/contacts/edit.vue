<template>
    <div class="modal fade show">
        <div class="modal-dialog modal-dialog-centered  big-model">
            <div class="modal-content">
                <div class="modal-card card">
                    <div class="card-header">

                        <!-- Title -->
                        <h4 class="card-header-title">
                            {{$t('suppliers.show.editContact')}}
                        </h4>

                        <!-- Close -->
                        <button type="button" class="close" @click="colseEdit()">
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
                                <button class="btn btn-outline-danger" @click="colseEdit()">
                                    <i class="far fa-times"></i>
                                    {{$t('suppliers.show.close')}}
                                </button>
                                <button @click="updateContact()" class="btn btn-dark">
                                    <i class="far fa-check"></i>
                                    {{$t('suppliers.show.edit')}}
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

                },
                errors: {
                    name: false
                }
            }
        },
        methods: {
            updateContact() {
                var error = 0;
                if (typeof this.contact.name === 'undefined' || this.contact.name == '') {
                    error = 1;
                    this.errors.name = true;
                }
                if (error == 0) {
                    this.contact._method = 'PUT';
                    axios.post(this.$linkGnirator('/contacts/' + this.contact.id), this.contact)
                        .then(response => {
                            this.$parent.contacts[this.$parent.edit] = this.contact;
                            this.$parent.edit = null;
                            this.$parent.$parent.$parent.model = 0;
                            return response;
                        });
                }
            },
            colseEdit() {
                this.$parent.edit = null;
                this.$parent.$parent.$parent.model = 0;
            },
            getContact() {
                axios.get(this.$linkGnirator('/contacts/' + this.$parent.contacts[this.$parent.edit].id))
                    .then(response => {
                        this.contact = response.data.contact;
                    });
            }
        },
        mounted() {
            this.getContact();
        }
    }

</script>
