<template>
    <div class="modal fade show">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-card card">
                    <div class="card-header">
                        <h4 class="card-header-title">
                            {{$t('components.materials.createStore')}}
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
                                        {{$t('components.materials.theNameOfTheStore')}}
                                    </label>
                                    <div class="add-input col-md-10">
                                        <input type="text" class="form-control" v-model="store.name" :class="{ 'is-invalid' : errors.name}" @change="errors.name = false">
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
                                    {{$t('components.materials.colse')}}
                                </button>
                                <button @click="createَstore()" class="btn btn-dark">
                                    <i class="far fa-save"></i>
                                    {{$t('components.materials.create')}}
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
                store: {},
                errors: {
                    name: false
                }
            }
        },
        methods: {
            createَstore() {
                var error = 0;
                if (typeof this.store.name === 'undefined' || this.store.name == '') {
                    error = 1;
                    this.errors.name = true;
                }
                if (error == 0) {
                    axios.post(this.$linkGnirator('/stores'), this.store)
                    .then(response => {
                        this.$parent.model = false;
                        this.$parent.$parent.model = 0;
                        this.$parent.stores.unshift(response.data);
                        setTimeout(() => {this.$parent.item.store_id = response.data.id;}, 100);
                    });
                }
            },
            colse() {
                this.$parent.model = false;
                this.$parent.$parent.model = 0;
            }
        }
    }

</script>
