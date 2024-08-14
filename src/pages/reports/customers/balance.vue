<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="$t('reports.accounts.reports')"
          :description="$t('reports.overview.theRemainingBalanceCustomers')"
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
              <div class="col-md-3">
                <div class="form-group">
                  <label for="exampleInputEmail1">المدة الزمنية</label>
                  <VueCtkDateTimePicker
                    label="اختر المدة الزمنية"
                    :button-now-translation="$t('reports.overview.now')"
                    v-model="params.date"
                    format="YYYY-MM-DD"
                    formated="YYYY-MM-DD"
                    color="#631263"
                    button-color="#631263"
                    :onlyDate="true"
                  />
                </div>
              </div>
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
              <selectInput
                class="col-md-3"
                :title="$t('reports.overview.statue')"
                :plaseholder="$t('reports.overview.chooseStatue')"
                v-model="params.status"
                :values="[
                  { name: $t('reports.overview.debtor'), value: 0 },
                  { name: $t('reports.overview.creditor'), value: 1 },
                  { name: $t('reports.overview.stopped'), value: 2 }
                ]"
              />
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            :title="$t('reports.overview.theRemainingBalanceCustomers')" 
            :details="[
              {title: $t('reports.overview.customerName'), value : customerName },
              {title: $t('reports.overview.sectionCustomer'), value : sectionCustomerName },
              {title: $t('reports.overview.statue'), value : statusName }
            ]"
          />
          <reportTable
            :emptyTableText="$t('reports.accounts.thereNoDataTheMoment')"
            :emptyTableSubText="$t('reports.accounts.tryAddingSomeAndTryAgain')"
            :cloumns="[
              {column: 'name',  link: '/customers',   title:$t('reports.overview.customerName') ,type: 'reportMainLink' , sort: true },
              {column: 'balance',title: $t('reports.overview.balance'),type: 'text',sort: 'true'},
            ]"
            :footer="[
              { colspan: 1, value: $t('reports.overview.total') },
              { colspan: 1, value: balance},
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
import actionButtons from "@/elements/reports/actionButtons.vue";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
export default {
  data() {
    return {
      path: "/reports/customers/balance",
      items: [],

      loading: 0,

      balance: 0,

      customers: [],
      customerName:"",
      sectionCustomerName: "",
      statusName: "",

      params: {
        customer_id: "",
        sections_account_id: "",
        status: ""
      },
      excel: {
        fileName: 'customers balance',
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
          this.balance = response.data.reduce((sum, el) => sum + el.balance, 0);
          this.items = response.data.map(el => {
            el.balance = this.$moneyFormat(el.balance)
            return el
          })
         

          var customer = this.$database.customers.find((el) => el.id == this.params.customer_id);
          if (customer) {this.customerName = customer.name;} else {this.customerName = "";}

          var sectionCustomer = this.$database.sectionsAccounts.find(el => el.id == this.params.sections_account_id)
          if (sectionCustomer) {this.sectionCustomerName = sectionCustomer.name;} else {this.sectionCustomerName = "";}

          if (this.params.status) {
            if (this.params.status == 0) {
              this.statusName = "مدين"
            } else if (this.params.status == 1) {
              this.statusName = "دائن"
            } else if (this.params.status == 2) {
              this.statusName = "موقوف"
            } else {
              this.statusName = ""
            }
          } else {
            this.statusName = ""
          }

          if (this.$option.balance_type == 1) { this.balance = this.balance * -1;}
          this.balance = this.$moneyFormat(this.balance);


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
    VueCtkDateTimePicker
  },
};
</script>
