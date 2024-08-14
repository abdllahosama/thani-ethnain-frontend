<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'دليل الموردين'"
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
              <div class="col-md-3">
                <div class="form-group">
                  <label>اسم المورد</label>
                  <input
                    type="text"
                    v-model="params.name"
                    class="form-control"
                    placeholder="ادخل اسم المورد"
                  />
                </div>
              </div>
              <searchInput
                class="col-md-3"
                :title="$t('reports.overview.sectionsupplier')"
                :plaseholder="$t('reports.overview.chooseSection')"
                :show="'name'"
                :refrance="'id'"
                v-model="params.sections_account_id"
                :value="params.sections_account_id"
                :values="$database.sectionsAccounts"
              />
              <div class="col-md-3">
                <div class="form-group">
                  <label>المدينة</label>
                  <input
                    type="text"
                    v-model="params.city"
                    class="form-control"
                    placeholder="ادخل اسم المدينة"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>الدولة</label>
                  <input
                    type="text"
                    v-model="params.country"
                    class="form-control"
                    placeholder="ادخل اسم الدولة"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>العنوان</label>
                  <input
                    type="text"
                    v-model="params.address1"
                    class="form-control"
                    placeholder="ادخل العنوان"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>التكملة</label>
                  <input
                    type="text"
                    v-model="params.address2"
                    class="form-control"
                    placeholder="ادخل التكملة"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>رقم الهاتف</label>
                  <input
                    type="text"
                    v-model="params.mobile"
                    class="form-control"
                    placeholder="ادخل رقم الهاتف"
                  />
                </div>
              </div>
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            title="دليل الموردين" 
            :details="[
              {title: 'اسم المورد', value : supplierName },
              {title: $t('reports.overview.sectionsupplier'), value : sectionCustomerName },
              {title: 'المدينة', value : cityName },
              {title: 'الدولة', value : countryName },
              {title: 'العنوان', value : address1Name },
              {title: 'التكملة', value : address2Name },
              {title: 'رقم الهاتف', value : mobileNum },
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              {column: 'name',   link: '/suppliers',   title:'المورد' ,type: 'reportMainLink' , sort: true },
              { column: 'tax_number', title: 'رقم التعريف الضريبي', type: 'text', sort: true },
              { column: 'city', title: 'المدينة', type: 'text', sort: true },
              { column: 'country', title: 'الدولة', type: 'text', sort: true },
              {
                column: 'address1',
                title: 'العنوان',
                type: 'text',
                sort: true,
              },
              {
                column: 'address2',
                title: 'التكملة',
                type: 'text',
                sort: true,
              },
              { column: 'mobile', title: 'الهاتف', type: 'text', sort: true },
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
import searchInput from "@/elements/reports/searchInput.vue";
import actionButtons from "@/elements/reports/actionButtons.vue";

export default {
  data() {
    return {
      items: [],
      loading: 0,
      suppliers: [],
      sectionCustomerName: "",
      params: {
        name: "",
        city: "",
        country: "",
        address1: "",
        address2: "",
        sections_account_id: "",
      },
      excel: {
        fileName: 'suppliers guide',
        reportData: '[]'
      },
      supplierName:"",
      cityName:"",
      countryName:"",
      address1Name:"",
      address2Name:"",
      mobileNum:"",
    };
  },
  methods: {
    getItems() {
      this.$setParams(this.params);
      this.getData();
    },
    getData() {

      this.$setParams(this.params);
      var items = JSON.parse(JSON.stringify(this.$database.suppliers));

      items = items.filter((el) => el.stat == 1);

      if (this.params.orderBy) {
        items = items.sort(this.$dynamicSort(this.params));
      }

      var editName = new RegExp(this.params.name, "i");
      items = items.filter((el) => editName.test(el.name));

      var editCity = new RegExp(this.params.city, "i");
      items = items.filter((el) => editCity.test(el.city));

      var editCountry = new RegExp(this.params.country, "i");
      items = items.filter((el) => editCountry.test(el.country));

      var editAddress1 = new RegExp(this.params.address1, "i");
      items = items.filter((el) => editAddress1.test(el.address1));

      var editAddress2 = new RegExp(this.params.address2, "i");
      items = items.filter((el) => editAddress2.test(el.address2));

      var editMobile = new RegExp(this.params.mobile, "i");
      items = items.filter((el) => editMobile.test(el.mobile));

      if (this.params.sections_account_id) {items = items.filter((el) => el.sections_account_id == this.params.sections_account_id);}
      
      var sectionCustomer = this.$database.sectionsAccounts.find(el => el.id == this.params.sections_account_id)
      if (sectionCustomer) {this.sectionCustomerName = sectionCustomer.name;} else {this.sectionCustomerName = "";}

      this.items = items;

      this.supplierName = this.params.name;
      this.cityName = this.params.city;
      this.countryName = this.params.country;
      this.address1Name = this.params.address1;
      this.address2Name = this.params.address2;
      this.mobileNum = this.params.mobile;
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
    this.getData();
  },
  components: {
    reportHeader,
    reportTable,
    indexHeader,
    searchInput,
    actionButtons,
  },
};
</script>
