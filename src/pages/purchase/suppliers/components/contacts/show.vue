<template>
    <div class="modal fade show">
        <div class="modal-dialog modal-dialog-centered  big-model">
            <div class="modal-content">
                <div class="modal-card card">
                    <div class="card-header">
                        <!-- Title -->
                        <h4 class="card-header-title">
                            {{$t('suppliers.show.showContact')}}
                        </h4>
                        <!-- Close -->
                        <button type="button" class="close" @click="colseShow()">
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
                                    <div class="col-md-6">: {{contact.name != null? contact.name : '--'}}</div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-4">
                                        {{$t('suppliers.show.occupation')}}
                                    </label>
                                    <div class="col-md-6">: {{contact.job != null? contact.job : '--'}}</div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-4">
                                        {{$t('suppliers.show.email')}}
                                    </label>
                                    <div class="col-md-6">: {{contact.email != null? contact.email : '--'}}</div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-4">
                                        {{$t('suppliers.show.telephone')}}
                                    </label>
                                    <div class="col-md-6">: {{contact.telephone != null? contact.telephone : '--'}}</div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-4">
                                        {{$t('suppliers.show.phone')}}
                                    </label>
                                    <div class="col-md-6">: {{contact.mobile != null? contact.mobile : '--'}}</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label class="col-md-4">
                                        {{$t('suppliers.show.Linkedin')}}
                                    </label>
                                    <div class="col-md-6">: {{contact.linkedin != null? contact.linkedin : '--'}}</div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-4">
                                        {{$t('suppliers.show.facebook')}}
                                    </label>
                                    <div class="col-md-6">: {{contact.facebook != null? contact.facebook : '--'}}</div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-4">
                                        {{$t('suppliers.show.twitter')}}
                                    </label>
                                    <div class="col-md-6">: {{contact.twitter != null? contact.twitter : '--'}}</div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-4">
                                        {{$t('suppliers.show.googleplus')}}
                                    </label>
                                    <div class="col-md-6">: {{contact.google_plus != null? contact.google_plus : '--'}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>
                                {{$t('suppliers.show.note')}}
                            </label>
                            <div class="lead"> {{contact.note != null? contact.note : '--'}}</div>
                        </div>
                    </div>
                    <div class="card-footer card-footer-boxed">
                        <div class="row align-items-center justify-content-between">
                            <div class="col-auto">
                            </div>
                            <div class="col-auto">
                                <!-- Link -->
                                <button class="btn btn-outline-danger" @click="colseShow()">
                                    <i class="far fa-times"></i>
                                    {{$t('suppliers.show.close')}}
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
                contact: {}
            }
        },
        mounted() {
            this.getContact();
        },
        methods: {
            getContact() {
                axios.get(this.$linkGnirator('/contacts/' + this.$parent.contacts[ this.$parent.show].id ))
                    .then(response => {
                        this.contact = response.data.contact;
                    });
            },
            colseShow() {
                this.$parent.show = null;
                this.$parent.$parent.$parent.model = 0;
            }
        }
    }

</script>
