<template>
    <div class="container-fluid">
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col ml-n2">
                                <h4 class="mb-1">
                                    <a>{{$t('safesDeposits.show.safesDeposit')}} <strong> {{item.code}}</strong></a>
                                </h4>
                            </div>
                            <div class="col-auto">
                                <router-link :to="path+'/'+item.id + '/edit'" class="btn btn-sm btn-primary" :title="$t('safesDeposits.show.Modification')" v-if="$user.admin || $user.role.safes_deposits_edit">
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
                            {{$t('safesDeposits.show.PaymentDetails')}}
                        </h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-9">
                                <table class="table table-sm table-nowrap customed-table-small">
                                    <tbody>
                                        <tr>
                                            <th scope="row">{{$t('safesDeposits.form.PaymentNumber')}} </th>
                                            <td>{{item.code}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{$t('safesDeposits.form.PaymentDate')}}</th>
                                            <td>{{$dateFormat(item.date)}}</td>
                                        </tr>
                                        <tr>
                                          <th scope="row">{{$t('safesDeposits.show.Administrator')}}</th>
                                          <td>{{item.user ? item.user.name : '--'}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{$t('safesDeposits.form.PaymentMethod')}}</th>
                                            <td scope="row">{{item.paymentMethod != null ? item.paymentMethod.name : '--'}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{$t('safesDeposits.form.Treasury')}}</th>
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
                                        <p>{{$t('safesDeposits.form.ReceivedAmount')}}</p>
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
                            {{$t('safesDeposits.show.PayFromThe')}}
                        </h4>
                    </div>
                    <div class="card-body">
                        <table class="table table-sm table-nowrap">
                            <thead>
                                <tr>
                                    <th scope="col">{{$t('safesDeposits.form.ReceivedAmount')}}</th>
                                    <th scope="col">{{$t('safesDeposits.show.PreviousBalance')}}</th>
                                    <th scope="col">{{$t('safesDeposits.show.TotalBalance')}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{$moneyFormat(item.cost)}}</td>
                                    <td>{{$moneyFormat(item.old_balance)}} </td>
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
                path: '/safesDeposits',
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
            },
        },
        components: {
            showFile,
        }
    };

</script>
