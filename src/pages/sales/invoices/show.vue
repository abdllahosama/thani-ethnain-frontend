<template>
    <div class="container-fluid" v-if="!loading">
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col ml-n2">
                                <h4 class="mb-1">
                                    <a>{{$t('invoices.form.invoice')}} <strong># {{item.code}}</strong></a>
                                </h4>
                            </div>
                            <div class="col-auto">
                                <router-link :to="path+'/'+item.id + '/edit'" class="btn btn-sm btn-primary" :title="$t('invoices.show.modulation')">
                                    <i class="fas fa-edit"></i>
                                </router-link>
                                <a :href="site + '/invoices/' + item.password + '/customer/show'"  class="btn btn-sm btn-primary" target="_blank" :title="$t('invoices.show.ExternaLink')">
                                    <i class="fas fa-link"></i>
                                </a>
                                <a @click="print()" class="btn btn-sm btn-primary" :title="$t('invoices.show.Printing')">
                                    <i class="fas fa-print"></i>
                                </a>
                                <a :href="$linkGnirator('/invoices/' + item.id + '/pdf', true)" download class="btn btn-sm btn-primary" :title="$t('invoices.show.DownloadPDF')">
                                    <i class="fas fa-download"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-8">
                <div class="card card-body p-5 invoice-show">
                    <div class="row">
                        <div class="col-4">
                            <h6 class="text-uppercase text-muted">
                                {{$t('invoices.show.QuotationFrom')}}
                            </h6>
                            <p class="text-muted mb-4">
                                <strong class="text-body">{{$option.name}}</strong> <br>
                                {{$option.tax_number}} <br>
                                {{$option.telephone}} <br>
                                {{$option.email}} <br>
                                {{$option.address1}} <br>
                                {{$option.address2}} <br>
                                {{$option.city}} {{$option.city && $option.country? ',' : ''}} {{$option.country}}
                                <br v-if="!$option.city || !$option.country">
                            </p>
                            <h6 class="text-uppercase text-muted">
                                {{$t('invoices.form.date')}}
                            </h6>
                            <p class="mb-2">
                                {{$dateFormat(item.date)}} 
                            </p>
                        </div>
                        <div class="col-4 text-center">
                            <img :src="logo" class="img-fluid mb-4" style="max-width: 4.5rem;" v-if="$option.image != null && !loading">
                            <h2 class="mb-2 ">{{$option.name}}</h2>
                            <qrcode-vue :value="item.qrCode" size="150" level="H" foreground="#12263f" render-as="svg" v-if="$option.tax_invoice" />
                            <p class="text-muted mt-2">{{$t('invoices.form.invoice')}} #{{item.code}}</p>
                            <p class="barcode"> *{{item.code}}* </p>
                        </div>
                        <div class="col-4 text-md-right">
                            <h6 class="text-uppercase text-muted">
                                {{$t('invoices.show.QuotationFor')}}
                            </h6>
                            <p class="text-muted mb-4" v-if="item.client_type == 0">
                                <strong class="text-body">{{item.customer.name}}</strong> <br>
                                {{item.customer.tax_number}} <br>
                                {{item.customer.mobile}} <br>
                                {{item.customer.email}} <br>
                                {{item.customer.address1}} <br>
                                {{item.customer.address2}} <br>
                                {{item.customer.city}}{{item.customer.city && item.customer.country? ',' : ''}} {{item.customer.country}}
                                <br v-if="!item.customer.city || !item.customer.country">
                            </p>
                            <p class="text-muted mb-4" v-if="item.client_type == 1">
                                <strong class="text-body">{{item.supplier.name}}</strong> <br>
                                {{item.supplier.tax_number}} <br>
                                {{item.supplier.mobile}} <br>
                                {{item.supplier.email}} <br>
                                {{item.supplier.address1}} <br>
                                {{item.supplier.address2}} <br>
                                {{item.supplier.city}}{{item.supplier.city && item.supplier.country? ',' : ''}} {{item.supplier.country}}
                                <br v-if="!item.supplier.city || !item.supplier.country">
                            </p>
                            <h6 class="text-uppercase text-muted">
                                {{$t('nvoices.form.ExpiryDate')}}
                            </h6>
                            <p class="mb-2">
                                {{$dateFormat(item.expiry_date)}}
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
                                                <span class="h6">{{$t('invoices.form.ProductItem')}}</span>
                                            </th>
                                            <th class="px-0 bg-transparent border-top-0">
                                                <span class="h6">{{$t('invoices.form.description')}}</span>
                                            </th>
                                            <th class="px-0 bg-transparent border-top-0">
                                                <span class="h6">{{$t('invoices.form.Quantity')}}</span>
                                            </th>
                                            <th class="px-0 bg-transparent border-top-0">
                                                <span class="h6">{{$t('invoices.form.price')}}</span>
                                            </th>
                                            <th class="px-0 bg-transparent border-top-0" v-if="item.discount != 0">
                                                <span class="h6">{{$t('invoices.form.Discount')}}</span>
                                            </th>
                                            <th class="px-0 bg-transparent border-top-0" v-if="item.tax != 0">
                                                <span class="h6">{{$t('invoices.form.Tax')}}</span>
                                            </th>
                                            <th class="px-0 bg-transparent border-top-0">
                                                <span class="h6">{{$t('invoices.form.Total')}}</span>
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
                                                {{qItem.quantity.toFixed(1)}} {{qItem.unit ? qItem.unit.unit : ''}}
                                            </td>
                                            <td class="px-0">
                                                {{$moneyFormat(qItem.price)}}
                                            </td>
                                            <td class="px-0" v-if="item.discount != 0">
                                                -{{$moneyFormat(qItem.discount)}} 
                                            </td>
                                            <td class="px-0" v-if="item.tax != 0">
                                                {{$moneyFormat(qItem.average)}}
                                            </td>
                                            <td class="px-0 ">
                                                {{$moneyFormat(qItem.total)}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" class="px-0 border-top border-top-2">
                                                <strong>{{$t('invoices.show.TotalBill')}}</strong>
                                            </td>
                                            <td  colspan="1"  class="px-0 border-top border-top-2">
                                                <span class="h3">
                                                  {{itemsCount.toFixed(1)}}
                                                </span>
                                            </td>
                                            <td  colspan="6" class="px-0 border-top border-top-2">
                                                <span class="h3">
                                                    {{$moneyFormat(item.subtotal + item.discount -
                                                        (item.discount_type >=0 && item.discount_value > 0 ?
                                                            (item.discount_type == 0 ? discount = item.subtotal * item.discount_value / 100 : item.discount_value) :
                                                            0
                                                        )
                                                    )}} 
                                                </span>
                                            </td>
                                        </tr>
                                        <tr v-if="item.edit">
                                            <td  colspan="2" class="px-0 border-top border-top-2">
                                                <strong>{{item.edit_text ? item.edit_text : $t('invoices.show.Modification') }}</strong>
                                            </td>
                                            <td colspan="6" class="px-0 border-top border-top-2">
                                                <span class="h3">
                                                    {{$moneyFormat(item.edit)}}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr v-if="item.delivery">
                                            <td  colspan="2" class="px-0 border-top border-top-2">
                                                <strong>{{$t('invoices.show.conduction')}}</strong>
                                            </td>
                                            <td colspan="6" class="px-0 border-top border-top-2">
                                                <span class="h3">
                                                    {{$moneyFormat(item.delivery)}}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr v-if="item.discount">
                                            <td colspan="2" class="px-0 border-top border-top-2">
                                                <strong>{{$t('invoices.show.totalDiscount')}}</strong>
                                            </td>
                                            <td colspan="6" class="px-0  border-top border-top-2">
                                                <span class="h3">
                                                    - {{$moneyFormat(item.discount)}} 
                                                </span>
                                            </td>
                                        </tr>
                                        <tr v-if="item.tax">
                                            <td colspan="2" class="px-0 border-top border-top-2">
                                                <strong>{{$t('invoices.show.totalTaxes')}}</strong>
                                            </td>
                                            <td colspan="6" class="px-0  border-top border-top-2">
                                                <span class="h3">
                                                    {{$moneyFormat(item.tax)}} 
                                                </span>
                                            </td>
                                        </tr>
                                        <tr v-if="item.edit || item.delivery || item.discount || item.tax">
                                            <td  colspan="2" class="px-0 border-top border-top-2">
                                                <strong>{{$t('invoices.show.Total')}}</strong>
                                            </td>
                                            <td colspan="6" class="px-0 border-top border-top-2">
                                                <span class="h3">
                                                    {{$moneyFormat(item.total)}}
                                                </span>
                                            </td>
                                        </tr>
                                        <template  v-if="$option.show_old_balance">
                                          <tr>
                                              <td  colspan="2" class="px-0 border-top border-top-2">
                                                  <strong>{{$t('invoices.show.PreviousBalance')}}</strong>
                                              </td>
                                              <td colspan="6"  class="px-0 border-top border-top-2">
                                                  <span class="h3">
                                                      {{$moneyFormat(item.old_balance)}}
                                                  </span>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td colspan="2" class="px-0 border-top border-top-2">
                                                  <strong>{{$t('invoices.show.TotalBalance')}}</strong>
                                              </td>
                                              <td colspan="6" class="px-0 border-top border-top-2">
                                                  <span class="h3">
                                                      {{$moneyFormat(item.new_balance)}}
                                                  </span>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td  colspan="2" class="px-0 border-top border-top-2">
                                                  <strong>{{$t('invoices.show.Paid')}}</strong>
                                              </td>
                                              <td colspan="6" class="px-0 border-top border-top-2">
                                                  <span class="h3">
                                                      {{$moneyFormat(item.paid)}} 
                                                  </span>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td  colspan="2" class="px-0 border-top border-top-2">
                                                  <strong>{{$t('invoices.show.FinalBalance')}}</strong>
                                              </td>
                                              <td colspan="6" class="px-0 border-top border-top-2">
                                                  <span class="h3">
                                                      {{item.salesPayment ? $moneyFormat(item.salesPayment.new_balance) : $moneyFormat(item.new_balance)}}
                                                  </span>
                                              </td>
                                          </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                            <div class="w-100" v-if="item.notes != null">
                                <hr class="my-3">
                                <h4 class="text-uppercase">{{$t('invoices.show.notes')}}</h4>
                                <div class="text-muted mb-0" v-html="item.notes"></div>
                            </div>
                            <div class="w-100" v-if="item.terms != null">
                                <hr class="my-3">
                                <h4 class="text-uppercase">{{$t('invoices.form.termsOfOffer')}}</h4>
                                <div class="text-muted mb-0" v-html="item.terms"></div>
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
                            {{$t('invoices.invoice')}} : #{{item.code}}
                        </h4>
                    </div>
                    <div class="card-body">
                        <p>{{$t('invoices.show.createdIn')}} {{item.created}}, (<small>{{$t('invoices.show.LastUpdate')}} {{item.updated}}</small>)</p>
                        <ul class="list-unstyled">
                            <li v-if="item.client_type == 0"><strong>{{$t('invoices.show.Client')}}</strong> : <router-link :to="'/customers/' + item.customer.id"> {{item.customer.name}}</router-link>
                            </li>
                            <li v-if="item.client_type == 1"><strong>{{$t('invoices.show.Client')}}</strong> : <router-link :to="'/suppliers/' + item.supplier.id"> {{item.supplier.name}}</router-link>
                            </li>
                            <li><strong>{{$t('invoices.show.Administrator')}}</strong> : {{item.user.name}}</li>
                        </ul>
                    </div>
                </div>

                <showFile />
                
                <div class="card" v-if="storesHistories.length != 0">
                    <div class="card-header">
                        <h4 class="card-header-title">
                            <i class="far fa-store-alt"></i> {{$t('invoices.show.WarehouseOperations')}}
                        </h4>
                    </div>
                    <table class="table table-sm main-show">
                        <thead>
                            <tr>
                                <th scope="col">{{$t('invoices.show.Lots')}}</th>
                                <th scope="col">{{$t('invoices.show.theProduct')}}</th>
                                <th scope="col">{{$t('invoices.show.TheStore')}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="storeHistory in storesHistories" :key="storeHistory.id">
                                <td>
                                    {{storeHistory.type == 0 ? '+' : '-'}}
                                    {{storeHistory.quantity}}
                                </td>
                                <td>
                                    <router-link :to="'/products/' + storeHistory.product.id" class="btn btn-light">
                                        {{storeHistory.product.name}}
                                    </router-link>
                                </td>
                                <td>
                                    <router-link :to="'/stores/' + storeHistory.store.id" class="btn btn-light">
                                        {{storeHistory.store.name}}
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';

    import QrcodeVue from 'qrcode.vue'
    import showFile from '@/elements/show/showFile.vue';
    export default {
        data() {
            return {
                path: '/invoices',
                logo: localStorage.getItem('logo'),
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
                        if (this.$option.tax_invoice) {

                          var sellerNameBuf = this.getTlvForValue("1", this.$option.name);

                          var vatRegistrationNameBuf = this.getTlvForValue("2", this.$option.tax_number);

                          var timeBuf = this.getTlvForValue("3" , this.item.created_at);

                          var totalInvoiceBuf = this.getTlvForValue("4", this.item.total.toFixed(1).toString());

                          var taxAmountBuf = this.getTlvForValue("5" , this.item.tax.toFixed(1).toString())
                          var tagBufsArray = [sellerNameBuf, vatRegistrationNameBuf, timeBuf, totalInvoiceBuf, taxAmountBuf  ];

                          var qrCodeBuf = Buffer.concat(tagBufsArray);

                          var qrCodeB64 = qrCodeBuf.toString('base64');

                          this.item.qrCode = qrCodeB64;
                        }
                        this.loading = false;
                    });
            },

            getTlvForValue (tagNum, tagValue) {

                var tagBuf = Buffer.from([tagNum], 'utf8');

                var tagvalueBuf = Buffer.from(tagValue, 'utf8');

                var tagValueLenBuf = Buffer.from([tagvalueBuf.length], 'utf8')

                var bufsArray = [tagBuf,tagValueLenBuf,tagvalueBuf]

                return Buffer.concat(bufsArray);
            },

            print() {
                this.$parent.printedInvoice = this.item;
            }
        },
        components: {
          QrcodeVue,
          showFile,
        },
    };

</script>
