<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader 
          :title="$t('reports.totalReport.Reports')" 
          :description="$t('reports.totalReport.BalanceSheet')" 
        />
        <div class="card">
          <div class="card-header">
            <h4 class="card-header-title">
              <i class="fal fa-edit"></i>
              {{$t('reports.totalReport.ReportOptions')}}
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
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>

        <div id="reportShow">
          <reportHeader 
            :title="$t('reports.totalReport.BalanceSheet')" 
            :details="[]"
          />
          
            <div class="card">
              <div class="row">
                <div class="col-md-6">
                  <div class="table-responsive">
                    <table
                      class="table table-sm table-nowrap card-table table-hover"
                    >
                      <thead>
                        <tr>
                          <th>
                            <strong>{{$t('reports.totalReport.debit')}}</strong>
                          </th>
                          <th>
                            <strong>{{$t('reports.totalReport.amount')}}</strong>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="list" v-if="loading != 1">
                        <tr>
                          <td><strong>أﻷصول الثابتة</strong></td>
                          <td>{{ $moneyFormat(item.capitals) }}</td>
                        </tr>
                        <tr>
                          <td><strong>{{$t('balanceSheet.stores')}}</strong></td>
                          <td><router-link to="/ProductsValue">{{ $moneyFormat(item.totalStores) }}</router-link></td>
                        </tr>

                        <tr>
                          <td><strong>{{$t('reports.totalReport.safesDebits')}}</strong></td>
                          <td><router-link to="/safersBalance">{{ $moneyFormat(item.totalSafesDebits) }}</router-link></td>
                        </tr>
                        <tr>
                          <td><strong>{{$t('reports.totalReport.bankAccountsDebits')}}</strong></td>
                          <td><router-link to="/safersBalance">{{ $moneyFormat(item.totalBankAccountsDebits) }}</router-link></td>
                        </tr>
                        <tr>
                          <td><strong>{{$t('reports.totalReport.customersDebits')}}</strong></td>
                          <td><router-link to="/customersBalance?status=0">{{ $moneyFormat(item.totalCustomersDebits) }}</router-link></td>
                        </tr>
                        <tr>
                          <td><strong>{{$t('reports.totalReport.suppliersDebits')}}</strong></td>
                          <td><router-link to="/suppliersBalance?status=0">{{ $moneyFormat(item.totalSuppliersDebits) }}</router-link></td>
                        </tr>
                        <tr>
                          <td><strong>{{$t('reports.totalReport.customersChecks')}}</strong></td>
                          <td><router-link to="/chequesHistory?startDate=&stat=0">{{ $moneyFormat(item.totalCustomersSalesChecks) }}</router-link></td>
                        </tr>
                        <tr>
                          <td><strong>--</strong></td>
                          <td>--</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>{{$t('balanceSheet.TotalAssets')}}</th>
                          <th>{{ $moneyFormat(item.totalDebit) }}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="table-responsive">
                    <table
                      class="table table-sm table-nowrap card-table table-hover"
                    >
                      <thead>
                        <tr>
                          <th>
                            <strong>{{$t('reports.totalReport.cridtor')}}</strong>
                          </th>
                          <th>
                            <strong>{{$t('reports.totalReport.amount')}}</strong>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="list" v-if="loading != 1">
                        <tr>
                          <td><strong>رئس المال</strong></td>
                          <td>{{ $moneyFormat(item.opiningBalance) }}</td>
                        </tr>
                        <tr>
                          <td><strong>{{$t('reports.totalReport.customersCridtors')}}</strong></td>
                          <td><router-link to="/customersBalance?status=1">{{ $moneyFormat(item.totalCustomersCridtors) }}</router-link></td>
                        </tr>
                        <tr>
                          <td><strong>{{$t('reports.totalReport.suppliersCridtors')}}</strong></td>
                          <td><router-link to="/suppliersBalance?status=1">{{ $moneyFormat(item.totalSuppliersCridtors) }}</router-link></td>
                        </tr>
                        <tr>
                          <td><strong>{{$t('reports.totalReport.safesCridtors')}}</strong></td>
                          <td><router-link to="/safersBalance">{{ $moneyFormat(item.totalSafesCridtors) }}</router-link></td>
                        </tr>
                        <tr>
                          <td><strong>{{$t('reports.totalReport.bankAccountsCridtors')}}</strong></td>
                          <td><router-link to="/safersBalance">{{ $moneyFormat(item.totalBankAccountsCridtors) }}</router-link></td>
                        </tr>
                        <tr>
                          <td><strong>{{$t('reports.totalReport.SuppliersPurchaseChecks')}}</strong></td>
                          <td><router-link to="/purchaseChequesHistory?startDate=&stat=0">{{ $moneyFormat(item.totalSuppliersPurchaseChecks) }}</router-link></td>
                        </tr>
                        <tr>
                          <td><strong>{{$t('reports.totalReport.totalWorthyExpenses')}}</strong></td>
                          <td>
                            {{ $moneyFormat(item.totalWorthyExpenses) }}
                          </td>
                        </tr>
                        <tr>
                          <td><strong>{{$t('balanceSheet.Profits')}} / {{$t('balanceSheet.CapitalLosses')}}</strong></td>
                          <td>{{ $moneyFormat(item.profits) }}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>{{$t('balanceSheet.TotalLiabilities')}}</th>
                          <th>{{ $moneyFormat(item.totalCredit) }}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
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
import Routelink from '@/includes/routelink.vue';
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

export default {
  data() {
    return {
      path: "/accounting/totalReport",

      loading: 0,
      item: {},

      params: {
        date: "",
      },

      excel: {
        fileName: 'total report ',
        reportData: '[]'
      },

    };
  },
  methods: {
    getData() {
      this.loading = 1;
      axios
        .get(this.$linkGnirator(this.path), { params: this.params })
        .then((response) => {
          this.item          = response.data;
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
      this.params.startDate = new Date().toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0, 10);
    }
    this.getData();
  },
  components: {
    reportHeader,
    indexHeader,
    dateFilter,
    searchInput,
    actionButtons,
    Routelink,
    VueCtkDateTimePicker
  },
};
</script>
