<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'الإيداع حسب المنتج.'"
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
            title="الإيداع حسب المنتج" 
            :details="[
              {title: 'اسم المستخدم', value : userName },
              {title: 'المخزن', value : storeName },
              {title: 'المنتج', value : productName },
              {title: 'التصنيف', value : sectionName },
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              {
                column: 'store_id',
                title: $t('storesDeposits.storeName'),
                type: 'link',
                to: 'store',
                sort: true,
                link: true,
              },

              {
                column: 'product_name',
                link: '/products',
                title: 'اسم المنتج',
                type: 'reportMainLink',
                sort: true,
              },
              {
                column: 'detail',
                title: 'النوع',
                type: 'textOrEmpty',
                sort: true,
              },
              { column: 'quantity', title: 'الكمية', type: 'text', sort: true }
            ]"
            :footer="[
              { colspan: 3, value: 'المجموع' },
              { colspan: 1, value: quantity },
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
      path: "/reports/storesDeposits/products",
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
        startDate: "",
        endDate: "",
      },

      excel: {
        fileName: 'store deposit by item',
        reportData: '[]'
      },

      users: [],
      storeName: "",
      customerName: "",
      userName: "",
      pointOfSaleName: "",
      sessionNumber: "",
      tableNumber: null,
      deliveryName: "",
      marketerName: "",
      productName: "",
      sectionName: "",

      searchStartDate: "",
      searchEndDate: "",

      selectedSections: [],
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
            item.id = item.product_id;
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

      var delivery1 = this.$database.deliveries.find(
        (el) => el.id == this.params.delivery_id
      );
      if (delivery1) {
        this.deliveryName = delivery1.name;
      } else {
        this.deliveryName = "";
      }

      var marketer = this.$database.marketers.find(
        (el) => el.id == this.params.marketer_id
      );
      if (marketer) {
        this.marketerName = marketer.name;
      } else {
        this.marketerName = "";
      }

      var product = this.$database.products.find(
        (el) => el.id == this.params.product_id
      );
      if (product) {
        this.productName = product.name;
      } else {
        this.productName = "";
      }

      var section = this.$database.sections.find(
        (el) => el.id == this.params.section_id
      );
      if (section) {
        this.sectionName = section.name;
      } else {
        this.sectionName = "";
      }

      if (this.params.table_number == 1) {
        this.tableNumber = "الصالة";
      } else if (this.params.table_number === "0") {
        this.tableNumber = "تيك اواي";
      } else {
        this.tableNumber = "";
      }

      var pointOfSale = this.$database.pointOfSales.find(
        (el) => el.id == this.params.point_of_sale_id
      );
      if (pointOfSale) {
        this.pointOfSaleName = pointOfSale.name;
      } else {
        this.pointOfSaleName = "";
      }
    },
    getItems() {
      this.$setParams(this.params);
      if (this.params.orderBy) {
        this.items.sort(this.$dynamicSort(this.params));
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
    if (typeof this.params.startDate === "undefined") {
      this.params.startDate = new Date()
        .toISOString("en-US", { timeZone: "Africa/Cairo" })
        .slice(0, 10);
    }
    this.getData();
    this.getUsers();
  },
  watch: {
    selectedSections: function (val) {
      this.params.section_id = val.map((el) => el.id);
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
