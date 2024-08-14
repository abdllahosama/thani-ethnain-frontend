<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('profitsAndLosses.Accounting')" :description="$t('profitsAndLosses.ProfitsAndLosses')" />
        <div class="card">
          <div class="card-header">
            <h4 class="card-header-title">
              <i class="fal fa-edit"></i>
              {{$t('profitsAndLosses.ReportOptions')}}
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
          <div class="card">
            <div class="card-header col-12 p-4">
              <h4 class="card-header-title col-4">
                <i class="fal fa-chart-bar"></i>
                {{$t('profitsAndLosses.ProfitsAndLosses')}}
              </h4>
              <div style="text-align: center" class="col-4">
              </div>
              <p class="col-4 text-left">
                {{$t('profitsAndLosses.FromTheDate')}} {{ searchStartDate ? searchStartDate : "--" }} {{$t('profitsAndLosses.into')}}
                {{ searchEndDate ? searchEndDate : "--" }}
              </p>
            </div>
            <div class="table-responsive">
              <table class="table table-sm table-nowrap card-table table-hover">
                <tbody class="list" v-if="loading != 1">
                  <tr class="clum-head">
                    <td colspan="100" class="text-center">
                      <strong>المبيعات</strong>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>المبيعات</strong></td>
                    <td>{{ $moneyFormat(item.sales) }}</td>
                  </tr>
                  <tr>
                    <td><strong>مرتجعات المبيعات</strong></td>
                    <td>
                      {{ $moneyFormat(item.salesReturns) }}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>صافي المبيعات</strong></td>
                    <td>
                      {{ $moneyFormat(item.netSales) }}
                    </td>
                  </tr>
                  <tr class="clum-head">
                    <td colspan="100" class="text-center">
                      <strong>تكلفة البضاعة المباعة</strong>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>مخزون اول المدة</strong></td>
                    <td>{{ $moneyFormat(item.stockBigane) }}</td>
                  </tr>
                  <tr>
                    <td><strong>المشتريات</strong></td>
                    <td>{{ $moneyFormat(item.bills) }}</td>
                  </tr>
                  <tr>
                    <td><strong>مرتجعات المشتريات</strong></td>
                    <td>
                      {{ $moneyFormat(item.purchasesReturns) }}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>مخزون اخر المدة</strong></td>
                    <td>
                      {{ $moneyFormat(item.stockEnd) }}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>تكلفة البضاعة المباعة</strong></td>
                    <td>
                      {{ $moneyFormat(item.soldProductsCost) }}
                    </td>
                  </tr>
                  <tr class="clum-head">
                    <td colspan="100" class="text-center">
                      <strong>حساب الأرباح</strong>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>مجمل الربح</strong></td>
                    <td>
                      {{ $moneyFormat(item.profits) }}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>الإيرادات</strong></td>
                    <td>
                      {{ $moneyFormat(item.incomes) }}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>المصروفات</strong></td>
                    <td>
                      {{ $moneyFormat(item.expenses) }}
                    </td>
                  </tr>
                  <tr class="clum-head">
                    <td>صافي الربح</td>
                    <td>
                      {{ $moneyFormat(item.netProfet) }}
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
      path: "/accounting/profitsAndLosses",
      item: {},
      
      loading: 0,

      params: {
        dateFilter: 2,
        startDate: "",
        endDate: "",
      },


      searchStartDate: "",
      searchEndDate: ""
    };
  },
  methods: {
    getData() {
      this.loading = 1;

      axios
        .get(this.$linkGnirator(this.path), { params: this.params })
        .then((response) => {
          this.item = response.data;
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
    indexHeader,
    dateFilter,
    searchInput,
    actionButtons,
  },
};
</script>
