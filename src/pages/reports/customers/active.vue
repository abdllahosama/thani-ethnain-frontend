<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="$t('reports.accounts.reports')"
          :description="$t('reports.overview.theMostActiveCustomers')"
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
                :title="$t('reports.overview.customer')"
                :plaseholder="$t('reports.overview.chooseCustomer')"
                :show="'name'"
                :refrance="'id'"
                v-model="params.customer_id"
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
            :title="$t('reports.overview.theMostActiveCustomers')" 
            :details="[
              {title: $t('reports.overview.customerName'), value : customerName },
              {title: $t('reports.overview.sectionCustomer'), value : sectionCustomerName }
            ]"
          />
          <reportTable
            :emptyTableText="$t('reports.accounts.thereNoDataTheMoment')"
            :emptyTableSubText="$t('reports.accounts.tryAddingSomeAndTryAgain')"
            :cloumns="[
              {
                column: 'name',
                link: '/customers',
                title:$t('customers.customerName') ,
                type: 'reportMainLink',
                sort: true
              },
              {
                column: 'mobile',
                title: $t('reports.overview.phoneNumber'),
                type: 'text',
                sort: 'true',
              },
              {
                column: 'total',
                title: $t('reports.overview.treatment'),
                type: 'text',
                sort: 'true',
              },
            ]"
            :footer="[
              { colspan: 2, value: $t('reports.overview.total') },
              { colspan: 1, value: total},
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
      path: "/reports/customers/customersActive",
      items: [],
      loading: 0,
      total: 0,
      customerName:"",
      sectionCustomerName: "",
      params: {
        customer_id: "",
        dateFilter: "",
        startDate:"",
        endDate:"",
        sections_account_id: "",
      },
      excel: {
        fileName: 'customers active',
        reportData: '[]'
      },
      searchStartDate: "",
      searchEndDate: ""
    };
  },
  methods: {
    getData() {
      this.$setParams(this.params);
      this.loading = 1;
      this.items = [];
      axios
        .get(this.$linkGnirator(this.path), { params: this.params })
        .then((response) => {
          this.items = [];
          this.total = 0;
          response.data.forEach((item) => {
            var customer = this.$database.customers.find((el) => el.id == item.id);
            if (customer) {
              customer.total = item.total;
              this.items.push(customer);
            }
            this.total += item.total;
          });

          this.searchStartDate = this.params.startDate;
          this.searchEndDate = this.params.endDate;

          
          var customer = this.$database.customers.find((el) => el.id == this.params.customer_id);
          if (customer) {
            this.customerName = customer.name;
          } else {
            this.customerName = "";
          }

          var sectionCustomer = this.$database.sectionsAccounts.find(el => el.id == this.params.sections_account_id)
          if (sectionCustomer) {this.sectionCustomerName = sectionCustomer.name;} else {this.sectionCustomerName = "";}

          this.loading = 0;
        });
    },
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
      this.items.forEach(item => {
        item.total = this.$moneyFormat(item.total)
      })
      this.total = this.$moneyFormat(this.total)
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
