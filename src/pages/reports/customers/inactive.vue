<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'العملاء غير النشطين'"
        />
        <div class="card">
          <div class="card-header">
            <h4 class="card-header-title">
              <i class="fal fa-edit"></i>
              خيارات التقرير
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <searchInput
                class="col-md-3"
                title="العميل"
                plaseholder="اختر عميل"
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
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        
        <div id="reportShow">
          <reportHeader 
            title="العملاء الغير النشطين" 
            :details="[
              {title: 'اسم العميل', value : customerName },
              {title: $t('reports.overview.sectionCustomer'), value : sectionCustomerName }
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              {
                column: 'name',
                link: '/customers',
                title:$t('customers.customerName') ,
                type: 'reportMainLink' ,
                sort: true
              },
              {
                column: 'balance',
                title: 'الرصيد' ,
                type: 'text' ,
                sort: true
              },
              {
                column: 'date',
                title: 'تاريخ اخر معامله',
                type: 'text',
                sort: true
              },
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
import actionButtons from "@/elements/reports/actionButtons.vue";
export default {
  data() {
    return {
      path: "/reports/customers/customersInactive",
      items: [],

      loading: 0,

      balance: 0,

      customers: [],
      customerName:"",
      sectionCustomerName: "",

      params: {
        customer_id: "",
        sections_account_id: ""
      },
      excel: {
        fileName: 'customers inactive',
        reportData: '[]'
      },
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
          this.items = response.data;
          
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
        item.balance = this.$moneyFormat(item.balance)
        item.date    = item.date == 0 ? '--' : this.$dateFormat(item.date)
      })
    }
  },
  mounted() {
    this.params = this.$getParams();
    if (typeof this.params.startDate === 'undefined') {
      this.params.startDate = new Date().toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0, 10);
    }
    this.getData();
  },
  components: {
    reportHeader,
    reportTable,
    indexHeader,
    searchInput,
    actionButtons,
  },
};
</script>
