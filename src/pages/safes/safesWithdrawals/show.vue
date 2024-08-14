<template>
    <div class="container-fluid">
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col ml-n2">
                                <h4 class="mb-1">
                                    <a>{{$t('safesWithdrawals.show.withdrawalOperation')}} <strong> {{item.code}}</strong></a>
                                </h4>
                            </div>
                            <div class="col-auto">
                                <router-link :to="path+'/'+item.id + '/edit'" class="btn btn-sm btn-primary" :title="$t('safesWithdrawals.show.Modification')" v-if="$user.admin || $user.role.safes_withdrawals_edit">
                                    <i class="fas fa-edit"></i>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-header-title">
                            <i class="fal fa-credit-card-front"></i>
                            {{$t('safesWithdrawals.show.withdrawalsDetails')}}
                        </h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-9">
                                <table class="table table-sm table-nowrap customed-table-small">
                                    <tbody>
                                        <tr>
                                            <th scope="row">{{$t('safesWithdrawals.show.operationCode')}} </th>
                                            <td>{{item.code}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{$t('safesWithdrawals.show.withdrawalDate')}}</th>
                                            <td>{{$dateFormat(item.date)}} </td>
                                        </tr>

                                        <tr>
                                          <th scope="row">{{$t('safesWithdrawals.show.Administrator')}}</th>
                                          <td>{{item.user ? item.user.name : '--'}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{$t('safesWithdrawals.form.PaymentMethod')}}</th>
                                            <td scope="row">{{item.paymentMethod != null ? item.paymentMethod.name : '--'}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{$t('safesWithdrawals.show.Treasury')}}</th>
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
                                        <p>{{$t('safesWithdrawals.show.withdrawalAmount')}}</p>
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
                            {{$t('safesWithdrawals.show.accountingDetails')}}
                        </h4>
                    </div>
                    <div class="card-body">
                        <table class="table table-sm table-nowrap">
                            <thead>
                                <tr>
                                    <th scope="col">{{$t('safesWithdrawals.show.ReceivedAmount')}}</th>
                                    <th scope="col">{{$t('safesWithdrawals.show.oldBalance')}}</th>
                                    <th scope="col">{{$t('safesWithdrawals.show.newBalance')}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{$moneyFormat(item.cost)}}</td>
                                    <td>{{$moneyFormat(item.old_balance)}}</td>
                                    <td>{{$moneyFormat(item.new_balance)}} </td>
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
                path: '/safesWithdrawals',
                item: {},

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
            }
        },
        components: {
            showFile,
        }
    };

</script>
