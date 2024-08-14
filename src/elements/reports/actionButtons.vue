<template>
  <div>
    <div class="form-group">
      <label for="exampleInputEmail1"> الأجرائات</label>
      <div class="ctions-container d-flex">
        <button class="btn btn-dark w-100" @click="$parent.getData()" :disabled="$parent.loading == 1">
            <i class="fal fa-search"></i> أنشاء
        </button>
        <button @click="print()" :title="$t('reports.overview.Print')" class="btn btn-info" :disabled="$parent.loading  == 1">
            <i class="fal fa-print"></i>
        </button>
        <button @click="excel()" :title="$t('reports.overview.Downloadasexcelfile')" class="btn btn-info" :disabled="loadExle || $parent.loading == 1">
            <i class="fal fa-file-excel"  v-if="!loadExle"></i>
            <i class="fal fa-spinner fa-spin" v-if="loadExle"></i> 
        </button>
        <button @click="pdf()" :title="$t('reports.overview.Viewasexternallink')" class="btn btn-info" :disabled="loadPdf || $parent.loading == 1">
          <i class="fal fa-file-pdf" v-if="!loadPdf"></i>
          <i class="fal fa-spinner fa-spin" v-if="loadPdf"></i> 
        </button>
        <button @click="whatsapp()" :title="$t('reports.overview.WhatsAPP')" class="btn btn-info"  :disabled="loadWhatsapp || $parent.loading == 1">
          <i class="fab fa-whatsapp" v-if="!loadWhatsapp"></i>
          <i class="fal fa-spinner fa-spin" v-if="loadWhatsapp"></i> 
        </button>
        
      </div>
    </div>
    <whatsappForm v-if="whatsappForm"/>
  </div>
</template>
<script>
  import axios from "axios";
  import whatsappForm from "./whatsappForm.vue";
  export default {
    data () {
      return {
        loadPdf: false,
        loadExle: false,
        loadWhatsapp: false,
        whatsappForm: false,
        whatsappMessage: ""
      };
    },
    methods: {
      excel() {
        this.loadExle = true
        axios.post(this.$linkGnirator('/reports/exportExcel'), this.$parent.excel)
        .then(response => {
          window.open(this.$linkGnirator('/reports/exportExcel/' + response.data), '_blank').focus();
          this.loadExle = false
        });
      },
      print () {
        var text = document.getElementById("reportShow").innerHTML;
        var myframe = document.getElementById("printIframe");
        var reportSignatures = "";
        if (Array.isArray(this.$option.reports_signatures_data)) {
          this.$option.reports_signatures_data.forEach(item => {
            reportSignatures += "<div class='signeture-item'><div class='signeture-name'>" + item.name + "</div><div class='signeture-points'>..........................</div></div>";
          })
        }
        myframe.contentDocument.body.innerHTML =
          '<div class="text-center"> <img src="' + localStorage.getItem("logo") + '" class="img-fluid mb-4" style="max-width: 4.5rem;" v-if="$option.image != null"><h2 class="mb-2">' +
          this.$option.name +
          "</h2></div>" +
          text +
          "<div class='signeture-container'>" + reportSignatures +  "</div>";
        setTimeout(function () {
          myframe.focus();
          myframe.contentWindow.print();
        }, 100);
      },
      pdf () {
        this.loadPdf = true;
        var text = document.getElementById("reportShow").innerHTML;
        var reportSignatures = "";
        if (Array.isArray(this.$option.reports_signatures_data)) {
          this.$option.reports_signatures_data.forEach(item => {
            reportSignatures += "<div class='signeture-item'><div class='signeture-name'>" + item.name + "</div><div class='signeture-points'>..........................</div></div>";
          })
        }

        let body =
          '<div class="text-center report-identity"> <img src="' + localStorage.getItem("logo") + '" class="img-fluid mb-4" style="max-width: 4.5rem;" v-if="$option.image != null"><h2 class="mb-2">' +
          this.$option.name +
          "</h2></div>" +
          text +
          "<div class='signeture-container'>" + reportSignatures +  "</div>";
        
        axios
        .post(this.$linkGnirator('/reports/exportPdf'), {"reportData" : body})
        .then(response => {
          window.open(localStorage.getItem('site') + '/api/exportPdf/' + response.data + '?company=' + localStorage.getItem('company'), '_blank').focus();
          this.loadPdf= false
        }
        );
      
      },
      whatsapp () {
        this.loadWhatsapp = true;
        var text = document.getElementById("reportShow").innerHTML;
        var reportSignatures = "";
        if (Array.isArray(this.$option.reports_signatures_data)) {
          this.$option.reports_signatures_data.forEach(item => {
            reportSignatures += "<div class='signeture-item'><div class='signeture-name'>" + item.name + "</div><div class='signeture-points'>..........................</div></div>";
          })
        }

        let body =
          '<div class="text-center report-identity"> <img src="' + localStorage.getItem("logo") + '" class="img-fluid mb-4" style="max-width: 4.5rem;" v-if="$option.image != null"><h2 class="mb-2">' +
          this.$option.name +
          "</h2></div>" +
          text +
          "<div class='signeture-container'>" + reportSignatures +  "</div>";
        
        axios
        .post(this.$linkGnirator('/reports/exportPdf'), {"reportData" : body})
        .then(response => {
          this.whatsappMessage = "مرحبا, وصلك تقرير لمشاهدتة " + localStorage.getItem('site') + '/api/exportPdf/' + response.data + '?company=' + localStorage.getItem('company')
          this.loadWhatsapp= false
          this.whatsappForm = true
        }
        );
      }
    },
    components: {
      whatsappForm
    }
  };
  </script>