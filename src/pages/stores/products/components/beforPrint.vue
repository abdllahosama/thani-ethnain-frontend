<template>
    <div class="modal fade show">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-card card">
                    <div class="card-header">
                        <!-- Title -->
                        <h4 class="card-header-title">
                            {{$t('components.products.barcodePrinting')}}
                        </h4>
                        <!-- Close -->
                        <button type="button" class="close" @click="colse()">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="card-body">
                        <p>{{$t('components.products.selectDesiredBarcodeSize')}}</p>
                    </div>
                    <div class="card-footer card-footer-boxed">
                        <div class="row align-items-center justify-content-between">
                            <div class="col-auto">
                            </div>
                            <div class="col-auto">
                                <!-- Link -->
                                <button class="btn btn-outline-danger" @click="colse()">
                                    <i class="far fa-times"></i>
                                    {{$t('components.products.close')}}
                                </button>
                                <button @click="$parent.changeSize(1)" class="btn btn-dark">
                                    <i class="far fa-star"></i>
                                    {{$t('components.products.fullSize')}}
                                </button>
                                <button @click="$parent.changeSize(2)" class="btn btn-dark">
                                    <i class="far fa-star-half"></i>
                                    {{$t('components.products.halfSize')}}
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
        methods: {
            colse() {
                this.$parent.printBar = false;
            }
        }
    }

</script>
