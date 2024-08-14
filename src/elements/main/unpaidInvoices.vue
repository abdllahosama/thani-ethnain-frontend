<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-header-title">
                    <i class="far fa-exclamation-triangle"></i>
                    {{$t('main.overdueInvoices')}}
                </h4>
            </div>
            <div class="card-body whitout-padding">
                <div class="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">{{$t('main.customer')}}</th>
                                <th scope="col">{{$t('main.invoice')}}</th>
                                <th scope="col">{{$t('main.dueDate')}} </th>
                                <th scope="col">{{$t('main.balance')}}</th>
                                <th scope="col">{{$t('main.status')}}</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-if="items.length == 0 && loaded">
                              <td colspan="7" class="empty-table">
                                  <i class="fas fa-inbox d-block"></i>
                                  {{$t('main.NoBills')}}
                                  <p>{{$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')}}</p>
                              </td>
                          </tr>
                            <tr v-for="item in items" :key="item.id">
                                <td>
                                    <router-link :to="'/customers/' + item.customer.id" v-if="item.customer">{{item.customer.name}}</router-link>
                                </td>
                                <td>
                                    <router-link :to="'/invoices/' + item.id">{{item.code}}</router-link>
                                </td>
                                <td>{{item.expiry_date}}</td>
                                <td>{{$moneyFormat(item.rest)}}</td>
                                <th scope="row">
                                    <div class="badge badge-soft-dark" v-if="item.status == 0">{{$t('invoices.draft')}}
                                    </div>
                                    <div class="badge badge-soft-primary" v-if="item.status == 1">{{$t('invoices.sent')}}
                                    </div>
                                    <div class="badge badge-soft-primary" v-if="item.status == 2">{{$t('invoices.seen')}}
                                    </div>
                                    <div class="badge badge-soft-success" v-if="item.status == 3">
                                        {{item.rest == 0 ? $t('invoices.driven') : $t('invoices.partiallyDriven')}}
                                    </div>
                                    <div class="badge badge-soft-danger" v-if="item.status == 4">{{$t('invoices.canceled')}}
                                    </div>
                                </th>
                                <td>
                                    <a :href="'/invoices/' + item.id + '/pdf'" download>
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
                    <a href="#" class="">{{$t('main.viewAll')}}</a>
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
