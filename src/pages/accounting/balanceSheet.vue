<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('balanceSheet.Accounting')" :description="$t('balanceSheet.BalanceSheet')" />
        <div class="card">
          <div class="card-header">
            <h4 class="card-header-title">
              <i class="fal fa-edit"></i>
              {{$t('balanceSheet.ReportOptions')}}
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <dateFilter class="col-md-3" />
              <searchInput
                class="col-md-3"
                :title="$t('balanceSheet.User')"
                :plaseholder="$t('balanceSheet.ChooseAUser')"
                v-model="params.user_id"
                :show="'name'"
                :refrance="'id'"
                :value="params.user_id"
                :values="this.users"
              />
              <searchInput
                class="col-md-3"
                :title="$t('balanceSheet.PointOfSale')"
                :plaseholder="$t('balanceSheet.ChooseASellingPoint')"
                :show="'name'"
                :refrance="'id'"
                v-model="params.point_of_sale_id"
                :value="params.point_of_sale_id"
                :values="$database.pointOfSales"
              />

              <div class="col-md-3">
                <div class="form-group">
                  <label>{{$t('balanceSheet.SessionNo')}}</label>
                  <input
                    type="text"
                    v-model="params.session_number"
                    class="form-control"
                    :placeholder="$t('balanceSheet.EnterTheSessionNumber')"
                  />
                </div>
              </div>
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <div class="card" id="reportShow">
            <div class="card-header col-12 p-4">
              <h4 class="card-header-title col-4">
                <i class="fal fa-chart-bar"></i>
                {{$t('balanceSheet.BalanceSheet')}}
              </h4>
              <div style="text-align: center" class="col-4">
                <p class="mt-1" v-if="userName">
                  <strong>{{$t('balanceSheet.Username')}} </strong>{{ userName }}
                </p>

                <p class="mt-1" v-if="pointOfSaleName">
                  <strong>{{$t('balanceSheet.PointOfSale')}} </strong>{{ pointOfSaleName }}
                </p>

                <p class="mt-1" v-if="sessionNumber">
                  <strong> {{$t('balanceSheet.SessionNo')}} </strong>{{ sessionNumber }}
                </p>
              </div>
              <p class="col-4 text-left">
                {{$t('balanceSheet.FromTheDate')}} {{ searchStartDate ? searchStartDate : "--" }} {{$t('balanceSheet.into')}}
                {{ searchEndDate ? searchEndDate : "--" }}
              </p>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="table-responsive">
                  <table
                    class="table table-sm table-nowrap card-table table-hover"
                  >
                    <tbody class="list" v-if="loading != 1">
                      <tr class="clum-head">
                        <td colspan="100" class="text-center">
                          <strong>{{$t('balanceSheet.Assets')}}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>{{$t('balanceSheet.safes')}}</strong></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>
                          <strong class="p-4">{{$t('balanceSheet.Sales')}} {{$t('balanceSheet.invoices')}}</strong>
                        </td>
                        <td>
                          {{ totalInvoices }} {{ $option.currency }}
                        </td>
                      </tr>

                      <tr>
                        <td><strong>{{$t('balanceSheet.AssetsInCirculation')}}</strong></td>
                        <td></td>
                      </tr>

                      <tr>
                        <td><strong class="p-4">{{$t('balanceSheet.safes')}}</strong></td>
                        <td>{{ totalBills }} {{ $option.currency }}</td>
                      </tr>
                      <tr>
                        <td><strong class="p-4">{{$t('balanceSheet.stores')}}</strong></td>
                        <td>
                          {{ totalExpenses }} {{ $option.currency }}
                        </td>
                      </tr>

                      <tr>
                        <td><strong>{{$t('balanceSheet.Debtors')}}</strong></td>
                        <td></td>
                      </tr>

                      <tr>
                        <td><strong class="p-4">{{$t('balanceSheet.customers')}}</strong></td>
                        <td>
                          {{ totalExpenses }} {{ $option.currency }}
                        </td>
                      </tr>

                      <tr class="clum-head">
                        <td>{{$t('balanceSheet.TotalAssets')}}</td>
                        <td>
                          {{ totalInvoices - totalBills - totalExpenses }}
                          {{ $option.currency }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-md-6">
                <div class="table-responsive">
                  <table
                    class="table table-sm table-nowrap card-table table-hover"
                  >
                    <tbody class="list" v-if="loading != 1">
                      <tr class="clum-head">
                        <td colspan="100" class="text-center">
                          <strong>{{$t('balanceSheet.antagonists')}}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>{{$t('balanceSheet.Creditors')}}</strong></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><strong class="p-4">{{$t('balanceSheet.Suppliers')}}</strong></td>
                        <td>
                          {{ totalInvoices }} {{ $option.currency }}
                        </td>
                      </tr>
                      <tr>
                        <td><strong>{{$t('balanceSheet.Profits')}} / {{$t('balanceSheet.CapitalLosses')}}</strong></td>
                        <td>{{ totalBills }} {{ $option.currency }}</td>
                      </tr>
                      <tr class="clum-head">
                        <td>{{$t('balanceSheet.TotalLiabilities')}}</td>
                        <td>
                          {{ totalInvoices - totalBills - totalExpenses }}
                          {{ $option.currency }}
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
    </div>
    <!-- / .row -->
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
      path: "/accounting/profitsAndLosses",
      logo: localStorage.getItem("logo"),
      invoices: [],
      bills: [],
      expenses: [],

      totalInvoices: 0,
      totalBills: 0,
      totalExpenses: 0,
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
      this.invoices = {};
      this.bills = {};
      this.expenses = {};

      this.totalInvoices = 0;
      this.totalBills = 0;
      this.totalExpenses = 0;

      axios
        .get(this.$linkGnirator(this.path), { params: this.params })
        .then((response) => {
          this.invoices = response.data.invoices;
          this.bills = response.data.bills;
          this.expenses = response.data.expenses;

          this.searchStartDate = this.startDate;
          this.searchEndDate = this.endDate;

          this.invoices.forEach((item) => {
            this.totalInvoices += item.total;
          });

          this.bills.forEach((item) => {
            this.totalBills += item.total;
          });

          this.expenses.forEach((item) => {
            this.totalExpenses += item.cost;
          });

          this.loading = 0;
        });
    },
    print() {
      var text = document.getElementById("reportShow").innerHTML;
      var myframe = document.getElementById("printIframe");
      myframe.contentDocument.body.innerHTML =
        '<div class="text-center"> <img src="' +
        this.logo +
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
