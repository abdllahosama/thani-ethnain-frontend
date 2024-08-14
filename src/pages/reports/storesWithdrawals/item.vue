<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'السحب حسب المنتج.'"
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
            title="المسحوبات حسب المنتج" 
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
              { column: 'store_id',    title: $t('storesDeposits.storeName'), type: 'link', to:'store', sort: true, link: true},
              { column: 'product_name', link: '/products', title:'اسم المنتج' ,type: 'reportMainLink' , sort: true },
              { column: 'quantity', title: 'الكمية المسحوبه', type: 'text', sort: true },
            ]"
            :footer="[
              { colspan: 2, value: 'المجموع' },
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
      path: "/reports/storesWithdrawals/products",
      items: [],

      loading: 0,

      quantity: 0,
      price: 0,
      average: 0,

      params: {
        supplier_id: "",
        store_id: "",
        user_id: "",
        dateFilter: 2,
        startDate: "",
        endDate: "",

      },

      excel: {
        fileName: 'store withdrawals by item',
        reportData: '[]'
      },

      supplierName: "",
      storeName: "",
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
      this.items = [];
      axios
        .get(this.$linkGnirator(this.path), { params: this.params })
        .then((response) => {
          this.searchStartDate = this.params.startDate;
          this.searchEndDate = this.params.endDate;

          this.quantity = 0;
          this.price = 0;
          this.profit = 0;

          this.items = [];
          response.data.forEach((item) => {
            item.id = item.product_id
            var mitem = this.items.find(
              (el) => el.product_id == item.product_id
            );
            if (typeof mitem === "undefined") {
              this.items.push(item);
              var mitem = this.items.find(
                (el) => el.product_id == item.product_id
              );
              mitem.average = mitem.price;
            } else {
              mitem.quantity += item.quantity;
              mitem.price += item.price;
              mitem.average =
                mitem.price != 0 ? Math.ceil(mitem.price / mitem.quantity) : 0;
            }
            this.average += mitem.average;
            this.quantity += item.quantity;
            this.price += item.price;

            mitem.average = this.$moneyFormat(mitem.average);
            item.price = this.$moneyFormat(item.price);
          });

          this.price = this.$moneyFormat(this.price);
          this.average = this.$moneyFormat(this.average);
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
      var params = this.params;
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
    reportTable,
    indexHeader,
    dateFilter,
    searchInput,
    actionButtons,
    reportHeader
  },
};
</script>
