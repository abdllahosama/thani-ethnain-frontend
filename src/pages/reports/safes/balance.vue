<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'ارصدة الخزائن.'"
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
                title="الخزينة"
                plaseholder="اختر خزينة"
                :show="'name'"
                :refrance="'id'"
                v-model="params.safe_id"
                :value="params.safe_id"
                :values="$database.safes"
              />
              <selectInput
                class="col-md-3"
                title="الحالة"
                plaseholder="اختر حالة"
                v-model="params.status"
                :values="[
                  { name: 'مدين', value: 0 },
                  { name: 'دائن', value: 1 },
                  { name: 'موقوف', value: 2 }
                ]"
              />
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            title="ارصدة الخزائن" 
            :details="[
              {title: 'اسم الخزينة', value : safeName },
              {title: 'الحالة', value: statusName}
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              {column: 'name',  link: '/safes',   title:'الخزينه' ,type: 'reportMainLink' , sort: true },
              { column: 'balance', title: 'الرصيد', type: 'text', sort: 'true'},
            ]"
            :footer="[
              { colspan: 1, value: 'المجموع' },
              { colspan: 1, value: balance},
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import reportHeader from "@/elements/reports/reportHeader.vue";
import reportTable from "@/elements/reports/reportTable.vue";
import indexHeader from "@/elements/index/indexHeader.vue";
import selectInput from "@/elements/reports/selectInput.vue";
import searchInput from "@/elements/reports/searchInput.vue";
import actionButtons from "@/elements/reports/actionButtons.vue";
export default {
  data() {
    return {
      path: "/reports/safes/balance",
      items: [],
      safeName: "",
      statusName: "",
      loading: 0,

      balance: 0,
      params: {
        safe_id: "",
        status: ""
      },
      excel: {
        fileName: 'safes balance',
        reportData: '[]'
      },
    };
  },
  methods: {
    getItems() {
      this.$setParams(this.params);
      this.getData();
    },
    getData() {
      var params = this.params;
      this.$setParams(params);
      var items = JSON.parse(JSON.stringify(this.$database.safes));
      if (params.orderBy) {items = items.sort(this.$dynamicSort(params));}
      if (params.safe_id) { items = items.filter((el) => el.id == params.safe_id); }

      if (params.status) {
        if (params.status == 0) {
          items = items.filter((el) => el.balance < 0);
        } else if (params.status == 1) {
          items = items.filter((el) => el.balance > 0);
        } else if (params.status == 2) {
          items = items.filter((el) => el.balance == 0);
        }
      }

      this.items = items;
      this.balance = 0;
      this.items.forEach((item) => {
        this.balance += item.balance;
        item.balance = this.$moneyFormat(item.balance);
      });

      var safe = this.$database.safes.find((el) => el.id == this.params.safe_id);
      if (safe) {this.safeName = safe.name;}

      if (params.status) {
        if (params.status == 0) {
          this.statusName = "مدين"
        } else if (params.status == 1) {
          this.statusName = "دائن"
        } else if (params.status == 2) {
          this.statusName = "موقوف"
        } else {
          this.statusName = ""
        }
      } else {
        this.statusName = ""
      }

      this.balance = this.$moneyFormat(this.balance);
    }
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
    this.getData();
  },
  components: {
    reportTable,
    indexHeader,
    searchInput,
    actionButtons,
    selectInput,
    reportHeader
  },
};
</script>
