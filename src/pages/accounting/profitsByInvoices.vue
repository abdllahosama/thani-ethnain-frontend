<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('profitsByInvoices.Accounting')" :description="$t('profitsByInvoices.ProfitsByInvoices')" />
        <div class="card">
          <div class="card-header">
            <h4 class="card-header-title">
              <i class="fal fa-edit"></i>
              {{$t('profitsByInvoices.ReportOptions')}}
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <dateFilter class="col-md-3" />
              <searchInput
                class="col-md-3"
                :title="$t('profitsByInvoices.User')"
                :plaseholder="$t('profitsByInvoices.ChooseAUser')"
                v-model="params.user_id"
                :show="'name'"
                :refrance="'id'"
                :value="params.user_id"
                :values="this.users"
              />
              <searchInput
                class="col-md-3"
                :title="$t('profitsByInvoices.PointOfSale')"
                :plaseholder="$t('profitsByInvoices.ChooseASellingPoint')"
                :show="'name'"
                :refrance="'id'"
                v-model="params.point_of_sale_id"
                :value="params.point_of_sale_id"
                :values="$database.pointOfSales"
              />

              <div class="col-md-3">
                <div class="form-group">
                  <label>{{$t('profitsByInvoices.SessionNo')}}</label>
                  <input
                    type="text"
                    v-model="params.session_number"
                    class="form-control"
                    :placeholder="$t('profitsByInvoices.EnterTheSessionNumber')"
                  />
                </div>
              </div>

              <searchInput
                class="col-md-3"
                title="الخزينة"
                plaseholder="اختر خزينة"
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
          <div class="card">
            <div class="card-header col-12 p-4">
              <h4 class="card-header-title col-4">
                <i class="fal fa-chart-bar"></i>
                {{$t('profitsByInvoices.ProfitsByInvoices')}}
              </h4>
              <div style="text-align: center" class="col-4">
                <p class="mt-1" v-if="userName">
                  <strong>{{$t('profitsByInvoices.Username')}}</strong>{{ userName }}
                </p>

                <p class="mt-1" v-if="pointOfSaleName">
                  <strong> {{$t('profitsByInvoices.PointOfSale')}} </strong>{{ pointOfSaleName }}
                </p>

                <p class="mt-1" v-if="sessionNumber">
                  <strong> {{$t('profitsByInvoices.SessionNo')}} </strong>{{ sessionNumber }}
                </p>

                <p class="mt-1" v-if="safeName">
                  <strong> {{$t('profitsByInvoices.safeName')}} </strong>{{ safeName }}
                </p>
              </div>
              <p class="col-4 text-left">
                {{$t('profitsByInvoices.FromTheDate')}} {{ searchStartDate ? searchStartDate : "--" }} {{$t('profitsByInvoices.into')}}
                {{ searchEndDate ? searchEndDate : "--" }}
              </p>
            </div>
            <div class="table-responsive">
              <table class="table table-sm table-nowrap card-table table-hover">
                <tbody class="list" v-if="loading != 1">
                  <tr class="clum-head">
                    <td colspan="100" class="text-center">
                      <strong>{{$t('profitsByInvoices.Revenue')}}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>{{$t('profitsByInvoices.TotalSles')}} </strong></td>
                    <td>{{ invoicesTotal }}</td>
                  </tr>
                  <tr>
                    <td><strong>{{$t('profitsByInvoices.SalesProfits')}} </strong></td>
                    <td>{{ invoicesEarning}}</td>
                  </tr>
                  <tr>
                    <td><strong>{{$t('profitsByInvoices.TotalRevenue')}}</strong></td>
                    <td>{{ invoicesEarning }}</td>
                  </tr>
                  <tr class="clum-head">
                    <td colspan="100" class="text-center">
                      <strong>{{$t('profitsByInvoices.expenses')}}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>{{$t('profitsByInvoices.expenses')}}</strong></td>
                    <td>{{ expensesTotal }}</td>
                  </tr>
                  <tr>
                    <td><strong>{{$t('profitsByInvoices.TotalReturnSales')}}</strong></td>
                    <td>
                      {{ saleReturnsTotal }}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>{{$t('profitsByInvoices.LossOfReturnSales')}}</strong></td>
                    <td>
                      {{ saleReturnsEarning }} 
                    </td>
                  </tr>
                  <tr>
                    <td><strong>{{$t('profitsByInvoices.TotalExpenses')}}</strong></td>
                    <td>
                      {{  allExpinces }}
                    </td>
                  </tr>
                  <tr class="clum-head">
                    <td>{{$t('profitsAndLosses.Profit')}}</td>
                    <td>
                      {{ earning }}
                    </td>
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

import indexHeader from "@/elements/index/indexHeader.vue";
import dateFilter from "@/elements/reports/dateFilter.vue";
import searchInput from "@/elements/reports/searchInput.vue";
import actionButtons from "@/elements/reports/actionButtons.vue";
export default {
  data() {
    return {
      path: "/accounting/profitsByInvoices",

      invoicesTotal: 0,
      invoicesEarning: 0,
      expensesTotal: 0,
      saleReturnsTotal: 0,
      saleReturnsEarning: 0,
      allExpinces: 0,
      earning: 0,
      
      loading: 0,

      params: {
        store_id: "",
        user_id: "",
        point_of_sale_id: "",
        safe_id: "",
        session_number: "",
        dateFilter: 2,
        startDate: "",
        endDate: "",
      },

      users: [],

      searchStartDate: "",
      searchEndDate: "",

      storeName: "",
      safeName: "",
      userName: "",
      pointOfSaleName: "",
      sessionNumber: "",
    };
  },
  methods: {
    getData() {
      this.loading = 1;
      this.invoices = [];
      this.salesReturns = [];
      this.expenses = [];

      this.invoicesTotal = 0;
      this.invoicesEarning = 0;
      this.expensesTotal = 0;
      this.saleReturnsTotal = 0;
      this.saleReturnsEarning = 0;
      this.allExpinces = 0;
      this.earning = 0;
      

      axios
        .get(this.$linkGnirator(this.path), { params: this.params })
        .then((response) => {
          this.invoicesTotal      = this.$moneyFormat(response.data.invoicesTotal);
          this.invoicesEarning    = this.$moneyFormat(response.data.invoicesEarning);
          this.expensesTotal      = this.$moneyFormat(response.data.expensesTotal);
          this.saleReturnsTotal   = this.$moneyFormat(response.data.saleReturnsTotal);
          this.saleReturnsEarning = this.$moneyFormat(response.data.saleReturnsEarning);
          this.allExpinces        = this.$moneyFormat(response.data.expensesTotal - response.data.saleReturnsEarning);
          this.earning            = this.$moneyFormat(response.data.invoicesEarning - (response.data.expensesTotal - response.data.saleReturnsEarning));


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

          var safe = this.$database.safes.find(
            (el) => el.id == this.params.safe_id
          );
          if (safe) {
            this.safeName = safe.name;
          } else {
            this.safeName = "";
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
    print() {
      var text = document.getElementById("reportShow").innerHTML;
      var myframe = document.getElementById("printIframe");
      myframe.contentDocument.body.innerHTML =
        '<div class="text-center"> <img src="' +
        this.$linkGnirator(
          "/companiesUploads/" +
            localStorage.getItem("subdomain") +
            "/logos/" +
            this.$option.image
        ) +
        '" class="img-fluid mb-4" style="max-width: 4.5rem;" v-if="$option.image != null"><h2 class="mb-2">' +
        this.$option.name +
        "</h2></div>" +
        text;
      setTimeout(function () {
        myframe.focus();
        myframe.contentWindow.print();
      }, 100);
    },
    getUsers() {
      axios.get(this.$linkGnirator("/usersItems")).then((response) => {
        this.users = response.data;
      });
    },
  },
  mounted() {
    this.params = this.$getParams();
    if (typeof this.params.startDate === "undefined") {
      this.params.startDate = new Date().toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0, 10);
    }
    this.getData();
    this.getUsers();
  },
  components: {
    indexHeader,
    dateFilter,
    searchInput,
    actionButtons,
  },
};
</script>
