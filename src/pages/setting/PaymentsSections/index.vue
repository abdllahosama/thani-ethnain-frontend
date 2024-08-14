<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('PaymentsSections.PaymentClassifications')"
                     :description="$t('PaymentsSections.FromHereYouCanControlTheClassificationsOfPayments')"/>
       <indexTable :searchText="$t('PaymentsSections.SearchForARating')"
                  :emptyTableText="$t('PaymentsSections.ThereAreNoRatings')"
                  :emptyTableSubText="$t('PaymentsSections.TryAddingSomeItemsToTheTableAndTryAgain')"
                  :buttonRole="$user.role.payments_add"
                  :cloumns="[
                   {column: 'name',    title:$t('PaymentsSections.sectionName') ,type: 'text' , sort: true },
                   {column: 'payment_section_id',    title:$t('sections.fatherSection') ,type: 'link', to:'paymentSection', sort: true, link: false },
                   {column: 'options', title:$t('PaymentsSections.Settings'), type: 'options', options: [
                   {name: 'edit',   role: $user.admin || $user.role.expenses_edit},
                   {name: 'delete', role: $user.admin || $user.role.expenses_delete},
                   ]}
                 ]"
                 :deleteText="{
                  attention: $t('allerts.Attention'),
                  areYouReallySureToDeleteTheItem: $t('allerts.areYouReallySureToDeleteTheItem'),
                  close: $t('allerts.close'),
                  confirm: $t('allerts.confirm'),
                  loading: $t('allerts.loading'),
                 }" />
      </div>
    </div>
  </div>

</template>
<script>

  import axios from 'axios'

  import indexHeader from '@/elements/index/indexHeader.vue'
  import indexTable from '@/elements/index/indexTable.vue'
  export default {
    data() {
      return {
        path: '/PaymentsSections',
        items: [],

        delete_id: null,
        totalPages: 0,
        loading: 0,

        params: {}
      }
    },
    methods: {
      getItems() {
        var params = this.params
        this.$setParams(params)
        var items = JSON.parse(JSON.stringify(this.$database.PaymentsSections))
        var localItems = JSON.parse(JSON.stringify(this.$parent.localDatabase.PaymentsSections))
        items = localItems.concat(items);
        if (params.orderBy) {
          items = items.sort(this.$dynamicSort(params))
        }
        var editsearch = new RegExp(this.params.search, 'i')
        items = items.filter(el => editsearch.test(el.name))

        this.totalPages = Math.ceil(items.length / 15)
        this.items = items.slice(this.params.page * 15 - 15, this.params.page * 15)

        this.items.forEach(item => {
            var expenseSection = this.$database.PaymentsSections.find(el => el.id == item.expense_section_id)
            item.expenseSection = expenseSection;
        });
      },
      deleteItem() {
        axios
          .post(this.$linkGnirator(this.path + '/' + this.items[this.delete_id].id), {
            _method: 'DELETE'
          })
          .then(response => {
            this.$updateDatabase(['PaymentsSections'])
            this.delete_id = null
            this.$parent.model = 0
            return response
          })
      }
    },
    watch: {
      '$database.PaymentsSections': function() {
        this.getItems()
      },
      '$parent.localDatabase.PaymentsSections': function() {
        this.$updateDatabase(['PaymentsSections'])
      },
      'params.search': function() {
        this.params.page = 1
        this.getItems()
      }
    },
    mounted() {
      this.$updateDatabase(['PaymentsSections'])
      this.params = this.$getParams()
      if (!this.params.page) {
        this.params.page = 1
      }
      this.getItems()
    },
    components: {
      indexHeader,
      indexTable
    }
  }
</script>
