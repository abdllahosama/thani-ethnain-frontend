<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'المصروفات حسب التصنيف.'"
        />
        <div class="card-body">
          <div class="row">
            <searchInput
                class="col-md-3"
                title="التصنيف الأساسي"
                plaseholder="اختر تصنيف"
                v-model="params.expense_section_id"
                :show="'name'"
                :refrance="'id'"
                :value="params.expense_section_id"
                :values="$database.expenseSections.filter(el => el.expense_section_id == 0)"
              />
              <searchInput
                v-if="params.expense_section_id"
                class="col-md-3"
                title="التصنيف الفرعي"
                plaseholder="اختر تصنيف"
                v-model="params.sup_expense_section_id"
                :show="'name'"
                :refrance="'id'"
                :value="params.sup_expense_section_id"
                :values="$database.expenseSections.filter(el => el.expense_section_id == params.expense_section_id)"
              />
            
            <dateFilter class="col-md-3" />

            <searchInput
              class="col-md-3"
              title="المستخدم"
              plaseholder="اختر مستخدم"
              v-model="params.user_id"
              :show="'name'"
              :refrance="'id'"
              :value="params.user_id"
              :values="this.users"
            />
            <searchInput
                class="col-md-3"
                title="المشروع"
                plaseholder="اختر مشروع"
                :show="'name'"
                :refrance="'id'"
                v-model="params.project_id"
                :value="params.project_id"
                :values="$database.projects"
              />
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
            <searchInput
              class="col-md-3"
              title="العميل"
              plaseholder="اختر عميل"
              v-model="params.customer_id"
              :show="'name'"
              :refrance="'id'"
              :value="params.customer_id"
              :values="$database.customers"
            />
            <searchInput
              class="col-md-3"
              title="المورد"
              plaseholder="اختر مورد"
              v-model="params.supplier_id"
              :show="'name'"
              :refrance="'id'"
              :value="params.supplier_id"
              :values="$database.suppliers"
            />

            <actionButtons class="col-md-3" />
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            title="المصروفات حسب التصنيف" 
            :details="[
              {title: 'التصنيف الأساسي', value : sectionName },
              {title: 'التصنيف الفرعي', value : supSectionName },
              {title: 'اسم المستخدم', value : userName },
              {title: 'الخزينة', value : safeName },
              {title: 'العميل', value : customerName },
              {title: 'المورد', value : supplierName },
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              { column: 'name', title: 'التصنيف', type: 'text', sort: true },
              {
                column: 'expensesCount',
                title: 'عدد المصروفات',
                type: 'text',
                sort: true,
              },
              {
                column: 'cost',
                title: 'المبلغ',
                type: 'text',
                sort: true
              },
            ]"
            :footer="[
              { colspan: 1, value: 'المجموع' },
              { colspan: 1, value: expensesCount },
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
      path: "/reports/expenses/expenseByCategory",
      items: [],
      loading: 1,

      expensesCount: 0,
      cost: 0,

      params: {
        expense_section_id: "",
        customer_id: "",
        supplier_id: "",
        safe_id: "",
        user_id: "",
        dateFilter: 2,
        startDate:"",
        endDate: "",
      },

      excel: {
        fileName: 'expenses by category',
        reportData: '[]'
      },

      sectionName: "",
      supSectionName: "",
      userName: "",
      safeName: "",
      customerName: "",
      supplierName: "",


      users: [],

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

          this.expensesCount = 0;
          this.cost = 0;

          this.items.forEach((item) => {
            item.expensesCount = item.expenses.length;
            item.cost = 0;

            item.expenses.forEach((expense) => {
              item.cost += expense.cost;
            });
            this.cost += item.cost;
            this.expensesCount += item.expensesCount;

            item.cost = this.$moneyFormat(item.cost);
            item.expensesCount = item.expensesCount;
          });

          this.cost = this.$moneyFormat(this.cost);
          this.expensesCount = this.expensesCount;

          for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].cost == 0) {
              this.items.splice(i, 1);
              i--;
            }
          }
          this.loading = 0;
        });

        var customer = this.$database.customers.find((el) => el.id == this.params.customer_id);
      if (customer) {
        this.customerName = customer.name;
      } else{
        this.customerName =""
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

      var supplier = this.$database.suppliers.find((el) => el.id == this.params.supplier_id);
      if (supplier) {
        this.supplierName = supplier.name;
      } else{
        this.supplierName =""
      }

      var section = this.$database.expenseSections.find((el) => el.id == this.params.expense_section_id);
      if (section) {
        this.sectionName = section.name;
      } else{
        this.sectionName =""
      }

      var supSection = this.$database.expenseSections.find(
        (el) => el.id == this.params.sup_expense_section_id
      );
      if (section) {
        this.supSectionName = supSection.name;
      } else {
        this.supSectionName = "";
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
    this.$updateDatabase(["expenseSections"]);
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
