<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'لائحة الإيرادات.'"
        />
        <div class="card">
          <div class="card-header">
            <h4 class="card-header-title">
              <i class="fal fa-edit"></i> خيارات التقرير
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <searchInput
                class="col-md-3"
                title="التصنيف الأساسي"
                plaseholder="اختر تصنيف"
                v-model="params.income_section_id"
                :show="'name'"
                :refrance="'id'"
                :value="params.income_section_id"
                :values="$database.incomeSections.filter(el => el.income_section_id == 0)"
              />
              <searchInput
                v-if="params.income_section_id"
                class="col-md-3"
                title="التصنيف الفرعي"
                plaseholder="اختر تصنيف"
                v-model="params.sup_income_section_id"
                :show="'name'"
                :refrance="'id'"
                :value="params.sup_income_section_id"
                :values="$database.incomeSections.filter(el => el.income_section_id == params.income_section_id)"
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
              <searchInput
                class="col-md-3"
                title="نقطة البيع"
                plaseholder="اختر نقطة بيع"
                :show="'name'"
                :refrance="'id'"
                v-model="params.point_of_sale_id"
                :value="params.point_of_sale_id"
                :values="$database.pointOfSales"
              />
              <div class="col-md-3">
                <div class="form-group">
                  <label>رقم الجلسة</label>
                  <input
                    type="text"
                    v-model="params.session_number"
                    class="form-control"
                    placeholder="ادخل رقم الجلسة"
                  />
                </div>
              </div>

              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            title="الإيرادات حسب التصنيف" 
            :details="[
              {title: 'التصنيف الأساسي', value : sectionName },
              {title: 'التصنيف الفرعي', value : supSectionName },
              {title: 'اسم المستخدم', value : userName },
              {title: 'الخزينة', value : safeName },
              {title: 'العميل', value : customerName },
              {title: 'المورد', value : supplierName },
              {title: 'نقطة البيع', value : pointOfSaleName },
              {title: 'رقم الجلسة', value : sessionNumber },
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              { column: 'code',  link: '/incomes',  title: 'الكود', type: 'reportMainLink', supData: true },
              { column: 'date', title: 'التاريخ', type: 'text', sort: true },
              { column: 'section', title: 'التصنيف', type: 'text', sort: true },
              /*{ column: 'supSection', title: 'التصنيف الفرعي', type: 'text', sort: true },*/
              { column: 'safe', title: 'الخزينة', type: 'text', sort: true, supData: true },
              { column: 'user', title: 'المستخدم', type: 'text', sort: true, supData: true },
              { column: 'description', title: 'وذالك عن', type: 'text', sort: true },
              { column: 'cost', title: 'المبلغ', type: 'text', sort: true },
            ]"
            :footer="[
              { colspan: $option.print_type == 1  ? 3 : 6, value: 'المجموع' },
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
      path: "/reports/incomes/incomeHistory",
      items: [],
      loading: 1,

      cost: 0,

      params: {
        income_section_id: "",
        customer_id: "",
        supplier_id: "",
        safe_id: "",
        user_id: "",
        point_of_sale_id: "",
        session_number: "",
        startDate: "",
        endDate: "",
      },

      excel: {
        fileName: 'incomes history',
        reportData: '[]'
      },

      sectionName: "",
      supSectionName: "",
      userName: "",
      safeName: "",
      customerName: "",
      supplierName: "",
      pointOfSaleName: "",
      sessionNumber: "",

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

          this.cost = 0;

          this.items.forEach((item) => {
            this.cost += item.cost;
            item.cost = this.$moneyFormat(item.cost);

            var customer = this.$database.customers.find(
              (el) => el.id == item.customer_id
            );
            if (customer) {
              item.customer = customer.name;
            }

            var supplier = this.$database.suppliers.find(
              (el) => el.id == item.supplier_id
            );
            if (supplier) {
              item.supplier = supplier.name;
            }

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

            var section = this.$database.incomeSections.find(
              (el) => el.id == item.income_section_id
            );
            if (section) {
              item.section = section.name;
            }

            var supSection = this.$database.incomeSections.find(
              (el) => el.id == item.sup_income_section_id
            );
            if (supSection) {
              item.supSection = supSection.name;
            }

            item.date = this.$dateFormat(item.date)
          });
          this.cost = this.$moneyFormat(this.cost);
          this.loading = 0;
        });

      var customer = this.$database.customers.find(
        (el) => el.id == this.params.customer_id
      );
      if (customer) {
        this.customerName = customer.name;
      } else {
        this.customerName = "";
      }

      var safe = this.$database.safes.find(
        (el) => el.id == this.params.safe_id
      );
      if (safe) {
        this.safeName = safe.name;
      } else {
        this.safeName = "";
      }

      var user = this.users.find((el) => el.id == this.params.user_id);
      if (user) {
        this.userName = user.name;
      } else {
        this.userName = "";
      }

      var supplier = this.$database.suppliers.find(
        (el) => el.id == this.params.supplier_id
      );
      if (supplier) {
        this.supplierName = supplier.name;
      } else {
        this.supplierName = "";
      }

      var section = this.$database.incomeSections.find(
        (el) => el.id == this.params.income_section_id
      );
      if (section) {
        this.sectionName = section.name;
      } else {
        this.sectionName = "";
      }

      var supSection = this.$database.incomeSections.find(
        (el) => el.id == this.params.sup_income_section_id
      );
      if (section) {
        this.supSectionName = supSection.name;
      } else {
        this.supSectionName = "";
      }


      var pointOfSale = this.$database.pointOfSales.find(
        (el) => el.id == this.params.point_of_sale_id
      );
      if (pointOfSale) {
        this.pointOfSaleName = pointOfSale.name;
      } else {
        this.pointOfSaleName = "";
      }
      this.sessionNumber = this.params.session_number;
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
    if (typeof this.params.startDate === "undefined") {
      this.params.startDate = new Date().toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0, 10);
    }
    this.$updateDatabase(["incomeSections"]);
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
