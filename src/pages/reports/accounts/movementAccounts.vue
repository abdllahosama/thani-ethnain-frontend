<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'تقارير حركة الحسابات الجارية'"
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
                title="اسم الحساب"
                plaseholder="أختر اسم الحساب"
                v-model="params.accounts_id"
                :show="'name'"
                :refrance="'id'"
                :value="params.accounts_id"
                :values="$database.accounts"
              />
              <div class="form-group col-md-3">
                <label> {{$t('reports.overview.sectionAccount')}}</label>
                <multiselect
                  v-model="selectedSections"
                  :options="$database.sectionsAccounts"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('reports.overview.chooseSection')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>
              <div class="form-group col-md-3">
                <label> عرض الأرصدة الصفرية </label>
                <div class="custom-control custom-switch small-switch">
                  <input
                    type="checkbox"
                    id="zero_balance_allow"
                    v-model="params.zero_balance_allow"
                    class="custom-control-input"
                    :checked="params.zero_balance_allow"
                  />
                  <label
                    for="zero_balance_allow"
                    class="custom-control-label"
                  />
                </div>
              </div>
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
        <reportHeader 
            title="حركة الحسابات الجارية " 
            :details="[
              {title: 'اسم الحساب', value : accountName },
              {title: $t('reports.overview.sectionAccount'), value : sectionCustomerName },
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              { column: 'name',link: '/accounts' , title: 'اسم الحساب', type:'reportMainLink', sort: true},
              { column: 'debit', title: 'حركه مدينة', type: 'text', sort: true },
              { column: 'creditor', title: 'حركه دائنة', type: 'text', sort: true },
              { column: 'balance', title: 'الرصيد', type: 'text' ,sort: true},
            ]"
            :footer="[
              { colspan: 1, value: 'المجموع' },
              { colspan: 1, value: debit },
              { colspan: 1, value: creditor },
              { colspan: 1, value: balance }
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
      path: "/reports/accounts/movementAccounts",
      items: [],
      loading: 1,

      debit: 0,
      creditor: 0,
      balance: 0,
      sectionCustomerName: "",

      params: {
        account_id: "",
        sections_account_id: "",
        zero_balance_allow: false
      },

      excel: {
        fileName: 'account Traffic',
        reportData: '[]'
      },

      accountName: "",

      selectedSections: []
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
          this.debit = 0;
          this.creditor = 0;
          this.balance = 0;
          let itemss = JSON.parse(JSON.stringify(this.$database.accounts))
          itemss.forEach(account => {
            account.accountsDeposits          = data.accountsDeposits.filter(el => el.account_id == account.id).map(item => item.cost).reduce((prev, next) => prev + next, 0)
            account.accountsWithdrawals       = data.accountsWithdrawals.filter(el => el.account_id == account.id).map(item => item.cost).reduce((prev, next) => prev + next, 0)

            account.fromAccountsTransfers     = data.fromAccountsTransfers.filter(el => el.from_account_id == account.id).map(item => item.cost).reduce((prev, next) => prev + next, 0)
            account.toAccountsTransfers       = data.toAccountsTransfers.filter(el => el.to_account_id == account.id).map(item => item.cost).reduce((prev, next) => prev + next, 0)
            
            account.debit += account.accountsWithdrawals + account.toAccountsTransfers
            account.creditor += account.accountsDeposits + account.fromAccountsTransfers

            this.items.push(account)
          });

          if (this.params.sections_account_id) {
            this.items = this.items.filter(el => this.params.sections_account_id.includes(el.sections_account_id) )
          }
          if (this.params.account_id) {
            this.items = this.items.filter(el => el.id == this.params.account_id )
          }
          if (!this.params.zero_balance_allow) {
            this.items = this.items.filter(el => el.balance != 0)
          }

          this.items.forEach((item) => {
            this.debit    += parseFloat(item.debit);
            this.creditor += parseFloat(item.creditor);
            this.balance  += parseFloat(item.balance);

            if (this.$option.balance_type == 1) {item.balance = item.balance * -1}

            item.debit    = this.$moneyFormat(item.debit)
            item.creditor = this.$moneyFormat(item.creditor)
            item.balance  = this.$moneyFormat(item.balance)

          });

          var account = this.$database.accounts.find((el) => el.id == this.params.account_id);
          if (account) {
            this.accountName = account.name;
          } else {
            this.accountName = "";
          }

          var sectionCustomer = this.$database.sectionsAccounts.find(el => el.id == this.params.sections_account_id)
          if (sectionCustomer) {this.sectionCustomerName = sectionCustomer.name;} else {this.sectionCustomerName = "";}

          this.debit    = this.$moneyFormat(this.debit)
          this.creditor = this.$moneyFormat(this.creditor)

          if (this.$option.balance_type == 1) { this.balance = this.balance * -1;}
          this.balance  = this.$moneyFormat(this.balance)
          this.loading = 0;
        });
    },
    getUsers() {
      axios.get(this.$linkGnirator("/usersItems")).then((response) => {
        this.users = response.data;
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
    },
    selectedSections: function (val) {
      this.params.sections_account_id = val.map((el) => el.id);
    },
  },
  mounted() {
    this.params = this.$getParams();
    if (typeof this.params.startDate === 'undefined') {
      this.params.startDate = new Date().toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0, 10);
    }
    this.$updateDatabase(["accounts"]);
    this.getData();
    this.getUsers();
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
