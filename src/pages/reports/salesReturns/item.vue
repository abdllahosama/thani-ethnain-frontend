<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'مرتجعات البيع حسب المنتج.'"
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
                :values="$database.customers"
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
            title="مرتجعات البيع بالفاتورة" 
            :details="[
              {title: 'اسم العميل', value : customerName },
              {title: 'اسم المستخدم', value : userName },
              {title: 'المخزن', value : storeName },
              {title: 'نقطة البيع', value : pointOfSaleName },
              {title: 'رقم الجلسة', value : sessionNumber },
              {title: 'نوع الطلب', value : tableNumber },
              {title: 'مندوب الشحن', value : deliveryName }
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              { column: 'product_name', link: '/products', title:'اسم المنتج' ,type: 'reportMainLink' , sort: true },
              {
                column: 'detail',
                title: 'النوع',
                type: 'textOrEmpty',
                sort: true,
              },
              { column: 'quantity', title: 'الكمية', type: 'text', sort: true },
              {
                column: 'average',
                title: 'المتوسط',
                type: 'text',
                sort: true,
                supData: true,
              },
              {
                column: 'price',
                title: 'الأجمالي',
                type: 'text',
                sort: true,
              },
              {
                column: 'earning',
                title: 'الخسارة',
                type: 'text',
                sort: true,
                disable: !(this.$user.admin || this.$user.role.reports_earning_show)
              },
            ]"
            :footer="[
              { colspan: 2, value: 'المجموع' },
              { colspan: 1, value: quantity },
              {
                colspan: 1,
                value: '',
                supData: true,
              },
              { colspan: 1, value: price },
              { colspan: 1, value: earning,  disable: !(this.$user.admin || this.$user.role.reports_earning_show) },
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
      path: "/reports/salesReturns/products",
      items: [],

      loading: 0,

      quantity: 0,
      price: 0,
      average: 0,
      earning: 0,

      params: {
        customer_id: "",
        store_id: "",
        user_id: "",
        point_of_sale_id: "",
        session_number: "",
        delivery_id: "",
        table_number: "",
        dateFilter: 2,
        startDate: "",
        endDate: "",
      },

      excel: {
        fileName: 'saled return by item',
        reportData: '[]'
      },

      storeName: "",
      customerName: "",
      userName: "",
      pointOfSaleName: "",
      sessionNumber: "",
      tableNumber: null,
      deliveryName: "",

      users: [],

      searchStartDate: "",
      searchEndDate: "",
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
          this.searchStartDate = this.params.startDate;
          this.searchEndDate = this.params.endDate;

          this.quantity = 0;
          this.price = 0;
          this.average = 0;
          this.earning = 0;

          this.items = [];
          response.data.forEach((item) => {
            item.id = item.product_id
            var mitem = this.items.find(
              (el) =>
                el.product_id == item.product_id &&
                el.detail_id == item.detail_id
            );
            if (typeof mitem === "undefined") {
              item.price = item.price * item.quantity;
              this.items.push(item);
              var mitem = this.items.find(
                (el) =>
                  el.product_id == item.product_id &&
                  el.detail_id == item.detail_id
              );
            } else {
              mitem.quantity += item.quantity;
              mitem.earning += item.earning;
              mitem.price += item.price * item.quantity;
            }
            mitem.average =
              mitem.price != 0 ? Math.ceil(mitem.price / mitem.quantity) : 0;
            this.average += mitem.average;
            mitem.average = this.$moneyFormat(mitem.average);
          });
          this.items.forEach((item) => {
            this.quantity += item.quantity;
            this.price += item.price;
            this.earning += item.earning;

            item.price = this.$moneyFormat(item.price);
            item.earning = this.$moneyFormat(item.earning);

            var detail = this.$database.details.find(
              (el) => el.id == item.detail_id
            );
            if (detail) {
              item.detail = detail.name;
            }
          });
          this.average = this.$moneyFormat(this.average);
          this.earning = this.$moneyFormat(this.earning);
          this.price = this.$moneyFormat(this.price);
          var customer = this.$database.customers.find(
            (el) => el.id == this.params.customer_id
          );
          if (customer) {
            this.customerName = customer.name;
          } else {
            this.customerName = "";
          }

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
          this.loading = 0;
        });
    },
    getItems() {
      this.$setParams(params);
      this.searchStartDate = this.params.startDate;
      this.searchEndDate = this.params.endDate;
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
