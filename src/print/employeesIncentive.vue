<template>
    <div class="print-model">
        <div id="printMe" ref="printMe" v-if="!loading">
            <div class="col text-center">
                <div class="row">
                    <img :src="logo" class="img-fluid mb-4" style="max-width: 4.5rem;" v-if="options.image != null">
                    <h2 class="mb-2">
                        عملية اضافة حافز ل {{item.employee.name }}
                    </h2>
                    <p class="text-muted mb-6">
                        الحافز  #{{item.code}}
                    </p>
                </div>
            </div>
            <div class="row">
                <table class="table table-sm table-nowrap customed-table-small">
                        <tbody>
                            <tr>
                                <th scope="row">كود العمليه# </th>
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
                                <th scope="row">المرجع</th>
                                <td>{{item.reference != null ? item.reference : '--'}}</td>
                            </tr>
                            <tr>
                                <th scope="row">وذلك عن</th>
                                <td>{{item.description != null ? item.description : '--'}}</td>
                            </tr>
                            
                        </tbody>
                    </table>

                <table class="table table-sm table-nowrap">
                    <thead>
                        <tr>
                            <th scope="col">اسم الموظف </th>
                            <th scope="col">التكلفة</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th > {{item.employee.name }}</th>
                            <th > {{$moneyFormat(item.cost) }}</th>
                        </tr>
                    </tbody>
                </table>

                <div class="signeture-container">
                    <div class="signeture-item" v-for="(signeture, index) in options.safes_deposits_signatures_data" :key="index">
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
                path: '/',
                logo: localStorage.getItem("logo"),
                item: {},
                loading: true
            }
        },
        methods: {
            getitem() {
                this.item = this.$parent.printedEmployeesIncentive;
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
                this.$parent.printedEmployeesIncentive = false;
            }
        },
        mounted() {
            this.getitem();
        },
        props: ["options"],
    }

</script>
