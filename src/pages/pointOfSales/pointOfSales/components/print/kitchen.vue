<template>
    <div class="print-model">
        <div :id="'printKitchen' + kitchenInvoice.random" :ref="'printKitchen' + kitchenInvoice.random">
            <div class="inv-design" :style="$parent.options.print_language == 0 ? '' : 'direction: ltr;'">
                <div class="text-center">
                    <p class="f-14">{{$option.name}}</p>
                    <div class="sm-inv-details">
                        <div :style="$parent.options.print_language == 0 ? 'text-align: right;' : 'text-align: left;'">
                            <p class="f-12">{{$parent.options.print_language == 0 ? 'التاريخ' : 'date'}} : <strong>{{$dateFormat(kitchenInvoice.invoice.date, 'date')}}</strong></p>
                            <p class="f-12" v-if="this.$parent.options.order_number != '' && kitchenInvoice.invoice.order_type != 2">{{$parent.options.print_language == 0 ? 'فاتورة رقم' : 'order number'}}: <strong style="font-size:20px">{{kitchenInvoice.invoice.order_number}}</strong></p>
                            <p class="f-12" v-if="this.$parent.options.order_number != '' && kitchenInvoice.invoice.order_type == 2">{{$parent.options.print_language == 0 ? 'نوع الطلب' : 'order type'}}: <strong style="font-size:20px">{{kitchenInvoice.invoice.order_type == 2 ? 'صالة' : ''}}</strong></p>
                        </div>
                        <div :style="$parent.options.print_language == 0 ? 'text-align: right;' : 'text-align: left;'">
                            <p class="f-12">{{$parent.options.print_language == 0 ? 'الوقت' : 'time'}} : <strong>{{$dateFormat(kitchenInvoice.invoice.date, 'time')}}</strong></p>
                            <p class="f-12" v-if="kitchenInvoice.invoice.order_type != 2">{{$parent.options.print_language == 0 ? 'نوع الطلب' : 'order type'}}: 
                                <strong style="font-size:20px">
                                    {{kitchenInvoice.invoice.order_type == 0 ? 'استلام' : ''}}
                                    {{kitchenInvoice.invoice.order_type == 1 ? 'توصيل' : ''}}
                                    {{kitchenInvoice.invoice.order_type == 2 ? 'صالة' : ''}}
                                </strong>
                            </p>
                            <p class="f-12" v-if="kitchenInvoice.invoice.order_type == 2">
                                {{$parent.options.print_language == 0 ? 'الطاولة' : 'tabel'}}: <strong style="font-size:20px">{{kitchenInvoice.invoice.table_name}}</strong>
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <hr>
                    <div style="text-align:center">
                        <p class="f-12" v-if="$parent.options.multi_print_customer">{{$parent.options.print_language == 0 ? 'اسم العميل' : 'customer name'}}: <strong>{{kitchenInvoice.invoice.customer != '' ? kitchenInvoice.invoice.customer.name : '--'}}</strong></p>      
                    </div>
                </div>
                <div class="table-responsive" :style="$parent.options.print_language == 0 ? '' : 'direction: ltr;text-align: left !important;'">
                    <table class="table my-4">
                        <thead>
                            <tr>
                                <th class="px-0 bg-transparent border-top-0 text-right" :style="$parent.options.print_language == 0 ? '' : 'text-align: left !important;'">
                                    <span class="h6">{{$parent.options.print_language == 0 ? 'المنتج' : 'product'}}</span>
                                </th>
                                <th class="px-0 bg-transparent border-top-0 text-right" :style="$parent.options.print_language == 0 ? '' : 'text-align: left !important;'">
                                    <span class="h6">{{$parent.options.print_language == 0 ? 'الكمية' : 'amount'}}</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(qItem, index) in kitchenInvoice.invoice.invoiceItems">
                                <tr v-if="!qItem.refrance_product_id"  :key="index">
                                    <td class="px-0">
                                        {{qItem.name}} {{qItem.detailName ? '(' + qItem.detailName + ')' : ''}}
                                        <template v-for="(minItem, index) in kitchenInvoice.invoice.invoiceItems"><template  v-if="minItem.refrance_product_id && minItem.refrance_product_id == qItem.refrance_id"><br :key="index">({{minItem.name}})</template></template>
                                        <p class="item-comment" v-if="qItem.comment">({{qItem.comment}})</p>
                                    </td>
                                    <td class="px-0">
                                        {{qItem.quantity}}
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                    <div v-if="kitchenInvoice.notes">
                        <hr>
                        <h5 class="f-14">ملاحظة :</h5>
                        <p class="f-12" v-html="kitchenInvoice.invoice.notes"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: [
          'kitchenInvoice',
        ],
    }

</script>
