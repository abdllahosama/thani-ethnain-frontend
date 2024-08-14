<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'سجل خصومات البيع'"
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
                v-model="params.customer_id"
                :show="'name'"
                :refrance="'id'"
                :value="params.customer_id"
                :values="$database.customers"
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
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            title="سجل خصومات البيع" 
            :details="[
              {title: 'اسم العميل', value : customerName },
              {title: 'اسم المستخدم', value : userName },
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              {column: 'code',  link: '/salesCheques',  title: 'الكود' ,type: 'reportMainLink' , sort: true },
              {
                column: 'date',
                title: 'تاريخ السداد',
                type: 'text',
                sort: true,
              },
              { column: 'customer', title: 'العميل', type: 'text', sort: true },
              { column: 'user', title: 'المستخدم', type: 'text', sort: true },
              { column: 'safe', title: 'الخزينة', type: 'text', sort: true },
              {
                column: 'paymentMethod',
                title: 'طريقة الدفع',
                type: 'text',
                sort: true,
              },
              { column: 'stat', title: 'الحالة', type: 'text', sort: true },
              {
                column: 'cost',
                title: 'المبلغ',
                type: 'text',
                sort: true,
              },
            ]"
            :footer="[
              { colspan: 6, value: 'المجموع' },
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
      path: "/reports/discounts/discountsHistory",
      items: [],
      loading: 1,

      cost: 0,

      params: {
        customer_id: "",
        safe_id: "",
        user_id: "",
        stat: "",
        dateFilter: 2,
        startDate: "",
        endDate: "",
      },
      
      excel: {
        fileName: 'dicount history',
        reportData: '[]'
      },

      supplierName: "",
      userName: "",

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

            item.date = this.$dateFormat(item.date)

            item.client_type = 0;
            if (item.client_type == 0) {
              var customer = this.$database.customers.find(
                (el) => el.id == item.customer_id
              );
              item.customer = customer.name;
            } else {
              var customer = this.$database.suppliers.find(
                (el) => el.id == item.supplier_id
              );
              item.customer = customer.name;
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

            var paymentMethod = this.$database.paymentMethods.find(
              (el) => el.id == item.payment_method_id
            );
            if (paymentMethod) {
              item.paymentMethod = paymentMethod.name;
            }

            item.stat = item.stat == 0 ? "قيد الأنتظار" : "مدفوعة";
          });
          this.cost = this.cost.toFixed(1);
          this.loading = 0;
        });
         var customer = this.$database.customers.find(el => el.id == this.params.customer_id);
          if (customer) {
            this.customerName = customer.name
          } else {
            this.customerName = ""
          }

          var user = this.users.find(el => el.id == this.params.user_id);
          if (user) {
            this.userName = user.name
          } else {
            this.userName = ""
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
    this.$updateDatabase(["safes", "customers"]);
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
