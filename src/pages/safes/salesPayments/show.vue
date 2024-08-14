<template>
    <div class="container-fluid">
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col ml-n2">
                                <h4 class="mb-1">
                                    <a>{{$t('salesPayments.show.salesPayment')}} <strong> {{item.code}}</strong></a>
                                </h4>
                            </div>
                            <div class="col-auto">
                                <router-link :to="path+'/'+item.id + '/edit'" class="btn btn-sm btn-primary" :title="$t('salesPayments.show.Modification')">
                                    <i class="fas fa-edit"></i>
                                </router-link>
                                <a @click="print(item.id)" class="btn btn-sm btn-primary" :title="$t('salesPayments.show.Printing')">
                                    <i class="fas fa-print"></i>
                                </a>
                                <a :href="$linkGnirator('/salespayments/' + item.id + '/pdf')" download class="btn btn-sm btn-primary" :title="$t('salesPayments.show.DownloadPDF')">
                                    <i class="fas fa-download"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-header-title">
                            <i class="fal fa-credit-card-front"></i>
                            {{$t('salesPayments.show.PaymentDetails')}}
                        </h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-9">
                                <table class="table table-sm table-nowrap customed-table-small">
                                    <tbody>
                                        <tr>
                                            <th scope="row">{{$t('salesPayments.form.PaymentNumber')}} </th>
                                            <td>{{item.code}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{$t('salesPayments.form.PaymentDate')}}</th>
                                            <td>{{$dateFormat(item.date)}}   </td>
                                        </tr>
                                        <tr>
                                          <th scope="row">{{$t('salesPayments.show.AdministratorAdministrator')}}</th>
                                          <td>{{item.user ? item.user.name : '--'}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{$t('salesPayments.show.referenceNumber')}}</th>
                                            <td>{{item.refrance != null ? item.refrance : '--'}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{$t('salesPayments.show.ReceiveFrom')}}</th>
                                            <td>
                                                <router-link :to="'/customers/' + item.customer.id" v-if="item.client_type == 0">{{item.customer.name}}</router-link>
                                                <router-link :to="'/suppliers/' + item.supplier.id" v-if="item.client_type == 1">{{item.supplier.name}}</router-link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{$t('salesPayments.form.PaymentMethod')}}</th>
                                            <td scope="row">{{item.paymentMethod != null ? item.paymentMethod.name : '--'}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{$t('salesPayments.show.Treasury')}}</th>
                                            <td>
                                                <router-link :to="'/safes/' + item.safe.id" v-if="item.safe">{{ item.safe.name}}</router-link>
                                                    {{item.safe ? '' : '--'}}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-xl-3">
                                <div class="price-show">
                                    <div class="price-content">
                                        <p>{{$t('salesPayments.form.ReceivedAmount')}}</p>
                                        <h1>{{$moneyFormat(item.cost)}}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <!--
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-header-title">
                            <i class="fal fa-user-alt"></i>
                            {{$t('salesPayments.show.PayFromThe')}}
                        </h4>
                    </div>
                    <div class="data-table-header card-body">
                        <div class="row">
                            <div class="col-xl-2">
                                <div>
                                    <div class="row">
                                        <div class="col-xl-12 col-6">{{$t('salesPayments.show.customerName')}}</div>
                                        <div class="col-xl-12 col-6">
                                            <router-link :to="'/customers/' + item.customer.id"  v-if="item.client_type == 0">{{item.customer.name}}</router-link>
                                            <router-link :to="'/suppliers/' + item.supplier.id"  v-if="item.client_type == 1">{{item.supplier.name}}</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-2">
                                <div class="row">
                                    <div class="col-xl-12 col-6">{{$t('salesPayments.show.cost')}}</div>
                                    <div class="col-xl-12 col-6"> {{$moneyFormat(item.cost)}} </div>
                                </div>
                            </div>
                            <div class="col-xl-1">
                                <div class="row">
                                    <div class="col-xl-12 col-6">{{$t('salesPayments.show.bank')}}</div>
                                    <div class="col-xl-12 col-6"> {{$moneyFormat(item.bank_fees)}} </div>
                                </div>
                            </div>
                            <div class="col-xl-1">
                                <div class="row">
                                    <div class="col-xl-12 col-6">{{$t('salesPayments.show.tax')}}</div>
                                    <div class="col-xl-12 col-6"> {{$moneyFormat(item.bank_tax_amount)}} </div>
                                </div>
                            </div>
                            <div class="col-xl-1">
                                <div class="row">
                                    <div class="col-xl-12 col-6">{{$t('salesPayments.form.cash')}}</div>
                                    <div class="col-xl-12 col-6"> {{$moneyFormat(item.cash)}} </div>
                                </div>
                            </div>
                            <div class="col-xl-2">
                                <div class="row">
                                    <div class="col-xl-12 col-6">{{$t('salesPayments.show.returned')}}</div>
                                    <div class="col-xl-12 col-6"> {{$moneyFormat(item.bank_fees)}} </div>
                                </div>
                            </div>
                            <div class="col-xl-3">
                                <div class="row">
                                    <div class="col-xl-6">
                                        <div class="row">
                                            <div class="col-xl-12 col-6">{{$t('salesPayments.show.PreviousBalance')}}</div>
                                            <div class="col-xl-12 col-6"> {{$moneyFormat(item.old_balance)}} </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-6">
                                        <div class="row">
                                            <div class="col-xl-12 col-6">{{$t('salesPayments.show.TotalBalance')}}</div>
                                            <div class="col-xl-12 col-6"> {{$moneyFormat(item.new_balance)}} </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            -->
                <showFile/>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import showFile from '@/elements/show/showFile.vue';

    export default {
        data() {
            return {
                path: '/salesPayments',
                item: {},
                printInvoice: false,
            }
        },
        mounted() {
            this.getitem();
        },
        methods: {
            getitem() {
                axios.get(this.$linkGnirator(this.path + '/' + this.$route.params.id))
                    .then(response => {
                        this.item = response.data;
                    });
            },
            print (id) {
                this.$parent.printedSalesPayment = this.item;
            }
        },
        components: {
            showFile,
        }
    };

</script>
