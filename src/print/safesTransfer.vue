<template>
    <div class="print-model">
        <div id="printMe" ref="printMe" v-if="!loading">
            <div><small><strong>تاريخ الطباعة :</strong>{{$dateFormat(Date.now() / 1000)}}</small></div>
            <div class="col text-center">
                <div class="row">
                    <img :src="logo" class="img-fluid mb-4" style="max-width: 4.5rem;" v-if="options.image != null">
                    <h2 class="mb-2">
                        عملية نقل خزينة ل {{options.name}}
                    </h2>
                    <p class="text-muted mb-6">
                        عملية نقل #{{item.code}}
                    </p>
                </div>
            </div>
            <div class="row">
                <table class="table table-sm table-nowrap customed-table-small">
                        <tbody>
                            <tr>
                                <th scope="row">كود العملية# </th>
                                <td>{{item.code != null ? item.code : '--'}}</td>
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
                                <th scope="row">المسئول</th>
                                <td>{{item.user != null ? item.user.name : '--'}}</td>
                            </tr>
                            <tr>
                                <th scope="row">طريقة الدفع</th>
                                <td>{{item.paymentMethod != null ? item.paymentMethod.name : '--'}}</td>
                            </tr>
                            <tr>
                                <th scope="row">من خزينة</th>
                                <td>{{item.fromSafe.id != null ? item.fromSafe.name : '--'}}</td>
                            </tr>
                            <tr>
                                <th scope="row">الى خزينة</th>
                                <td>{{item.toSafe.id != null ? item.toSafe.name : '--'}}</td>
                            </tr>
                            <tr>
                                <th scope="row">المبلغ المنقول </th>
                                <td>{{$moneyFormat(item.cost) }}</td>
                            </tr> 
                        </tbody>
                    </table>

                <div class="signeture-container">
                    <div class="signeture-item" v-for="(signeture, index) in options.safes_transfers_signatures_data" :key="index">
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
                path: '/expenses',
                logo: localStorage.getItem("logo"),
                item: {},
                loading: true
            }
        },
        methods: {
            getitem() {
                this.item = this.$parent.printedSafesTransfer;
                this.loading = false;
                var myel = this;
                setTimeout(function () {
                    var text = document.getElementById("printMe").innerHTML;
                    document.getElementById("printMe").remove();
                    var myframe = document.getElementById("inviceIframe");
                    myframe.contentDocument.body.innerHTML = text;
                    setTimeout(function () {
                        myframe.focus();
                        myframe.contentWindow.print();
                        myel.colse();
                    }, 100);
                }, 20);
            },
            colse() {
                this.$parent.printedSafesTransfer = false;
            }
        },
        mounted() {
            this.getitem();
        },
        props: ["options"],
    }

</script>