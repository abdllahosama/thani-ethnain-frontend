<template>
  <div class="print-model">
    <div id="printMe" ref="printMe" v-if="!loading">
      <div class="design-1-container" v-if="options.print_type == 4">
        <div class="header">
          <img :src="logo" class="companyImage" v-if="options.image != null" />
          <qrcode-vue
            :value="item.qrCode"
            size="130"
            level="H"
            render-as="svg"
            v-if="$option.tax_invoice"
          />
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

        <div class="cleint-info" :style="{ transform: 'translateY(-35px)' }">
          <strong>تاريخ الفاتورة<br />Invoice Date</strong>
          <p :style="{ transform: 'translate(-100px,-40px)' }">
            {{ item.date ? $dateFormat(item.date) : $dateFormat(Date.now() / 1000) }}
          </p>
        </div>

        <div style="margin-top: -50px;"></div>
        <template v-for="(qItem, index) in item.quotationItems">
        <div class="container-of-table">
          <table class="mytable">
            <thead>
              <tr>
                <td v-if="$option.item_number">#</td>
                <td>الصنف<br />Item</td>
                <td>الكمية<br />Qty</td>
                <td>السعر<br />Price</td>
                <td v-if="item.discount != 0 && $option.show_discount_table">
                  قيمة الخصم<br />Discount Amount
                </td>
                <td v-if="item.tax != 0 && $option.show_tax_table">
                  قيمة الضريبة<br />VAT Amount
                </td>
                <td>الإجمالى<br />Total</td>
              </tr>
            </thead>
            <tbody>
              
                <tr >
                  <td v-if="$option.item_number">{{ index + 1 }}</td>
                  <td>{{ qItem.product_name }}</td>
                  <td>
                    {{ parseFloat(qItem.quantity).toFixed(2) }}
                  </td>
                  <td>{{ $moneyFormat(qItem.price) }}</td>
                  <td v-if="item.discount != 0 && $option.show_discount_table">
                    -{{ $moneyFormat(qItem.discount) }}
                  </td>
                  <td v-if="item.tax != 0 && $option.show_tax_table">
                    {{ $moneyFormat(qItem.average) }}
                  </td>
                  <td>{{ $moneyFormat(qItem.total) }}</td>
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
                    :colspan="3"
                    class="td-parent imageCont"
                    v-html="qItem.description"
                  ></td>
                </tr>
            </tbody>
          </table>
          
        </div>
        <!-- <div class="pagebreak" v-if="item.quotationItems.length - 1 > index"> </div> -->
      </template>
        <div class="money-output">
          <div class="total">
            <strong
              >المجموع<br />
              Subtotal</strong
            >
            <p>
              {{ $moneyFormat(item.subtotal + item.discount) }}
            </p>
          </div>
          <div class="total" v-if="item.edit">
            <strong>
              {{
                item.edit_text
                  ? item.edit_text
                  : $t("quotations.form.Modification")
              }}
            </strong>
            <p>{{ $moneyFormat(item.edit) }}</p>
          </div>
          <div class="total" v-if="item.delivery">
            <strong
              >التوصيل<br />
              delivery</strong
            >
            <p>{{ $moneyFormat(item.delivery) }}</p>
          </div>
          <div class="total" v-if="item.discount">
            <strong
              >خصم<br />
              Discount</strong
            >
            <p>- {{ $moneyFormat(item.discount) }}</p>
          </div>
          <div class="total" v-if="item.tax">
            <strong
              >الضريبة<br />
              Tax</strong
            >
            <p>{{ $moneyFormat(item.tax) }}</p>
          </div>
          <div
            class="total"
            v-if="item.edit || item.delivery || item.discount || item.tax"
          >
            <strong>الإجمالي<br />Total</strong>
            <p>
              <strong>{{ $moneyFormat(item.total) }} </strong>
            </p>
          </div>
          <template v-if="$option.show_old_balance">
            <div class="total">
              <strong
                >الرصيد السابق<br />
                Previous Balance</strong
              >
              <p>
                {{ $moneyFormat(item.old_balance) }}
              </p>
            </div>
            <div class="total">
              <strong
                >الرصيد الكلي<br />
                Total Balance</strong
              >
              <p>
                {{ $moneyFormat(item.new_balance) }}
              </p>
            </div>
            <div class="total" v-if="item.paid">
              <strong>المدفوع<br />Paid</strong>
              <p>{{ $moneyFormat(item.paid) }}</p>
            </div>
            <div class="total" v-if="item.paid">
              <strong>الرصيد النهائي<br />final balance</strong>
              <p>
                {{
                  item.salesPayment
                    ? $moneyFormat(item.salesPayment.new_balance)
                    : $moneyFormat(item.new_balance)
                }}
              </p>
            </div>
          </template>
        </div>
        <p class="tafqeet-style">
          اجمالي الفاتورة فقط {{ $tafqeet(item.total) }}
        </p>
        <div class="w-100" v-if="item.notes != null">
          <hr class="my-3" />
          <h4 class="text-uppercase">{{ $t("invoices.show.notes") }}</h4>
          <div class="mb-0 imageCont" v-html="item.notes"></div>
        </div>
        <div class="w-100" v-if="item.terms != null">
          <hr class="my-3" />
          <h4 class="text-uppercase">
            {{ $t("invoices.form.termsOfOffer") }}
          </h4>
          <div class="mb-0" v-html="item.terms"></div>
        </div>
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
      this.item = this.$parent.printedOrder;
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
      this.$parent.printedOrder = false;
    },
  },
  mounted() {
    this.getitem();
  },
  props: ["options"],
};
</script>
