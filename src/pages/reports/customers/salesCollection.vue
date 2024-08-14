<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="$t('reports.accounts.reports')"
          :description="$t('reports.accounts.salesCollection')"
        />
        <div class="card">
          <div class="card-header">
            <h4 class="card-header-title">
              <i class="fal fa-edit"></i>
              {{$t('reports.accounts.reportOptions')}}
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <searchInput
                class="col-md-3"
                :title="$t('reports.overview.customerName')"
                :plaseholder="$t('reports.overview.chooseCustomer')"
                v-model="params.customer_id"
                :show="'name'"
                :refrance="'id'"
                :value="params.customer_id"
                :values="$database.customers"
              />
              <searchInput
                class="col-md-3"
                :title="$t('reports.overview.sectionCustomer')"
                :plaseholder="$t('reports.overview.chooseSection')"
                :show="'name'"
                :refrance="'id'"
                v-model="params.sections_account_id"
                :value="params.sections_account_id"
                :values="$database.sectionsAccounts"
              />
              <dateFilter class="col-md-3" />
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
        <reportHeader 
            :title="$t('reports.accounts.salesCollection')" 
            :details="[
              {title: $t('reports.overview.customerName'), value : customerName },
              {title: $t('reports.overview.sectionCustomer'), value : sectionCustomerName },
            ]"
          />
          <reportTable
            :emptyTableText="$t('reports.accounts.thereNoDataTheMoment')"
            :emptyTableSubText="$t('reports.accounts.tryAddingSomeAndTryAgain')"
            :cloumns="[
              { column: 'name',link: '/customers' , title: $t('reports.overview.customerName'), type:'reportMainLink', sort: true},
              { column: 'sales', title: $t('reports.accounts.sales'), type: 'text', sort: true },
              { column: 'payments', title: $t('reports.accounts.salesPayment'), type: 'text', sort: true },
              { column: 'balance', title: $t('reports.overview.balance'), type: 'text' ,sort: true},
            ]"
            :footer="[
              { colspan: 1, value: $t('reports.overview.total') },
              { colspan: 1, value: sales },
              { colspan: 1, value: payments },
              { colspan: 1, value: balance },
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import reportHeader from "@/elements/reports/reportHeader.vue";
import reportTable from "@/elements/reports/reportTable.vue";
import indexHeader from "@/elements/index/indexHeader.vue";
import dateFilter from "@/elements/reports/dateFilter.vue";
import searchInput from "@/elements/reports/searchInput.vue";
import actionButtons from "@/elements/reports/actionButtons.vue";

export default {
  data() {
    return {
      path: "/reports/customers/salesCollection",
      items: [],
      loading: 1,

      sales: 0,
      payments: 0,
      balance: 0,
      sectionCustomerName: "",

      params: {
        dateFilter: 2,
        startDate: '',
        endDate: '',
        customer_id: "",
        sections_account_id: ""
      },

      excel: {
        fileName: 'sales Collection ',
        reportData: '[]'
      },
      customerName: ""
    };
  },
  methods: {
    getData() {
      this.$setParams(this.params);
      this.loading = 1;
      this.totalPages = 0;
      this.items = [];
      axios
        .get(this.$linkGnirator(this.path), { params: this.params })
        .then((response) => {
          let data = response.data;

          this.items = []
          this.sales = 0;
          this.payments = 0;
          this.balance = 0;
          let itemss = JSON.parse(JSON.stringify(this.$database.customers))
          itemss.forEach(customer => {
            customer.invoices          = data.invoices.filter(el => el.customer_id == customer.id).map(item => item.total).reduce((prev, next) => prev + next, 0)
            customer.salesPayments     = data.salesPayments.filter(el => el.customer_id == customer.id).map(item => item.cost).reduce((prev, next) => prev + next, 0)
  
            customer.sales = customer.invoices 
            customer.payments = customer.salesPayments

            this.items.push(customer)
          });

          this.items = this.items.filter(el => el.sales != 0 || el.payments != 0)

          this.items.forEach((item) => {

            this.sales    += parseFloat(item.sales);
            this.payments += parseFloat(item.payments);
            this.balance  += parseFloat(item.balance);

            if (this.$option.balance_type == 1) {item.balance = item.balance * -1}

            item.sales    = this.$moneyFormat(item.sales)
            item.payments = this.$moneyFormat(item.payments)
            item.balance  = this.$moneyFormat(item.balance)
          });

          this.searchStartDate = this.params.startDate;
          this.searchEndDate = this.params.endDate;

          var customer = this.$database.customers.find((el) => el.id == this.params.customer_id);
          if (customer) { this.customerName = customer.name; } else {this.customerName = "";}

          var sectionCustomer = this.$database.sectionsAccounts.find(el => el.id == this.params.sections_account_id)
          if (sectionCustomer) {this.sectionCustomerName = sectionCustomer.name;} else {this.sectionCustomerName = "";}
          
          this.sales    = this.$moneyFormat(this.sales)
          this.payments = this.$moneyFormat(this.payments)

          if (this.$option.balance_type == 1) { this.balance = this.balance * -1;}
          this.balance  = this.$moneyFormat(this.balance)
          this.loading = 0;


        });
    }
  },
  watch: {
    items : function () {
      var mainElemnt = this
      setTimeout(() => {
        var title = document.querySelector('.report-title').textContent
        var data  = document.querySelector('.report-data').textContent
        var date = document.querySelector('.report-date').textContent
        var header = [title, data, date]
        var table = document.querySelector('table')
        var reportData = [...table.rows].map(r => [...r.querySelectorAll('th, td')].map(td => td.textContent))
        reportData.unshift(header)
        mainElemnt.excel.reportData = JSON.stringify(reportData);
      }, 100)
    }
  },
  mounted() {
    this.params = this.$getParams();
    if (typeof this.params.startDate === 'undefined') {
      this.params.startDate = new Date().toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0, 10);
    }
    this.$updateDatabase(["customers"]);
    this.getData();
  },
  components: {
    reportHeader,
    reportTable,
    indexHeader,
    dateFilter,
    searchInput,
    actionButtons,
  },
};
</script>
