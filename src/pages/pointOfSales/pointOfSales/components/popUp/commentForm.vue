<template>
  <div class="modal fade show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-card card">
          <div class="card-header">
            <h4 class="card-header-title">{{$t('components.pointOfSalesPopUp.addAComment')}}</h4>
            <button type="button" class="close" @click="close()">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="card-body">
            <div class="form-group row">
              <label class="col-sm-12">{{$t('components.pointOfSalesPopUp.printers')}}</label>
              <div class="col-md-12">
                  <multiselect
                  v-model="selectedPrinter"
                  :options="$parent.options.printers.filter((value, index, self) =>index === self.findIndex((t) => ( t.name === value.name)))"
                  :multiple="true" 
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('components.pointOfSalesPopUp.ChooseAPrinter')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                  />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group row">
                  <label class="col-sm-12">{{$t('components.pointOfSalesPopUp.comment')}}</label>
                  <div class="col-md-12">
                    <textarea class="form-control" v-model="comment"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer card-footer-boxed">
            <div class="row align-items-center justify-content-between">
              <div class="col-auto"></div>
              <div class="col-auto">
                <button class="btn btn-outline-danger" @click="close()">
                  <i class="far fa-times"></i>
                  {{$t('components.pointOfSalesPopUp.Close')}}
                </button>
                <button
                  @click="sendComment()"
                  class="btn btn-dark"
                >
                  <i class="far fa-save"></i>
                  {{$t('components.pointOfSalesPopUp.construction')}}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <print :comment="comment" v-for="(comment, index) in comments" :key="index" />
  </div>
</template>
<script>
import print from "../print/comment.vue";
export default {
  data() {
    return {
      comment: "",
      showError: false,
      selectedPrinter: '',
      comments: []
    }
  },
  methods:{
    sendComment () {
      this.$parent.aletText = "تم ارسال التنبية بنجاح";
      this.$parent.alertType = "success";
      this.comments = []
      this.selectedPrinter.forEach(printer => {
        this.comments.push({
          printer : printer,
          comment : this.comment,
          random  : Math.random().toString(36).substr(2, 20)
        })
      })
      this.printToComment();
    },
    printToComment() {
      var myel = this;
      this.comments.forEach(comment => {
        if (this.$parent.options.local_server == 0) {
          if (typeof ipcRenderer !== "undefined") {
            setTimeout(function () {
              var html = document.getElementById("commentPrint" + comment.random).innerHTML;
              var content = "<head></head><body>" + html + "</body>";
              var printDetails = {
                options: {
                  copies: 1,
                  printerName: comment.printer,
                },
                data: content,
              };
              ipcRenderer.send("print", JSON.stringify(printDetails));
            }, 20);
          } else {
            setTimeout(function () {
              var html = document.getElementById("commentPrint" + comment.random).innerHTML;
              var content = "<head><meta charset='utf-8' /></head><body>" + html + "</body>";
              var iframe = document.createElement("iframe");
              var html = content;
              document.body.appendChild(iframe);
              iframe.contentWindow.document.open();
              iframe.classList.add("printIframe");
              iframe.contentWindow.document.write(html);
              iframe.contentWindow.document.close();
              iframe.focus();
              iframe.contentWindow.print();
              iframe.remove();
            }, 20);
          }
        } else {
          setTimeout(function () {
            var html = document.getElementById("commentPrint" + comment.random).innerHTML;
            var content = "<head></head><body>" + html + "</body>";
            axios.post(myel.$linkGnirator("/sendPrinter"), { printer_name: myel.printer.name, data: content })
          }, 20);
        }
      })
      setTimeout(function () {myel.close()}, 40)
    },
    close() {
      this.$parent.commentFormShow = false
    },
  },
  components: {print}
};
</script>