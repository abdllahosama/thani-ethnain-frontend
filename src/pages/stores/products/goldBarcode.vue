<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 mt-3">
        <addHeader
          :title="'طباعه باركود الذهب'"
          :description="'من هنا يمكنك تعديل طباعه الباركود للذهب'"
        />

        <div class="mb-4 row">
          <dvider
            :title="'ابعاد الملصق'"
            :description="'المعلومات الاساسيه لابعاد الملصق'"
            noLine="true"
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

import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";

import formInput from "@/elements/add/form/formInput.vue";
import selectInput from "@/elements/add/form/selectInput.vue";
import productsTable from "@/elements/add/form/goldBarcode/productsTable.vue";
import print from "./components/goldPrint.vue";
export default {
  data() {
    return {
      path: "/storesDeposits",
      options: {
        height_padding: '',
        width_padding: '',

        quotationItems: [],
      },
      errors: {
        height: false,
        width: false,
      },
    };
  },
  mounted() {
      this.addQuotationItem();

  },
  methods: {
   
    saveItem() {
      var error = 0;
      this.errors = [];

      this.options.quotationItems.forEach((quotationItem) => {
        if (quotationItem.quantity == "" || quotationItem.quantity <= 0) {
          error = 1;
          quotationItem.quantityError = true;
        } else {
          quotationItem.quantityError = false;
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
        type: 1,
        quantity: 1,
        gold_wight: "",
        diamond_wight: "",
        k: 18
      });
    },
    sendToPrinter() {
      var myel = this;
      if(typeof ipcRenderer !== 'undefined'){
        setTimeout(function() {
          var html = document.getElementById("printMe").innerHTML;
          var css  = '<meta charset="utf-8" /><style>@page {size: auto;margin: 0mm;}body{-webkit-print-color-adjust:exact!important}.gold-container {width: 8.3cm;height: 3.65cm;position: relative;}.gold-container .ticket-top {position: absolute;width: 3cm;height: 2.5cm;top: 0;left: 0;}.gold-container .ticket-bottom {position: absolute;width: 3cm;height: 2.5cm;bottom: 0;right: 0;}.gold-container .ticket-front {width: 100%;height: 50%;box-sizing: border-box;transform: rotateX(180deg) rotateY(180deg);}.gold-container .ticket-back {width: 100%;height: 50%;box-sizing: border-box;}.gold-container .ticket-logo{float: left;width: 0.66cm;margin-left: 15px;margin-top: 6px}.gold-container .title-ticket {float: left;font-size: 14px;margin-left: 7px;font-weight: 900;}.gold-container .ticket-content {float: left;margin-left: 9px;}.gold-container .title-ticket2{font-size: 14px;margin-bottom: 3px;margin-top: 4px;font-weight: 900;}</style>'
          var content = '<head>' + css + '</head><body style="margin:0px;badding:0px;">' + html + '</body>'
          var printDetails = {
            data: content
          }
          ipcRenderer.send('printBarcode', JSON.stringify(printDetails))
        }, 20);
      } else {
        setTimeout(function() {
          var html = document.getElementById("printMe").innerHTML;
          var css  = '<meta charset="utf-8" /><style>@page {size: auto;margin: 0mm;}body{-webkit-print-color-adjust:exact!important}.gold-container {width: 8.3cm;height: 3.65cm;position: relative;}.gold-container .ticket-top {position: absolute;width: 3cm;height: 2.5cm;top: 0;left: 0;}.gold-container .ticket-bottom {position: absolute;width: 3cm;height: 2.5cm;bottom: 0;right: 0;}.gold-container .ticket-front {width: 100%;height: 50%;box-sizing: border-box;transform: rotateX(180deg) rotateY(180deg);}.gold-container .ticket-back {width: 100%;height: 50%;box-sizing: border-box;}.gold-container .ticket-logo{float: left;width: 0.66cm;margin-left: 15px;margin-top: 6px}.gold-container .title-ticket {float: left;font-size: 14px;margin-left: 7px;font-weight: 900;}.gold-container .ticket-content {float: left;margin-left: 9px;}.gold-container .title-ticket2{font-size: 14px;margin-bottom: 3px;margin-top: 4px;font-weight: 900;}</style>'
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
            iframe.remove();
            myel.options.quotationItems = [];
            myel.addQuotationItem();
          };
        }, 20);
      }
    }
  },
  components: {
    dvider,
    addHeader,
    formInput,
    selectInput,
    productsTable,
    print
  },
};
</script>
