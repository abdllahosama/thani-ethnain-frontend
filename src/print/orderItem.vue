<template>
  <div class="print-model">
    <div id="printMe" ref="printMe" v-if="!loading">
      <div class="design-1-container" v-if="options.print_type == 4">
        <div class="header">
          <img :src="logo" class="companyImage" v-if="options.image != null" />
          <div class="companydetails">
            <h1>{{ options.name }}</h1>
            <p v-if="options.telephone">الهاتف: {{ options.telephone }}</p>
            <p>{{ options.country }}</p>
            <p>
              {{ options.address1 }}
              {{ options.address1 && options.city ? "," : "" }}
              {{ options.city }}
            </p>
          </div>
        </div>
        
        <div class="info">
          <div class="invoive-detail">
            <div class="invoice-num">
              <strong>رقم الفاتورة<br />Invoice No</strong>
              <p>{{ item.code }}</p>
            </div>
          </div>
          <div class="cleint border">
            <h2 class="cleint-name">العميل<br />Client</h2>
            <div class="" v-if="item.client_type == 0">
              <strong>{{ item.customer.name }}</strong>
            </div>
            <div class="cleint-info" v-if="item.client_type == 1">
              <strong>{{ item.supplier.name }}</strong>
            </div>
          </div>
        </div>

        <h1 style="text-align: center;">أمر تشغيل</h1>

        <div class="container-of-table" style="margin-top: 100px;">
          <table class="mytable">
            <thead>
              <tr>
                <td>الصنف<br />Item</td>
                <td>الكمية<br />Qty</td>
              </tr>
            </thead>
            <tbody>
                <tr >
                  <td>{{ item.quotationItems[index].product_name }}</td>
                  <td>
                    {{ parseFloat(item.quotationItems[index].quantity).toFixed(1) }}
                  </td>
                </tr>
                <tr>
                  <td
                    :colspan="1"
                  >
                    <img
                      style="max-width: 250px;border: 1px solid rgb(46, 44, 44);padding: 4px;"
                      :src="$linkGnirator('/companiesUploads/mina/products/' + item.quotationItems[index].image, true)"
                      v-if="item.quotationItems[index].image"
                    />
                  </td>
                  <td
                    :colspan="3"
                    class="td-parent"
                    v-html="item.quotationItems[index].description"
                  ></td>
                </tr>
            </tbody>
          </table>
        </div>
        <!-- <div class="w-100" v-if="item.notes != null">
          <hr class="my-3" />
          <h4 class="text-uppercase">{{ $t("invoices.show.notes") }}</h4>
          <div class="mb-0 imageCont" v-html="item.notes"></div>
        </div> -->

      </div>
      <p class="pioneer-data">
        تم الإنشاء بواسطة Pioneer للبرمجيات 01019654321
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      path: "/orders",
      logo: localStorage.getItem("logo"),
      index: null,
      item: {},
      unitsCoefficients: [],
      loading: true,
      printType: true,
      itemsCount: 0,
    };
  },
  methods: {
    getitem() {
      this.loading = true;
      this.item = this.$parent.printedOrderItem;
      this.index = this.$parent.printedOrderItemId
      let unitsCoefficients = [];
      this.item.quotationItems.forEach((item) => {
        this.itemsCount += item.quantity;
        item.unit_coefficients.forEach((el) => {
          unitsCoefficients.push(el.id);
        });
      });
      unitsCoefficients = [...new Set(unitsCoefficients)];
      this.unitsCoefficients = this.$database.unitsCoefficients.filter((row) =>
        unitsCoefficients.includes(row.id)
      );
      this.unitsCoefficients = this.unitsCoefficients.sort(
        this.$dynamicSort({ orderBy: "id", orderType: "desc" })
      );
      this.loading = false;
      var myel = this;
      setTimeout(function () {
        var text = document.getElementById("printMe").innerHTML;
        document.getElementById("printMe").remove();
        var myframe = document.getElementById("inviceIframe");
        myframe.contentDocument.body.innerHTML = text;
        setTimeout(function () {
          myframe.focus();
          myframe.contentWindow.print();
          myel.colse();
        }, 1500);
      }, 20);
    },
    colse() {
      this.$parent.printedOrderItem = false;
    },
  },
  mounted() {
    this.getitem();
  },
  props: ["options"],
};
</script>
