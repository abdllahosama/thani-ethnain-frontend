<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="$t('reports.accounts.reports')"
          :description="$t('reports.overview.accountsDepositRecord')"
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
                v-model="params.account_id"
                :show="'name'"
                :refrance="'id'"
                :value="params.account_id"
                :values="$database.accounts"
              />
              <dateFilter class="col-md-3" />
              <searchInput
                class="col-md-3"
                :title="$t('reports.overview.theUser')"
                :plaseholder="$t('reports.overview.chooseUser')"
                v-model="params.user_id"
                :show="'name'"
                :refrance="'id'"
                :value="params.user_id"
                :values="this.users"
              />
              <searchInput
                class="col-md-3"
                :title="$t('reports.overview.treasury')"
                :plaseholder="$t('reports.overview.ChooseSafe')"
                :show="'name'"
                :refrance="'id'"
                v-model="params.safe_id"
                :value="params.safe_id"
                :values="$database.safes"
              />
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            :title="$t('reports.overview.accountsDepositRecord')"
            :details="[
              {title: $t('reports.accounts.account'), value : supplierName },
              {title: $t('reports.overview.userName'), value : userName },
              {title: $t('reports.overview.treasury'), value : safeName }
            ]"
          />
          <reportTable
            :emptyTableText="$t('reports.accounts.thereNoDataTheMoment')"
            :emptyTableSubText="$t('reports.accounts.tryAddingSomeAndTryAgain')"
            :cloumns="[
              { column: 'code', link: '/accountsDeposits', title: $t('reports.accounts.code'), type:'reportMainLink', sort: true},
              { column: 'date', title: $t('reports.accounts.date'), type: 'text', sort: true },
              { column: 'partner', title: $t('reports.accounts.account'), type: 'text', sort: true },
              { column: 'user', title: $t('reports.overview.theUser'), type: 'text', sort: true },
              { column: 'safe', title: $t('reports.overview.treasury'), type: 'text', sort: true },
              {
                column: 'cost',
                title: $t('reports.overview.theAmount'),
                type: 'text',
                sort: true
              },
            ]"
            :footer="[
              { colspan: 5, value: $t('reports.overview.total') },
              { colspan: 1, value: cost },
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
      path: "/reports/accountsPayments/accountsDeposits",
      items: [],
      loading: 1,

      cost: 0,

      params: {
        partner_id: "",
        safe_id: "",
        user_id: "",
        startDate: "",
        endDate: "",
      },

      excel: {
        fileName: 'accuont beposits history',
        reportData: '[]'
      },

      users: [],
      partnerName: "",
      userName: "",
      safeName: "",
      searchStartDate: "",
      searchEndDate: "",
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
          this.items = response.data;

          this.searchStartDate = this.params.startDate;
          this.searchEndDate = this.params.endDate;

          this.cost = 0;

          this.items.forEach((item) => {
            this.cost += item.cost;
            item.cost = this.$moneyFormat(item.cost);

            item.date = this.$dateFormat(item.date);

            var partner = this.$database.accuont.find(
              (el) => el.id == item.partner_id
            );
            item.partner = partner.name;


            var user = this.users.find((el) => el.id == item.user_id);
            if (user) {
              item.user = user.name;
            }

            var safe = this.$database.safes.find(
              (el) => el.id == item.safe_id
            );
            if (safe) {
              item.safe = safe.name;
            }

          });
          this.cost = this.$moneyFormat(this.cost);
          this.loading = 0;
        });

      var partner = this.$database.accuont.find((el) => el.id == this.params.partner_id);
      if (partner) {
        this.partnerName = partner.name;
      } else{
        this.partnerName =""
      }

       var safe = this.$database.safes.find((el) => el.id == this.params.safe_id);
      if (safe) {
        this.safeName = safe.name;
      } else{
        this.safeName =""
      }

       var user = this.users.find((el) => el.id == this.params.user_id);
      if (user) {
        this.userName = user.name;
      } else{
        this.userName =""
      }
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
    }
  },
  mounted() {
    this.params = this.$getParams();
    if (typeof this.params.startDate === 'undefined') {
      this.params.startDate = new Date().toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0, 10);
    }
    this.$updateDatabase(["safes", "accounts"]);
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
