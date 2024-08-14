<template>
    <div class="row" :style="style">
        <router-link
          v-if="$parent.options.invoice_allow"
          :to="'/pointOfSales/' + $parent.options.id + '/invoices'"
          class="btn pos-main-btn"
        >
          <i class="fal fa-file-invoice-dollar"></i>
          {{ $t('components.pointOfSalesShow.invoices') }}
        </router-link>
        <router-link
          :to="'/pointOfSales/' + $parent.options.id + '/shippingOperations'"
          class="btn pos-main-btn"
          v-if="$parent.options.delivery_allow"
        >
          <i class="fal fa-shipping-fast"></i>
          {{ $t('components.pointOfSalesShow.shippingOperations') }}
        </router-link>
        <router-link
          :to="'/pointOfSales/' + $parent.options.id + '/expenses'"
          class="btn pos-main-btn"
          v-if="$parent.options.expense_allow"
        >
          <i class="fal fa-dollar-sign"></i>
          {{ $t('components.pointOfSalesShow.expenses') }}
        </router-link>

        <button
          class="btn pos-main-btn"
          @click="$parent.showPayment"
          v-if="$parent.options.payment_allow"
        >
          <i class="fal fa-credit-card-front"></i>
          {{ $t('components.pointOfSalesShow.batch') }}
        </button>
        <button
          class="btn pos-main-btn"
          @click="$parent.showTable"
          v-if="$parent.options.hall_allow"
        >
          <i class="fal fa-table"></i>
          {{ $t('components.pointOfSalesShow.theTables') }}
        </button>

        <button
          class="btn pos-main-btn"
          @click="$parent.showComment"
          v-if="$parent.options.comment_allow"
        >
          <i class="fal fa-comment-alt"></i>
          {{ $t('components.pointOfSalesShow.Observation') }}
        </button>

        <button
          class="btn pos-main-btn"
          @click="openCashDraw"
          v-if="$parent.options.open_cash_drawer_allow"
        >
          <i class="fal fa-cash-register"></i>
          {{ $t('components.pointOfSalesShow.stairs') }}
        </button>

        <button
          class="btn pos-main-btn"
          @click="$parent.showSplitForm()"
          :disabled="$parent.item.invoiceItems.length < 2"
          v-if="$parent.options.split_allow"
        >
          <i class="fal fa-copy"></i>
          {{ $t('components.pointOfSalesShow.toDivide') }}
        </button>
        <button
          class="btn pos-main-btn"
          :disabled="$parent.selectedTable == 0 || $parent.item.invoiceItems.length < 1"
          @click="$parent.multiPrint"
          v-if="$parent.options.multi_print"
        >
          <i class="fal fa-utensils-alt"></i>
          {{ $t('components.pointOfSalesShow.toEquip') }}
        </button>
        <router-link
          :to="'/'"
          class="btn pos-main-btn"
        >
          <i class="fal fa-arrow-right"></i>
          رجوع
        </router-link>
      </div>
</template>
<script>
export default {
  data() {
    return {
      style: window.innerWidth > 770 ? "top: 50px;height: calc(100% - 50px);" : "top: 0px;height: auto;",
    };
  },
  mounted() {
    var el = this;
      window.addEventListener("scroll", function (e) {
        if (window.innerWidth > 770) {
        if (this.scrollY <= 50) {
          el.style = "top: " + (50 - this.scrollY) + "px;height: calc(100% - " + (50 - this.scrollY) +"px);";
        } else {
          el.style = "top: 0px;height: 100%);";
        }
      } else {
        el.style = "top: 0px;height: auto;";
      }
    });
    window.addEventListener("resize", function (e) {
        if (window.innerWidth > 770) {
        if (this.scrollY <= 50) {
          el.style = "top: " + (50 - this.scrollY) + "px;height: calc(100% - " + (50 - this.scrollY) +"px);";
        } else {
          el.style = "top: 0px;height: 100%);";
        }
      } else {
        el.style = "top: 0px;height: auto;";
      }
    });
  },
  methods:{
    openCashDraw() {
      if (this.$parent.options.local_server == 0) {
        if (typeof ipcRenderer !== "undefined") {
          var content = "";
          var printDetails = {
            options: {
              preview: false,
              copies: 1,
              printerName: "default",
              silent: true,
            },
            data: content,
          };
          ipcRenderer.send("print", JSON.stringify(printDetails));
        } else {
          var iframe = document.createElement("iframe");
          document.body.appendChild(iframe);
          iframe.contentWindow.document.open();
          iframe.classList.add("printIframe");
          iframe.contentWindow.document.close();
          iframe.focus();
          iframe.contentWindow.print();
          iframe.remove();
        }
      } else {
        axios.post(this.$linkGnirator("/sendPrinter"), { printer_name: "default", data: "" })
      }
    },
  }
}
</script>
