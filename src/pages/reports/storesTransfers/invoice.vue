<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'نقل بالفاتورة.'"
        />

        <div class="card">
          <div class="card-header">
            <h4 class="card-header-title">
              <i class="fal fa-edit"></i> خيارات التقرير
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <dateFilter class="col-md-3" />

              <searchInput
                class="col-md-3"
                title="من مخزن"
                plaseholder="اختر مخزن"
                :show="'name'"
                :refrance="'id'"
                v-model="params.from_store_id"
                :value="params.from_store_id"
                :values="$database.stores"
              />

               <searchInput
                class="col-md-3"
                title="إلي مخزن"
                plaseholder="اختر مخزن"
                :show="'name'"
                :refrance="'id'"
                v-model="params.to_store_id"
                :value="params.to_store_id"
                :values="$database.stores"
              />
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

              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            title="إيداع المخازن بالفاتورة" 
            :details="[
              {title: 'من مخزن', value : fromStoreName },
              {title: 'إلى مخزن', value : toStoreName },
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              {
                column: 'code',
                link: '/storesDesposits',
                title: 'الكود',
                type: 'reportMainLink',
                sort: true,
              },
              {
                column: 'date',
                title: 'التاريخ',
                type: 'text',
                sort: true,
                supData: true,
              },

              {
                column: 'from_store_name',
                title: $t('storesDeposits.storeName'),
                type: 'text',
              },
              {
                column: 'to_store_name',
                title: $t('storesDeposits.storeName'),
                type: 'text'
              },

              {
                column: 'user',
                title: 'المستخدم',
                type: 'text',
                sort: true,
                supData: true,
              }
            ]"
            :footer="[
              { colspan: 4, value: 'المجموع' },
              { colspan: 1, value: invoicesCount, supData: true }
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
      path: "/reports/storesTransfers/invoices",
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
        from_store_id: "",
        to_store_id: "",
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
        fileName: 'store transfer by invoice',
        reportData: '[]'
      },

      fromStore: "",
      toStore: "",
      customerName: "",
      userName: "",
      pointOfSaleName: "",
      sessionNumber: "",
      tableNumber: "",
      deliveryName: "",
      marketerName: "",

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


            var user = this.users.find((el) => el.id == item.user_id);
            if (user) {
              item.user = user.name;
            }

            item.date = this.$dateFormat(item.date);
          });

          this.subtotal = this.$moneyFormat(this.subtotal);
          this.tax = this.$moneyFormat(this.tax);
          this.discount = this.$moneyFormat(this.discount);
          this.total = this.$moneyFormat(this.total);
          this.edit = this.$moneyFormat(this.edit);
          this.delivery = this.$moneyFormat(this.delivery);
          this.earning = this.$moneyFormat(this.earning);

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

      var fromStore = this.$database.stores.find(
        (el) => el.id == this.params.from_store_id
      );
      if (fromStore) {
        this.fromStore = fromStore.name;
      } else {
        this.fromStore = "";
      }

      var toStore = this.$database.stores.find(
        (el) => el.id == this.params.to_store_id
      );
      if (toStore) {
        this.toStore = toStore.name;
      } else {
        this.toStore = "";
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
      this.params.startDate = new Date()
        .toISOString("en-US", { timeZone: "Africa/Cairo" })
        .slice(0, 10);
    }
    if (!this.params.table_number) {
      this.params.table_number = "";
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
