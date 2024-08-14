<template>

  <div class="container-fluid">
    <div class="row">
      <showHeader class="col-12 mt-3"
        :image="item.image"
        :icon="'chart-line'"
        :title="item.code"
        :buttons="[
          {title: $t('manufacturingOperations.show.edit'), icon: 'edit', link: path+'/'+$route.params.id+'/edit', role: $user.admin || $user.role.manufacturing_operations_edit},
        ]"
      />

      <showCard class="col-12"
        :title="$t('manufacturingOperations.show.basicInformation')"
        :cloumns="{
          firstCloum: [
            {icon: 'user', title: $t('manufacturingOperations.show.manufacturingCode'), value: item.code},
            {icon: 'calendar', title: $t('manufacturingOperations.show.StartDate'), value: $dateFormat(item.start_date)},
            {icon: 'money-bill', title: $t('manufacturingOperations.show.ExpectedCost'), value: item.expected_cost  + ' ' + $option.currency},
            {icon: 'money-bill', title: $t('manufacturingOperations.show.Cost'), value: item.cost  + ' ' + $option.currency},
             {icon: 'dollar-sign', title: $t('manufacturingOperations.show.earning'), value: (item.price - item.cost)  + ' ' + $option.currency},
          ],
          scondCloum: [
            {icon: 'toggle-on', title: $t('manufacturingOperations.show.ProjectStatus'), value: item.stat == 1 ? $t('manufacturingOperations.show.effective') : $t('manufacturingOperations.show.Ineffective')},
            {icon: 'calendar', title: $t('manufacturingOperations.show.EndDate'), value: $dateFormat(item.end_date)},
            {icon: 'money-bill-wave', title: $t('manufacturingOperations.show.ExpectedPrice'), value: item.expected_price + ' ' + $option.currency},
            {icon: 'money-bill', title: $t('manufacturingOperations.show.Price'), value: item.price  + ' ' + $option.currency},
            {icon: 'dollar-sign', title: $t('manufacturingOperations.show.earningPresntage'), value: ((item.price - item.cost) / item.price * 100).toFixed(1) + ' %'},
            
          ]
        }"
      />

      <manufacturingDeposits class="col-12" />
      <manufacturingWithdrawals class="col-12" />
      
    </div>
    <showFile/>
  </div>

</template>
<script>

  import axios from 'axios'
  import showFile from '@/elements/show/showFile.vue';
  import showHeader from '@/elements/show/showHeader.vue'
  import showCard from '@/elements/show/showCard.vue'
  import showBoxs from '@/elements/show/showBoxs.vue'
  import manufacturingDeposits from "./components/manufacturingDeposits.vue";
  import manufacturingWithdrawals from "./components/manufacturingWithdrawals.vue";

  export default {
    data() {
      return {
        path: '/manufacturingOperations',
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
          this.item.start_date = new Date(item.start_date * 1000).toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0,10)
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
      showBoxs,

      manufacturingDeposits,
      manufacturingWithdrawals,
      showFile,
    }
  }

</script>
