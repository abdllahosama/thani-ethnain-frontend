<template>
    <div class="modal fade show">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-card card">
                    <div class="card-header">
                        <h4 class="card-header-title">
                            {{$t('components.whatsapp.sendByWhatsapp')}}
                        </h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group row">
                                    <label class="col-sm-12">
                                        {{$t('components.whatsapp.phoneNumber')}}
                                    </label>
                                    <div class="icon-input col-md-12">
                                        <span>
                                            +20
                                        </span>
                                        <div class="search-input w-100 p-0">
                                            <input type="number" v-model="phoneNumber" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group row">
                                    <label class="col-sm-12">
                                        {{$t('components.whatsapp.theMessage')}}
                                    </label>
                                    <div class="col-12">
                                        <textarea class="form-control" v-model="$parent.whatsappMessage"></textarea>
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
                                    {{$parent.$t('components.whatsapp.colse')}}
                                </button>
                                <button @click="send()" class="btn btn-dark" >
                                    <i class="far fa-send"></i>
                                    {{$parent.$t('components.whatsapp.send')}}
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
                phoneNumber: ""
            }
        },
        methods: {
            send () {
                var a = document.createElement('A');
                a.href = "https://wa.me/+2" + this.phoneNumber + "?text=" + this.$parent.whatsappMessage;
                a.target = "_blank";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                this.colse();
            },
            colse() {
                this.$parent.whatsappForm = false;
                this.$parent.whatsappMessage = false;
            }
        },
        mounted() {}
    }

</script>
