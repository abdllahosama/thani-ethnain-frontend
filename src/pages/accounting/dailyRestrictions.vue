<template>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-12">
          <indexHeader
            :title="$t('reports.accounts.reports')"
            :description="$t('reports.overview.dailyRestrictionsDetails')"
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
                <actionButtons class="col-md-3" />
              </div>
            </div>
          </div>
          <div id="reportShow">
            <reportHeader 
              :title="$t('reports.overview.dailyRestrictionsDetails')" 
              :details="[]"
            />
            <reportTable
              :emptyTableText="$t('reports.accounts.thereNoDataTheMoment')"
              :emptyTableSubText="$t('reports.accounts.tryAddingSomeAndTryAgain')"
              :cloumns="[
                { column: 'code', title: $t('reports.overview.code'), type: 'reportCode' },
                { column: 'type', title: 'العملية', type: 'reportType' },
                { column: 'date', title: $t('reports.overview.date'), type: 'text' },
                {column: 'debit',title: $t('reports.overview.debtor'),type: 'textOrEmpty',},
                { column: 'creditor',title: $t('reports.overview.creditor'),type: 'textOrEmpty',},
                { column: 'statement', title: $t('reports.overview.statement'), type: 'statement' },
                { column: 'account', title: $t('reports.overview.accountName'), type: 'account' },
              ]"
              :footer="[
                { colspan: 3, value: 'الإجمالي' },
                { colspan: 1, value: debit },
                { colspan: 1, value: creditor },
                { colspan: 1, value: '' },
                { colspan: 1, value: total },
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
        path: "/accounting/dailyRestrictions",
        items: [
        ],
  
        loading: 0,

        total: 0,

        debit: 0,
        creditor: 0,
  
        params: {
          startDate: '',
          endDate: ''
        },
        excel: {
          fileName: 'customer details acount',
          reportData: '[]'
        },
  
        searchStartDate:"",
        searchEndDate:"",
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
            this.debit = 0;
            this.creditor = 0;
            response.data.salesPayments.forEach((item) => {
              this.items.push({
                id: item.id,
                code: item.code,
                date: item.date,
                debit: this.$moneyFormat(item.cost),
                statement: item.description,
                customer_id: item.customer_id,
                supplier_id: item.supplier_id,
                type: item.type
              })
              this.items.push({
                id: item.id,
                code: item.code,
                date: item.date,
                creditor: this.$moneyFormat(item.cost),
                statement: item.description,
                safe_id: item.safe_id,
                type: item.type
              })

              this.debit    += item.cost
              this.creditor += item.cost
            });

            response.data.purchasePayments.forEach((item) => {
              this.items.push({
                id: item.id,
                code: item.code,
                date: item.date,
                debit: this.$moneyFormat(item.cost),
                statement: item.description,
                safe_id: item.safe_id,
                type: item.type
              })
              this.items.push({
                id: item.id,
                code: item.code,
                date: item.date,
                creditor: this.$moneyFormat(item.cost),
                statement: item.description,
                customer_id: item.customer_id,
                supplier_id: item.supplier_id,
                type: item.type
              })

              this.debit    += item.cost
              this.creditor += item.cost
            });

            response.data.accountsDeposits.forEach((item) => {
              this.items.push({
                id: item.id,
                code: item.code,
                date: item.date,
                debit: this.$moneyFormat(item.cost),
                statement: item.description,
                safe_id: item.safe_id,
                type: item.type
              })
              this.items.push({
                id: item.id,
                code: item.code,
                date: item.date,
                creditor: this.$moneyFormat(item.cost),
                statement: item.description,
                account_id: item.account_id,
                type: item.type
              })

              this.debit    += item.cost
              this.creditor += item.cost
            });


            response.data.accountsWithdrawals.forEach((item) => {
              this.items.push({
                id: item.id,
                code: item.code,
                date: item.date,
                debit: this.$moneyFormat(item.cost),
                statement: item.description,
                account_id: item.account_id,
                type: item.type
              })
              this.items.push({
                id: item.id,
                code: item.code,
                date: item.date,
                creditor: this.$moneyFormat(item.cost),
                statement: item.description,
                safe_id: item.safe_id,
                type: item.type
              })

              this.debit    += item.cost
              this.creditor += item.cost
            });


            response.data.partnersDeposits.forEach((item) => {
              this.items.push({
                id: item.id,
                code: item.code,
                date: item.date,
                debit: this.$moneyFormat(item.cost),
                statement: item.description,
                safe_id: item.safe_id,
                type: item.type
              })
              this.items.push({
                id: item.id,
                code: item.code,
                date: item.date,
                creditor: this.$moneyFormat(item.cost),
                statement: item.description,
                partner_id: item.partner_id,
                type: item.type
              })

              this.debit    += item.cost
              this.creditor += item.cost
            });


            response.data.partnersWithdrawals.forEach((item) => {
              this.items.push({
                id: item.id,
                code: item.code,
                date: item.date,
                debit: this.$moneyFormat(item.cost),
                statement: item.description,
                partner_id: item.partner_id,
                type: item.type
              })
              this.items.push({
                id: item.id,
                code: item.code,
                date: item.date,
                creditor: this.$moneyFormat(item.cost),
                statement: item.description,
                safe_id: item.safe_id,
                type: item.type
              })

              this.debit    += item.cost
              this.creditor += item.cost
            });
  
            this.items.forEach((item) => {
              item.date = this.$dateFormat(item.date)

              item.customer = this.$database.customers.find(el => el.id = item.customer_id)
              item.supplier = this.$database.suppliers.find(el => el.id = item.supplier_id)
              item.safe     = this.$database.safes.find(el => el.id = item.safe_id)
              item.account  = this.$database.accounts.find(el => el.id = item.account_id)
              item.partner  = this.$database.partners.find(el => el.id = item.partner_id)
            });
  
            this.searchStartDate = this.params.startDate;
            this.searchEndDate = this.params.endDate;

            this.total = this.debit - this.creditor
            this.total = this.$moneyFormat(this.total)
            this.debit = this.$moneyFormat(this.debit)
            this.creditor = this.$moneyFormat(this.creditor)
  
            this.loading = 0
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
      }
    },
    mounted() {
      this.params = this.$getParams();
      if (typeof this.params.startDate === 'undefined') {
        this.params.startDate = new Date().toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0, 10);
      }
      if (this.params.customer_id > 0) {
        this.getData();
      }
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
  