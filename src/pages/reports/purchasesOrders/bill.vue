<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'طلبات الشراء حسب الفاتورة .'"
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
                title="المورد"
                plaseholder="اختر مورد"
                :show="'name'"
                :refrance="'id'"
                v-model="params.supplier_id"
                :value="params.supplier_id"
                :values="$database.suppliers"
              />
              <dateFilter class="col-md-3" />
              <searchInput
                class="col-md-3"
                title="المستخدم"
                plaseholder="اختر مستخدم"
                :show="'name'"
                :refrance="'id'"
                v-model="params.user_id"
                :value="params.user_id"
                :values="this.users"
              />
              <searchInput
                class="col-md-3"
                title="المخزن"
                plaseholder="اختر مخزن"
                :show="'name'"
                :refrance="'id'"
                v-model="params.store_id"
                :value="params.store_id"
                :values="$database.stores"
              />


              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            title="طلبات الشراء حسب الفاتورة " 
            :details="[
              {title: 'اسم المورد', value : supplierName },
              {title: 'اسم المستخدم', value : userName },
              {title: 'المخزن', value : storeName }
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              { column: 'code', link: '/bills', title: 'الكود', type:'reportMainLink', sort: true},
              { column: 'date', title: 'التاريخ', type: 'text', sort: true },
              { column: 'supplier', title: 'المورد', type: 'text', sort: true },
              { column: 'user', title: 'المستخدم', type: 'text', sort: true },
              { column: 'subtotal', title: 'الأجمالي', type: 'text', sort: true },
              {
                column: 'edit',
                title: 'تعديل',
                type: 'text',
                sort: true,
                after: $option.currency,
              },
              {
                column: 'delivery',
                title: 'رسوم الشحن',
                type: 'text',
                sort: true,
                after: $option.currency,
              },
              {
                column: 'tax',
                title: 'الضرائب',
                type: 'text',
                sort: true,
                after: $option.currency,
              },
              {
                column: 'discount',
                title: 'خصم',
                type: 'text',
                sort: true,
                after: $option.currency,
              },
              {
                column: 'total',
                title: 'المجموع',
                type: 'text',
                sort: true,
                after: $option.currency,
              },
            ]"
            :footer="[
              { colspan: 1, value: 'المجموع' },
              { colspan: 3, value: invoicesCount },
              { colspan: 1, value: subtotal },
              { colspan: 1, value: edit},
              { colspan: 1, value: delivery},
              { colspan: 1, value: tax},
              { colspan: 1, value: discount},
              { colspan: 1, value: total},
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
      path: "/reports/purchasesOrders/bills",
      items: [],
      loading: 1,
      invoicesCount: 0,
      subtotal: 0,
      edit: 0,
      delivery: 0,
      tax: 0,
      discount: 0,
      total: 0,

      params: {
        supplier_id: "",
        store_id: "",
        user_id: "",
        point_of_sale_id: "",
        dateFilter: 2,
        startDate: "",
        endDate: "",
      },

      excel: {
        fileName: 'purchase order by invoice',
        reportData: '[]'
      },

      users: [],

      supplierName:"",
      userName: "",
      storeName: "",

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

          this.subtotal = 0;
          this.edit = 0;
          this.delivery = 0;
          this.tax = 0;
          this.discount = 0;
          this.total = 0;

          this.invoicesCount = this.items.length;
          this.items.forEach((item) => {
            this.subtotal += item.subtotal;
            this.edit += item.edit;
            this.delivery += item.delivery;
            this.tax += item.tax;
            this.discount += item.discount;
            this.total += item.total;

            item.subtotal = this.$moneyFormat(item.subtotal);
            item.discount = this.$moneyFormat(item.discount);
            item.total = this.$moneyFormat(item.total);
            item.tax = this.$moneyFormat(item.tax);
            item.edit = this.$moneyFormat(item.edit);
            item.delivery = this.$moneyFormat(item.delivery);

            if (item.client_type == 0) {
              var supplier = this.$database.customers.find(
                (el) => el.id == item.customer_id
              );
              item.supplier = supplier.name;
            } else {
              var supplier = this.$database.suppliers.find(
                (el) => el.id == item.supplier_id
              );
              item.supplier = supplier.name;
            }

            var user = this.users.find((el) => el.id == item.user_id);
            if (user) {
              item.user = user.name;
            }

          item.date = this.$dateFormat(item.date)

          });
          this.subtotal = this.subtotal.toFixed(1);
          this.discount = this.discount.toFixed(1);
          this.total = this.total.toFixed(1);
          this.tax = this.tax.toFixed(1);
          this.delivery = this.delivery.toFixed(1);
          this.edit = this.edit.toFixed(1);

          this.loading = 0;
        });

      var supplier = this.$database.suppliers.find((el) => el.id == this.params.supplier_id);
      if (supplier) {
        this.supplierName = supplier.name;
      } else{
        this.supplierName =""
      }

       var store = this.$database.stores.find((el) => el.id == this.params.store_id);
      if (store) {
        this.storeName = store.name;
      } else{
        this.storeName =""
      }

       var user = this.users.find((el) => el.id == this.params.user_id);
      if (user) {
        this.userName = user.name;
      } else{
        this.userName =""
      }
    },
    getItems() {
      this.$setParams(this.params);
      this.$setParams(params);
      if (params.orderBy) {
        this.items.sort(this.$dynamicSort(params));
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
