<template>
    <div class="container-fluid">
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col ml-n2">
                                <h4 class="mb-1">
                                    <a>{{$t('incomes.show.income')}} <strong> {{item.code}}</strong></a>
                                </h4>
                            </div>
                            <div class="col-auto">
                                <router-link :to="path+'/'+item.id + '/edit'" class="btn btn-sm btn-primary d-none d-md-inline-block">
                                    <i class="fas fa-edit"></i>
                                </router-link>
                                <a @click="print(item.id)" class="btn btn-sm btn-primary d-none d-md-inline-block">
                                    <i class="fas fa-print"></i>
                                </a>
                                <a :href="$linkGnirator('/incomes/' + item.id + '/pdf')" download class="btn btn-sm btn-primary d-none d-md-inline-block">
                                    <i class="fas fa-download"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-header-title">
                            <i class="fal fa-usd-square"></i>
                            {{$t('incomes.incomeDetails')}}
                        </h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-9">
                                <table class="table table-sm table-nowrap customed-table-small">
                                    <tbody>
                                        <tr>
                                            <th scope="row">{{$t('incomes.show.AllowanceCode')}} </th>
                                            <td>{{item.code != null ? item.code : '--'}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{$t('incomes.form.date')}}</th>
                                            <td>{{$dateFormat(item.date)}}</td>
                                        </tr>
                                        <tr>
                                          <th scope="row">{{$t('incomes.show.Administrator')}}</th>
                                          <td>{{item.user ? item.user.name : '--'}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{$t('incomes.form.reference')}}</th>
                                            <td>{{item.refrance != null ? item.refrance : '--'}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{$t('incomes.form.paidFor')}}</th>
                                            <td>{{item.cash_to != null ? item.cash_to : '--'}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{$t('incomes.form.section')}}</th>
                                            <td scope="row">{{item.incomeSection != null ? item.incomeSection.name : '--'}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{$t('incomes.form.thatAbout')}}</th>
                                            <td>{{item.description != null ? item.description : '--'}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{$t('incomes.show.Treasury')}}</th>
                                            <td>
                                                <router-link :to="'/safes/' + item.safe.id" v-if="item.safe">{{ item.safe.name}}</router-link>
                                                    {{item.safe ? '' : '--'}}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-3">
                                <div class="price-show">
                                    <div class="price-content">
                                        <p>{{$t('incomes.form.cost')}}</p>
                                        <h1>{{$moneyFormat(item.cost)}}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-header-title">
                            <i class="fal fa-user-alt"></i>
                            {{$t('incomes.paymentDetails')}}
                        </h4>
                    </div>
                    <div class="card-body">
                        <table class="table table-sm table-nowrap">
                            <thead>
                                <tr>
                                    <th scope="col">{{$t('incomes.form.customer')}}</th>
                                    <th scope="col">{{$t('incomes.form.supplier')}}</th>
                                    <th scope="col">{{$t('incomes.form.cost')}}</th>
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
                    </div>
                </div>
                <showFile/>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import showFile from '@/elements/show/showFile.vue';

    export default {
        data() {
            return {
                path: '/incomes',
                item: {},

                printInvoice: false,
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
                    });
            },
            print () {
                this.$parent.printedIncome = this.item;
            }
        },
        components: {
            showFile,
        }
    };

</script>
