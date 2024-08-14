<template>
    <div class="container-fluid">
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col ml-n2">
                                <h4 class="mb-1">
                                    <a>{{$t('safesTransfers.show.safesTransfersOperation')}} <strong> {{item.code}}</strong></a>
                                </h4>
                            </div>
                            <div class="col-auto">
                                <router-link :to="path+'/'+item.id + '/edit'" class="btn btn-sm btn-primary" :title="$t('safesTransfers.show.Modification')" v-if="$user.admin || $user.role.safes_transfers_edit">
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
                            {{$t('safesTransfers.show.safesTransfersOperationDetails')}}
                        </h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-9">
                                <table class="table table-sm table-nowrap customed-table-small">
                                    <tbody>
                                        <tr>
                                            <th scope="row">{{$t('safesTransfers.show.operationCode')}} </th>
                                            <td>{{item.code}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{$t('safesTransfers.show.transferDate')}}</th>
                                            <td>{{$dateFormat(item.date)}}  </td>
                                        </tr>
                                         <tr>
                                            <th scope="row">{{$t('safesTransfers.show.user')}}</th>
                                            <td>{{item.user ? item.user.name : '--'}}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">{{$t('safesTransfers.form.PaymentMethod')}}</th>
                                            <td scope="row">{{item.paymentMethod != null ? item.paymentMethod.name : '--'}}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">{{$t('safesTransfers.form.fromSafe')}}</th>
                                            <td>
                                                <router-link :to="'/safes/' + item.fromSafe.id" v-if="item.fromSafe">{{ item.fromSafe.name}}</router-link>
                                                    {{item.fromSafe ? '' : '--'}}
                                            </td>
                                        </tr>
                                         <tr>
                                            <th scope="row">{{$t('safesTransfers.form.toSafe')}}</th>
                                            <td>
                                                <router-link :to="'/safes/' + item.toSafe.id" v-if="item.toSafe">{{ item.toSafe.name}}</router-link>
                                                    {{item.toSafe ? '' : '--'}}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-3">
                                <div class="price-show">
                                    <div class="price-content">
                                        <p>{{$t('safesTransfers.show.transfersAmount')}}</p>
                                        <h1>{{$moneyFormat(item.cost)}} </h1>
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
                            {{$t('safesTransfers.show.accountingDetails')}}
                        </h4>
                    </div>
                    <div class="card-body">
                        <table class="table table-sm table-nowrap">
                            <thead>
                                <tr>
                                    <th scope="col">{{$t('safesTransfers.show.transfersAmount')}}</th>
                                    <th scope="col">{{$t('safesTransfers.show.oldBalance')}}</th>
                                    <th scope="col">{{$t('safesTransfers.show.newBalance')}}</th>
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
                path: '/safesTransfers',
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
