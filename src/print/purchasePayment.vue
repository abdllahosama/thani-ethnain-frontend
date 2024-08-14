<template>
  <div class="print-model">
    <div id="printMe" ref="printMe" v-if="!loading">
      <div>
        <small
          ><strong>تاريخ الطباعة :</strong
          >{{ $dateFormat(Date.now() / 1000) }}</small
        >
      </div>
      <div
        class="inv-design"
        :class="options.print_type == 3 ? 'inv-design-5cm' : ''"
        v-if="options.print_type == 1 || options.print_type == 3"
      >
        <img
          :src="logo"
          class="img-fluid mb-4 sm-inv-img"
          v-if="options.image != null"
        />
        <div class="text-center">
          <p class="f-14">{{ options.name }}</p>
          <p class="f-12" v-if="options.address1">{{ options.address1 }}</p>
          <p class="f-14">دفعه شراء {{ item.code }}</p>
          <div style="display: flex">
            <div style="width: 4cm; text-align: right">
              <p class="f-12">
                التاريخ : <strong>{{ item.date ? $dateFormat(item.date) : $dateFormat(Date.now() / 1000) }}</strong>
              </p>
            </div>
          </div>
        </div>
        <div>
          <hr />
          <div style="text-align: center" v-if="item.client_type == 0">
            <p class="f-12" v-if="item.customer.name">
              اسم العميل: <strong>{{ item.customer.name }}</strong>
            </p>
            <p class="f-12" v-if="item.customer.tax_number">
              المعرف الضريبي: <strong>{{ item.customer.tax_number }}</strong>
            </p>
            <p class="f-12" v-if="item.customer.city || item.customer.country">
              العنوان:
              <strong>
                {{ item.customer.city
                }}{{ item.customer.city && item.customer.country ? "," : "" }}
                {{ item.customer.country }}</strong
              >
            </p>
            <p class="f-12" v-if="item.customer.mobile">
              رقم الهاتف : <strong>{{ item.customer.mobile }}</strong>
            </p>
          </div>
          <div style="text-align: center" v-if="item.client_type == 1">
            <p class="f-12" v-if="item.supplier.name">
              اسم العميل: <strong>{{ item.supplier.name }}</strong>
            </p>
            <p class="f-12" v-if="item.supplier.tax_number">
              المعرف الضريبي: <strong>{{ item.supplier.tax_number }}</strong>
            </p>
            <p class="f-12" v-if="item.supplier.city || item.supplier.country">
              العنوان:
              <strong>
                {{ item.supplier.city
                }}{{ item.supplier.city && item.supplier.country ? "," : "" }}
                {{ item.supplier.country }}</strong
              >
            </p>
            <p class="f-12" v-if="item.supplier.mobile">
              رقم الهاتف : <strong>{{ item.supplier.mobile }}</strong>
            </p>
          </div>
          <hr />
        </div>
        <div class="table-responsive">
          <table class="table my-4">
            <tfoot>
              <tr>
                <td class="px-0">
                  <strong>الرصيد السابق</strong>
                </td>
                <td class="px-0">
                  <span class="h3">
                    {{ $moneyFormat(item.old_balance) }}
                  </span>
                </td>
              </tr>
              <tr>
                <td class="px-0">
                  <strong>المدفوع</strong>
                </td>
                <td class="px-0">
                  <span class="h3">
                    {{ $moneyFormat(item.cost) }}
                  </span>
                </td>
              </tr>
              <tr>
                <td class="px-0">
                  <strong>الرصيد النهائي</strong>
                </td>
                <td class="px-0">
                  <span class="h3">
                    {{ $moneyFormat(item.new_balance) }}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
          <p
            class="text-muted mb-0"
            v-html="
              options.invoice_footer != null ? options.invoice_footer : ''
            "
          ></p>
        </div>
      </div>
      <div class="row invoice-show" v-if="options.print_type == 0">
        <div class="col-4">
          <h6 class="text-uppercase text-muted">دفعة من</h6>
          <p class="text-muted mb-4" v-if="item.client_type == 0">
            <strong class="text-body">{{ item.customer.name }}</strong> <br />
            {{ item.customer.tax_number }} <br />
            {{ item.customer.mobile }} <br />
            {{ item.customer.email }} <br />
            {{ item.customer.address1 }} <br />
            {{ item.customer.address2 }} <br />
            {{ item.customer.city
            }}{{ item.customer.city && item.customer.country ? "," : "" }}
            {{ item.customer.country }}
            <br v-if="!item.customer.city || !item.customer.country" />
          </p>
          <p class="text-muted mb-4" v-if="item.client_type == 1">
            <strong class="text-body">{{ item.supplier.name }}</strong> <br />
            {{ item.supplier.tax_number }} <br />
            {{ item.supplier.mobile }} <br />
            {{ item.supplier.email }} <br />
            {{ item.supplier.address1 }} <br />
            {{ item.supplier.address2 }} <br />
            {{ item.supplier.city
            }}{{ item.supplier.city && item.supplier.country ? "," : "" }}
            {{ item.supplier.country }}
            <br v-if="!item.supplier.city || !item.supplier.country" />
          </p>
          <h6 class="text-uppercase text-muted">
            {{ $t("bills.form.date") }}
          </h6>
          <p class="mb-2">
            {{ item.date ? $dateFormat(item.date) : $dateFormat(Date.now() / 1000) }}
          </p>
        </div>
        <div class="col-4 text-center">
          <h2 class="mb-2">
            {{ options.name }}
          </h2>
          <p class="text-muted">دفعة شراء</p>
        </div>
        <div class="col-4 text-md-right">
          <h6 class="text-uppercase text-muted">دفعة الي</h6>
          <p class="text-muted mb-4">
            <strong class="text-body">{{ options.name }}</strong> <br />
            {{ options.tax_number }} <br />
            {{ options.telephone }} <br />
            {{ options.email }} <br />
            {{ options.address1 }} <br />
            {{ options.address2 }} <br />
            {{ options.city }} {{ options.city && options.country ? "," : "" }}
            {{ options.country }}
            <br v-if="!options.city || !options.country" />
          </p>
        </div>
      </div>
      <div class="row invoice-show" v-if="options.print_type == 0">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table my-2">
              <tbody>
                <tr>
                  <td colspan="2" class="px-0 border-top border-top-2">
                    <strong>الرصيد السابق</strong>
                  </td>
                  <td colspan="6" class="px-0 border-top border-top-2">
                    <span class="h3">
                      {{ $moneyFormat(item.old_balance) }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="px-0 border-top border-top-2">
                    <strong>المدفوع</strong>
                  </td>
                  <td colspan="6" class="px-0 border-top border-top-2">
                    <span class="h3">
                      {{ $moneyFormat(item.cost) }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="px-0 border-top border-top-2">
                    <strong>الرصيد النهائي</strong>
                  </td>
                  <td colspan="6" class="px-0 border-top border-top-2">
                    <span class="h3">
                      {{ $moneyFormat(item.new_balance) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="w-100" v-if="item.notes != null">
            <hr class="my-3" />
            <h4 class="text-uppercase">{{ $t("bills.show.notes") }}</h4>
            <p class="text-muted mb-0">{{ item.notes }}</p>
          </div>
          <div class="w-100 inv-footer" v-if="options.invoice_footer != null">
            <hr class="my-3" />
            <p
              class="text-muted mb-0"
              v-html="
                options.invoice_footer != null ? options.invoice_footer : ''
              "
            ></p>
          </div>
        </div>
      </div>
      <div class="col text-center">
        <div class="row">
          <h2 class="mb-2">سند صرف ل {{ options.name }}</h2>
          <p class="text-muted mb-6">سند صرف #{{ item.code }}</p>
        </div>
      </div>
      <div class="row">
        <table class="table table-sm table-nowrap customed-table-small">
          <tbody>
            <tr>
              <th scope="row">رقم السند#</th>
              <td>{{ item.code != null ? item.code : "--" }}</td>
              <td
                rowspan="7"
                style="background: #eee; text-align: center; padding-top: 120px"
              >
                <div
                  class="price-show"
                  style="margin-top: 20px; padding-top: 30px"
                >
                  <div class="price-content">
                    <p>{{ $t("expenses.form.cost") }}</p>
                    <h1>{{ $moneyFormat(item.cost) }}</h1>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">{{ $t("expenses.form.date") }}</th>
              <td>{{ item.date ? $dateFormat(item.date) : $dateFormat(Date.now() / 1000) }}</td>
            </tr>
            <tr>
              <th scope="row">المسئول</th>
              <td>{{ item.user != null ? item.user.name : "--" }}</td>
            </tr>
            <tr>
              <th scope="row">الرقم المرجعي</th>
              <td>{{ item.refrance != null ? item.refrance : "--" }}</td>
            </tr>
            <tr>
              <th scope="row">دفعنا لي</th>
              <td>
                {{ item.supplier.id != null ? item.supplier.name : "--" }}
              </td>
            </tr>
            <tr>
              <th scope="row">وذالك عن</th>
              <td scope="row">{{ item.description }}</td>
            </tr>
            <tr>
              <th scope="row">الخزينة</th>
              <td>{{ item.safe.id != null ? item.safe.name : "--" }}</td>
            </tr>
          </tbody>
        </table>

        <!--
                    <table class="table table-sm table-nowrap">
                    <thead>
                        <tr>
                            <th scope="col">اسم المورد</th>
                            <th scope="col">المبلفغ المستلم</th>
                            <th scope="col">رسوم بنكية</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">{{item.supplier != null ? item.supplier.name : '--'}}</th>
                            <th scope="row">{{$moneyFormat(item.cost)}}</th>
                            <th scope="row">{{item.bank_fees != null ? item.bank_fees : '--'}}</th>
                           
                        </tr>
                    </tbody>
                    </table>
                -->

        <div class="signeture-container">
          <div
            class="signeture-item"
            v-for="(
              signeture, index
            ) in options.purchase_payments_signatures_data"
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
      path: "/purchasepayments",
      logo: localStorage.getItem("logo"),
      item: {},
      loading: true,
    };
  },
  methods: {
    getitem() {
      this.item = this.$parent.printedPurchasePayment;
      this.loading = false;
      var myel = this;
      setTimeout(function () {
        var text = document.getElementById("printMe").innerHTML;
        document.getElementById("printMe").remove();
        var myframe = document.getElementById("inviceIframe");
        myframe.contentDocument.body.classList.add("payment-style");
        myframe.contentDocument.body.innerHTML = text;
        setTimeout(function () {
          myframe.focus();
          myframe.contentWindow.print();
          myel.colse();
        }, 100);
      }, 20);
    },
    colse() {
      this.$parent.printedPurchasePayment = false;
    },
  },
  mounted() {
    this.getitem();
  },
  props: ["options"],
};
</script>
