<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12">
                <indexHeader :title="'التقارير'" :description="'ضريبة المدخلات.'"/>
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-header-title"><i class="fal fa-edit"></i>
                            خيارات التقرير
                        </h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-7">
                                <dateFilter></dateFilter>
                            </div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <label for="exampleInputEmail1"> الأجرائات</label>
                                    <div class="ctions-container">
                                        <button class="btn btn-dark" @click="getItems()">
                                            <i class="fal fa-search"></i> أنشاء التقرير
                                        </button>
                                        <a @click="print" class="btn btn-info">
                                            <i class="fal fa-print"></i> طباعة التقرير
                                        </a>
                                        <!--button class="btn btn-info">
                                            <i class="fal fa-file-pdf"></i> تصدير
                                        </button-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card" id="reportShow">
                    <div class="card-header">
                        <h4 class="card-header-title">
                            <i class="fal fa-chart-bar"></i>
                            ضريبة المدخلات
                        </h4>
                        <p class="pul-left mt-4">من تاريخ {{searchStartDate}} إلى {{searchEndDate}}</p>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-sm table-nowrap  table-hover">
                            <thead>
                                <tr>
                                    <tableTh :text="'الأسم'"></tableTh>
                                    <tableTh :text="'رقم التعريف الضريبي'"></tableTh>
                                    <tableTh :text="'التاريخ'"></tableTh>
                                    <tableTh :text="'فاتورة الشراء رقم'"></tableTh>
                                    <tableTh :text="'المجموع'"></tableTh>
                                    <tableTh :text="'مبلغ القيمة المضافة'"></tableTh>
                                    <tableTh :text="'مجموع المبلغ الصافي'"></tableTh>
                                </tr>
                            </thead>
                            <loader v-if="loading == 1"></loader>
                            <tbody class="list">
                                <emptyChart v-if="items.length == 0 && loading == 0"></emptyChart>

                                <tr v-for="(item, index) in items" :key="index">
                                    <tableTd :text="item.supplier.name"></tableTd>
                                    <tableTd :text="item.supplier.tax_number"></tableTd>
                                    <tableTd :text="item.date"></tableTd>
                                    <tableTd :text="item.code"></tableTd>
                                    <tableTd :text="item.subtotal" :after="$option.currency"></tableTd>
                                    <tableTd :text="item.tax" :after="$option.currency"></tableTd>
                                    <tableTd :text="item.total" :after="$option.currency"></tableTd>
                                </tr>

                            </tbody>
                            <tfoot>
                                <tr>
                                    <th><strong>المجموع</strong></th>
                                    <th><strong></strong></th>
                                    <th><strong></strong></th>
                                    <th><strong></strong></th>
                                    <th><strong>{{subtotal}} {{$option.currency}}</strong></th>
                                    <th><strong>{{tax}} {{$option.currency}}</strong></th>
                                    <th><strong>{{total}} {{$option.currency}}</strong></th>
                                </tr>
                            </tfoot>
                        </table>
                        <pagination></pagination>
                    </div>
                </div>
            </div>
        </div> <!-- / .row -->
    </div>
</template>
<script>
    import axios from 'axios';

    import loader from '@/elements/index/loader.vue';
    import pagination from '@/elements/index/pagination.vue';
    import emptyChart from '@/elements/reports/emptyChart.vue';
    import indexHeader from '@/elements/index/indexHeader.vue';
    import tableTh from '@/elements/index/table/tableTh.vue';
    import tableTd from '@/elements/index/table/tableTd.vue';
    import dateFilter from '@/elements/reports/dateFilter.vue';
    export default {
        data() {
            return {
                path: '/reports/taxes/purchaseVatLiability',
                items: [],

                totalPages: 0,
                currentPage: 1,
                loading: 0,

                subtotal: 0,
                tax: 0,
                total: 0,

                dateFilter: 2,
                startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0, 10),
                endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0, 10),

                searchStartDate: this.startDate,
                searchEndDate: this.endDate
            }
        },
        methods: {
            getItems() {
                this.loading = 1;
                this.totalPages = 0;
                this.items = [];
                axios
                    .get(this.$linkGnirator(this.path), {
                        params: {
                            page: this.currentPage,
                            startDate: this.startDate,
                            endDate: this.endDate
                        }
                    })
                    .then(response => {
                        this.items = response.data;
                        this.searchStartDate = this.startDate;
                        this.searchEndDate = this.endDate;

                        this.subtotal = 0;
                        this.tax = 0;
                        this.total = 0;

                        this.items.forEach(item => {


                            this.subtotal += item.subtotal;
                            this.tax += item.tax;
                            this.total += item.total;

                            item.subtotal = item.subtotal.toFixed(1)
                            item.tax = item.tax.toFixed(1)
                            item.total = item.total.toFixed(1)
                        });

                        this.subtotal = this.subtotal.toFixed(1)
                        this.tax = this.tax.toFixed(1)
                        this.total = this.total.toFixed(1)

                        this.loading = 0;
                    });
            }
        },
        mounted() {
            this.getItems();
        },
        components: {
            loader,
            pagination,
            emptyChart,
            indexHeader,
            tableTh,
            tableTd,
            dateFilter
        }

    };

</script>
