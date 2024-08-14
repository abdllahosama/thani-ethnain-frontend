<template>

  <div class="container-fluid">
    <div class="row">
      <showHeader class="col-12 mt-3"
        :image="item.image"
        :icon="'hammer'"
        :title="item.name"
        :buttons="[
          {title: $t('manufacturingModels.show.edit'), icon: 'edit', link: path+'/'+$route.params.id+'/edit', role: $user.admin || $user.role.manufacturing_models_edit},
          
        ]"
      />

      <showCard class="col-12"
        :title="$t('manufacturingModels.show.basicInformation')"
        :cloumns="{
          firstCloum: [
            {icon: 'hammer', title: $t('manufacturingModels.show.name'), value: item.name},
            {icon: 'dollar-sign', title: $t('manufacturingModels.show.expectedCost'), value: item.expected_cost  + ' ' + $option.currency},
            {icon: 'dollar-sign', title: $t('manufacturingModels.show.expectedearning'), value: (item.expected_price - item.expected_cost)  + ' ' + $option.currency},
          ],
          scondCloum: [
            {icon: 'calendar', title: $t('manufacturingModels.show.daysCount'), value: item.day},
            {icon: 'dollar-sign', title: $t('manufacturingModels.show.expectedPrice'), value: item.expected_price + ' ' + $option.currency},
            {icon: 'dollar-sign', title: $t('manufacturingModels.show.expectedearningPresntage'), value: ((item.expected_price - item.expected_cost) / item.expected_price * 100).toFixed(1) + ' %'},
          ]
        }"
      />
      <div class="col-12">
        <div class="card">
          <div class="card-header"><h4 class="card-header-title"> {{$t('manufacturingModels.show.modelMaterials')}}</h4></div>
          <div class="card-body p-5 invoice-show">
              <div class="table-responsive">
                  <table class="table my-w">
                      <thead>
                          <tr>
                            <th class="px-0 bg-transparent border-top-0">
                                <span class="h6">{{$t('manufacturingDeposits.show.ProductItem')}}</span>
                            </th>
                            <th class="px-0 bg-transparent border-top-0">
                                <span class="h6">{{$t('manufacturingDeposits.show.Quantity')}}</span>
                            </th>
                            <th class="px-0 bg-transparent border-top-0">
                                <span class="h6">{{$t('manufacturingDeposits.show.Cost')}}</span>
                            </th>
                            <th class="px-0 bg-transparent border-top-0">
                                <span class="h6">{{$t('manufacturingDeposits.show.Total')}}</span>
                            </th>
                          </tr>
                      </thead>
                      <tbody>
                        <tr v-for="qItem in item.manufacturingModelMaterials" :key="qItem.id">
                            <td class="px-0">{{qItem.product_name}}</td>
                            <td class="px-0">{{qItem.quantity}} {{qItem.unit ? qItem.unit.unit : ''}}</td>
                            <td class="px-0">{{qItem.cost}} {{$option.currency}}</td>
                            <td class="px-0">{{qItem.total}} {{$option.currency}}</td>
                        </tr>
                        <tr>
                            <td colspan="1" class="px-0 border-top border-top-2"><strong> {{$t('manufacturingDeposits.show.Total')}}</strong></td>
                            <td colspan="1" class="px-0 border-top border-top-2"><span class="h3">{{itemsCount}}</span></td>
                            <td colspan="1" class="px-0 border-top border-top-2"></td>
                            <td colspan="1" class="px-0 border-top border-top-2"><span class="h3">{{item.expected_cost}} {{$option.currency}}</span></td>
                          </tr>

                      </tbody>
                  </table>
              </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="card">
          <div class="card-header"><h4 class="card-header-title">  {{$t('manufacturingModels.show.formOutputs')}}</h4></div>
          <div class="card-body p-5 invoice-show">
              <div class="table-responsive">
                  <table class="table my-w">
                      <thead>
                          <tr>
                            <th class="px-0 bg-transparent border-top-0">
                                <span class="h6">{{$t('manufacturingWithdrawals.show.ProductItem')}}</span>
                            </th>
                            <th class="px-0 bg-transparent border-top-0">
                                <span class="h6">{{$t('manufacturingWithdrawals.show.Quantity')}}</span>
                            </th>
                            <th class="px-0 bg-transparent border-top-0">
                                <span class="h6">{{$t('manufacturingWithdrawals.show.Price')}}</span>
                            </th>
                            <th class="px-0 bg-transparent border-top-0">
                                <span class="h6">{{$t('manufacturingWithdrawals.show.Total')}}</span>
                            </th>
                          </tr>
                      </thead>
                      <tbody>
                        <tr v-for="qItem in item.manufacturingModelProducts" :key="qItem.id">
                            <td class="px-0">{{qItem.product_name}}</td>
                            <td class="px-0">{{qItem.quantity}} {{qItem.unit ? qItem.unit.unit : ''}}</td>
                            <td class="px-0">{{qItem.price}} {{$option.currency}}</td>
                            <td class="px-0">{{qItem.total}} {{$option.currency}}</td>
                        </tr>
                        <tr>
                            <td colspan="1" class="px-0 border-top border-top-2"><strong> {{$t('manufacturingWithdrawals.show.Total')}}</strong></td>
                            <td colspan="1" class="px-0 border-top border-top-2"><span class="h3">{{itemsCount}}</span></td>
                            <td colspan="1" class="px-0 border-top border-top-2"></td>
                            <td colspan="1" class="px-0 border-top border-top-2"><span class="h3">{{item.expected_price}} {{$option.currency}}</span></td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>
<script>

  import axios from 'axios'

  import showHeader from '@/elements/show/showHeader.vue'
  import showCard from '@/elements/show/showCard.vue'
  import showBoxs from '@/elements/show/showBoxs.vue'

  export default {
    data() {
      return {
        path: '/manufacturingModels',
        loaded: false,
        item: {}
      }
    },
    mounted() {
      this.getitem()
    },
    methods: {
      getitem() {
        var item = this.$database.projects.find(el => el.id == this.$route.params.id)
        if (item) {
          this.item = item
          this.item.start_date = new Date(item.start_date * 1000).toISOString().slice(0,10)
        }
        axios.get(this.$linkGnirator(this.path + '/' + this.$route.params.id)).then(response => {
          this.item = response.data
          this.loaded = true
        })
      },
    },
    components: {
      showHeader,
      showCard,
      showBoxs

    }
  }

</script>
