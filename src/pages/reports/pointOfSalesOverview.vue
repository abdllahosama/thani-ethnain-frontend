<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="$t('reports.overview.Reports')"
          :description="$t('reports.totalReport.pointOfSales')"
        />
        <div class="card">
          <div class="card-header">
            <h4 class="card-header-title">
              <i class="fal fa-edit"></i>
              {{ $t("reports.overview.ReportOptions") }}
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <dateFilter class="col-md-3" />
              <searchInput
                class="col-md-3"
                :title="$t('reports.overview.PointOfSale')"
                :plaseholder="$t('reports.overview.ChooseASellingPoint')"
                :show="'name'"
                :refrance="'id'"
                v-model="params.point_of_sale_id"
                :value="params.point_of_sale_id"
                :values="$database.pointOfSales"
              />

              <div class="col-md-3">
                <div class="form-group">
                  <label>{{ $t("reports.overview.SessionNo") }}</label>
                  <input
                    type="text"
                    v-model="params.session_number"
                    class="form-control"
                    :placeholder="$t('reports.overview.EnterTheSessionNumber')"
                  />
                </div>
              </div>
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader
            :title="$t('reports.totalReport.pointOfSales')"
            :details="[
              { title: $t('reports.overview.PointOfSale'), value: pointOfSaleName },
              { title: $t('reports.overview.SessionNo'), value: sessionNumber },
            ]"
          />

          <div class="table-responsive card">
            <table class="table table-sm table-nowrap card-table table-hover">
              <tbody class="list" v-if="loading != 1">
                <tr
                  v-if="
                    invoices == 0 &&
                    expenses == 0 &&
                    shippingOpreations == 0
                  "
                >
                  <td colspan="20" class="empty-table">
                    <i class="fas fa-inbox d-block"></i
                    >{{ $t("reports.overview.ThereIsNoDataRightNow") }}
                    <p>{{ $t("reports.overview.TryAddingSomeAndTryAgain") }}</p>
                  </td>
                </tr>

                <tr v-if="invoices > 0">
                  <td>
                    <strong>{{ $t("reports.totalReport.sales") }}</strong>
                  </td>
                  <td>{{ $moneyFormat(invoices) }}</td>
                </tr>

                <tr v-if="shippingOpreations > 0">
                  <td>
                    <strong>{{ $t("reports.totalReport.delivery") }}</strong>
                  </td>
                  <td>{{ $moneyFormat(shippingOpreations) }}</td>
                </tr>

                <tr v-if="expenses > 0">
                  <td>
                    <strong>{{
                      $t("reports.totalReport.expenses")
                    }}</strong>
                  </td>
                  <td>
                    {{ $moneyFormat(expenses)}}
                  </td>
                </tr>

                <tr v-if="safesDeposits > 0">
                  <td>
                    <strong>{{
                      $t("reports.totalReport.safesDeposits")
                    }}</strong>
                  </td>
                  <td>
                    {{ $moneyFormat(safesDeposits)}}
                  </td>
                </tr>

                <tr v-if="safesWithdrawals > 0">
                  <td>
                    <strong>{{
                      $t("reports.totalReport.safesWithdrawals")
                    }}</strong>
                  </td>
                  <td>
                    {{ $moneyFormat(safesWithdrawals)}}
                  </td>
                </tr>

                <tr v-if="safesWithdrawals > 0">
                  <td>
                    <strong>{{
                      $t("reports.totalReport.safesTransfers")
                    }}</strong>
                  </td>
                  <td>
                    {{ $moneyFormat(safesTransfers)}}
                  </td>
                </tr>



                <tr v-if="saleReturns > 0">
                  <td>
                    <strong>{{
                      $t("reports.totalReport.saleReturns")
                    }}</strong>
                  </td>
                  <td>
                    {{ $moneyFormat(saleReturns)}}
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>{{$t("reports.totalReport.processProduct")}}</strong>
                  </td>
                  <td>
                    <strong>{{ $moneyFormat(net) }}</strong>
                  </td>
                </tr>


              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import reportHeader from "@/elements/reports/reportHeader.vue";
import indexHeader from "@/elements/index/indexHeader.vue";
import dateFilter from "@/elements/reports/dateFilter.vue";
import searchInput from "@/elements/reports/searchInput.vue";
import actionButtons from "@/elements/reports/actionButtons.vue";

export default {
  data() {
    return {
      path: "/reports/pointOfSales/overview",

      invoices: 0,
      expenses: 0,
      saleReturns: 0,
      safesDeposits: 0,
      safesWithdrawals: 0,
      safesTransfers: 0,
      shippingOpreations: 0,
      net: 0,

      loading: 0,

      params: {
        point_of_sale_id: "",
        session_number: "",
        dateFilter: 2,
        startDate: "",
        endDate: "",
      },

      excel: {
        fileName: 'point of sale overview',
        reportData: '[]'
      },


      searchStartDate: "",
      searchEndDate: "",

      pointOfSaleName: "",
      sessionNumber: "",
    };
  },
  methods: {
    getData() {
      this.loading = 1;

      this.invoices = 0;
      this.expenses = 0;
      this.saleReturns = 0;
      this.shippingOpreations = 0;
      this.safesDeposits = 0;
      this.safesWithdrawals = 0;
      this.safesTransfers = 0;
      this.net = 0;

      axios
        .get(this.$linkGnirator(this.path), { params: this.params })
        .then((response) => {
          this.invoices           = response.data.invoices;
          this.expenses           = response.data.expenses;
          this.shippingOpreations = response.data.shippingOpreations;
          this.saleReturns        = response.data.saleReturns;
          this.safesDeposits      = response.data.safesDeposits;
          this.safesWithdrawals   = response.data.safesWithdrawals;
          this.safesTransfers     = response.data.safesTransfers;
          this.net                = this.invoices + this.shippingOpreations - this.expenses - this.saleReturns + this.safesDeposits - this.safesWithdrawals - this.safesTransfers;



          this.sessionNumber = this.params.session_number;
          var pointOfSale = this.$database.pointOfSales.find((el) => el.id == this.params.point_of_sale_id);
          if (pointOfSale) {
            this.pointOfSaleName = pointOfSale.name;
          } else {
            this.pointOfSaleName = "";
          }

          this.searchStartDate = this.params.startDate;
          this.searchEndDate = this.params.endDate;

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
    if (typeof this.params.startDate === "undefined") {
      this.params.startDate = new Date()
        .toISOString("en-US", { timeZone: "Africa/Cairo" })
        .slice(0, 10);
    }
  },
  components: {
    reportHeader,
    indexHeader,
    dateFilter,
    searchInput,
    actionButtons,
  },
};
</script>
