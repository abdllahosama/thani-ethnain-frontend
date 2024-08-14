<template>
    <div>
        <div class="row h-100 ">
            <div class="col-3">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col">
                                <h6 class="text-uppercase text-muted mb-2">
                                    {{$t('main.PROFITS')}}
                                </h6>
                                <span class="h2 mb-0">
                                    {{$moneyFormat(items.earning)}} 
                                </span>
                                <span class="badge mt-n1" :class="earningPercen > 0 ? 'badge-soft-success': 'badge-soft-danger'">
                                    {{earningPercen}} %
                                </span>
                            </div>
                            <div class="col-auto">
                                <span class="h2 fe fe-dollar-sign text-muted mb-0"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col">
                                <h6 class="text-uppercase text-muted mb-2">
                                    {{$t('main.SALES')}}
                                </h6>
                                <span class="h2 mb-0">
                                    {{$moneyFormat(items.total)}} 
                                </span>
                                <span class="badge mt-n1" :class="totalPercen > 0 ? 'badge-soft-success': 'badge-soft-danger'">
                                    {{totalPercen}} %
                                </span>
                            </div>
                            <div class="col-auto">
                                <span class="h2 fe fe-dollar-sign text-muted mb-0"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col">
                                <h6 class="text-uppercase text-muted mb-2">
                                    {{$t('main.CASH')}}
                                </h6>
                                <span class="h2 mb-0">
                                    {{$moneyFormat(items.paid)}}  
                                </span>
                                <span class="badge mt-n1" :class="paidPercen > 0 ? 'badge-soft-success': 'badge-soft-danger'">
                                    {{paidPercen}} %
                                </span>
                            </div>
                            <div class="col-auto">
                                <span class="h2 fe fe-dollar-sign text-muted mb-0"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col">
                                <h6 class="text-uppercase text-muted mb-2">
                                    {{$t('main.BALANCE')}}
                                </h6>
                                <span class="h2 mb-0">
                                    {{$moneyFormat(items.rest)}}
                                </span>
                                <span class="badge mt-n1" :class="restPercen > 0 ? 'badge-soft-success': 'badge-soft-danger'">
                                    {{restPercen}} %
                                </span>
                            </div>
                            <div class="col-auto">
                                <span class="h2 fe fe-dollar-sign text-muted mb-0"></span>
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
                earningPercen: 0,
                totalPercen: 0,
                paidPercen: 0,
                restPercen: 0
            }
        },
        mounted () {
            if (this.lastMonthItems.earning) {
                this.earningPercen = Math.round((this.items.earning - this.lastMonthItems.earning) / this.lastMonthItems.earning * 100);
            } else {
                this.earningPercen = 100;
            }

            if (this.lastMonthItems.total) {
                this.totalPercen = Math.round((this.items.total - this.lastMonthItems.total) / this.lastMonthItems.total * 100);
            } else {
                this.totalPercen = 100;
            }

            if (this.lastMonthItems.paid) {
                this.paidPercen = Math.round((this.items.paid - this.lastMonthItems.paid) / this.lastMonthItems.paid * 100);
            } else {
                this.paidPercen = 100;
            }

            if (this.lastMonthItems.rest) {
                this.restPercen = Math.round((this.items.rest - this.lastMonthItems.rest) / this.lastMonthItems.rest * 100);
            } else {
                this.restPercen = 100;
            }
        },
        props: ['items', 'lastMonthItems']
    };

</script>
