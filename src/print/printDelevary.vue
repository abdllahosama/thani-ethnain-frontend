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
            <div class="invoice-date">
              <strong>تاريخ الوصول<br />due Date</strong>
              <p>{{ $dateFormat(item.expiry_date) }}</p>
            </div>
          </div>
          <div class="cleint border">
            <h2 class="cleint-name">العميل<br />Client</h2>
            <div class="" v-if="item.client_type == 0">
              <strong>{{ item.customer.name }}</strong>
              <p style="margin: 0px;">{{ item.customer.mobile }}</p>
              <p style="margin: 0px;">{{ item.customer.address1 }}</p>
            </div>
            <div class="cleint-info" v-if="item.client_type == 1">
              <strong>{{ item.supplier.name }}</strong>
              <p style="margin: 0px;">{{ item.supplier.mobile }}</p>
              <p style="margin: 0px;">{{ item.supplier.address1 }}</p>
            </div>
          </div>
        </div>

        <h1 style="text-align: center;">أمر توصيل</h1>

        <template v-for="(qItem, index) in item.quotationItems">
        <div class="container-of-table">
          <table class="mytable">
            <thead>
              <tr>
                <td>الصنف<br />Item</td>
                <td>الكمية<br />Qty</td>
              </tr>
            </thead>
            <tbody>
              
                <tr >
                  <td>{{ qItem.product_name }}</td>
                  <td>
                    {{ parseFloat(qItem.quantity).toFixed(2) }}
                  </td>
                </tr>
                <tr>
                  <td
                    :colspan="1"
                  >
                    <img
                      v-if="qItem.image"
                      style="max-width: 250px;border: 1px solid rgb(46, 44, 44);padding: 4px;"
                      :src="$linkGnirator('/companiesUploads/mina/products/' + qItem.image, true)"
                    />
                  </td>
                  <td
                    class="td-parent imageCont"
                    v-html="qItem.description"
                  ></td>
                </tr>
            </tbody>
          </table>
          
        </div>
        <!-- <div class="pagebreak" v-if="item.quotationItems.length - 1 > index"> </div> -->
      </template>
        <div class="w-100" v-if="$option.invoice_footer != null">
          <hr class="my-3" />
          <div class="mb-0" v-html="$option.invoice_footer"></div>
        </div>

        <div class="signeture-container">
          <div
            class="signeture-item"
            v-for="(signeture, index) in options.orders_signatures_data"
            :key="index"
          >
            <div class="signeture-name">{{ signeture.name }}</div>
            <div class="signeture-points">..........................</div>
          </div>
        </div>
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
      this.item = this.$parent.printedDelevary;
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
      this.$parent.printedDelevary = false;
    },
  },
  mounted() {
    this.getitem();
  },
  props: ["options"],
};
</script>
