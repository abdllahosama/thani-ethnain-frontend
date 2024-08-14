<template>
  <div class="container-fluid" v-if="!loading">
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col ml-n2">
                <h4 class="mb-1">
                  <a
                    >{{ $t("quotations.show.quotation") }}
                    <strong># {{ item.code }}</strong></a
                  >
                </h4>
              </div>
              <div class="col-auto">
                <router-link
                  :to="path + '/' + item.id + '/edit'"
                  class="btn btn-sm btn-primary"
                  :title="$t('quotations.show.modulation')"
                >
                  <i class="fas fa-edit"></i>
                </router-link>
                <a
                  :href="
                    site + '/quotations/' + item.password + '/customer/show'
                  "
                  class="btn btn-sm btn-primary"
                  target="_blank"
                  :title="$t('quotations.show.ExternalLink')"
                >
                  <i class="fas fa-link"></i>
                </a>
                <a
                  @click="print()"
                  class="btn btn-sm btn-primary"
                  :title="$t('quotations.show.Printing')"
                >
                  <i class="fas fa-print"></i>
                </a>
                <a
                  :href="$linkGnirator('/quotations/' + item.id + '/pdf', true)"
                  download
                  class="btn btn-sm btn-primary"
                  :title="$t('quotations.show.DownloadPDF')"
                >
                  <i class="fas fa-download"></i>
                </a>
                <button
                  class="btn btn-sm btn-primary"
                  @click="conver()"
                  :title="$t('quotations.show.TransferToInvoice')"
                  v-if="
                    item.status != 3 &&
                    ($user.admin || $user.role.orders_turn_into_invoice)
                  "
                >
                  <i class="fas fa-file-alt"></i>
                  {{ $t("quotations.form.convertToInvoice") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8">
        <div class="card card-body p-5 invoice-show">
          <div class="row">
            <div class="col">
              <div class="badge badge-dark" v-if="item.status == 0">
                {{ $t("quotations.draft") }}
              </div>
              <div class="badge badge-primary" v-if="item.status == 1">
                {{ $t("quotations.sent") }}
              </div>
              <div class="badge badge-primary" v-if="item.status == 2">
                {{ $t("quotations.seen") }}
              </div>
              <div class="badge badge-success" v-if="item.status == 3">
                {{ $t("quotations.approved") }}
              </div>
              <div class="badge badge-danger" v-if="item.status == 4">
                {{ $t("quotations.rejected") }}
              </div>
              <div class="badge badge-danger" v-if="item.status == 5">
                {{ $t("quotations.canceled") }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <h6 class="text-uppercase text-muted">
                {{ $t("quotations.show.QuotationFrom") }}
              </h6>
              <p class="text-muted mb-4">
                <strong class="text-body">{{ $option.name }}</strong> <br />
                {{ $option.tax_number }} <br />
                {{ $option.telephone }} <br />
                {{ $option.email }} <br />
                {{ $option.address1 }} <br />
                {{ $option.address2 }} <br />
                {{ $option.city }}
                {{ $option.city && $option.country ? "," : "" }}
                {{ $option.country }}
                <br v-if="!$option.city || !$option.country" />
              </p>
              <h6 class="text-uppercase text-muted">
                {{ $t("quotations.form.date") }}
              </h6>
              <p class="mb-2">
                {{ item.date ? $dateFormat(item.date) : $dateFormat(Date.now() / 1000) }}
              </p>
            </div>
            <div class="col-4 text-center">
              <img
                :src="logo"
                class="img-fluid mb-4"
                style="max-width: 4.5rem"
                v-if="$option.image != null && !loading"
              />
              <h2 class="mb-2">
                {{ $option.name }}
              </h2>
              <p class="text-muted">
                {{ $t("quotations.form.quotation") }} #{{ item.code }}
              </p>
              <p class="barcode">*{{ item.code }}*</p>
            </div>
            <div class="col-4 text-md-right">
              <h6 class="text-uppercase text-muted">
                {{ $t("quotations.show.QuotationFor") }}
              </h6>
              <p class="text-muted mb-4" v-if="item.client_type == 0">
                <strong class="text-body">{{ item.customer.name }}</strong>
                <br />
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
                <strong class="text-body">{{ item.supplier.name }}</strong>
                <br />
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
                {{ $t("quotations.form.ExpiryDate") }}
              </h6>
              <p class="mb-2">
                <time>{{ $dateFormat(item.expiry_date) }}</time>
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="table-responsive">
                <table class="table my-2">
                  <thead>
                    <tr>
                      <th class="px-0 bg-transparent border-top-0">
                        <span class="h6">{{
                          $t("quotations.form.ProductItem")
                        }}</span>
                      </th>
                      <th class="px-0 bg-transparent border-top-0">
                        <span class="h6">{{
                          $t("quotations.form.description")
                        }}</span>
                      </th>
                      <th class="px-0 bg-transparent border-top-0">
                        <span class="h6">{{
                          $t("quotations.form.Quantity")
                        }}</span>
                      </th>
                      <th class="px-0 bg-transparent border-top-0">
                        <span class="h6">{{
                          $t("quotations.form.price")
                        }}</span>
                      </th>
                      <th
                        class="px-0 bg-transparent border-top-0"
                        v-if="item.discount != 0"
                      >
                        <span class="h6">{{
                          $t("quotations.form.Discount")
                        }}</span>
                      </th>
                      <th
                        class="px-0 bg-transparent border-top-0"
                        v-if="item.tax != 0"
                      >
                        <span class="h6">{{ $t("quotations.form.Tax") }}</span>
                      </th>
                      <th class="px-0 bg-transparent border-top-0">
                        <span class="h6">{{
                          $t("quotations.form.Total")
                        }}</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="qItem in item.quotationItems" :key="qItem.id">
                      <td class="px-0">
                        {{ qItem.product_name }}
                      </td>
                      <td class="px-0">
                        {{ qItem.description }}
                      </td>
                      <td class="px-0">
                        {{ qItem.quantity.toFixed(1) }}
                        {{ qItem.unit ? qItem.unit.unit : "" }}
                      </td>
                      <td class="px-0">
                        {{ $moneyFormat(qItem.price) }}
                      </td>
                      <td class="px-0" v-if="item.discount != 0">
                        -{{ $moneyFormat(qItem.discount) }}
                      </td>
                      <td class="px-0" v-if="item.tax != 0">
                        {{ $moneyFormat(qItem.average) }}
                      </td>
                      <td class="px-0">
                        {{ $moneyFormat(qItem.total) }}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" class="px-0 border-top border-top-2">
                        <strong>{{ $t("quotations.form.Subtotal") }}</strong>
                      </td>
                      <td colspan="7" class="px-0 border-top border-top-2">
                        <span class="h3">
                          {{ $moneyFormat(item.subtotal + item.discount) }}
                        </span>
                      </td>
                    </tr>
                    <tr v-if="item.delivery > 0">
                      <td colspan="2" class="px-0 border-top border-top-2">
                        <strong>{{ $t("quotations.show.ShippingFee") }}</strong>
                      </td>
                      <td colspan="7" class="px-0 border-top border-top-2">
                        <span class="h3">
                          {{ $moneyFormat(item.delivery) }}
                        </span>
                      </td>
                    </tr>
                    <tr v-if="item.edit > 0">
                      <td colspan="2" class="px-0 border-top border-top-2">
                        <strong>{{
                          item.edit_text
                            ? item.edit_text
                            : $t("quotations.form.Modification")
                        }}</strong>
                      </td>
                      <td colspan="7" class="px-0 border-top border-top-2">
                        <span class="h3">
                          {{ $moneyFormat(item.edit) }}
                        </span>
                      </td>
                    </tr>
                    <tr v-if="item.discount != 0">
                      <td colspan="2" class="px-0 border-top border-top-2">
                        <strong>{{
                          $t("quotations.form.totalDiscount")
                        }}</strong>
                      </td>
                      <td colspan="7" class="px-0 border-top border-top-2">
                        <span class="h3">
                          - {{ $moneyFormat(item.discount) }}
                        </span>
                      </td>
                    </tr>
                    <tr v-if="item.tax != 0">
                      <td colspan="2" class="px-0 border-top border-top-2">
                        <strong>{{ $t("quotations.form.totalTaxes") }}</strong>
                      </td>
                      <td colspan="7" class="px-0 border-top border-top-2">
                        <span class="h3">
                          {{ $moneyFormat(item.tax) }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" class="px-0 border-top border-top-2">
                        <strong>{{ $t("quotations.form.Total") }}</strong>
                      </td>
                      <td colspan="7" class="px-0 border-top border-top-2">
                        <span class="h3">
                          {{ $moneyFormat(item.total) }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="w-100" v-if="item.notes != null">
                <hr class="my-3" />
                <h4 class="text-uppercase">
                  {{ $t("quotations.show.notes") }}
                </h4>
                <div class="text-muted mb-0" v-html="item.notes"></div>
              </div>
              <div class="w-100" v-if="item.terms != null">
                <hr class="my-3" />
                <h4 class="text-uppercase">
                  {{ $t("quotations.form.termsOfOffer") }}
                </h4>
                <div class="text-muted mb-0" v-html="item.terms"></div>
              </div>
              <div
                class="w-100 inv-footer"
                v-if="$option.invoice_footer != null"
              >
                <hr class="my-3" />
                <p
                  class="text-muted mb-0"
                  v-html="
                    $option.invoice_footer != null ? $option.invoice_footer : ''
                  "
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card">
          <div class="card-header">
            <h4 class="card-header-title">
              {{ $t("quotations.form.quotation") }} #{{ item.code }}
            </h4>
          </div>
          <div class="card-body">
            <p>
              {{ $t("quotations.show.createdIn") }} {{ item.created }}, (<small
                >{{ $t("quotations.show.LastUpdate") }}
                {{ item.updated }}</small
              >)
            </p>
            <ul class="list-unstyled">
              <li v-if="item.client_type == 0">
                <strong>{{ $t("invoices.show.Client") }}</strong> :
                <router-link :to="'/customers/' + item.customer.id">
                  {{ item.customer.name }}</router-link
                >
              </li>
              <li v-if="item.client_type == 1">
                <strong>{{ $t("invoices.show.Client") }}</strong> :
                <router-link :to="'/suppliers/' + item.supplier.id">
                  {{ item.supplier.name }}</router-link
                >
              </li>
              <li>
                <strong>{{ $t("quotations.show.Administrator") }}</strong> :
                {{ item.user.name }}
              </li>
            </ul>
          </div>
        </div>
        <showFile />
      </div>
    </div>
    <convertToInvoiceForm v-if="convertToInvoce" />
  </div>
</template>
<script>
import axios from "axios";

import convertToInvoiceForm from "./components/convertToInvoiceForm.vue";
import showFile from "@/elements/show/showFile.vue";
export default {
  data() {
    return {
      path: "/quotations",
      logo: localStorage.getItem("logo"),
      item: {},
      convertToInvoce: false,
      loading: true,
      site: localStorage.getItem("site"),
    };
  },
  mounted() {
    this.getitem();
  },
  methods: {
    getitem() {
      axios
        .get(this.$linkGnirator(this.path + "/" + this.$route.params.id))
        .then((response) => {
          this.item = response.data;
          this.loading = false;
        });
    },
    conver() {
      this.convertToInvoce = true;
      this.$parent.model = 1;
    },
    print() {
      this.$parent.printedQuotation = this.item;
    },
  },
  components: {
    convertToInvoiceForm,
    showFile,
  },
};
</script>
