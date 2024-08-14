<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="$t('reports.overview.Reports')"
          :description="$t('reports.overview.PublicGlance')"
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
                :title="$t('reports.overview.User')"
                :plaseholder="$t('reports.overview.ChooseAUser')"
                v-model="params.user_id"
                :show="'name'"
                :refrance="'id'"
                :value="params.user_id"
                :values="this.users"
              />
              <searchInput
                class="col-md-3"
                :title="$t('reports.overview.Project')"
                :plaseholder="$t('reports.overview.ChooseAProject')"
                :show="'name'"
                :refrance="'id'"
                v-model="params.project_id"
                :value="params.project_id"
                :values="$database.projects"
              />
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
            :title="$t('reports.overview.PublicGlance')"
            :details="[
              { title: $t('reports.overview.Username'), value: userName },
              {
                title: $t('reports.overview.PointOfSale'),
                value: pointOfSaleName,
              },
              { title: $t('reports.overview.SessionNo'), value: sessionNumber },
            ]"
          />

          <div class="card">
            <div class="table-responsive">
              <table class="table table-sm table-nowrap card-table table-hover">
                <tbody class="list" v-if="loading != 1">

                  <tr>
                    <td>
                      <strong>{{ $t("reports.overview.TotalSles") }}</strong>
                    </td>
                    <td>{{ $moneyFormat(data.invoices) }}</td>
                  </tr>

                  <tr>
                    <td>
                      <strong>{{
                        $t("reports.overview.TotalPurchases")
                      }}</strong>
                    </td>
                    <td>{{ $moneyFormat(data.bills) }}</td>
                  </tr>

                  <tr>
                    <td>
                      <strong>{{
                        $t("reports.overview.TotalReturnSales")
                      }}</strong>
                    </td>
                    <td>
                      {{ $moneyFormat(data.salesReturns) }}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong>{{
                        $t("reports.overview.TotalPurchaseReturns")
                      }}</strong>
                    </td>
                    <td>
                      {{ $moneyFormat(data.purchasesReturns) }}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong>{{
                        $t("reports.overview.TotalsalesPayments")
                      }}</strong>
                    </td>
                    <td>
                      {{ $moneyFormat(data.salesPayments) }}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong>{{
                        $t("reports.overview.TotalPurchasePayments")
                      }}</strong>
                    </td>
                    <td>
                      {{ $moneyFormat(data.purchasePayments) }}
                    </td>
                  </tr>

                  <!-- <tr>
                    <td>
                      <strong>{{
                        $t("reports.overview.TotalSalesCheques")
                      }}</strong>
                    </td>
                    <td>
                      {{ $moneyFormat(data.salesCheques) }}
                    </td>
                  </tr> -->

                  <!-- <tr>
                    <td>
                      <strong>{{
                        $t("reports.overview.TotalPurchaseCheques")
                      }}</strong>
                    </td>
                    <td>
                      {{ $moneyFormat(data.purchaseCheques) }}
                    </td>
                  </tr> -->

                  <tr>
                    <td>
                      <strong>{{
                        $t("reports.overview.TotalSalesDiscounts")
                      }}</strong>
                    </td>
                    <td>
                      {{ $moneyFormat(data.salesDiscounts) }}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong>{{
                        $t("reports.overview.TotalPurchaseDiscounts")
                      }}</strong>
                    </td>
                    <td>
                      {{ $moneyFormat(data.purchaseDiscounts) }}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong>الإيرادات</strong>
                    </td>
                    <td>{{ $moneyFormat(data.incomes) }}</td>
                  </tr>

                  <tr>
                    <td>
                      <strong>{{ $t("reports.overview.expenses") }}</strong>
                    </td>
                    <td>{{ $moneyFormat(data.expenses) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
      path: "/reports/overview",

      data: {},

      loading: 0,

      params: {
        store_id: "",
        user_id: "",
        point_of_sale_id: "",
        session_number: "",
        dateFilter: 2,
        startDate: "",
        endDate: "",
      },

      excel: {
        fileName: "overview",
        reportData: "[]",
      },

      users: [],

      searchStartDate: "",
      searchEndDate: "",

      storeName: "",
      userName: "",
      pointOfSaleName: "",
      sessionNumber: "",
    };
  },
  methods: {
    getData() {
      this.loading = 1;


      axios
        .get(this.$linkGnirator(this.path), { params: this.params })
        .then((response) => {
          this.data = response.data;
          

          var store = this.$database.stores.find(
            (el) => el.id == this.params.store_id
          );
          if (store) {
            this.storeName = store.name;
          } else {
            this.storeName = "";
          }

          var user = this.users.find((el) => el.id == this.params.user_id);
          if (user) {
            this.userName = user.name;
          } else {
            this.userName = "";
          }

          this.sessionNumber = this.params.session_number;

          var pointOfSale = this.$database.pointOfSales.find(
            (el) => el.id == this.params.point_of_sale_id
          );
          if (pointOfSale) {
            this.pointOfSaleName = pointOfSale.name;
          } else {
            this.pointOfSaleName = "";
          }

          this.searchStartDate = this.params.startDate;
          this.searchEndDate = this.params.endDate;

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
    items: function () {
      var mainElemnt = this;
      setTimeout(() => {
        var title = document.querySelector(".report-title").textContent;
        var data = document.querySelector(".report-data").textContent;
        var date = document.querySelector(".report-date").textContent;
        var header = [title, data, date];
        var table = document.querySelector("table");
        var reportData = [...table.rows].map((r) =>
          [...r.querySelectorAll("th, td")].map((td) => td.textContent)
        );
        reportData.unshift(header);
        mainElemnt.excel.reportData = JSON.stringify(reportData);
      }, 100);
    },
  },
  mounted() {
    this.params = this.$getParams();
    if (typeof this.params.startDate === "undefined") {
      this.params.startDate = new Date()
        .toISOString("en-US", { timeZone: "Africa/Cairo" })
        .slice(0, 10);
    }
    this.getData();
    this.getUsers();
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
