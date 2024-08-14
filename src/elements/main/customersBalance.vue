<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-header-title">
                    <i class="far fa-clock"></i>
                    {{$t('main.CustomerBalanceAlert')}}
                </h4>
            </div>
            <div class="card-body whitout-padding">
                <div class="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">{{$t('main.customerName')}}</th>
                                <th scope="col">{{$t('main.phoneNumber')}}</th>
                                <th scope="col">{{$t('main.balance')}}</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-if="items.length == 0 && loaded">
                              <td colspan="7" class="empty-table">
                                  <i class="fas fa-inbox d-block"></i>
                                  {{$t('main.thereAreNoAlerts')}}
                                  <p>{{$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')}}</p>
                              </td>
                          </tr>
                            <tr v-for="item in items" :key="item.id">
                                <td>
                                    <router-link :to="'/customers/' + item.id">{{item.name}}</router-link>
                                </td>
                                <td>
                                    {{item.mobile}}
                                </td>
                                <td>
                                    {{$moneyFormat($option.balance_type == 1 ? item.balance * -1 : item.balance)}} 
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer">
                <div class="text-center">
                    <router-link :to="'/customers'">{{$t('main.viewAll')}}</router-link>
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
