<template>
    <div class="print-model">
        <div id="printMe" ref="printMe" v-if="!loading">
            <!--div class="inv-design" :class="options.print_type == 3? 'inv-design-5cm' : ''" v-if="options.print_type == 1 || options.print_type == 3">
                <img :src="logo" class="img-fluid mb-4 sm-inv-img" v-if="options.image != null">
                <div class="text-center">
                    <p class="f-14">{{options.name}}</p>
                    <p class="f-12">{{options.address1}}</p>
                    <p class="f-12">{{item.code}}</p>
                    <div style="display:flex">
                        <div style="width:4cm;text-align: right;">
                            <p class="f-12">التاريخ : <strong>{{ item.date ? $dateFormat(item.date) : $dateFormat(Date.now() / 1000) }}</strong></p>
                            <p class="f-12">الوقت : <strong>{{item.time}}</strong></p>
                        </div>
                    </div>
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
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td  class="px-0">
                                    <strong>الإجمالي </strong>
                                </td>
                                <td class="px-0">
                                    <span class="h3">
                                        {{itemsCount}} قطعة
                                    </span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <p class="text-muted mb-0"  v-html="options.invoice_footer != null? options.invoice_footer : ''"></p>
                </div>
            </div-->
            <div class="row invoice-show hide-w-8">
                <div class="col-12 text-center">
                    <img :src="logo" class="img-fluid mb-4" style="max-width: 4.5rem;" v-if="options.image != null">
                    <h2 class="mb-2">
                        {{options.name}}
                    </h2>
                    <p class="text-muted">
                        <strong>عملية سحب</strong> #{{item.code}}
                    </p>
                    <p class="text-muted mb-2">
                      <strong>المخزن:</strong>  {{item.store ? item.store.name : '--'}}
                    </p>

                    <p class="text-muted mb-2">
                      <strong>{{$t('storesDeposits.form.date')}}:</strong>   {{ item.date ? $dateFormat(item.date) : $dateFormat(Date.now() / 1000) }} 
                    </p>
                </div>
            </div>
            <div class="row invoice-show hide-w-8">
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
                                        <strong>اجمالي الفاتورة</strong>
                                    </td>
                                    <td  colspan="1"  class="px-0 border-top border-top-2">
                                        <span class="h3">
                                            {{itemsCount}} قطعة
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="w-100" v-if="item.description != null">
                        <hr class="my-3">
                        <h4 class="text-uppercase">{{$t('invoices.show.notes')}}</h4>
                        <p class="text-muted mb-0">{{item.description}}</p>
                    </div>
                </div>
                
                <div class="signeture-container">
                    <div class="signeture-item" v-for="(signeture, index) in options.stores_withdrawals_signatures_data" :key="index">
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
                path: '/invoices',
                logo: localStorage.getItem('logo'),
                item: {},
                loading: true,
                printType: true,
                itemsCount: 0
            }
        },
        methods: {
            getitem() {
                this.loading = true;
                this.item = this.$parent.printedStoresWithdrawal;
                this.item.quotationItems.forEach(item => {
                    this.itemsCount += (item.quantity - 0);
                });
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
                this.$parent.printedStoresWithdrawal = false;
            }
        },
        mounted() {
            this.getitem();
        },
        props: ['options']
    }
</script>
