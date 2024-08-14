<template>
    <div class="container-fluid">
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col ml-n2">
                                <h4 class="mb-1">
                                    <a>{{$t('storesTransfers.show.transferOperation')}} <strong># {{item.code}}</strong></a>
                                </h4>
                            </div>
                            <div class="col-auto">
                                <router-link :to="path+'/'+item.id + '/edit'" class="btn btn-sm btn-primary" :title="$t('storesTransfers.show.edit')">
                                    <i class="fas fa-edit"></i>
                                </router-link>

                                <a @click="print()" class="btn btn-sm btn-primary" :title="$t('storesTransfers.show.print')">
                                    <i class="fas fa-print"></i>
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-8">
                <div class="card card-body p-5 invoice-show">
                    <div class="row">
                        <div class="col-12 text-center">
                            <img :src="logo" class="img-fluid mb-4" style="max-width: 4.5rem;" v-if="$option.image != null && !loading">
                            <h2 class="mb-2">
                                {{$option.name}}
                            </h2>


                            <p class="text-muted">
                                <strong>{{$t('storesTransfers.show.transferOperation')}}</strong> #{{item.code}}
                            </p>

                            <p class="text-muted">
                              <strong>{{$t('storesTransfers.show.fromStoreName')}}</strong> {{item.fromStore ? item.fromStore.name : '--'}}
                            </p>

                            <p class="text-muted">
                              <strong>{{$t('storesTransfers.show.toStoreName')}}</strong> {{item.toStore ? item.toStore.name : '--'}}
                            </p>

                            <p class="text-muted mb-2">
                              <strong>{{$t('storesDeposits.form.date')}}:</strong>   {{$dateFormat(item.date)}} 
                            </p>

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table my-w">
                                    <thead>
                                        <tr>
                                            <th class="px-0 bg-transparent border-top-0">
                                                <span class="h6">{{$t('storesTransfers.show.ProductItem')}}</span>
                                            </th>
                                            <th class="px-0 bg-transparent border-top-0">
                                                <span class="h6">{{$t('storesTransfers.show.description')}}</span>
                                            </th>
                                            <th class="px-0 bg-transparent border-top-0">
                                                <span class="h6">{{$t('storesTransfers.show.Quantity')}}</span>
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="qItem in item.quotationItems" :key="qItem.id">
                                            <td class="px-0">
                                                {{qItem.product_name}}
                                            </td>
                                            <td class="px-0">
                                                {{qItem.description}}
                                            </td>
                                            <td class="px-0">
                                                {{qItem.quantity}} {{qItem.unit ? qItem.unit.unit : ''}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" class="px-0 border-top border-top-2">
                                                <strong> {{$t('storesTransfers.show.totalQuantity')}}</strong>
                                            </td>
                                            <td  colspan="1"  class="px-0 border-top border-top-2">
                                                <span class="h3">
                                                  {{itemsCount}}
                                                </span>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            <div class="w-100" v-if="item.notes != null">
                                <hr class="my-3">
                                <h4 class="text-uppercase">{{$t('storesTransfers.show.notes')}}</h4>
                                <p class="text-muted mb-0">{{item.notes}}</p>
                            </div>
                            <div class="w-100" v-if="item.terms != null">
                                <hr class="my-3">
                                <h4 class="text-uppercase">{{$t('storesTransfers.show.termsOfOffer')}}</h4>
                                <p class="text-muted mb-0">{{item.terms}}</p>
                            </div>
                            <div class="w-100 inv-footer" v-if="$option.invoice_footer != null">
                                <hr class="my-3">
                                <p class="text-muted mb-0"  v-html="$option.invoice_footer != null? $option.invoice_footer : ''"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-header-title">
                            {{$t('storesTransfers.show.invoice')}} : #{{item.code}}
                        </h4>
                    </div>
                    <div class="card-body">
                        <p>{{$t('storesTransfers.show.createdIn')}} {{item.created}}, (<small>{{$t('storesTransfers.show.LastUpdate')}} {{item.updated}}</small>)</p>
                        <p><strong>{{$t('invoices.show.Administrator')}}</strong> : {{item.user? item.user.name : '--'}}</p>
                        <p><strong>{{$t('storesTransfers.show.fromStoreName')}}</strong> : {{item.fromStore ? item.fromStore.name : '--'}}</p>
                        <p><strong>{{$t('storesTransfers.show.toStoreName')}}</strong> : {{item.toStore ? item.toStore.name : '--'}}</p>
                    </div>
                </div>
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
                path: '/storesTransfers',
                subdomain: localStorage.getItem('subdomain'),
                item: {},
                salesPayments: {},
                storesHistories: {},
                salesPaymentForm: false,
                addId: this.$route.params.id,
                amount: 0,
                type: 'show',
                loading: true,
                itemsCount: 0,

                printInvoice: false,
                site: localStorage.getItem('site')
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
                        this.salesPayments = this.item.sales_payments;
                        this.storesHistories = this.item.stores_histories;
                        this.amount = this.item.rest;
                        this.item.quotationItems.forEach(item => {
                            this.itemsCount += (item.quantity - 0);
                        });
                        this.loading = false;
                    });
            },
            print() {
                this.$parent.printedStoresTransfer = this.item;
            }
        },
        components: {
            showFile,
        }
    };

</script>
