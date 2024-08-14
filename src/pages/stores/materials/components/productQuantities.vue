<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">
          {{$t('components.materials.StoreInformation')}}
        </h4>
      </div>
      <div class="index-iner-table">
        <div class="table-responsive">
          <table class="table table-sm table-nowrap card-table table-hover">
            <thead>
              <tr>
                <th class=""><span class="text-muted"> {{$t('components.materials.storeName')}} </span></th>
                <th class=""><span class="text-muted"> {{$t('components.materials.quantity')}} </span></th>
                <th class=""><span class="text-muted"> {{$t('components.materials.lessAmount')}} </span></th>
                <th class=""><span class="text-muted"> {{$t('components.materials.attention')}} </span></th>
              </tr>
            </thead>
            <tbody class="list">
              <tr class="" v-for="(item, index) in items">
                <td class="orders-order">
                  <strong class="mobile-title">{{$t('components.materials.storeName')}}</strong>
                  <router-link :to="'/stores/' + itemstore_id">{{item.store.name}}</router-link>
                </td>
                <td class="orders-order">
                  <strong class="mobile-title">{{$t('components.materials.quantity')}}</strong>
                  {{item.quantity}}
                </td>
                <td class="orders-order">
                  <strong class="mobile-title">{{$t('components.materials.lessAmount')}}</strong>
                  {{item.min_quantity}}
                </td>
                <td class="orders-order">
                  <strong class="mobile-title">{{$t('components.materials.attention')}}</strong>
                  {{item.quantity <= item.min_quantity ? $t('components.materials.belowTheLowerBoundOrZero') : $t('components.materials.available')}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import indexTable from '@/elements/index/indexTable.vue'
  export default {
    components: {
      indexTable
    },
    props: ['items']
  }

</script>
