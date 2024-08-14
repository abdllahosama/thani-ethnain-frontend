<template>
    <div class="modal fade show">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="sm-stop-edit" v-if="loading"></div>
                <div class="modal-card card">
                    <div class="card-header">
                        <!-- Title -->
                        <h4 class="card-header-title">
                            {{$t('allerts.Attention')}}
                        </h4>
                        <!-- Close -->
                        <button type="button" class="close" @click="colse()">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="card-body">
                        <p>{{$t('allerts.areYouReallySureToDeleteTheItem')}}</p>
                    </div>
                    <div class="card-footer card-footer-boxed">
                        <div class="row align-items-center justify-content-between">
                            <div class="col-auto">
                            </div>
                            <div class="col-auto">
                                <!-- Link -->
                                <button class="btn btn-outline-danger" @click="colse()">
                                    <i class="far fa-times"></i>
                                    {{$t('allerts.close')}}
                                </button>
                                <button @click="$parent.deleteItem(); loading = true;" class="btn btn-dark" v-if="!loading">
                                    <i class="far fa-check"></i>
                                    {{$t('allerts.confirm')}}
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
    export default {
        data() {
            return {
                loading: false
            }
        },
        methods: {
            colse() {
                this.$parent.delete_id = null;
                this.$parent.$parent.$parent.model = 0;
            }
        }
    }

</script>
