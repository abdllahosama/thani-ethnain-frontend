<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'عمليات الشحن.'"
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
              <div class="col-md-3">
                <div class="form-group">
                  <label>الحالة</label>
                  <select
                    type="text"
                    v-model="params.status"
                    class="form-control"
                  >
                    <option value="">اختر  الحالة</option>
                    <option value="0">قيدالأنتظار</option>
                    <option value="1">في الطريق</option>
                    <option value="2">مدفوع</option>
                  </select>
                </div>
              </div>
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            title="عمليات الشحن" 
            :details="[
              {title: 'اسم العميل', value : customerName },
              {title: 'اسم المستخدم', value : userName },
              {title: 'نقطة البيع', value : pointOfSaleName },
              {title: 'رقم الجلسة', value : sessionNumber },
              {title: 'مندوب الشحن', value : deliveryName }
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              { column: 'code', link: '/shippingOperations', title: $t('shippingOperations.operationCode'), type:'reportMainLink', sort: true,
              supData: true},
              {
                column: 'date',
                title: $t('shippingOperations.date'),
                type: 'text',
                sort: true,
                supData: true,
              },
              {
                column: 'client_type',
                title: $t('shippingOperations.customerName'),
                type: 'clintLink',
                sort: false
              },
              {
                column: 'user',
                title: 'المستخدم',
                type: 'text',
                sort: true,
                supData: true,
              },
              {
                column: 'delivery',
                title: $t('pointOfSales.invoices.DeliveryRepresentative'),
                type: 'text',
                sort: true
              },
              {
                column: 'cod',
                title: 'المبلغ',
                type: 'text',
                sort: true
              },
              {
                column: 'cost',
                title: 'التكلفة',
                type: 'text',
                sort: true
              },
              {
                column: 'total',
                title: 'الأجمالي',
                type: 'text',
                sort: true
              },
              
            ]"
            :footer="[
              { colspan: $option.print_type == 1  ? 2 : 1, value: 'المجموع' },
              { colspan: 3, value: invoicesCount, supData: true },
              
              { colspan: 1, value: cod},
              { colspan: 1, value: cost},
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
      path: "/reports/shippingOperations/invoices",
      items: [],
      loading: 1,
      invoicesCount: 0,
      cod: 0,
      cost: 0,
      total: 0,
      params: {
        customer_id: "",
        user_id: "",
        point_of_sale_id: "",
        delivery_id: "",
        session_number: "",
        dateFilter: 2,
        startDate: '',
        endDate: ''
      },

      excel: {
        fileName: 'shipping operations by invoice',
        reportData: '[]'
      },
      customerName:"",
      userName:"",
      pointOfSaleName:"",
      sessionNumber:"",
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

          this.cod = 0;
          this.cost = 0;
          this.total = 0;
          this.invoicesCount = this.items.length;

          this.items.forEach((item) => {
            item.total     = item.cod + item.cost

            this.cod      += item.cod;
            this.cost     += item.cost;
            this.total    += item.total;

            item.cod = this.$moneyFormat(item.cod);
            item.cost = this.$moneyFormat(item.cost);
            item.total = this.$moneyFormat(item.total);

            if (item.client_type == 0) {
              var customer = this.$database.customers.find((el) => el.id == item.customer_id);
              if (customer) {item.customer = customer;}
            } else {
              var customer = this.$database.suppliers.find((el) => el.id == item.supplier_id);
              if (customer) {item.supplier = customer;}
            }

            var delivery = this.$database.deliveries.find((el) => el.id == item.delivery_id);
            if (delivery) {item.delivery = delivery.name;}
            

            var user = this.users.find((el) => el.id == item.user_id);
            if (user) {item.user = user.name;}

            item.date = this.$dateFormat(item.date)

          });

          this.cod   = this.$moneyFormat(this.cod);
          this.cost  = this.$moneyFormat(this.cost);
          this.total = this.$moneyFormat(this.total);

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


      this.sessionNumber =  this.params.session_number

      var delivery = this.$database.deliveries.find((el) => el.id == this.params.delivery_id);
      if (delivery) {
        this.deliveryName = delivery.name;
      } else{
        this.deliveryName =""
      }


      var pointOfSale = this.$database.pointOfSales.find((el) => el.id == this.params.point_of_sale_id);
      if (pointOfSale) {
        this.pointOfSaleName = pointOfSale.name;
      } else{
        this.pointOfSaleName =""
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
    if (typeof this.params.startDate === 'undefined') {
      this.params.startDate = new Date().toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0, 10);
    }
    this.params.status = '';
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
