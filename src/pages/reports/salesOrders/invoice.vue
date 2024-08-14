<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="' طلبات البيع حسب الفاتورة.'"
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

              <div class="col-md-3">
                <div class="form-group">
                  <label>الحالة</label>
                  <select class="form-control" v-model="params.status">
                    <option value="">اختر حالة</option>
                    <option value="0">{{$t('orders.form.draft')}}</option>
                    <option value="1">{{$t('orders.form.call1')}}</option>
                    <option value="2">{{$t('orders.form.call2')}}</option>
                    <option value="3">{{$t('orders.form.call3')}}</option>
                    <option value="4">{{$t('orders.form.Certain')}}</option>
                    <option value="5">{{$t('orders.form.readyForShipping')}}</option>
                    <option value="6">{{$t('orders.form.shipped')}}</option>
                    <option value="7">{{$t('orders.form.returnd')}}</option>
                    <option value="8">{{$t('orders.form.returnedToOrigen')}}</option>
                    <option value="9">{{$t('orders.form.rejected')}}</option>
                    <option value="10">{{$t('orders.form.canceled')}}</option>
                  </select>
                </div>
              </div>


              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            title="  تقرير طلبات المبيعات حسب الفاتورة" 
            :details="[
              {title: 'اسم العميل', value : customerName },
              {title: 'اسم المستخدم', value : userName },
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
                column: 'customer',
                title: 'العميل',
                type: 'text',
                sort: true,
                supData: true,
              },
              {
                column: 'user',
                title: 'المستخدم',
                type: 'text',
                sort: true,
                supData: true,
              },
              {
                column: 'status',
                title: $t('orders.situation') ,
                type: 'status',
                sort: true ,  
                values: [
                  {title: $t('orders.draft'), value: 0, color: 'dark'},
                  { title: $t('orders.call1'), value: 1, color: 'dark' },
                  { title: $t('orders.call2'), value: 2, color: 'dark' },
                  { title: $t('orders.call3'), value: 3, color: 'dark' },
                  { title: $t('orders.Certain'), value: 4, color: 'success' },
                  { title: $t('orders.readyForShipping'), value: 5, color: 'success' },
                  { title: $t('orders.shipped'), value: 6, color: 'success' },
                  { title: $t('orders.returnd'), value: 7, color: 'danger'},
                  { title: $t('orders.returnedToOrigen'), value: 8 , color: 'danger'},
                  { title: $t('orders.rejected'), value: 9, color: 'danger' },
                  { title: $t('orders.canceled'), value: 10, color: 'danger' },
                ]
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
            ]"
            :footer="[
              { colspan: 1, value: 'المجموع' },
              { colspan: 4, value: invoicesCount, supData: true },
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
      path: "/reports/salesOrders/invoices",
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
        customer_id: "",
        user_id: "",
        dateFilter: 2,
        startDate:"" ,
        endDate: "",
        status: ""
      },

      excel: {
        fileName: 'sales order by invoice',
        reportData: '[]'
      },

      users: [],

      customerName: "",
      userName: "",
      storeName: "",
      pointOfSaleName: "",
      sessionNumber: "",
      tableNumber: "",
      deliveryName: "",

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
            item.tax = this.$moneyFormat(item.tax);
            item.discount = this.$moneyFormat(item.discount);
            item.total = this.$moneyFormat(item.total);
            item.delivery = item.delivery != null ? this.$moneyFormat(item.delivery) : "0.00";
            item.edit = item.edit != null ? this.$moneyFormat(item.edit) : "0.00";

            if (item.client_type == 0) {
              var customer = this.$database.customers.find(
                (el) => el.id == item.customer_id
              );
              if (customer) {
                item.customer = customer.name;
              }
            } else {
              var customer = this.$database.suppliers.find(
                (el) => el.id == item.supplier_id
              );
              if (customer) {
                item.customer = customer.name;
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
          this.edit = this.$moneyFormat(this.edit);
          this.delivery = this.$moneyFormat(this.delivery);

          this.loading = 0;
        });
      var customer = this.$database.customers.find((el) => el.id == this.params.customer_id);
      if (customer) {
        this.customerName = customer.name;
      } else{
        this.customerName =""
      }

       var user = this.users.find((el) => el.id == this.params.user_id);
      if (user) {
        this.userName = user.name;
      } else{
        this.userName =""
      }


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
    if (typeof this.params.status === 'undefined') {this.params.status = "";}
    
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
