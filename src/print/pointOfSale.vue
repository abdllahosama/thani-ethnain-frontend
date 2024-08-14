<template>
    <div class="print-model">
        <div id="printMe" ref="printMe" v-if="!loading">
            <div class="inv-design" :class="options.print_type == 3? 'inv-design-5cm' : ''" v-if="options.print_type == 1 || options.print_type == 3" :style="options.print_language == 0 ? '' : 'direction: ltr;'">
                <img :src="logo" class="img-fluid mb-4 sm-inv-img" style="max-width: 5cm;width: 5cm;height: auto !important;" v-if="$option.image != null">
                <div class="text-center">
                    <p class="f-14">{{$option.name}}</p>
                    <p class="f-12">{{$option.address1}}</p>
                    <p class="f-12">{{$option.address2}}</p>
                    <div style="display:flex">
                        <div style="width:4cm;" :style="options.print_language == 0 ? 'text-align: right;' : 'text-align: left;'">
                            <p class="f-12">{{options.print_language == 0 ? 'التاريخ' : 'date'}} : <strong>{{$dateFormat(item.date, 'date')}}</strong></p>
                            <p class="f-12" v-if="item.order_number != '' && !item.without_number">{{options.print_language == 0 ? 'فاتورة رقم' : 'order number'}}: <strong style="font-size:20px">{{item.order_number}}</strong></p>
                            <p class="f-12" v-if="item.order_type == 2 && !item.without_number">
                                {{options.print_language == 0 ? 'الطاولة' : 'tabel'}}: <strong style="font-size:20px">{{item.table_name}}</strong>
                            </p>
                            <p class="f-12" v-if="item.without_number">{{options.print_language == 0 ? 'نوع الطلب' : 'order type'}} : 
                                <strong style="font-size:20px">
                                    {{item.order_type == 0 ? 'استلام' : ''}}
                                    {{item.order_type == 1 ? 'توصيل' : ''}}
                                    {{item.order_type == 2 ? 'صالة' : ''}}
                                </strong>
                            </p>
                            <p class="f-12" v-if="options.print_user">
                                {{options.print_language == 0 ? 'المستخدم' : 'user'}}: <strong>{{$user.name}}</strong>
                            </p>
                        </div>
                        <div style="width:4cm;"  :style="options.print_language == 0 ? 'text-align: right;' : 'text-align: left;'">
                            <p class="f-12">{{options.print_language == 0 ? 'الوقت' : 'time'}} : <strong>{{$dateFormat(item.date, 'time')}}</strong></p>
                            <p class="f-12" v-if="!item.without_number">{{options.print_language == 0 ? 'نوع الطلب' : 'order type'}} : 
                                <strong style="font-size:20px">
                                    {{item.order_type == 0 ? 'استلام' : ''}}
                                    {{item.order_type == 1 ? 'توصيل' : ''}}
                                    {{item.order_type == 2 ? 'صالة' : ''}}
                                </strong>
                            </p>
                            <p class="f-12" v-if="item.order_type == 2 && item.without_number">
                                {{options.print_language == 0 ? 'الطاولة' : 'tabel'}}: <strong style="font-size:20px">{{item.table_name}}</strong>
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <hr>
                    <div style="text-align:center">
                        <p class="f-12">{{options.print_language == 0 ? 'اسم العميل' : 'customer name'}}: <strong>{{item.customer.name != '' ? item.customer.name : options.customer.name}}</strong></p>
                        <p class="f-12">{{options.print_language == 0 ? 'رقم الهاتف' : 'phone'}} : <strong>{{item.customer.mobile != '' ? item.customer.mobile : '--'}}</strong></p>
                    </div>
                    <hr>
                </div>
                <div class="table-responsive"  :style="options.print_language == 0 ? '' : 'direction: ltr;text-align: left !important;'">
                    <table class="table my-4">
                        <thead>
                            <tr>
                                <th class="px-0 bg-transparent border-top-0 text-right" :style="options.print_language == 0 ? '' : 'text-align: left !important;'">
                                    <span class="h6">{{options.print_language == 0 ? 'المنتج' : 'product'}}</span>
                                </th>
                                <th class="px-0 bg-transparent border-top-0 text-right" :style="options.print_language == 0 ? '' : 'text-align: left !important;'">
                                    <span class="h6">{{options.print_language == 0 ? 'الكمية' : 'amount'}}</span>
                                </th>
                                <th class="px-0 bg-transparent border-top-0 text-right"  v-if="options.print_amount == 0 && options.print_type != 3" :style="options.print_language == 0 ? '' : 'text-align: left !important;'">
                                    <span class="h6">{{options.print_language == 0 ? 'السعر' : 'price'}}</span>
                                </th>
                                <th class="px-0 bg-transparent border-top-0 text-right" v-if="item.discount != 0" :style="options.print_language == 0 ? '' : 'text-align: left !important;'">
                                    <span class="h6">{{options.print_language == 0 ? 'الخصم' : 'discount'}}</span>
                                </th>
                                <th class="px-0 bg-transparent border-top-0 text-right" :style="options.print_language == 0 ? '' : 'text-align: left !important;'">
                                    <span class="h6">{{options.print_language == 0 ? 'الأجمالي' : 'total'}}</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(qItem, index) in item.quotationItems">
                                <tr  :key="index" v-if="!qItem.refrance_product_id">
                                    <td class="px-0">
                                        {{qItem.product_name}}
                                        {{qItem.detailName ? '(' + qItem.detailName + ')' : ''}}
                                        <template v-for="(minItem, index) in item.quotationItems" ><template v-if="minItem.refrance_product_id && minItem.refrance_product_id == qItem.refrance_id"><br  :key="index">({{minItem.name}})</template></template>
                                    </td>
                                    <td class="px-0">
                                        {{parseFloat(qItem.quantity).toFixed(2)}}
                                        
                                        {{options.print_amount != 0 ? '* ' + $moneyFormat(qItem.price) : ''}}
                                        {{options.print_type == 3 ? '* ' + $moneyFormat(qItem.price) : ''}}
                                    </td>
                                    <td class="px-0"  v-if="options.print_amount == 0 && options.print_type != 3">
                                        <template v-if="!qItem.refrance_id">
                                        {{$moneyFormat(qItem.price)}}
                                        </template>
                                        <template v-if="qItem.refrance_id">
                                        {{$moneyFormat(qItem.countedPrice) }}
                                        </template>
                                    </td>
                                    <td class="px-0" v-if="item.discount != 0">
                                        {{$moneyFormat(qItem.discount)}}
                                    </td>
                                    <td class="px-0">
                                        <template v-if="!qItem.refrance_id">
                                        {{$moneyFormat((qItem.price - qItem.discount) * qItem.quantity)}} 
                                        </template>
                                        <template v-if="qItem.refrance_id">
                                        {{$moneyFormat(qItem.countedPrice * qItem.quantity)}} 
                                        </template>
                                    </td>
                                </tr>
                            </template>
                            <tr>
                                <td :colspan="colsban" class="px-0">
                                    <strong>{{options.print_language == 0 ? 'الإجمالي' : 'subtotal'}}</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat(parseFloat(item.subtotal) + parseFloat(item.discount))}}
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="item.edit">
                                <td :colspan="colsban" class="px-0">
                                    <strong>{{item.edit_text != '' ? item.edit_text : 'اضافة'}}</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat(item.edit)}}
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="item.discount != 0">
                                <td :colspan="colsban" class="px-0">
                                    <strong>{{options.print_language == 0 ? 'الخصم' : 'discount'}} {{item.discount_rate ? '(' + item.discount_rate + '%)' : ''}}</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        -{{$moneyFormat(item.discount)}}
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="item.tax != 0">
                                <td :colspan="colsban" class="px-0">
                                    <strong>{{options.print_language == 0 ? 'الضريبة' : 'tax'}} </strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat(item.tax)}}
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="item.service != 0">
                                <td :colspan="colsban" class="px-0">
                                    <strong>{{options.print_language == 0 ? 'الخدمة' : 'service'}}</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat(item.service)}}
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="item.delivery">
                                <td :colspan="colsban" class="px-0">
                                    <strong>{{options.print_language == 0 ? 'التوصيل' : 'delivery'}}</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat(item.delivery)}}
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="item.edit || item.delivery || item.discount != 0 || item.tax != 0 || item.service != 0">
                                <td :colspan="colsban" class="px-0">
                                    <strong>{{options.print_language == 0 ? 'المجموع الكلي' : 'total'}}</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat(item.total)}}
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="item.cash">
                                <td :colspan="colsban" class="px-0">
                                    <strong>المدفوع</strong>
                                </td>
                                <td  class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat(parseFloat(item.cash))}} 
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="item.cash">
                                <td :colspan="colsban">
                                    <strong>الباقي</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat(item.cash ? item.cash - item.total : 0)}} 
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="item.rest">
                                <td :colspan="colsban" class="px-0">
                                    <strong>{{options.print_language == 0 ? 'المدفوع' : 'paid'}}</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat(item.paid)}}
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="item.rest">
                                <td :colspan="colsban" class="px-0">
                                    <strong>{{options.print_language == 0 ? 'الباقي' : 'rest'}}</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat(item.rest)}}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr  v-if="item.shippingOperation"/>
                    <div style="width:100%;" :style="options.print_language == 0 ? 'text-align: right;' : 'text-align: left;'" v-if="item.shippingOperation">
                        <p class="f-12">وقت الخروج : <strong>{{$dateFormat(item.shippingOperation.out_date, 'time')}}</strong></p>
                    </div>
                    <div style="width:100%;"  :style="options.print_language == 0 ? 'text-align: right;' : 'text-align: left;'" v-if="item.shippingOperation">
                        <p class="f-12">المندوب : <strong>{{item.shippingOperation.delivery ? item.shippingOperation.delivery.name : '--'}}</strong></p>
                    </div>
                    <hr  v-if="item.shippingOperation"/>
                    <table class="table my-4" v-if="item.shippingOperation">
                        <tbody>
                            <tr>
                                <td class="title">الاسم</td>
                                <td colspan="3"> {{item.shippingOperation.customer ? item.shippingOperation.customer.name : '--'}} </td>
                            </tr>

                            <tr>
                                <td class="title">رقم الهاتف</td>
                                <td colspan="3">{{item.shippingOperation.mobile}}</td>
                            </tr>

                            <tr>
                                <td class="title">العنوان</td>
                                <td colspan="3"> {{item.shippingOperation.address1}}, {{item.shippingOperation.address2}} </td>
                            </tr>
                            
                            <tr>
                                <td class="title">الشقه</td>
                                <td>{{item.shippingOperation.flat}}</td>
                                <td>الدور</td>
                                <td>{{item.shippingOperation.floor}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr  v-if="item.shippingOperation"/>
                    <table class="table my-4" v-if="item.shippingOperation">
                        <tbody>

                            <tr>
                                <td class="title">المبلغ</td>
                                <td>{{$moneyFormat(item.shippingOperation.cod)}}</td>
                            </tr>

                            <tr>
                                <td class="title">التوصيل</td>
                                <td>{{$moneyFormat(item.shippingOperation.cost)}}</td>
                            </tr>

                            <tr>
                                <td class="title">المبلغ</td>
                                <td>{{$moneyFormat(parseFloat(item.shippingOperation.cost ? item.shippingOperation.cost : 0) + parseFloat(item.shippingOperation.cod))}} </td>
                            </tr>
                            </tbody>
                    </table>
                    <div class="reset-footer" v-html="item.notes != '' ? item.notes : ''"></div>
                    <div class="reset-footer" v-html="$option.invoice_footer != null? $option.invoice_footer : ''"></div>
                    <div class="reset-footer" v-html="options.invoice_footer != null? options.invoice_footer : ''"></div>
                </div>
            </div>
            <div class="row invoice-show" v-if="options.print_type == 2">
                <div class="col-4">
                    <h6 class="text-uppercase text-muted">
                        {{$t('invoices.show.QuotationFrom')}}
                    </h6>
                    <p class="text-muted mb-4">
                        <strong class="text-body">{{$option.name}}</strong> <br>
                        <br>
                    </p>
                </div>
                <div class="col-4 text-center">
                    <img :src="logo" class="img-fluid mb-4" style="max-width: 4.5rem;" v-if="$option.image != null">
                    <h2 class="mb-2">
                        {{$option.name}}
                    </h2>
                    <p class="mb-2">
                        {{item.date}}
                    </p>
                </div>
                <div class="col-4 text-md-right">
                    <h6 class="text-uppercase text-muted">
                        {{$t('invoices.show.QuotationFor')}}
                    </h6>
                    <p class="text-muted mb-4">
                        <strong class="text-body">{{item.customer_name}}</strong> <br>
                        {{item.customer_mobile}} <br>
                         {{item.customer.country}}
                    </p>

                </div>
            </div>
            <div class="row invoice-show" v-if="options.print_type == 2">
                <div class="col-12">
                    <div class="table-responsive">
                        <table class="table my-w">
                            <thead>
                                <tr>
                                    <th class="px-0 bg-transparent border-top-0">
                                        <span class="h6">{{$t('invoices.form.ProductItem')}}</span>
                                    </th>
                                    <th class="px-0 bg-transparent border-top-0">
                                        <span class="h6">{{$t('invoices.form.Quantity')}}</span>
                                    </th>
                                    <th class="px-0 bg-transparent border-top-0">
                                        <span class="h6">{{$t('invoices.form.price')}}</span>
                                    </th>
                                    <!--th class="px-0 bg-transparent border-top-0" v-if="item.discount != 0">
                                        <span class="h6">{{$t('invoices.form.Discount')}}</span>
                                    </th>
                                    <th class="px-0 bg-transparent border-top-0" v-if="item.tax != 0">
                                        <span class="h6">{{$t('invoices.form.Tax')}}</span>
                                    </th-->
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
                                        {{parseFloat(qItem.quantity).toFixed(2)}}
                                    </td>
                                    <td class="px-0">
                                        {{$moneyFormat(qItem.price)}}
                                    </td>
                                    <!--td class="px-0" v-if="item.discount != 0">
                                        -{{qItem.discount}}
                                    </td>
                                    <td class="px-0" v-if="item.tax != 0">
                                        {{qItem.average}}
                                    </td-->
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
                                            {{$moneyFormat(parseFloat(item.subtotal) + parseFloat(item.discount))}}
                                        </span>
                                    </td>
                                </tr>
                                <tr v-if="item.delivery > 0">
                                    <td colspan="2" class="px-0 border-top border-top-2">
                                        <strong>{{$t('invoices.show.ShippingFee')}}</strong>
                                    </td>
                                    <td colspan="6" class="px-0  border-top border-top-2">
                                        <span class="h3">
                                            {{$moneyFormat(item.delivery)}}
                                        </span>
                                    </td>
                                </tr>
                                <tr v-if="item.edit > 0">
                                    <td colspan="2" class="px-0 border-top border-top-2">
                                        <strong>{{item.edit_text ? item.edit_text : $t('quotations.form.Modification') }}</strong>
                                    </td>
                                    <td colspan="6" class="px-0  border-top border-top-2">
                                        <span class="h3">
                                            {{$moneyFormat(item.edit)}}
                                        </span>
                                    </td>
                                </tr>
                                <!--tr v-if="item.discount != 0">
                                    <td colspan="2" class="px-0 border-top border-top-2">
                                        <strong>{{$t('invoices.form.totalDiscount')}}</strong>
                                    </td>
                                    <td colspan="6" class="px-0  border-top border-top-2">
                                        <span class="h3">
                                            - {{item.discount}}
                                        </span>
                                    </td>
                                </tr>
                                <tr v-if="item.tax != 0">
                                    <td colspan="2" class="px-0 border-top border-top-2">
                                        <strong>{{$t('invoices.form.totalTaxes')}}</strong>
                                    </td>
                                    <td colspan="6" class="px-0  border-top border-top-2">
                                        <span class="h3">
                                            {{item.tax}}
                                        </span>
                                    </td>
                                </tr-->
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
                                <tr v-if="item.rest">
                                    <td colspan="2" class="px-0 border-top border-top-2">
                                        <strong>{{$t('invoices.form.paid')}}</strong>
                                    </td>
                                    <td colspan="6" class="px-0  border-top border-top-2">
                                        <span class="h3">
                                            {{$moneyFormat(item.paid)}}
                                        </span>
                                    </td>
                                </tr>
                                <tr v-if="item.rest">
                                    <td colspan="2" class="px-0 border-top border-top-2">
                                        <strong>{{$t('invoices.form.rest')}}</strong>
                                    </td>
                                    <td colspan="6" class="px-0  border-top border-top-2">
                                        <span class="h3">
                                            {{$moneyFormat(item.rest)}}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="w-100" v-if="item.notes != ''">
                        <hr class="my-3">
                        <h4 class="text-uppercase">{{$t('invoices.show.notes')}}</h4>
                        <p class="text-muted mb-0">{{item.notes}}</p>
                    </div>
                    <div class="w-100" v-if="item.terms != null">
                        <hr class="my-3">
                        <h4 class="text-uppercase">{{$t('invoices.form.termsOfOffer')}}</h4>
                        <p class="text-muted mb-0">{{item.terms}}</p>
                    </div>
                    <div class="w-100 inv-footer" v-if="$option.invoice_footer != null">
                        <hr class="my-3">
                        <pre class="text-muted mb-0">{{$option.invoice_footer}}</pre>
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
                logo: localStorage.getItem('logo'),
                item: {},
                loading: true,
                colsban: 3,
                options: {}
            }
        },
        methods: {
            getitem() {
                var myel = this;
                if(this.options.local_server == 0){
                    if(typeof ipcRenderer !== 'undefined'){
                        setTimeout(function() {
                            var html = document.getElementById("printMe").innerHTML;
                            var css  = '<meta charset="utf-8" /><style>' + myel.$print + myel.$option.invoice_css + '</style>'
                            var content = '<head>' + css + '</head><body>' + html + '</body>'
                            var printDetails = {
                                options: {
                                    preview: false,
                                    copies: 1,
                                    printerName: 'default',
                                    silent: true
                                },
                                data: content
                            }
                            ipcRenderer.send('print', JSON.stringify(printDetails))
                            document.getElementById("printMe").remove();
                            myel.colse();
                        }, 20);
                    } else {
                    setTimeout(function() {
                        var html = document.getElementById("printMe").innerHTML;
                        var css  = '<meta charset="utf-8" /><style>' + myel.$print + myel.$option.invoice_css + '</style>'
                        var content = '<head>' + css + '</head><body>' + html + '</body>'
                        var iframe = document.createElement('iframe');
                        var html = content;
                        document.body.appendChild(iframe);
                        iframe.contentWindow.document.open();
                        iframe.classList.add("printIframe");
                        iframe.contentWindow.document.write(html);
                        iframe.contentWindow.document.close();

                        iframe.onload = function() {
                        iframe.focus();
                        iframe.contentWindow.print();
                        iframe.remove();
                        };
                        myel.colse();
                    }, 20);
                    }
                } else {
                    setTimeout(function() {
                        var html = document.getElementById("printMe").innerHTML
                        var css  = '<meta charset="utf-8" /><style>' + myel.$print + myel.$option.invoice_css + '</style>'
                        var content = '<head>' + css + '</head><body>' + html + '</body>'
                        const xhr = new XMLHttpRequest();
                        xhr.open("POST", "http://" + myel.options.local_server_ip, true);
                        var params = [{printer_name: 'default', data: content}];
                        xhr.send(JSON.stringify(params));
                        myel.colse();
                    }, 20);
                }
            },
            colse() {
                this.$parent.printPointOfSale = false;
            }
        },
        mounted() {
            this.item = this.$parent.printPointOfSale
            var pointOfSale  = this.$database.pointOfSales.find(el => el.id == this.item.point_of_sale_id)
            if (pointOfSale) {this.options = pointOfSale}
            this.colsban  = this.options.print_amount == 0 && this.options.print_type != 3  ? 3: 2;
            if (this.item.discount != 0) {
                this.colsban +=1;
            }
            this.loading = false
            this.getitem();
        }
    }

</script>
