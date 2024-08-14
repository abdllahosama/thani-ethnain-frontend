<template>
    <div class="modal fade show">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="sm-stop-edit" v-if="loading"></div>
                <div class="modal-card card">
                    <div class="card-header">
                        <h4 class="card-header-title">
                            {{$t('components.materials.addSection')}}
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
                                        {{$t('components.materials.sectionName')}}
                                    </label>
                                    <div class="add-input col-md-10">
                                        <input type="text" class="form-control" v-model="section.name" :class="{ 'is-invalid' : errors.name}" @change="errors.name = false">
                                        <span><i class="far fa-pen-square"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group row">
                                    <label class="col-md-2">
                                        {{$t('components.materials.fatherSection')}}
                                    </label>
                                    <div class="add-input col-md-10">
                                        <select class="form-control" v-model="section.parent_id">
                                            <option value="0">لا يوجد</option>
                                            <option v-for="section in $parent.sections" :key="section.id" :value="section.id">{{section.name}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer card-footer-boxed">
                        <div class="row align-items-center justify-content-between">
                            <div class="col-auto"></div>
                            <div class="col-auto">
                                <button class="btn btn-outline-danger" @click="colse()">
                                    <i class="far fa-times"></i>
                                    {{$t('components.materials.colse')}}
                                </button>
                                <button @click="createَSection()" class="btn btn-dark" v-if="!loading">
                                    <i class="far fa-save"></i>
                                    {{$t('components.materials.create')}}
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
                section: {},
                errors: {
                    name: false
                },
                loading: false
            }
        },
        methods: {
            createَSection() {
                var error = 0;
                if (typeof this.section.name === 'undefined' || this.section.name == '') {
                    error = 1;
                    this.errors.name = true;
                }
                if (error == 0) {
                    this.loading = true;
                    var key = (new Date()).getTime().toString() + Math.floor(Math.random() * 999)
                    this.section.ofline = true
                    this.section.upload_key = key
                    axios.post(this.$linkGnirator('/sections'), {data: [this.section]})
                    .then(response => {
                        this.loading = false;
                        this.$parent.model = false;
                        this.$parent.$parent.model = 0;
                        this.$parent.item.section_id = 0;
                        this.$updateDatabase(['sections']);
                    });
                }
            },
            colse() {
                this.$parent.model = false;
                this.$parent.$parent.model = 0;
                this.$parent.item.section_id = 0;
            }
        }
    }
</script>
