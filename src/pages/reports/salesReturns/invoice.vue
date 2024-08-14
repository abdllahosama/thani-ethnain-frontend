<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'مرتجعات البيع بالفاتورة.'"
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
              <div class="col-md-3">
                <div class="form-group">
                  <label>نوع الطلب</label>
                  <select
                    type="text"
                    v-model="params.table_number"
                    class="form-control"
                  >
                    <option value="">اختر نوع الطلب</option>
                    <option value="0">تيك اواي</option>
                    <option value="1">صاله</option>
                  </select>
                </div>
              </div>
              <searchInput
                class="col-md-3"
                title="مندوب االشحن"
                plaseholder="اختر مندوب الشحن"
                :show="'name'"
                :refrance="'id'"
                v-model="params.delivery_id"
                :value="params.delivery_id"
                :values="$database.deliveries"
              />

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
              {title: 'مندوب الشحن', value : deliveryName },
              {title: 'المسوق', value : marketerName }
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              { column: 'code', link: '/invoices', title: 'الكود', type:'reportMainLink', sort: true},
              {
                column: 'date',
                title: 'التاريخ',
                type: 'text',
                sort: true,
                supData: true,
              },
              {
                column: 'client_type',
                title: 'اسم العميل',
                type: 'clintLink',
                sort: false,
              },
              {
                column: 'user',
                title: 'المستخدم',
                type: 'text',
                sort: true,
                supData: true,
              },
              {
                column: 'subtotal',
                title: 'الأجمالي',
                type: 'text',
                sort: true,
              },
              {
                column: 'edit',
                title: 'تعديل',
                type: 'text',
                sort: true,
                supData: true,
              },
              {
                column: 'delivery',
                title: 'رسوم الشحن',
                type: 'text',
                sort: true,
              },
              {
                column: 'tax',
                title: 'الضرائب',
                type: 'text',
                sort: true,
                supData: true,
              },
              {
                column: 'discount',
                title: 'خصم',
                type: 'text',
                sort: true,
                supData: true,
              },
              {
                column: 'total',
                title: 'المجموع',
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
              { colspan: 1, value: 'المجموع' },
              { colspan: 3, value: invoicesCount, supData: true },
              { colspan: 1, value: subtotal },
              {
                colspan: 1,
                value: edit,
                supData: true,
              },
              { colspan: 1, value: delivery },
              {
                colspan: 1,
                value: tax,
                supData: true,
              },
              {
                colspan: 1,
                value: discount,
                supData: true,
              },
              { colspan: 1, value: total },
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
      path: "/reports/salesReturns/invoices",
      items: [],
      loading: 1,
      invoicesCount: 0,
      subtotal: 0,
      edit: 0,
      delivery: 0,
      tax: 0,
      discount: 0,
      total: 0,
      earning: 0,
      params: {
        customer_id: "",
        store_id: "",
        user_id: "",
        point_of_sale_id: "",
        delivery_id: "",
        session_number: "",
        table_number: "",
        dateFilter: 2,
        startDate: "",
        endDate: "",
      },
      
      excel: {
        fileName: 'saled return by invoice',
        reportData: '[]'
      },

      storeName:"",
      customerName:"",
      userName:"",
      pointOfSaleName:"",
      sessionNumber:"",
      tableNumber:"",
      deliveryName:"",

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

          this.subtotal = 0;
          this.edit = 0;
          this.delivery = 0;
          this.tax = 0;
          this.discount = 0;
          this.total = 0;
          this.earning = 0;

          this.invoicesCount = this.items.length;

          this.items.forEach((item) => {
            this.subtotal += item.subtotal;
            this.edit += item.edit;
            this.delivery += item.delivery;
            this.tax += item.tax;
            this.discount += item.discount;
            this.total += item.total;
            this.earning += item.earning;

            item.subtotal = this.$moneyFormat(item.subtotal);
            item.tax = this.$moneyFormat(item.tax);
            item.discount = this.$moneyFormat(item.discount);
            item.total = this.$moneyFormat(item.total);
            item.earning = this.$moneyFormat(item.earning);
            item.delivery = this.$moneyFormat(item.delivery);
            item.edit = this.$moneyFormat(item.edit);

            if (item.client_type == 0) {
              var customer = this.$database.customers.find(
                (el) => el.id == item.customer_id
              );
              if (customer) {
                item.customer = customer;
              }
            } else {
              var customer = this.$database.suppliers.find(
                (el) => el.id == item.supplier_id
              );
              if (customer) {
                item.supplier = customer;
              }
            }

            var user = this.users.find((el) => el.id == item.user_id);
            if (user) {
              item.user = user.name;
            }

            item.date = this.$dateFormat(item.date)

             

          });

          this.subtotal = this.$moneyFormat(this.subtotal);
          this.tax = this.$moneyFormat(this.tax);
          this.discount = this.$moneyFormat(this.discount);
          this.total = this.$moneyFormat(this.total);
          this.earning = this.$moneyFormat(this.earning);
          this.edit = this.$moneyFormat(this.edit);
          this.delivery = this.$moneyFormat(this.delivery);
        });

      var customer = this.$database.customers.find((el) => el.id == this.params.customer_id);
      if (customer) {
        this.customerName = customer.name;
      } else{
        this.customerName =""
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


      this.sessionNumber =  this.params.session_number

      var delivery1 = this.$database.deliveries.find((el) => el.id == this.params.delivery_id);
      if (delivery1) {
        this.deliveryName = delivery1.name;
      } else{
        this.deliveryName =""
      }

      if (this.params.table_number == 1){
          this.tableNumber = "الصالة"

        } else if(this.params.table_number === '0'){

          this.tableNumber = "تيك اواي"

        } else {
          this.tableNumber = ""
        }


      var pointOfSale = this.$database.pointOfSales.find((el) => el.id == this.params.point_of_sale_id);
      if (pointOfSale) {
        this.pointOfSaleName = pointOfSale.name;
      } else{
        this.pointOfSaleName =""
      }

      this.loading = 0;
    },
    getItems() {
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
