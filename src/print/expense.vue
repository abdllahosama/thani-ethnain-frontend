<template>
    <div class="print-model">
        <div id="printMe" ref="printMe" v-if="!loading">
            <div class="col text-center">
                <div class="row">
                    <img :src="logo" class="img-fluid mb-4" style="max-width: 4.5rem;" v-if="options.image != null">
                    <h2 class="mb-2">
                        سند مصروف ل {{options.name}}
                    </h2>
                    <p class="text-muted mb-6">
                        سند مصروف  #{{item.id}}
                    </p>
                </div>
            </div>
            <div class="row">
                <table class="table table-sm table-nowrap customed-table-small">
                        <tbody>
                            <tr>
                                <th scope="row">{{$t('expenses.form.expenseNumber')}}# </th>
                                <td>{{item.id != null ? item.id : '--'}}</td>
                                <td rowspan="7" style="background:#eee; text-align:center;padding-top:120px;">
                                    <div class="price-show" style="margin-top:20px;padding-top:30px;">
                                        <div class="price-content">
                                            <p>{{$t('expenses.form.cost')}}</p>
                                            <h1>{{$moneyFormat(item.cost)}}</h1>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">{{$t('expenses.form.date')}}</th>
                                <td>{{ item.date ? $dateFormat(item.date) : $dateFormat(Date.now() / 1000) }}</td>
                            </tr>
                            <tr>
                                <th scope="row">{{$t('expenses.form.reference')}}</th>
                                <td>{{item.refrance != null ? item.refrance : '--'}}</td>
                            </tr>
                            <tr>
                                <th scope="row">المشروع</th>
                                <td>{{item.project != null ? item.project.name : '--'}}</td>
                            </tr>
                            <tr>
                                <th scope="row">{{$t('expenses.form.paidFor')}}</th>
                                <td>{{item.cash_to != null ? item.cash_to : '--'}}</td>
                            </tr>
                            <tr>
                                <th scope="row">{{$t('expenses.form.section')}}</th>
                                <td scope="row">{{item.expenseSection != null ? item.expenseSection.name : '--'}}</td>
                            </tr>
                            <tr>
                                <th scope="row">{{$t('expenses.form.thatAbout')}}</th>
                                <td>{{item.description != null ? item.description : '--'}}</td>
                            </tr>
                        </tbody>
                    </table>

                <table class="table table-sm table-nowrap">
                    <thead>
                        <tr>
                            <th scope="col">{{$t('expenses.form.customer')}}</th>
                            <th scope="col">{{$t('expenses.form.supplier')}}</th>
                            <th scope="col">{{$t('expenses.form.cost')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">{{item.customer != null ? item.customer.name : '--'}}</th>
                            <th scope="row">{{item.supplier != null ? item.supplier.name : '--'}}</th>
                            <td>{{$moneyFormat(item.cost)}} </td>
                        </tr>
                    </tbody>
                </table>

                <div style="margin-top: 10px">
                    <div style="width: 50%; display: inline-block"></div>
                    <div style="width: 50%; display: inline-block">
                    <strong> المستلم :</strong>
                    </div>
                </div>
                <div style="margin-top: 10px">
                    <div style="width: 50%; display: inline-block"></div>
                    <div style="width: 50%; display: inline-block">
                    <strong> المتابعة :</strong>
                    </div>
                </div>
                <div style="margin-top: 10px">
                    <div style="width: 50%; display: inline-block"></div>
                    <div style="width: 50%; display: inline-block">
                    <strong> الحسابات :</strong>
                    </div>
                </div>
                <div style="margin-top: 10px">
                    <div style="width: 50%; display: inline-block"></div>
                    <div style="width: 50%; display: inline-block">
                    <strong> يعتمد : ادارة الحسابات </strong>
                    <br/><br/>
                    <p  style="text-align:center !important"><strong>({{item.user.name}})</strong></p>
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
                path: '/expenses',
                logo: localStorage.getItem("logo"),
                item: {},
                loading: true
            }
        },
        methods: {
            getitem() {
                this.item = this.$parent.printedExpense;
                this.loading = false;
                var myel = this;
                setTimeout(function () {
                    var text = document.getElementById("printMe").innerHTML;
                    document.getElementById("printMe").remove();
                    var myframe = document.getElementById("inviceIframe");
                    myframe.contentDocument.body.innerHTML = text;
                    myframe.contentDocument.body.classList.add("payment-style");
                    setTimeout(function () {
                        myframe.focus();
                        myframe.contentWindow.print();
                        myel.colse();
                    }, 100);
                }, 20);
            },
            colse() {
                this.$parent.printedExpense = false;
            }
        },
        mounted() {
            this.getitem();
        },
        props: ["options"],
    }

</script>
