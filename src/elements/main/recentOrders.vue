<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-header-title">
                    <i class="far fa-clock"></i>
                    {{$t('main.recentOrders')}}
                </h4>
            </div>
            <div class="card-body whitout-padding">
                <div class="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">{{$t('main.status')}}</th>
                                <th scope="col">{{$t('main.date')}} </th>
                                <th scope="col">{{$t('main.saleOrder')}}</th>
                                <th scope="col">{{$t('main.customer')}}</th>
                                <th scope="col">{{$t('main.balance')}}</th>
                                <th scope="col">{{$t('main.PDF')}}</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-if="items.length == 0 && loaded">
                              <td colspan="7" class="empty-table">
                                  <i class="fas fa-inbox d-block"></i>
                                  {{$t('main.NoRequests')}}
                                  <p>{{$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')}}</p>
                              </td>
                          </tr>
                            <tr v-for="item in items" :key="item.id">
                                <th scope="row">
                                    <div class="badge badge-dark" v-if="item.status == 0">{{$t('orders.draft')}}</div>
                                    <div class="badge badge-success" v-if="item.status == 1">{{$t('orders.Certain')}}</div>
                                    <div class="badge badge-success" v-if="item.status == 2">{{$t('orders.Invoiced')}}</div>
                                    <div class="badge badge-danger" v-if="item.status == 3">{{$t('orders.rejected')}}</div>
                                    <div class="badge badge-danger" v-if="item.status == 4">{{$t('orders.canceled')}}</div>
                                </th>
                                <td>{{item.date}}</td>
                                <td>
                                    <router-link :to="'/orders/' + item.id">{{item.code}}</router-link>
                                </td>
                                <td>
                                    <router-link :to="'/customers/' + item.customer.id" v-if="item.customer">{{item.customer.name}}</router-link>
                                </td>
                                <td>{{$moneyFormat(item.total)}}</td>
                                <td>
                                    <a :href="'/orders/' + item.id + '/pdf'" download>
                                        <i class="fa fa-download"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer">
                <div class="text-center">
                    <router-link :to="'/orders'" class="">{{$t('main.viewAll')}}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['items']
    };
</script>
