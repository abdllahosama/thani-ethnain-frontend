<template>
    <div class="print-model">
        <div id="printMe" ref="printMe">
            <div class="inv-design" :class="options.print_type == 3? 'inv-design-5cm' : ''" v-if="options.print_type == 1 || options.print_type == 3" :style="options.print_language == 0 ? '' : 'direction: ltr;'">
                <img :src="logo" class="img-fluid mb-4 sm-inv-img" v-if="$option.image != null">
                <div class="text-center">
                    <p class="f-14">{{$option.name}}</p>
                    <p class="f-14">{{$option.address1}}</p>
                    <p class="f-14">{{$option.address2}}</p>
                    <div class="sm-inv-details">
                        <div :style="options.print_language == 0 ? 'text-align: right;' : 'text-align: left;'">
                            <p class="f-12">{{options.print_language == 0 ? 'التاريخ' : 'date'}} : <strong>{{$dateFormat($parent.invoiceData.date, 'date')}}</strong></p>
                            <p class="f-12" v-if="this.options.order_number != 0">{{options.print_language == 0 ? 'فاتورة رقم' : 'order number'}}: <strong style="font-size:20px">{{$parent.invoiceData.order_number}}</strong></p>
                        </div>
                        <div :style="options.print_language == 0 ? 'text-align: right;' : 'text-align: left;'">
                            <p class="f-12">{{options.print_language == 0 ? 'الوقت' : 'time'}} : <strong>{{$dateFormat($parent.invoiceData.date, 'time')}}</strong></p>
                            <p class="f-12"  v-if="options.hall_allow">{{options.print_language == 0 ? 'نوع الطلب' : 'order type'}} : 
                                <strong>
                                    {{$parent.invoiceData.order_type == 0 ? 'استلام' : ''}}
                                    {{$parent.invoiceData.order_type == 1 ? 'توصيل' : ''}}
                                    {{$parent.invoiceData.order_type == 2 ? 'صالة' : ''}}
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <hr>
                    <div style="text-align:center">
                            <p class="f-12">{{options.print_language == 0 ? 'اسم العميل' : 'customer name'}}: <strong>{{$parent.invoiceData.customer ? $parent.invoiceData.customer.name : '--'}}</strong></p>
                            <p class="f-12">{{options.print_language == 0 ? 'رقم الهاتف' : 'phone'}} : <strong>{{$parent.invoiceData.customer ? $parent.invoiceData.customer.mobile : '--'}}</strong></p>
                            <p class="f-12" v-if="options.change_address == 1">{{options.print_language == 0 ? 'العنوان' : 'address'}} : <strong>{{$parent.invoiceData.customer ? $parent.invoiceData.customer.address : '--'}}</strong></p>
                    </div>
                    <hr>
                </div>
                <div class="table-responsive" :style="options.print_language == 0 ? '' : 'direction: ltr;text-align: left !important;'">
                    <table class="table my-4">
                        <thead v-if="options.invoice_show_products">
                            <tr>
                                <th class="px-0 bg-transparent border-top-0 text-right" :style="options.print_language == 0 ? '' : 'text-align: left !important;'">
                                    <span class="h6">{{options.print_language == 0 ? 'المنتج' : 'product'}}</span>
                                </th>
                                <th class="px-0 bg-transparent border-top-0 text-right" :style="options.print_language == 0 ? '' : 'text-align: left !important;'">
                                    <span class="h6">{{options.print_language == 0 ? 'الكمية' : 'amount'}}</span>
                                </th>
                                <th class="px-0 bg-transparent border-top-0 text-right" v-if="options.print_amount == 0 && options.print_type != 3" :style="options.print_language == 0 ? '' : 'text-align: left !important;'">
                                    <span class="h6">{{options.print_language == 0 ? 'السعر' : 'price'}}</span>
                                </th>
                                <th class="px-0 bg-transparent border-top-0 text-right" v-if="$parent.invoiceData.discount != 0" :style="options.print_language == 0 ? '' : 'text-align: left !important;'">
                                    <span class="h6">{{options.print_language == 0 ? 'الخصم' : 'discount'}}</span>
                                </th>
                                <th class="px-0 bg-transparent border-top-0 text-right" :style="options.print_language == 0 ? '' : 'text-align: left !important;'">
                                    <span class="h6">{{options.print_language == 0 ? 'الأجمالي' : 'total'}}</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody  v-if="options.invoice_show_products">
                            <template v-for="(qItem, index) in $parent.invoiceData.invoiceItems">
                                <tr  :key="index" v-if="!qItem.refrance_product_id">
                                    <td class="px-0">
                                        {{qItem.name}} {{qItem.detailName ? '(' + qItem.detailName + ')' : ''}}
                                        <template v-for="(minItem, index) in $parent.invoiceData.invoiceItems" ><template v-if="minItem.refrance_product_id && minItem.refrance_product_id == qItem.refrance_id"><br  :key="index">({{minItem.name}})</template></template>
                                    </td>
                                    <td class="px-0">
                                        {{parseFloat(qItem.quantity).toFixed(2)}}
                                        {{options.print_amount != 0 ? '* ' + $moneyFormat(qItem.price) : ''}}
                                        {{options.print_type == 3 ? '* ' + $moneyFormat(qItem.price) : ''}}
                                    </td>
                                    <td class="px-0" v-if="options.print_amount == 0 && options.print_type != 3">
                                        <template v-if="!qItem.refrance_id">
                                        {{$moneyFormat(qItem.price)}}
                                        </template>
                                        <template v-if="qItem.refrance_id">
                                        {{$moneyFormat(qItem.countedPrice) }}
                                        </template>
                                    </td>
                                    <td class="px-0" v-if="$parent.invoiceData.discount != 0">
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
                        </tbody>
                        <tfoot>
                            <tr>
                                <td :colspan="$parent.colsban" class="px-0">
                                    <strong>{{options.print_language == 0 ? 'الإجمالي' : 'subtotal'}}</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat($parent.invoiceData.subTotal)}} 
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="$parent.invoiceData.discount != 0">
                                <td :colspan="$parent.colsban" class="px-0">
                                    <strong>{{options.print_language == 0 ? 'الخصم' : 'discount'}} {{$parent.invoiceData.discount_rate ? '(' + $parent.invoiceData.discount_rate + '%)' : ''}}</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        -{{$moneyFormat($parent.invoiceData.discount)}} 
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="$parent.invoiceData.tax != 0">
                                <td :colspan="$parent.colsban" class="px-0">
                                    <strong>{{options.print_language == 0 ? 'الضريبة' : 'tax'}} {{$parent.invoiceData.tax_rate ? '(' + $parent.invoiceData.tax_rate + '%)' : ''}}</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat($parent.invoiceData.tax)}} 
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="$parent.invoiceData.service != 0">
                                <td :colspan="$parent.colsban" class="px-0">
                                    <strong>{{options.print_language == 0 ? 'الخدمة' : 'service'}} {{options.service ? '(' + options.service + '%)' : ''}}</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat($parent.invoiceData.service)}} 
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="$parent.invoiceData.edit">
                                <td :colspan="$parent.colsban" class="px-0">
                                    <strong>{{$parent.invoiceData.edit_text != '' ? $parent.invoiceData.edit_text : 'اضافة'}}</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat($parent.invoiceData.edit)}} 
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="$parent.invoiceData.delivery > 0">
                                <td :colspan="$parent.colsban" class="px-0">
                                    <strong>{{options.print_language == 0 ? 'التوصيل' : 'delivery'}}</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat($parent.invoiceData.delivery)}} 
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="$parent.invoiceData.edit || $parent.invoiceData.delivery > 0 || $parent.invoiceData.discount != 0 || $parent.invoiceData.tax != 0 || $parent.invoiceData.service != 0">
                                <td :colspan="$parent.colsban" class="px-0">
                                    <strong>{{options.print_language == 0 ? 'المجموع الكلي' : 'total'}}</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat($parent.invoiceData.total)}} 
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="$parent.invoiceData.cash">
                                <td :colspan="$parent.colsban" class="px-0">
                                    <strong>المدفوع</strong>
                                </td>
                                <td  class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat(parseFloat($parent.invoiceData.cash))}} 
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="$parent.invoiceData.cash">
                                <td :colspan="$parent.colsban">
                                    <strong>الباقي</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat($parent.invoiceData.cash ? $parent.invoiceData.cash - $parent.invoiceData.total : 0)}} 
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="$parent.invoiceData.paid < $parent.invoiceData.total">
                                <td :colspan="$parent.colsban" class="px-0">
                                    <strong>{{options.print_language == 0 ? 'المدفوع' : 'paid'}}</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat($parent.invoiceData.paid)}} 
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="$parent.invoiceData.paid < $parent.invoiceData.total">
                                <td :colspan="$parent.colsban" class="px-0">
                                    <strong>{{options.print_language == 0 ? 'الباقي' : 'rest'}}</strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{$moneyFormat($parent.invoiceData.otal - $parent.invoiceData.paid)}} 
                                    </span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <div v-if="$parent.invoiceData.notes">
                        <hr>
                        <h5 class="f-14">ملاحظة :</h5>
                        <p class="f-12" v-html="$parent.invoiceData.notes"></p>
                    </div>

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
                        {{$parent.invoiceData.date}}
                    </p>
                </div>
                <div class="col-4 text-md-right">
                    <h6 class="text-uppercase text-muted">
                        {{$t('invoices.show.QuotationFor')}}
                    </h6>
                    <p class="text-muted mb-4">
                        <strong class="text-body">{{$parent.invoiceData.customer_name}}</strong> <br>
                        {{$parent.invoiceData.customer_mobile}} <br>
                         {{$parent.invoiceData.customer.country}}
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
                                        <span class="h6">{{$t('invoices.form.Product$parent.invoiceData')}}</span>
                                    </th>
                                    <th class="px-0 bg-transparent border-top-0">
                                        <span class="h6">{{$t('invoices.form.Quantity')}}</span>
                                    </th>
                                    <th class="px-0 bg-transparent border-top-0">
                                        <span class="h6">{{$t('invoices.form.price')}}</span>
                                    </th>
                                    <!--th class="px-0 bg-transparent border-top-0" v-if="$parent.invoiceData.discount != 0">
                                        <span class="h6">{{$t('invoices.form.Discount')}}</span>
                                    </th>
                                    <th class="px-0 bg-transparent border-top-0" v-if="$parent.invoiceData.tax != 0">
                                        <span class="h6">{{$t('invoices.form.Tax')}}</span>
                                    </th-->
                                    <th class="px-0 bg-transparent border-top-0">
                                        <span class="h6">{{$t('invoices.form.Total')}}</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(qItem, index) in $parent.invoiceData.invoiceItems" :key="index">
                                    <td class="px-0">
                                        {{qItem.name}}
                                    </td>
                                    <td class="px-0">
                                        {{qItem.quantity}}
                                    </td>
                                    <td class="px-0">
                                        {{qItem.price}} 
                                    </td>
                                    <!--td class="px-0" v-if="item.discount != 0">
                                        -{{qItem.discount}} 
                                    </td>
                                    <td class="px-0" v-if="item.tax != 0">
                                        {{qItem.average}} 
                                    </td-->
                                    <td class="px-0 ">
                                        {{qItem.total}} 
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="px-0 border-top border-top-2">
                                        <strong>{{$t('invoices.form.Subtotal')}}</strong>
                                    </td>
                                    <td colspan="6" class="px-0  border-top border-top-2">
                                        <span class="h3">
                                            {{$parent.invoiceData.subTotal}} 
                                        </span>
                                    </td>
                                </tr>
                                <tr v-if="$parent.invoiceData.delivery > 0">
                                    <td colspan="2" class="px-0 border-top border-top-2">
                                        <strong>{{$t('invoices.show.ShippingFee')}}</strong>
                                    </td>
                                    <td colspan="6" class="px-0  border-top border-top-2">
                                        <span class="h3">
                                            {{$parent.invoiceData.delivery}} 
                                        </span>
                                    </td>
                                </tr>
                                <tr v-if="$parent.invoiceData.edit > 0">
                                    <td colspan="2" class="px-0 border-top border-top-2">
                                        <strong>{{$parent.invoiceData.edit_text ? $parent.invoiceData.edit_text : $t('quotations.form.Modification') }}</strong>
                                    </td>
                                    <td colspan="6" class="px-0  border-top border-top-2">
                                        <span class="h3">
                                            {{$parent.invoiceData.edit}} 
                                        </span>
                                    </td>
                                </tr>
                                <!--tr v-if="$parent.invoiceData.discount != 0">
                                    <td colspan="2" class="px-0 border-top border-top-2">
                                        <strong>{{$t('invoices.form.totalDiscount')}}</strong>
                                    </td>
                                    <td colspan="6" class="px-0  border-top border-top-2">
                                        <span class="h3">
                                            - {{$parent.invoiceData.discount}} 
                                        </span>
                                    </td>
                                </tr>
                                <tr v-if="$parent.invoiceData.tax != 0">
                                    <td colspan="2" class="px-0 border-top border-top-2">
                                        <strong>{{$t('invoices.form.totalTaxes')}}</strong>
                                    </td>
                                    <td colspan="6" class="px-0  border-top border-top-2">
                                        <span class="h3">
                                            {{$parent.invoiceData.tax}} 
                                        </span>
                                    </td>
                                </tr-->
                                <tr>
                                    <td colspan="2" class="px-0 border-top border-top-2">
                                        <strong>{{$t('invoices.form.Total')}}</strong>
                                    </td>
                                    <td colspan="6" class="px-0  border-top border-top-2">
                                        <span class="h3">
                                            {{$parent.invoiceData.total}} 
                                        </span>
                                    </td>
                                </tr>


                                <tr v-if="$parent.invoiceData.paid < $parent.invoiceData.total">
                                    <td colspan="2" class="px-0 border-top border-top-2">
                                        <strong>{{$t('invoices.form.paid')}}</strong>
                                    </td>
                                    <td colspan="6" class="px-0  border-top border-top-2">
                                        <span class="h3">
                                            {{$parent.invoiceData.paid}} 
                                        </span>
                                    </td>
                                </tr>
                                <tr v-if="$parent.invoiceData.paid < $parent.invoiceData.total">
                                    <td colspan="2" class="px-0 border-top border-top-2">
                                        <strong>{{$t('invoices.form.rest')}}</strong>
                                    </td>
                                    <td colspan="6" class="px-0  border-top border-top-2">
                                        <span class="h3">
                                            {{$parent.invoiceData.total - $parent.invoiceData.paid}} 
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="w-100" v-if="$parent.invoiceData.notes != null">
                        <hr class="my-3">
                        <h4 class="text-uppercase">{{$t('invoices.show.notes')}}</h4>
                        <p class="text-muted mb-0">{{$parent.invoiceData.notes}}</p>
                    </div>
                    <div class="w-100" v-if="$parent.invoiceData.terms != null">
                        <hr class="my-3">
                        <h4 class="text-uppercase">{{$t('invoices.form.termsOfOffer')}}</h4>
                        <p class="text-muted mb-0">{{$parent.invoiceData.terms}}</p>
                    </div>
                    <div class="w-100 inv-footer" v-if="$option.invoice_footer != null">
                        <hr class="my-3">
                        <pre class="text-muted mb-0">{{$option.invoice_footer}}</pre>
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
                logo: localStorage.getItem('logo'),
                options: {}
            }
        },
        mounted () {
            if (this.$database.pointOfSales) {
                this.options = this.$database.pointOfSales.find(el => el.id == this.id)
            }
            
        },
        props: ["id"]

    }

</script>
