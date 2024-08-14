<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-header-title">
                    <i class="fas fa-store-alt"></i>
                    {{$t('main.inventoryAlerts')}}
                </h4>
            </div>
            <div class="card-body whitout-padding">
                <div class="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">{{$t('main.product')}} </th>
                                <th scope="col">{{$t('main.store')}} </th>
                                <th scope="col">{{$t('main.quantity')}}</th>
                                <th scope="col">{{$t('main.min')}}</th>
                                <th scope="col">{{$t('main.status')}}</th>
                                <th scope="col">{{$t('main.alert')}}</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-if="items.length == 0 ">
                              <td colspan="7" class="empty-table">
                                  <i class="fas fa-inbox d-block"></i>
                                  {{$t('main.NoAlerts')}}
                              </td>
                          </tr>
                            <tr v-for="item in items" :key="item.id">
                                <td>
                                    <router-link :to="'products/' + item.product.id">{{item.product.name}}</router-link>
                                </td>
                                <td>
                                    <router-link :to="'stores/' + item.store.id">{{item.store.name}}</router-link>
                                </td>
                                <td>{{item.quantity + ' ' + item.unit_name}}</td>
                                <td>{{item.min_quantity + ' ' + item.unit_name}}</td>
                                <td scope="row">
                                    <div class="badge badge-soft-danger">{{$t('stores.alert.attention')}}
                                    </div>
                                </td>
                                <td>{{$t('stores.alert.belowTheLowerBoundOrZero')}}</td>
                            </tr>
                        </tbody>
                    </table>
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
