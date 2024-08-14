<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 mt-3">
        <addHeader
          :title="'طباعه الباركود'"
          :description="'من هنا يمكنك تعديل طباعه الباركود'"
        />

        <div class="mb-4 row">
          <dvider
            :title="'ابعاد الملصق'"
            :description="'المعلومات الاساسيه لابعاد الملصق'"
            noLine="true"
          />
          
          <formInput
            :title="'ارتفاع الملصق'"
            v-model="options.height"
            type="number"
          />
          <formInput
            :title="'عرض الملصق'"
            v-model="options.width"
            type="number"
          />
          
          <formInput
            :title="'الهامش الرئسي'"
            v-model="options.height_padding"
            type="number"
          />
          <formInput
            :title="'الهامش الأفقي'"
            v-model="options.width_padding"
            type="number"
          />

          <selectInput
            :title="'نوع الملصق'"
            v-model="options.type"
            :values="[
              { name: 'عادي', value: 1 },
              { name: 'مزدوج', value: 2 },
            ]"
          />

          <checkInput :title="'طباعة اللوجو'" :value="options.logoPrint" v-model="options.logoPrint" v-if="options.type == 1" />

          <dvider
            :title="$t('storesDeposits.form.ProductsInformation')"
            :description="'معلومات المنتجات الخاصة بالطباعة'"
          />
          <productsTable class="col-12" />

          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
          >
            طباعة الباركود
          </a>
        </div>
      </div>
    </div>
    <print/>
  </div>
</template>
<script>
import axios from 'axios'

import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";

import formInput from "@/elements/add/form/formInput.vue";
import checkInput from '@/elements/add/form/checkInput.vue'
import selectInput from "@/elements/add/form/selectInput.vue";
import productsTable from "@/elements/add/form/barcode/productsTable.vue";
import print from "./components/print.vue";
export default {
  data() {
    return {
      path: "/storesDeposits",
      options: {
        height: '',
        width: '',
        height_padding: '',
        width_padding: '',
        type: 1,
        logoPrint: 1,
        quotationItems: [],
      },
      errors: {
        height: false,
        width: false,
      },
    };
  },
  mounted() {
    this.options.height         = this.$option.barcode_height
    this.options.width          = this.$option.barcode_width
    this.options.height_padding = this.$option.barcode_height_padding
    this.options.width_padding  = this.$option.barcode_width_padding
    this.options.type           = this.$option.barcode_type

    this.$updateDatabase([
      "productQuantities",
      "products",
    ]);

    if (this.$route.name == 'productsBarcodeBill') {
      this.$parent.stopEdit = true
      this.getBill()
    } else {
      this.addQuotationItem();
    }
  },
  methods: {
    getBill() {
          axios.get(this.$linkGnirator('/bills/' + this.$route.params.id))
              .then(response => {
                  this.$parent.stopEdit = false;
                  this.item = response.data;
                  response.data.quotationItems.forEach(item => {
                    var product = this.$database.products.find(el => el.id == item.product_id)
                    if (product) {
                      this.options.quotationItems.push({
                        product_id: product.id,
                        product_name: product.name,
                        quantity: item.quantity,
                        barcode: product.barcode,
                        price: product.price
                      })
                    }

                  })

                  if (this.item.quotationItems.length == 0) {
                      this.addQuotationItem()
                  }
              });
      },
    saveItem() {
      var error = 0;
      this.errors = [];
      if (
       typeof this.options.height === "undefined" ||
          this.options.height == "" ||
          this.options.height == 0
      ) {
        error = 1;
        this.errors.height = true;
      }

      if (
       typeof this.options.width === "undefined" ||
          this.options.width == "" ||
          this.options.width == 0
      ) {
        error = 1;
        this.errors.width = true;
      }

      this.options.quotationItems.forEach((quotationItem) => {
        if (quotationItem.quantity == "" || quotationItem.quantity <= 0) {
          error = 1;
          quotationItem.quantityError = true;
        } else {
          quotationItem.quantityError = false;
        }
        if (quotationItem.product_name == "") {
          error = 1;
          quotationItem.productNameError = true;
        } else {
          quotationItem.productNameError = false;
        }
      });
      if (error == 0) {
          this.$parent.aletText = "تم طباعة الباركود بنجاح";
          this.$parent.alertType = "success";

          var elements = document.querySelectorAll('.barcode svg')
          elements.forEach(element => {
            var scale = ((this.options.width - this.options.width_padding * 2)  * 3.7795275591) / element.getAttribute('width').slice(0, -2) * 100;
            element.style.cssText = 'transform: scaleX(' + scale + '%);';
            var translate = element.parentElement.getBoundingClientRect().left - element.getBoundingClientRect().left
            element.style.cssText = 'transform: scaleX(' + scale + '%); margin-left: -'+ translate + 'px;';
          })
          this.sendToPrinter()
      } else {
        this.$parent.aletText = this.$t('allerts.pleaseMakeSureOfTheInput');
        this.$parent.alertType = "danger";
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
    addQuotationItem() {
      this.options.quotationItems.push({
        product_name: "",
        product_id: 0,
        quantity: "",
      });
    },
    sendToPrinter() {
      var myel = this;
      if(typeof ipcRenderer !== 'undefined'){
        setTimeout(function() {
          var html = document.getElementById("printMe").innerHTML;
          var css  = '<meta charset="utf-8" /><style>@page {size: auto;margin: 0mm;}body{-webkit-print-color-adjust:exact!important}</style>'
          var content = '<head>' + css + '</head><body style="margin:0px;badding:0px;">' + html + '</body>'
          var printDetails = {
            data: content
          }
          ipcRenderer.send('printBarcode', JSON.stringify(printDetails))
        }, 20);
      } else {
        setTimeout(function() {
          var html = document.getElementById("printMe").innerHTML;
          var css  = '<meta charset="utf-8" /><style>@page {size: auto;margin: 0mm;}body{-webkit-print-color-adjust:exact!important}</style>'
          var content = '<head>' + css + '</head><body style="margin:0px;badding:0px;">' + html + '</body>'
          var iframe = document.createElement('iframe');
          var html = content;
          document.body.appendChild(iframe);
          iframe.contentWindow.document.open();
          iframe.classList.add("printIframe");
          iframe.contentWindow.document.write(html);
          iframe.contentWindow.document.close();

          iframe.onload = function() {
            iframe.focus();
            iframe.contentWindow.print();
            //iframe.remove();
          };
        }, 20);
      }
    }
  },
  components: {
    dvider,
    addHeader,
    formInput,
    checkInput,
    selectInput,
    productsTable,
    print
  },
};
</script>
