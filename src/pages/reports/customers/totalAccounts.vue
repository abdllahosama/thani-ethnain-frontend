<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'اجمالي حساب العميل.'"
        />
        <div class="card">
          <div class="card-header">
            <h4 class="card-header-title">
              <i class="fal fa-edit"></i>
              خيارات التقرير
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <searchInput
                class="col-md-3"
                title="العميل"
                plaseholder="اختر عميل"
                :show="'name'"
                :refrance="'id'"
                v-model="params.customer_id"
                :value="params.customer_id"
                :values="$database.customers.filter((el) => el.stat == 1)"
              />
              <dateFilter class="col-md-3" />
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            title="اجمالي حساب العميل" 
            :details="[
              {title: 'اسم العميل', value : customerName }
            ]"
          />
          <reportTable
            :header="[
              { colspan: 6, value: 'الرصيد الأفتتاحي' },
              { colspan: 1, value: startBalance },
            ]"
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              { column: 'code', title: 'الكود', type: 'reportCode' },
              { column: 'date', title: 'التاريخ', type: 'text' },
              { column: 'type', title: 'العملية', type: 'reportType' },
              { column: 'statement', title: $t('reports.overview.statement'), type: 'statement' },
              { column: 'debit', title: 'مدين', type: 'textOrEmpty' },
              { column: 'creditor', title: 'دائن ', type: 'textOrEmpty' },
              { column: 'new_balance', title: 'الرصيد', type: 'text'},
            ]"
            :footer="[
              { colspan: 4, value: 'الرصيد النهائي' },
              { colspan: 1, value: debit },
              { colspan: 1, value: creditor },
              { colspan: 1, value: endBalance },
            ]"
            :tafqeet="tafqeet"
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
      path: "/reports/customers/totalAccounts",
      items: [],

      loading: 0,

      startBalance: 0,
      endBalance: 0,

      debit: 0,
      creditor: 0,

      tafqeet: "",

      customerName: "",

      params: {
        customer_id: "",
        store_id: "",
        user_id: "",
        point_of_sale_id: "",
        dateFilter: "",
        startDate:"",
        endDate:"",
      },
      excel: {
        fileName: 'customer total account',
        reportData: '[]'
      },
      searchStartDate: "",
      searchEndDate: ""
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
          this.items = response.data;
          var customer = this.$database.customers.find(
            (el) => el.id == this.params.customer_id
          );
          var startBalance = customer.opening_balance;
          this.debit    = 0;
          this.creditor = 0;
          if (customer.opening_balance < 0) {
            this.debit += (customer.opening_balance * -1)
          } else if (customer.opening_balance > 0) {
            this.creditor += customer.opening_balance
          }
          this.items.forEach((item) => {
            item.old_balance = this.$moneyFormat((this.$option.balance_type == 1) ? startBalance * -1  : startBalance);
            if (item.debit) {
              startBalance = startBalance - item.debit;
              this.debit += item.debit;
              item.debit = this.$moneyFormat(item.debit);
            }
            if (item.creditor) {
              startBalance = startBalance + item.creditor;
              this.creditor += item.creditor;
              item.creditor = this.$moneyFormat(item.creditor);
            }
            item.new_balance = this.$moneyFormat((this.$option.balance_type == 1) ? startBalance * -1  : startBalance);
          });

          if (this.params.startDate != null) {
            var startDate = Date.parse(this.params.startDate) / 1000 - 7200;
            this.items = this.items.filter((el) => el.date >= startDate);
          }
          if (this.params.endDate != null) {
            var endDate = Date.parse(this.params.endDate) / 1000 + 79200;
            this.items = this.items.filter((el) => el.date <= endDate);
          }

          this.items.forEach((item) => {
            item.date = this.$dateFormat(item.date)
          });

          this.searchStartDate = this.params.startDate;
          this.searchEndDate = this.params.endDate;

          if (this.items[0]) {
            this.startBalance = this.items[0].old_balance;
            this.endBalance = this.items[this.items.length - 1].new_balance;
            this.debit    = this.$moneyFormat(this.debit);
            this.creditor = this.$moneyFormat(this.creditor);
            let endBalance = this.$option.balance_type == 0 ? this.endBalance.replace(/,/g, '') : this.endBalance.replace(/,/g, '') * -1;
            this.tafqeet = " الحساب " + (endBalance < 0 ? "مدين ب" : "دائن ب") + this.$tafqeet(this.endBalance.replace(/,/g, '').replace(/-/g, ''));
          }

          var customer = this.$database.customers.find((el) => el.id == this.params.customer_id);
          if (customer) {this.customerName = customer.name;} else {this.customerName = "";}

          var supplier = this.$database.suppliers.find((el) => el.id == this.params.supplier_id);
          if (supplier) {this.supplierName = supplier.name;} else {this.supplierName = "";}

          this.loading = 0;
        });
    }
  },
  watch: {
    items : function () {
      var mainElemnt = this
      setTimeout(() => {
        var title  = document.querySelector('.report-title').textContent
        var data   = document.querySelector('.report-data').textContent
        var date   = document.querySelector('.report-date').textContent
        var header = [title, data, date]
        var table  = document.querySelector('table')
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
    this.$updateDatabase(["customers"]);
    if (this.$route.params.id) {
      this.customerId = this.$route.params.id;
      this.getData();
    }
  },
  components: {
    reportHeader,
    reportTable,
    indexHeader,
    dateFilter,
    searchInput,
    actionButtons
  },
};
</script>
