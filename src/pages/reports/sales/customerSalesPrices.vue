<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'تفريغ الأصناف للعميل'"
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
                title="اسم العميل"
                plaseholder="أختر العميل"
                :show="'name'"
                :refrance="'id'"
                v-model="params.customer_id"
                :value="params.customer_id"
                :values="$database.customers"
              />
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
              <dateFilter class="col-md-3" />
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            title="تفريغ الأصناف للعميل" 
            :details="[
              {title: 'اسم العميل', value : customerName },
              {title: 'اسم المستخدم', value : userName },
              {title: 'المخزن', value : storeName },
              {title: 'المنتج', value : productName },
              {title: 'التصنيف', value : sectionName }
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              { column: 'product_name', link: '/products', title:'اسم المنتج' ,type: 'reportMainLink' , sort: true },
              {
                column: 'price',
                title: 'السعر',
                type: 'text',
                sort: true,
              },
              { column: 'quantity', title: 'الكمية', type: 'text', sort: true },
              
              {
                column: 'total',
                title: 'الأجمالي',
                type: 'text',
                sort: true,
              },
            ]"
            :footer="[
              { colspan: 1, value: 'المجموع' },
              { colspan: 1, value: ''},
              { colspan: 1, value: quantity },
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

import reportTable from "@/elements/reports/reportTable.vue";
import indexHeader from "@/elements/index/indexHeader.vue";
import dateFilter from "@/elements/reports/dateFilter.vue";
import searchInput from "@/elements/reports/searchInput.vue";
import actionButtons from "@/elements/reports/actionButtons.vue";
import reportHeader from "@/elements/reports/reportHeader.vue";

export default {
  data() {
    return {
      path: "/reports/sales/customerSalesPrices",
      items: [],

      loading: 0,

      quantity: 0,
      total: 0,

      params: {
        customer_id: "",
        store_id: "",
        user_id: "",

        startDate: '',
        endDate: ''
      },

      excel: {
        fileName: 'sales by item',
        reportData: '[]'
      },

      users: [],
      storeName:"",
      customerName:"",
      userName:"",
      productName: "",
      sectionName: "",

      searchStartDate: "",
      searchEndDate: "",
      
      selectedSections: []
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

          this.items = response.data;

          this.quantity = 0;
          this.total = 0;

          this.items.forEach((item) => {
            this.quantity += item.quantity;
            this.total    += item.total;
            item.price     = this.$moneyFormat(item.price);
            item.total     = this.$moneyFormat(item.total);
            

          });
          this.total = this.$moneyFormat(this.total);
          this.loading = 0;

          this.searchStartDate = this.params.startDate;
          this.searchEndDate = this.params.endDate;

          var customer = this.$database.customers.find((el) => el.id == this.params.customer_id);
          if (customer) {this.customerName = customer.name;} else{this.customerName = ""}

          var store = this.$database.stores.find((el) => el.id == this.params.store_id);
      if (store) {
        this.storeName = store.name;
      } else{
        this.storeName = ""
      }

       var user = this.users.find((el) => el.id == this.params.user_id);
      if (user) {
        this.userName = user.name;
      } else{
        this.userName =""
      }
      var product = this.$database.products.find((el) => el.id == this.params.product_id);
      if (product) {this.productName = product.name;} else {this.productName =""}

      var sectionsName = []
    
      var sections = this.params.section_id ? this.params.section_id.split(",") : []
      sections.forEach((el) => {
        var section = this.$database.sections.find((item) => item.id == el);
        if (section) {sectionsName.push(section.name)}
      });

        });
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
    var sections = this.params.section_id ? this.params.section_id.split(",") : []
    sections.forEach((el) => {
      var item = this.$database.sections.find(item => item.id == el)
      this.selectedSections.push(item)
    });
    if (typeof this.params.startDate === 'undefined') {
      this.params.startDate = new Date().toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0, 10);
    }
    this.getData();
    this.getUsers();
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
