<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="$t('reports.accounts.reports')"
          description="المبيعات حسب العميل"
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
              <dateFilter class="col-md-3" />
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
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            title="المبيعات حسب العميل" 
            :details="[
              {title: $t('reports.overview.customerName'), value : customerName },
              {title: $t('reports.overview.sectionCustomer'), value : sectionCustomerName },
            ]"
          />
          <reportTable
            :emptyTableText="$t('reports.accounts.thereNoDataTheMoment')"
            :emptyTableSubText="$t('reports.accounts.tryAddingSomeAndTryAgain')"
            :cloumns="[
              {column: 'name',  link: '/customers',   title:$t('reports.overview.customerName') ,type: 'reportMainLink' , sort: true },
              {column: 'total_sales',title: 'إجمالي المبيعات',type: 'text',sort: 'true'},
              {column: 'sales_returns',title: 'المرتجعات',type: 'text',sort: 'true'},
              {column: 'net_sales',title: 'صافي المبيعات',type: 'text',sort: 'true'},
            ]"
            :footer="[
              { colspan: 1, value: $t('reports.overview.total') },
              { colspan: 1, value: total_sales},
              { colspan: 1, value: sales_returns},
              { colspan: 1, value: net_sales},
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
import searchInput from "@/elements/reports/searchInput.vue";
import selectInput from "@/elements/reports/selectInput.vue";
import dateFilter from "@/elements/reports/dateFilter.vue";
import actionButtons from "@/elements/reports/actionButtons.vue";
export default {
  data() {
    return {
      path: "/reports/sales/customer",
      items: [],

      loading: 0,

      total_sales: 0,
      sales_returns: 0,
      net_sales: 0,

      customers: [],
      customerName:"",
      sectionCustomerName: "",
      searchStartDate: "",
      searchEndDate: "",
      params: {
        customer_id: "",
        sections_account_id: "",
        status: ""
      },
      excel: {
        fileName: 'customers sales',
        reportData: '[]'
      },
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
          this.loading = 0;
          this.searchStartDate = this.params.startDate;
          this.searchEndDate = this.params.endDate;
          this.total_sales = this.$moneyFormat(response.data.reduce((sum, el) => sum + el.total_sales, 0));
          this.sales_returns = this.$moneyFormat(response.data.reduce((sum, el) => sum + el.sales_returns, 0));
          this.net_sales = this.$moneyFormat(response.data.reduce((sum, el) => sum + el.net_sales, 0));
          this.items = response.data.map(el => {
            el.total_sales = this.$moneyFormat(el.total_sales)
            el.sales_returns = this.$moneyFormat(el.sales_returns)
            el.net_sales = this.$moneyFormat(el.net_sales)
            return el
          })
         

          var customer = this.$database.customers.find((el) => el.id == this.params.customer_id);
          if (customer) {this.customerName = customer.name;} else {this.customerName = "";}

          var sectionCustomer = this.$database.sectionsAccounts.find(el => el.id == this.params.sections_account_id)
          if (sectionCustomer) {this.sectionCustomerName = sectionCustomer.name;} else {this.sectionCustomerName = "";}


          this.amount = this.$moneyFormat(this.amount);


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
    this.$updateDatabase(["customers"]);
    this.getData();
  },
  components: {
    reportHeader,
    reportTable,
    indexHeader,
    searchInput,
    actionButtons,
    selectInput,
    dateFilter
  },
};
</script>
