<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="$t('reports.accounts.reports')"
          :description="$t('reports.overview.reportsSafeMove')"
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
                :title="$t('reports.overview.nameSafe')"
                :plaseholder="$t('reports.overview.chooseSafe')"
                v-model="params.safe_id"
                :show="'name'"
                :refrance="'id'"
                :value="params.safe_id"
                :values="$database.safes"
              />
              <searchInput
                class="col-md-3"
                :title="$t('reports.overview.sectionSafe')"
                :plaseholder="$t('reports.overview.chooseSection')"
                :show="'name'"
                :refrance="'id'"
                v-model="params.sections_account_id"
                :value="params.sections_account_id"
                :values="$database.sectionsAccounts"
              />
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
            :title="$t('reports.overview.safeMovment')" 
            :details="[
              {title: $t('reports.overview.nameSafe'), value : safeName }
            ]"
          />
          <reportTable
            :emptyTableText="$t('reports.accounts.thereNoDataTheMoment')"
            :emptyTableSubText="$t('reports.accounts.tryAddingSomeAndTryAgain')"
            :cloumns="[
              { column: 'name',link: '/safes' , title: $t('reports.overview.nameSafe'), type:'reportMainLink', sort: true},
              { column: 'debit', title: $t('reports.overview.cityMovement'), type: 'text', sort: true },
              { column: 'creditor', title: $t('reports.overview.circular'), type: 'text', sort: true },
              { column: 'balance', title: $t('reports.overview.balance'), type: 'text' ,sort: true},
            ]"
            :footer="[
              { colspan: 1, value: $t('reports.overview.total') },
              { colspan: 1, value: debit },
              { colspan: 1, value: creditor },
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
      path: "/reports/safes/safesMove",
      items: [],
      loading: 1,

      debit: 0,
      creditor: 0,
      balance: 0,

      params: {
        safe_id: "",
        zero_balance_allow: false
      },

      excel: {
        fileName: 'safes Traffic',
        reportData: '[]'
      },
      safeName: ""
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
          let itemss = JSON.parse(JSON.stringify(this.$database.safes))
          itemss.forEach(safe => {
            safe.salesPayments     = data.salesPayments.filter(el => el.safe_id == safe.id).map(item => item.cost).reduce((prev, next) => prev + next, 0)
            safe.purchasePayments  = data.purchasePayments.filter(el => el.safe_id == safe.id).map(item => item.cost).reduce((prev, next) => prev + next, 0)
            safe.salesCheques      = data.salesCheques.filter(el => el.safe_id == safe.id).map(item => item.cost).reduce((prev, next) => prev + next, 0)
            safe.purchaseCheques   = data.purchaseCheques.filter(el => el.safe_id == safe.id).map(item => item.cost).reduce((prev, next) => prev + next, 0)
            
            safe.expenses             = data.expenses.filter(el => el.safe_id == safe.id).map(item => item.cost).reduce((prev, next) => prev + next, 0)

            safe.safesDeposits        = data.safesDeposits.filter(el => el.safe_id == safe.id).map(item => item.cost).reduce((prev, next) => prev + next, 0)
            safe.safesWithdrawals     = data.safesWithdrawals.filter(el => el.safe_id == safe.id).map(item => item.cost).reduce((prev, next) => prev + next, 0)
            safe.fromSafesTransfers   = data.safesTransfers.filter(el => el.from_safe_id == safe.id).map(item => item.cost).reduce((prev, next) => prev + next, 0)
            safe.toSafesTransfers     = data.safesTransfers.filter(el => el.to_safe_id == safe.id).map(item => item.cost).reduce((prev, next) => prev + next, 0)

            safe.partnersDeposits     = data.partnersDeposits.filter(el => el.safe_id == safe.id).map(item => item.cost).reduce((prev, next) => prev + next, 0)
            safe.partnersWithdrawals  = data.partnersWithdrawals.filter(el => el.safe_id == safe.id).map(item => item.cost).reduce((prev, next) => prev + next, 0)
            
            safe.accountsDeposits      = data.accountsDeposits.filter(el => el.safe_id == safe.id).map(item => item.cost).reduce((prev, next) => prev + next, 0)
            safe.accountsWithdrawals   = data.accountsWithdrawals.filter(el => el.safe_id == safe.id).map(item => item.cost).reduce((prev, next) => prev + next, 0)
            
            safe.employeesWithdrawals  = data.employeesWithdrawals.filter(el => el.safe_id == safe.id).map(item => item.cost).reduce((prev, next) => prev + next, 0)
            
            safe.debit += 
            safe.salesPayments +
            safe.salesCheques  +
            safe.safesDeposits  +
            safe.toSafesTransfers +
            safe.partnersDeposits + 
            safe.accountsDeposits 


            safe.creditor += 
            safe.purchasePayments +
            safe.purchaseCheques + 
            safe.expenses  +
            safe.partnersWithdrawals  +
            safe.accountsWithdrawals  +
            safe.employeesWithdrawals  +
            safe.safesWithdrawals + 
            safe.fromSafesTransfers 

            this.items.push(safe)
          });

          if (!this.params.zero_balance_allow) {
            this.items = this.items.filter(el => el.balance != 0)
          }

          this.items.forEach((item) => {

            this.debit    += parseFloat(item.debit);
            this.creditor += parseFloat(item.creditor);
            this.balance  += parseFloat(item.balance);
            

            item.debit    = this.$moneyFormat(item.debit)
            item.creditor = this.$moneyFormat(item.creditor)
            item.balance  = this.$moneyFormat(item.balance)
          });

          var safe = this.$database.safes.find((el) => el.id == this.params.safe_id);
          if (safe) {this.safeName = safe.name;} else {this.safeName = "";}

          
          this.debit    = this.$moneyFormat(this.debit)
          this.creditor = this.$moneyFormat(this.creditor)
          
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
    this.$updateDatabase(["safes"]);
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
