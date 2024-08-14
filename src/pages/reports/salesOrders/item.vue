<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'طلبات المبيعات حسب المنتج.'"
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

              <searchInput
                class="col-md-3"
                title="المنتج"
                plaseholder="اختر منتج"
                :show="'name'"
                :refrance="'id'"
                v-model="params.product_id"
                :value="params.product_id"
                :values="$database.products"
              />

              <div class="form-group col-md-3">
                <label> تصنيف المنتجات </label>
                <multiselect
                  v-model="selectedSections"
                  :options="$database.sections"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="'اختر تصنيف'"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                />
              </div>

              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            title="  تقرير طلبات المبيعات حسب المنتج" 
            :details="[
              {title: 'اسم العميل', value : customerName },
              {title: 'اسم المستخدم', value : userName },
              {title: 'المنتج', value : productName },
              {title: 'التصنيف', value : sectionName },
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              { column: 'product_name', link: '/products', title:'اسم المنتج', type:'reportMainLink', sort: true },

              { column: 'detail', title: 'النوع', type: 'textOrEmpty', sort: true },
              { column: 'quantity', title: 'الكمية', type: 'text', sort: true },
              { column: 'average', title: 'المتوسط', type: 'text',sort: true, supData: true },
              { column: 'price',title: 'الأجمالي', type: 'text', sort: true },
            ]"
            :footer="[
              { colspan: 2, value: 'المجموع' },
              { colspan: 1, value: quantity },
              { colspan: 1, value: average, supData: true },
              { colspan: 1, value: price},
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
      path: "/reports/salesOrders/products",
      items: [],

      loading: 0,

      quantity: 0,
      price: 0,
      average: 0,

      params: {
        customer_id: "",
        user_id: "",
        dateFilter: 2,
        startDate: "",
        endDate: "",
        status: "",
        product_id: "",
        section_id: ""
      },

      excel: {
        fileName: 'sales order by item',
        reportData: '[]'
      },

      customerName: "",
      userName: "",
      storeName: "",
      pointOfSaleName: "",
      sessionNumber: "",
      tableNumber: "",
      deliveryName: "",
      productName: "",
      sectionName: "",

      users: [],
      selectedSections: [],

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

          this.items = [];
          response.data.forEach((item) => {
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

            item.price = this.$moneyFormat(item.price);

            var detail = this.$database.details.find(
              (el) => el.id == item.detail_id
            );
            if (detail) {
              item.detail = detail.name;
            }
          });
          
          this.average = this.$moneyFormat(this.average);
          this.price = this.$moneyFormat(this.price);
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

      var product = this.$database.products.find((el) => el.id == this.params.product_id);
      if (product) {
        this.productName = product.name;
      } else{
        this.productName =""
      }

      var sectionsName = []
      var sections = this.params.section_id.split(",")
      sections.forEach((el) => {
        var section = this.$database.sections.find((item) => item.id == el);
        if (section) {
          sectionsName.push(section.name)
        }
      });

      this.sectionName = sectionsName.toString(' , ');

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
  mounted() {
    this.params = this.$getParams();
    var sections = this.params.section_id.split(",")
    sections.forEach((el) => {
      var item = this.$database.sections.find(item => item.id == el)
      this.selectedSections.push(item)
    });
    if (typeof this.params.startDate === 'undefined') {
      this.params.startDate = new Date().toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0, 10);
    }
    if (typeof this.params.status === 'undefined') {this.params.status = "";}
    this.getData();
    this.getUsers();
  },
  watch: {
    "selectedSections" : function () {
      this.params.section_id = this.selectedSections.map(el => el.id)
    },
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
