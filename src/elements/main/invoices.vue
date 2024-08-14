<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-header-title">
                    <i class="far fa-file-invoice-dollar"></i>
                    {{$t('main.invoiceOverview')}}
                </h4>
            </div>
            <div class="card-body">
                <div class="invoice-row">
                    <div class="invoice-item">
                        <router-link :to="'/invoices/status/0'">{{$t('main.DRAFT')}} <i class="fa fa-external-link-alt"></i></router-link>
                        <div class="invoice-total">{{$moneyFormat(items[0])}}</div>
                    </div>
                    <div class="invoice-item">
                        <router-link :to="'/invoices/status/1'">{{$t('main.SENT')}} <i class="fa fa-external-link-alt"></i></router-link>
                        <div class="invoice-total">{{$moneyFormat(items[1])}}</div>
                    </div>
                    <div class="invoice-item">
                        <router-link :to="'/invoices/status/2'">{{$t('main.VIEWED')}} <i class="fa fa-external-link-alt"></i></router-link>
                        <div class="invoice-total">{{$moneyFormat(items[2])}}</div>
                    </div>
                    <div class="invoice-item">
                        <router-link :to="'/invoices/status/3'">{{$t('main.PAID')}} <i class="fa fa-external-link-alt"></i></router-link>
                        <div class="invoice-total">{{$moneyFormat(items[3])}}</div>
                    </div>
                    <div class="invoice-item">
                        <router-link :to="'/invoices/status/4'">{{$t('main.CANCELED')}} <i class="fa fa-external-link-alt"></i></router-link>
                        <div class="invoice-total">{{$moneyFormat(items[4])}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['items']
    };
</script>
