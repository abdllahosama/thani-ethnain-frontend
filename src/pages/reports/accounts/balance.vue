<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="$t('reports.accounts.reports')"
          :description="$t('reports.accounts.remainingBalanceOfCurrentAccounts')"
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
                :title="$t('reports.accounts.account')"
                :plaseholder="$t('reports.accounts.chooseAccount')"
                :show="'name'"
                :refrance="'id'"
                v-model="params.account_id"
                :value="params.account_id"
                :values="accounts"
              />
              <searchInput
                class="col-md-3"
                :title="$t('reports.overview.sectionAccount')"
                :plaseholder="$t('reports.overview.chooseSection')"
                :show="'name'"
                :refrance="'id'"
                v-model="params.sections_account_id"
                :value="params.sections_account_id"
                :values="$database.sectionsAccounts"
              />
              <selectInput
                class="col-md-3"
                :title="$t('reports.accounts.statue')"
                :plaseholder="$t('reports.accounts.chooseStatue')"
                v-model="params.status"
                :values="[
                  { name: $t('reports.accounts.debtor'), value: 0 },
                  { name: $t('reports.accounts.creditor'), value: 1 },
                  { name: $t('reports.accounts.stopped'), value: 2 }
                ]"
              />
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            :title="$t('reports.accounts.remainingBalanceOfCurrentAccounts')" 
            :details="[
              {title: $t('reports.accounts.accuontName'), value : accountName },
              {title: $t('reports.overview.sectionAccount'), value : sectionCustomerName },
              {title: $t('reports.accounts.statue'), value : statusName },
            ]"
          />
          <reportTable
            :emptyTableText="$t('reports.accounts.thereNoDataTheMoment')"
            :emptyTableSubText="$t('reports.accounts.tryAddingSomeAndTryAgain')"
            :cloumns="[
              {column: 'name',  link: '/accounts',   title:$t('reports.accounts.accuontName'), type: 'reportMainLink' , sort: true },
              {
                column: 'balance',
                title: $t('reports.accounts.balance'),
                type: 'text',
                sort: 'true',   
              },
            ]"
            :footer="[
              { colspan: 1, value: $t('reports.accounts.total') },
              { colspan: 1, value: balance },
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import reportHeader from "@/elements/reports/reportHeader.vue";
import reportTable from "@/elements/reports/reportTable.vue";
import indexHeader from "@/elements/index/indexHeader.vue";
import searchInput from "@/elements/reports/searchInput.vue";
import selectInput from "@/elements/reports/selectInput.vue";
import actionButtons from "@/elements/reports/actionButtons.vue";
export default {
  data() {
    return {
      path: "/reports/accounts/balance",
      items: [],

      loading: 0,

      balance: 0,

      accounts: [],
      accountName:"",
      sectionCustomerName: "",

      params: {
        account_id: "",
        sections_account_id: "",
        status: ""
      },
      excel: {
        fileName: 'account balance',
        reportData: '[]'
      },
    };
  },
  methods: {
    getItems() {
      this.$setParams(this.params);
      this.getData();
    },
    getData() {
      var params = this.params;
      this.$setParams(params);
      var items = JSON.parse(JSON.stringify(this.$database.accounts));
      items = items.filter((el) => el.stat == 1);
      if (params.orderBy) {
        items = items.sort(this.$dynamicSort(params));
      }
      if (params.account_id) {items = items.filter((el) => el.id == params.account_id);}

      if (params.status) {
        if (params.status == 0) {
          items = items.filter((el) => el.balance < 0);
        } else if (params.status == 1) {
          items = items.filter((el) => el.balance > 0);
        } else if (params.status == 2) {
          items = items.filter((el) => el.balance == 0);
        }
      }

      if (params.sections_account_id) {items = items.filter((el) => el.sections_account_id == params.sections_account_id);}
      
      this.items = items;
      this.balance = 0;
      this.items.forEach((item) => {
        this.balance += item.balance;
        if (this.$option.balance_type == 1) {item.balance = item.balance * -1}
        item.balance = this.$moneyFormat(item.balance);

      });
      var account = this.accounts.find(
        (el) => el.id == this.params.account_id
      );
      if (account) {
        this.accountName = account.name;
      } else {
        this.accountName = "";
      }

      var sectionCustomer = this.$database.sectionsAccounts.find(el => el.id == this.params.sections_account_id)
      if (sectionCustomer) {this.sectionCustomerName = sectionCustomer.name;} else {this.sectionCustomerName = "";}

      if (params.status) {
        if (params.status == 0) {
          this.statusName = this.$t('reports.accounts.debtor')
        } else if (params.status == 1) {
          this.statusName = this.$t('reports.accounts.creditor')
        } else if (params.status == 2) {
          this.statusName = this.$t('reports.accounts.stopped')
        } else {
          this.statusName = ""
        }
      } else {
        this.statusName = ""
      }

      if (this.$option.balance_type == 1) { this.balance = this.balance * -1;}
      this.balance = this.$moneyFormat(this.balance)
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
    }
  },
  mounted() {
    this.params = this.$getParams();
    this.accounts = this.$database.accounts.filter(
      (el) => el.stat == 1
    );
    this.getData();
  },
  components: {
    reportHeader,
    reportTable,
    indexHeader,
    searchInput,
    actionButtons,
    selectInput
  },
};
</script>
