<template>
  <div class="print-model">
    <div id="printMe" ref="printMe" v-if="!loading">
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
          <p class="f-12" v-if="options.mobile">{{ options.mobile }}</p>
          <p class="f-12"> {{ item.code }}</p>
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
            <p class="f-12">
              اسم العميل: <strong>{{ item.customer.name }}</strong>
            </p>
            <p class="f-12">
              رقم الهاتف: <strong>{{ item.customer.mobile }}</strong>
            </p>
            <p class="f-12" v-if="item.customer.city || item.customer.country">
              العنوان:
              <strong>
                {{ item.customer.city
                }}{{ item.customer.city && item.customer.country ? "," : ""
                }}{{ item.customer.country }}</strong
              >
            </p>
          </div>
          <div style="text-align: center" v-if="item.client_type == 1">
            <p class="f-12">
              اسم العميل: <strong>{{ item.supplier.name }}</strong>
            </p>
            <p class="f-12">
              رقم الهاتف: <strong>{{ item.supplier.mobile }}</strong>
            </p>
            <p class="f-12" v-if="item.supplier.city || item.supplier.country">
              العنوان:
              <strong>
                {{ item.supplier.city
                }}{{ item.supplier.city && item.supplier.country ? "," : "" }}
                {{ item.supplier.country }}</strong
              >
            </p>
          </div>
          <hr />
        </div>
        <div class="table-responsive">
          <table class="table my-4">
            <thead>
              <tr>
                <th class="px-0 bg-transparent border-top-0 text-right">
                  <span class="h6">المنتج</span>
                </th>
                <th class="px-0 bg-transparent border-top-0 text-right">
                  <span class="h6">الكمية</span>
                </th>
                <th
                  class="px-0 bg-transparent border-top-0 text-right"
                  v-if="options.print_type != 3"
                >
                  <span class="h6">السعر</span>
                </th>
                <th class="px-0 bg-transparent border-top-0 text-right">
                  <span class="h6">الأجمالي</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(qItem, index) in item.quotationItems" :key="index">
                <td class="px-0">
                  {{ qItem.product_name }}
                </td>
                <td class="px-0">
                  {{ parseFloat(qItem.quantity).toFixed(2) }}
                  {{
                    options.print_type == 3
                      ? "* " + $moneyFormat(qItem.price)
                      : ""
                  }}
                </td>
                <td class="px-0" v-if="options.print_type != 3">
                  {{ $moneyFormat(qItem.price) }}
                </td>
                <td class="px-0">{{ $moneyFormat(qItem.total) }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td :colspan="options.print_type != 3 ? 2 : 1" class="px-0">
                  <strong>اجمالي الفاتورة</strong>
                </td>
                <td class="px-0">
                  <span class="h3">
                    {{ parseFloat(itemsCount).toFixed(1) }} قطعة
                  </span>
                </td>
                <td class="px-0">
                  <span class="h3">
                    {{ $moneyFormat(item.subtotal + item.discount -
                      (item.discount_type >=0 && item.discount_value > 0 ?
                        (item.discount_type == 0 ? discount = item.subtotal * item.discount_value / 100 : item.discount_value) :
                        0
                      )
                    ) }}
                  </span>
                </td>
              </tr>
              <tr v-if="item.discount">
                <td :colspan="options.print_type != 3 ? 3 : 2" class="px-0">
                  <strong>الخصم</strong>
                </td>
                <td class="px-0">
                  <span class="h3">
                    - {{ $moneyFormat(item.discount) }}
                  </span>
                </td>
              </tr>
              <tr v-if="item.edit">
                <td :colspan="options.print_type != 3 ? 3 : 2" class="px-0">
                  <strong>{{
                    item.edit_text
                      ? item.edit_text
                      : $t("quotations.form.Modification")
                  }}</strong>
                </td>
                <td class="px-0">
                  <span class="h3">
                    {{ $moneyFormat(item.edit) }}
                  </span>
                </td>
              </tr>
              <tr v-if="item.delivery">
                <td :colspan="options.print_type != 3 ? 3 : 2" class="px-0">
                  <strong>التوصيل</strong>
                </td>
                <td class="px-0">
                  <span class="h3">
                    {{ $moneyFormat(item.delivery) }}
                  </span>
                </td>
              </tr>
              <tr v-if="item.edit || item.delivery || item.discount">
                <td :colspan="options.print_type != 3 ? 3 : 2" class="px-0">
                  <strong>المجموع الكلي</strong>
                </td>
                <td class="px-0">
                  <span class="h3">
                    {{ $moneyFormat(item.total) }}
                  </span>
                </td>
              </tr>
              <template v-if="$option.show_old_balance">
                <tr>
                  <td :colspan="options.print_type != 3 ? 3 : 2" class="px-0">
                    <strong>الرصيد السابق</strong>
                  </td>
                  <td class="px-0">
                    <span class="h3">
                      {{ $moneyFormat(item.old_balance) }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td :colspan="options.print_type != 3 ? 3 : 2" class="px-0">
                    <strong>الرصيد الكلي</strong>
                  </td>
                  <td class="px-0">
                    <span class="h3">
                      {{ $moneyFormat(item.new_balance) }}
                    </span>
                  </td>
                </tr>
                <tr v-if="item.paid">
                  <td :colspan="options.print_type != 3 ? 3 : 2" class="px-0">
                    <strong>المدفوع</strong>
                  </td>
                  <td class="px-0">
                    <span class="h3">
                      {{ $moneyFormat(item.paid) }}
                    </span>
                  </td>
                </tr>
                <tr v-if="item.paid">
                  <td :colspan="options.print_type != 3 ? 3 : 2" class="px-0">
                    <strong>الرصيد النهائي</strong>
                  </td>
                  <td class="px-0">
                    <span class="h3">
                      {{
                        item.salesPayment
                          ? $moneyFormat(item.salesPayment.new_balance)
                          : $moneyFormat(item.new_balance)
                      }}
                    </span>
                  </td>
                </tr>
              </template>
            </tfoot>
          </table>
          <p
            class="text-muted mb-0"
            v-html="
              options.invoice_footer != null ? options.invoice_footer : ''
            "
          ></p>
        </div>
        <div class="signture" v-if="options.show_signature">
          <p style="width: 100%; padding-right: 0">توقيع المستلم :</p>
          <p style="width: 100%; padding-right: 0">توقيع البائع :</p>
        </div>
      </div>

      <div class="row invoice-show hide-w-8" v-if="options.print_type == 0">
        <div class="col-4">
          <h6 class="text-uppercase text-muted">
            {{ $t("invoices.show.QuotationFrom") }}
          </h6>
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
          <h6 class="text-uppercase text-muted">
            {{ $t("invoices.form.date") }}
          </h6>
          <p class="mb-2">{{ item.date ? $dateFormat(item.date) : $dateFormat(Date.now() / 1000) }}</p>
        </div>
        <div class="col-4 text-center">
          <h2 class="mb-2">
            {{ options.name }}
          </h2>
          <qrcode-vue
            :value="item.qrCode"
            size="150"
            level="H"
            render-as="svg"
            v-if="$option.tax_invoice"
          />
          <p class="text-muted" style="margintop: 10px">
            {{ $t("invoices.form.invoice") }} #{{ item.code }}
          </p>

          <p class="barcode">*{{ item.code }}*</p>
        </div>
        <div class="col-4 text-md-right">
          <h6 class="text-uppercase text-muted">
            {{ $t("invoices.show.QuotationFor") }}
          </h6>
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
            {{ $t("invoices.form.ExpiryDate") }}
          </h6>
          <p class="mb-2">
            {{ $dateFormat(item.expiry_date) }}
          </p>
        </div>
      </div>
      <div class="row invoice-show hide-w-8" v-if="options.print_type == 0">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table my-w">
              <thead>
                <tr>
                  <th class="px-0 bg-transparent border-top-0">
                    <span class="h6">{{
                      $t("invoices.form.ProductItem")
                    }}</span>
                  </th>
                  <th class="px-0 bg-transparent border-top-0">
                    <span class="h6">{{
                      $t("invoices.form.description")
                    }}</span>
                  </th>
                  <th class="px-0 bg-transparent border-top-0">
                    <span class="h6">{{ $t("invoices.form.Quantity") }}</span>
                  </th>
                  <th class="px-0 bg-transparent border-top-0">
                    <span class="h6">{{ $t("invoices.form.price") }}</span>
                  </th>
                  <th
                    class="px-0 bg-transparent border-top-0"
                    v-if="item.discount != 0"
                  >
                    <span class="h6">{{ $t("invoices.form.Discount") }}</span>
                  </th>
                  <th
                    class="px-0 bg-transparent border-top-0"
                    v-if="item.tax != 0"
                  >
                    <span class="h6">{{ $t("invoices.form.Tax") }}</span>
                  </th>
                  <th class="px-0 bg-transparent border-top-0">
                    <span class="h6">{{ $t("invoices.form.Total") }}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(qItem, index) in item.quotationItems" :key="index">
                  <td class="px-0">
                    {{ qItem.product_name }}
                  </td>
                  <td class="px-0">
                    {{ qItem.description }}
                  </td>
                  <td class="px-0">
                    {{ parseFloat(qItem.quantity).toFixed(2) }}
                    {{ qItem.unit ? qItem.unit.unit : "" }}
                  </td>
                  <td class="px-0">{{ $moneyFormat(qItem.price) }}</td>
                  <td class="px-0" v-if="item.discount != 0">
                    -{{ $moneyFormat(qItem.discount) }}
                  </td>
                  <td class="px-0" v-if="item.tax != 0">
                    {{ $moneyFormat(qItem.average) }}
                  </td>
                  <td class="px-0">{{ $moneyFormat(qItem.total) }}</td>
                </tr>
                <tr>
                  <td colspan="2" class="px-0 border-top border-top-2">
                    <strong>اجمالي الفاتورة</strong>
                  </td>
                  <td colspan="6" class="px-0 border-top border-top-2">
                    <span class="h3">
                      {{ $moneyFormat(item.subtotal + item.discount) }}
                    </span>
                  </td>
                </tr>
                <tr v-if="item.edit">
                  <td colspan="2" class="px-0 border-top border-top-2">
                    <strong>{{
                      item.edit_text
                        ? item.edit_text
                        : $t("quotations.form.Modification")
                    }}</strong>
                  </td>
                  <td colspan="6" class="px-0 border-top border-top-2">
                    <span class="h3">
                      {{ $moneyFormat(item.edit) }}
                    </span>
                  </td>
                </tr>
                <tr v-if="item.delivery">
                  <td colspan="2" class="px-0 border-top border-top-2">
                    <strong>التوصيل</strong>
                  </td>
                  <td colspan="6" class="px-0 border-top border-top-2">
                    <span class="h3">
                      {{ $moneyFormat(item.delivery) }}
                    </span>
                  </td>
                </tr>
                <tr v-if="item.discount">
                  <td colspan="2" class="px-0 border-top border-top-2">
                    <strong>{{ $t("saleReturns.form.totalDiscount") }}</strong>
                  </td>
                  <td colspan="6" class="px-0 border-top border-top-2">
                    <span class="h3">
                      - {{ $moneyFormat(item.discount) }}
                    </span>
                  </td>
                </tr>
                <tr v-if="item.tax">
                  <td colspan="2" class="px-0 border-top border-top-2">
                    <strong>{{ $t("saleReturns.form.totalTaxes") }}</strong>
                  </td>
                  <td colspan="6" class="px-0 border-top border-top-2">
                    <span class="h3">
                      {{ $moneyFormat(item.tax) }}
                    </span>
                  </td>
                </tr>
                <tr
                  v-if="item.edit || item.delivery || item.discount || item.tax"
                >
                  <td colspan="2" class="px-0 border-top border-top-2">
                    <strong>المجموع الكلي</strong>
                  </td>
                  <td colspan="6" class="px-0 border-top border-top-2">
                    <span class="h3">
                      {{ $moneyFormat(item.total) }}
                    </span>
                  </td>
                </tr>
                <template v-if="$option.show_old_balance">
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
                      <strong>الرصيد الكلي</strong>
                    </td>
                    <td colspan="6" class="px-0 border-top border-top-2">
                      <span class="h3">
                        {{ $moneyFormat(item.new_balance) }}
                      </span>
                    </td>
                  </tr>
                  <tr v-if="item.paid">
                    <td colspan="2" class="px-0 border-top border-top-2">
                      <strong>المدفوع</strong>
                    </td>
                    <td colspan="6" class="px-0 border-top border-top-2">
                      <span class="h3">
                        {{ $moneyFormat(item.paid) }}
                      </span>
                    </td>
                  </tr>
                  <tr v-if="item.paid">
                    <td colspan="2" class="px-0 border-top border-top-2">
                      <strong>الرصيد النهائي</strong>
                    </td>
                    <td colspan="6" class="px-0 border-top border-top-2">
                      <span class="h3">
                        {{
                          item.salesPayment
                            ? $moneyFormat(item.salesPayment.new_balance)
                            : $moneyFormat(item.new_balance)
                        }}
                      </span>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <div class="w-100" v-if="item.notes != null">
            <hr class="my-3" />
            <h4 class="text-uppercase">{{ $t("invoices.show.notes") }}</h4>
            <p class="text-muted mb-0">{{ item.notes }}</p>
          </div>
          <div class="w-100" v-if="item.terms != null">
            <hr class="my-3" />
            <h4 class="text-uppercase">
              {{ $t("invoices.form.termsOfOffer") }}
            </h4>
            <p class="text-muted mb-0">{{ item.terms }}</p>
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

          <div style="margin-top: 20px" v-if="options.show_signature">
            <div style="width: 50%; display: inline-block">
              <strong>توقيع البائع :</strong>
            </div>
            <div style="width: 50%; display: inline-block">
              <strong> توقيع المستلم :</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="design-1-container" v-if="options.print_type == 4">
        <div class="header">
          <qrcode-vue
            :value="item.qrCode"
            size="130"
            level="H"
            render-as="svg"
            v-if="$option.tax_invoice"
          />
          <div class="companydetails">
            <h1>{{ options.name }}</h1>
            <p>الرقم الضريبي: {{ options.tax_number }}</p>
            <p v-if="options.commercial_register">
              السجل التجاري :{{ options.commercial_register }}
            </p>
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
              <strong>تاريخ الفاتورة<br />Invoice Date</strong>
              <p>{{ item.date ? $dateFormat(item.date) : $dateFormat(Date.now() / 1000) }}</p>
            </div>
          </div>
          <div class="cleint">
            <h2 class="cleint-name">العميل<br />Cleint</h2>
            <div class="cleint-info" v-if="item.client_type == 0">
              <strong>{{ item.customer.name }}</strong>
              <p v-if="item.customer.tax_number">
                الرقم الضريبي :{{ item.customer.tax_number }}
              </p>
              <p>{{ item.customer.mobile }}</p>
              <p>{{ item.customer.mobile2 }}</p>
              <p>{{ item.customer.country }}</p>
              <p>
                {{ item.customer.address1 }}
                {{ item.customer.address1 && item.customer.city ? "," : "" }}
                {{ item.customer.city }}
              </p>
            </div>
            <div class="cleint-info" v-if="item.client_type == 1">
              <strong>{{ item.supplier.name }}</strong>
              <p v-if="item.supplier.tax_number">
                الرقم الضريبي :{{ item.supplier.tax_number }}
              </p>
              <p>{{ item.supplier.mobile }}</p>
              <p>{{ item.supplier.country }}</p>
              <p>
                {{ item.supplier.address1 }}
                {{ item.supplier.address1 && item.supplier.city ? "," : "" }}
                {{ item.supplier.city }}
              </p>
            </div>
          </div>
        </div>
        <div class="container-of-table">
          <table class="mytable">
            <thead>
              <td v-if="$option.item_number">#</td>
              <td>
                الصنف
                <br />
                Item
              </td>
              <td>
                الوصف
                <br />
                Description
              </td>
              <td
                v-for="(unitsCoefficient, index) in unitsCoefficients"
                :key="index"
              >
                {{ unitsCoefficient.name }}
              </td>
              <td>
                الكمية
                <br />
                Qty
              </td>
              <td>
                السعر
                <br />
                Price
              </td>
              <td v-if="item.discount != 0 && $option.show_discount_table">
                قيمة الخصم
                <br />
                Discount Amount
              </td>
              <td v-if="item.tax != 0 && $option.show_tax_table">
                قيمة الضريبة
                <br />
                VAT Amount
              </td>
              <td>
                الأجمالي
                <br />
                Total
              </td>
            </thead>
            <tbody>
              <tr v-for="(qItem, index) in item.quotationItems" :key="index">
                <td v-if="$option.item_number">{{ index + 1 }}</td>
                <td>{{ qItem.product_name }}</td>
                <td>{{ qItem.description }}</td>
                <td
                  v-for="(unitsCoefficient, index) in unitsCoefficients"
                  :key="index"
                >
                  {{
                    qItem.unit_coefficients.find(
                      (el) => el.id == unitsCoefficient.id
                    )
                      ? parseFloat(
                          qItem.unit_coefficients.find(
                            (el) => el.id == unitsCoefficient.id
                          ).value
                        ).toFixed(1)
                      : "--"
                  }}
                </td>
                <td>{{ parseFloat(qItem.quantity).toFixed(2) }}</td>
                <td>{{ $moneyFormat(qItem.price) }}</td>
                <td v-if="item.discount != 0 && $option.show_discount_table">
                  -{{ $moneyFormat(qItem.discount) }}
                </td>
                <td v-if="item.tax != 0 && $option.show_tax_table">
                  {{ $moneyFormat(qItem.average) }}
                </td>
                <td>{{ $moneyFormat(qItem.total) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
            <strong>الأجمالي<br />Total</strong>
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
                {{
                  $moneyFormat(
                    $option.balance_type == 0
                      ? item.old_balance
                      : item.old_balance * -1
                  )
                }}
              </p>
            </div>
            <div class="total">
              <strong
                >الرصيد الكلي<br />
                Total Balance</strong
              >
              <p>
                {{
                  $moneyFormat(
                    $option.balance_type == 0
                      ? item.new_balance
                      : item.new_balance * -1
                  )
                }}
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
                    ? $moneyFormat(
                        $option.balance_type == 0
                          ? item.salesPayment.new_balance
                          : item.salesPayment.new_balance * -1
                      )
                    : $moneyFormat(
                        $option.balance_type == 0
                          ? item.new_balance
                          : item.new_balance * -1
                      )
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
          <div class="mb-0" v-html="item.notes"></div>
        </div>
        <div class="w-100" v-if="item.terms != null">
          <hr class="my-3" />
          <h4 class="text-uppercase">
            {{ $t("invoices.form.termsOfOffer") }}
          </h4>
          <div class="mb-0" v-html="item.terms"></div>
        </div>

        <div class="signeture-container">
          <div
            class="signeture-item"
            v-for="(signeture, index) in options.invoices_signatures_data"
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
import QrcodeVue from "qrcode.vue";
export default {
  data() {
    return {
      path: "/invoices",
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
      this.item = this.$parent.printedInvoice;
      let unitsCoefficients = [];
      this.item.quotationItems.forEach((item) => {
        this.itemsCount += item.quantity - 0;
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
      if (this.$option.tax_invoice) {
        var sellerNameBuf = this.getTlvForValue("1", this.$option.name);

        var vatRegistrationNameBuf = this.getTlvForValue(
          "2",
          this.$option.tax_number
        );
        var timeBuf = this.getTlvForValue("3", this.item.created_at);
        var totalInvoiceBuf = this.getTlvForValue(
          "4",
          this.item.total.toFixed(1).toString()
        );
        var taxAmountBuf = this.getTlvForValue(
          "5",
          this.item.tax.toFixed(1).toString()
        );
        var tagBufsArray = [
          sellerNameBuf,
          vatRegistrationNameBuf,
          timeBuf,
          totalInvoiceBuf,
          taxAmountBuf,
        ];
        var qrCodeBuf = Buffer.concat(tagBufsArray);
        var qrCodeB64 = qrCodeBuf.toString("base64");
        this.item.qrCode = qrCodeB64;
      }
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
        }, 100);
      }, 20);
    },
    getTlvForValue(tagNum, tagValue) {
      var tagBuf = Buffer.from([tagNum], "utf8");

      var tagvalueBuf = Buffer.from(tagValue, "utf8");

      var tagValueLenBuf = Buffer.from([tagvalueBuf.length], "utf8");

      var bufsArray = [tagBuf, tagValueLenBuf, tagvalueBuf];

      return Buffer.concat(bufsArray);
    },
    colse() {
      this.$parent.printedInvoice = false;
    },
  },
  mounted() {
    this.getitem();
  },
  props: ["options"],
  components: {
    QrcodeVue,
  },
};
</script>
