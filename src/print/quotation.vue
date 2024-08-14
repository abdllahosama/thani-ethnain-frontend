<template>
    <div class="print-model">
        <div id="printMe" ref="printMe" v-if="!loading">
            <div class="inv-design" :class="options.print_type == 3? 'inv-design-5cm' : ''" v-if="options.print_type == 1 || options.print_type == 3">
                <img :src="logo" class="img-fluid mb-4 sm-inv-img" v-if="options.image != null">
                <div class="text-center">
                    <p class="f-14">{{options.name}}</p>
                    <p class="f-12" v-if="options.address1">{{options.address1}}</p>
                    <p class="f-12"> عرض سعر {{item.code}}</p>
                    <div style="display:flex">
                        <div style="width:4cm;text-align: right;">
                            <p class="f-12">التاريخ : <strong>{{ item.date ? $dateFormat(item.date) : $dateFormat(Date.now() / 1000) }}</strong></p>
                        </div>
                    </div>
                </div>
                <div>
                    <hr>
                    <div style="text-align:center">
                        <p class="f-12" v-if="item.customer.name">اسم العميل: <strong>{{item.customer.name}}</strong></p>
                        <p class="f-12" v-if="item.customer.tax_number">المعرف الضريبي: <strong>{{item.customer.tax_number}}</strong></p>
                        <p class="f-12" v-if="item.customer.city || item.customer.country">العنوان: <strong> {{item.customer.city}}{{item.customer.city && item.customer.country? ',' : ''}} {{item.customer.country}}</strong></p>
                        <p class="f-12" v-if="item.customer.mobile">رقم الهاتف : <strong>{{item.customer.mobile}}</strong></p>
                    </div>
                    <hr>
                </div>
                <div class="table-responsive">
                    <table class="table my-4">
                        <thead >
                            <tr>
                                <th class="px-0 bg-transparent border-top-0 text-right">
                                    <span class="h6">المنتج</span>
                                </th>
                                <th class="px-0 bg-transparent border-top-0 text-right">
                                    <span class="h6">الكمية</span>
                                </th>
                                <th class="px-0 bg-transparent border-top-0 text-right" v-if="options.print_type != 3">
                                    <span class="h6">السعر</span>
                                </th>
                                <th class="px-0 bg-transparent border-top-0 text-right">
                                    <span class="h6">الأجمالي</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="qItem in item.quotationItems" :key="qItem.id">
                                <td class="px-0">
                                    {{qItem.product_name}}
                                </td>
                                <td class="px-0">
                                    {{qItem.quantity}}
                                    {{options.print_type == 3 ? '* ' + qItem.price : ''}}
                                </td>
                                <td class="px-0" v-if="options.print_type != 3">
                                    {{$moneyFormat(qItem.price)}}
                                </td>
                                <td class="px-0">
                                    {{$moneyFormat(qItem.total)}} 
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td :colspan="options.print_type != 3  ? 2: 1" class="px-0">
                                    <strong>اجمالي الفاتورة</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{itemsCount}} قطعة
                                    </span>
                                </td>
                                <td  class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat(item.subtotal + item.discount)}}
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="item.edit">
                                <td  :colspan="options.print_type != 3  ? 3: 2" class="px-0">
                                    <strong>{{item.edit_text ? item.edit_text : $t('quotations.form.Modification') }}</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat(item.edit)}}
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="item.delivery">
                                <td  :colspan="options.print_type != 3  ? 3: 2" class="px-0">
                                    <strong>التوصيل</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat(item.delivery)}}
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="item.edit || item.delivery">
                                <td  :colspan="options.print_type != 3  ? 3: 2" class="px-0">
                                    <strong>المجموع الكلي</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat(item.total)}}
                                    </span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <p class="text-muted mb-0"  v-html="options.invoice_footer != null? options.invoice_footer : ''"></p>
                </div>
            </div>
            <div class="row invoice-show hide-w-8" v-if="options.print_type == 0">
                <div class="col-4">
                    <h6 class="text-uppercase text-muted">
                        {{$t('invoices.show.QuotationFrom')}}
                    </h6>
                    <p class="text-muted mb-4">
                        <strong class="text-body">{{options.name}}</strong> <br>
                        {{options.tax_number}} <br>
                        {{options.telephone}} <br>
                        {{options.email}} <br>
                        {{options.address1}} <br>
                        {{options.address2}} <br>
                        {{options.city}} {{options.city && options.country? ',' : ''}} {{options.country}}
                        <br v-if="!options.city || !options.country">
                    </p>
                    <h6 class="text-uppercase text-muted">
                        {{$t('invoices.form.date')}}
                    </h6>
                    <p class="mb-2">
                        {{ item.date ? $dateFormat(item.date) : $dateFormat(Date.now() / 1000) }} 
                    </p>
                </div>
                <div class="col-4 text-center">
                    <img :src="logo" class="img-fluid mb-4" style="max-width: 4.5rem;" v-if="options.image != null">
                    <h2 class="mb-2">
                        {{options.name}}
                    </h2>
                    <p class="text-muted">
                        عرض السعر #{{item.code}}
                    </p>
                    <p class="barcode"> *{{item.code}}* </p>
                </div>
                <div class="col-4 text-md-right">
                    <h6 class="text-uppercase text-muted">
                        {{$t('invoices.show.QuotationFor')}}
                    </h6>
                    <p class="text-muted mb-4">
                        <strong class="text-body">{{item.customer.name}}</strong> <br>
                        {{item.customer.tax_number}} <br>
                        {{item.customer.mobile}} <br>
                        {{item.customer.email}} <br>
                        {{item.customer.address1}} <br>
                        {{item.customer.address2}} <br>
                        {{item.customer.city}}{{item.customer.city && item.customer.country? ',' : ''}} {{item.customer.country}}
                        <br v-if="!item.customer.city || !item.customer.country">
                    </p>
                    <h6 class="text-uppercase text-muted">
                        {{$t('invoices.form.ExpiryDate')}}
                    </h6>
                    <p class="mb-2">
                       {{$dateFormat(item.expiry_date)}}
                    </p>
                </div>
            </div>
            <div class="row invoice-show hide-w-8" v-if="options.print_type == 0">
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
                                        {{qItem.quantity}} {{qItem.unit ? qItem.unit.unit : ''}}
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
                                        <strong>{{$t('invoices.form.Subtotal')}}</strong>
                                    </td>
                                    <td colspan="6" class="px-0  border-top border-top-2">
                                        <span class="h3">
                                            {{$moneyFormat(item.subtotal + item.discount)}}
                                        </span>
                                    </td>
                                </tr>
                                <tr v-if="item.delivery">
                                    <td colspan="2" class="px-0 border-top border-top-2">
                                        <strong>{{$t('invoices.show.ShippingFee')}}</strong>
                                    </td>
                                    <td colspan="6" class="px-0  border-top border-top-2">
                                        <span class="h3">
                                            {{$moneyFormat(item.delivery)}} 
                                        </span>
                                    </td>
                                </tr>
                                <tr v-if="item.edit">
                                    <td colspan="2" class="px-0 border-top border-top-2">
                                        <strong>{{item.edit_text ? item.edit_text : $t('quotations.form.Modification') }}</strong>
                                    </td>
                                    <td colspan="6" class="px-0  border-top border-top-2">
                                        <span class="h3">
                                            {{$moneyFormat(item.edit)}} 
                                        </span>
                                    </td>
                                </tr>
                                <tr v-if="item.discount != 0">
                                    <td colspan="2" class="px-0 border-top border-top-2">
                                        <strong>{{$t('invoices.form.totalDiscount')}}</strong>
                                    </td>
                                    <td colspan="6" class="px-0  border-top border-top-2">
                                        <span class="h3">
                                            - {{$moneyFormat(item.discount)}} 
                                        </span>
                                    </td>
                                </tr>
                                <tr v-if="item.tax != 0">
                                    <td colspan="2" class="px-0 border-top border-top-2">
                                        <strong>{{$t('invoices.form.totalTaxes')}}</strong>
                                    </td>
                                    <td colspan="6" class="px-0  border-top border-top-2">
                                        <span class="h3">
                                            {{$moneyFormat(item.tax)}} 
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="px-0 border-top border-top-2">
                                        <strong>{{$t('invoices.form.Total')}}</strong>
                                    </td>
                                    <td colspan="6" class="px-0  border-top border-top-2">
                                        <span class="h3">
                                            {{$moneyFormat(item.total)}} 
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="w-100" v-if="item.notes != null">
                        <hr class="my-3">
                        <h4 class="text-uppercase">{{$t('invoices.show.notes')}}</h4>
                        <p class="text-muted mb-0">{{item.notes}}</p>
                    </div>
                    <div class="w-100" v-if="item.terms != null">
                        <hr class="my-3">
                        <h4 class="text-uppercase">{{$t('invoices.form.termsOfOffer')}}</h4>
                        <p class="text-muted mb-0">{{item.terms}}</p>
                    </div>
                    <div class="w-100 inv-footer" v-if="options.invoice_footer != null">
                        <hr class="my-3">
                        <p class="text-muted mb-0"  v-html="options.invoice_footer != null? options.invoice_footer : ''"></p>
                    </div>
                </div>
            </div>

            <div class="design-1-container" v-if="options.print_type == 4">
                <div class="header">
                  <img :src="logo" class="companyImage" v-if="options.image != null">
                  <qrcode-vue
                    :value="item.qrCode"
                    size="130"
                    level="H"
                    render-as="svg"
                    v-if="$option.tax_invoice"
                  />
                  <div class="companydetails">
                    <h1>{{ options.name }}</h1>
                    <p>الرقم الضريبي: {{ options.tax_number }}</p>
                    <p v-if="options.commercial_register">
                      السجل التجاري :{{ options.commercial_register }}
                    </p>
                    <p v-if="options.telephone">الهاتف: {{ options.telephone }}</p>
                    <p>{{ options.country }}</p>
                    <p>
                      {{ options.address1 }}
                      {{ options.address1 && options.city ? "," : "" }}
                      {{ options.city }}
                    </p>
                  </div>
                </div>
                <div class="info">
                  <div class="invoive-detail">
                    <div class="invoice-num">
                      <strong>رقم العرض<br />quotation No</strong>
                      <p>{{ item.code }}</p>
                    </div>
                    <div class="invoice-date">
                      <strong>تاريخ العرض<br />quotation Date</strong>
                      <p>{{ item.date ? $dateFormat(item.date) : $dateFormat(Date.now() / 1000) }}</p>
                    </div>
                  </div>
                  <div class="cleint">
                    <h2 class="cleint-name">العميل<br />Cleint</h2>
                    <div class="cleint-info" v-if="item.client_type == 0">
                      <strong>{{ item.customer.name }}</strong>
                      <p v-if="item.customer.tax_number">
                        الرقم الضريبي :{{ item.customer.tax_number }}
                      </p>
                      <p>{{ item.customer.mobile }}</p>
                      <p>{{ item.customer.mobile2 }}</p>
                      <p>{{ item.customer.country }}</p>
                      <p>
                        {{ item.customer.address1 }}
                        {{ item.customer.address1 && item.customer.city ? "," : "" }}
                        {{ item.customer.city }}
                      </p>
                    </div>
                    <div class="cleint-info" v-if="item.client_type == 1">
                      <strong>{{ item.supplier.name }}</strong>
                      <p v-if="item.supplier.tax_number">
                        الرقم الضريبي :{{ item.supplier.tax_number }}
                      </p>
                      <p>{{ item.supplier.mobile }}</p>
                      <p>{{ item.supplier.country }}</p>
                      <p>
                        {{ item.supplier.address1 }}
                        {{ item.supplier.address1 && item.supplier.city ? "," : "" }}
                        {{ item.supplier.city }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="container-of-table">
                  <table class="mytable">
                    <thead>
                    <td v-if="$option.item_number">
                        #
                        </td>
                      <td>
                        الصنف
                        <br />
                        Item
                      </td>
                      <td>
                        الوصف
                        <br />
                        Description
                      </td>
                      <td v-for="(unitsCoefficient, index) in unitsCoefficients" :key="index">
                        {{unitsCoefficient.name}}
                      </td>
                      <td>
                        الكمية
                        <br />
                        Qty
                      </td>
                      <td>
                        السعر
                        <br />
                        Price
                      </td>
                      <td
                        v-if="item.discount != 0 && $option.show_discount_table"
                      >
                        قيمة الخصم
                        <br />
                        Discount Amount
                      </td>
                      <td v-if="item.tax != 0 && $option.show_tax_table">
                        قيمة الضريبة
                        <br />
                        VAT Amount
                      </td>
                      <td>
                        الأجمالي
                        <br />
                        Total
                      </td>
                    </thead>
                    <tbody>
                      <tr v-for="(qItem, index) in item.quotationItems" :key="index">
                        <td v-if="$option.item_number">{{index + 1}}</td>
                        <td>{{ qItem.product_name }}</td>
                        <td>{{ qItem.description }}</td>
                        <td v-for="(unitsCoefficient, index) in unitsCoefficients" :key="index">
                            {{qItem.unit_coefficients.find(el => el.id == unitsCoefficient.id) ? parseFloat(qItem.unit_coefficients.find(el => el.id == unitsCoefficient.id).value).toFixed(1)  : '--'}}
                        </td>
                        <td>{{ parseFloat(qItem.quantity).toFixed(2) }}</td>
                        <td>{{ $moneyFormat(qItem.price) }}</td>
                        <td
                          v-if="
                            item.discount != 0 && $option.show_discount_table
                          "
                        >
                          -{{ $moneyFormat(qItem.discount)}}
                        </td>
                        <td v-if="item.tax != 0 && $option.show_tax_table">
                          {{ $moneyFormat(qItem.average)}}
                        </td>
                        <td>{{ $moneyFormat(qItem.total)}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="money-output">
                  <div class="total">
                    <strong
                      >المجموع<br />
                      Subtotal</strong
                    >
                    <p>
                      {{ $moneyFormat(item.subtotal + item.discount) }}
                    </p>
                  </div>
                  <div class="total" v-if="item.edit">
                    <strong>
                      {{
                        item.edit_text
                          ? item.edit_text
                          : $t('quotations.form.Modification')
                      }}
                    </strong>
                    <p>{{ $moneyFormat(item.edit) }} </p>
                  </div>
                  <div class="total" v-if="item.delivery">
                    <strong
                      >التوصيل<br />
                      delivery</strong
                    >
                    <p>{{ $moneyFormat(item.delivery) }} </p>
                  </div>
                  <div class="total" v-if="item.discount">
                    <strong>خصم<br />
                      discount
                    </strong>
                    <p>- {{ $moneyFormat(item.discount) }} </p>
                  </div>
                  <div class="total" v-if="item.tax">
                    <strong
                      >الضريبة<br />
                      Tax </strong
                    >
                    <p>{{ $moneyFormat(item.tax) }}</p>
                  </div>
                  <div
                    class="total"
                    v-if="item.edit || item.delivery || item.discount || item.tax"
                  >
                    <strong>الإجمالي<br />Total</strong>
                    <p>
                      <strong
                        >{{ $moneyFormat(item.total) }} </strong
                      >
                    </p>
                  </div>
                </div>
                <p class="tafqeet-style">اجمالي الفاتورة فقط {{$tafqeet(item.total)}}</p>
                <div class="w-100" v-if="item.notes != null">
                  <hr class="my-3" />
                  <h4 class="text-uppercase">{{ $t('invoices.show.notes') }}</h4>
                  <div class="mb-0" v-html="item.notes"></div>
                </div>
                <div class="w-100" v-if="item.terms != null">
                  <hr class="my-3" />
                  <h4 class="text-uppercase">
                    {{ $t('invoices.form.termsOfOffer') }}
                  </h4>
                  <div class="mb-0" v-html="item.terms"></div>
                </div>

                <div class="signeture-container">
                    <div class="signeture-item" v-for="(signeture, index) in options.quotations_signatures_data" :key="index">
                        <div class="signeture-name">{{signeture.name}}</div>
                        <div class="signeture-points">..........................</div>
                    </div>
                </div>
                
            </div>
            <p class="pioneer-data">تم الإنشاء بواسطة Pioneer للبرمجيات 01019654321</p>
        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                path: '/quotations',
                logo: localStorage.getItem('logo'),
                item: {},
                unitsCoefficients: [],
                loading: true,
                printType: true,
                itemsCount: 0
            }
        },
        methods: {
            getitem() {
                this.loading = true;
                this.item = this.$parent.printedQuotation;
                let unitsCoefficients = []
                this.item.quotationItems.forEach(item => {
                    this.itemsCount += item.quantity;
                    item.unit_coefficients.forEach(el => {
                        unitsCoefficients.push(el.id)
                    })
                });
                unitsCoefficients = [...new Set(unitsCoefficients)];
                this.unitsCoefficients = this.$database.unitsCoefficients.filter(row => unitsCoefficients.includes(row.id) )
                this.unitsCoefficients = this.unitsCoefficients.sort(this.$dynamicSort({ orderBy: "id", orderType: "desc" }))
                this.loading = false;
                var myel = this;
                setTimeout(function() {
                    var text = document.getElementById("printMe").innerHTML;
                    document.getElementById("printMe").remove();
                    var myframe = document.getElementById('inviceIframe');
                    myframe.contentDocument.body.innerHTML = text;
                    setTimeout(function() {
                        myframe.focus();
                        myframe.contentWindow.print();
                        myel.colse();
                    }, 100);
                }, 20);
            },
            colse() {
                this.$parent.printedQuotation = false;
            }
        },
        mounted() {
            this.getitem();
        },
        props: ['options']
    }
</script>
