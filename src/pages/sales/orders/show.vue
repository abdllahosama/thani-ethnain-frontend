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
                    >{{ $t("orders.form.invoice") }}
                    <strong># {{ item.code }}</strong></a
                  >
                </h4>
              </div>
              <div class="col-auto">
                <router-link
                  :to="path + '/' + item.id + '/edit'"
                  class="btn btn-sm btn-primary"
                  :title="$t('orders.show.Modification')"
                >
                  <i class="fas fa-edit"></i>
                </router-link>
                <!-- <a
                  :href="site + '/orders/' + item.password + '/customer/show'"
                  class="btn btn-sm btn-primary"
                  target="_blank"
                  :title="$t('orders.show.ExternalLink')"
                >
                  <i class="fas fa-link"></i>
                </a> -->
                <a
                  @click="print(item.id)"
                  class="btn btn-sm btn-primary"
                  :title="$t('orders.show.Printing')"
                >
                  <i class="fas fa-print"></i>
                </a>
                <!-- <a
                  :href="$linkGnirator('/orders/' + item.id + '/pdf')"
                  download
                  class="btn btn-sm btn-primary"
                  :title="$t('orders.show.DownloadPDF')"
                >
                  <i class="fas fa-download"></i>
                </a> -->
                <!-- <button
                  class="btn btn-sm btn-primary"
                  @click="conver()"
                  :title="$t('orders.show.TransferToInvoice')"
                  v-if="$user.admin || $user.role.orders_turn_into_invoice"
                >
                  <i class="fas fa-file-alt"></i>
                  {{ $t("orders.show.convertToInvoice") }}
                </button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8">
        <div class="card">
          <div class="card-header">
            <h4 class="card-header-title">
              {{ $t("منتجات الطلب") }}
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <div class="table-responsive">
                  <table
                    class="table"
                    :style="{ border: 'none !important' }"
                  >
                    <thead
                      :style="{
                        backgroundColor: 'white !important',
                        border: 'none !important',
                      }"
                    >
                      <tr>
                        <th
                          :style="{
                            backgroundColor: 'white !important',

                            border: 'none !important',
                            borderBottom: '1px solid black',
                          }"
                          class="px-0 border-top-0"
                        >
                          <span class="h6">{{
                            $t("orders.form.ProductItem")
                          }}</span>
                        </th>

                        <th
                          :style="{
                            backgroundColor: 'white !important',
                            border: 'none !important',
                            borderBottom: '1px solid black',
                          }"
                          class="px-0 border-top-0"
                        >
                          <span class="h6">{{ $t("orders.form.Quantity") }}</span>
                        </th>
                        <th
                          :style="{
                            backgroundColor: 'white !important',
                            border: 'none !important',
                            borderBottom: '1px solid black',
                          }"
                          class="px-0 border-top-0"
                        >
                          <span class="h6">{{ $t("orders.form.price") }}</span>
                        </th>
                        <th
                          :style="{
                            backgroundColor: 'white !important',
                            border: 'none !important',
                            borderBottom: '1px solid black',
                          }"
                          class="px-0 border-top-0"
                          v-if="item.discount != 0"
                        >
                          <span class="h6">{{ $t("orders.form.Discount") }}</span>
                        </th>
                        <th
                          :style="{
                            backgroundColor: 'white !important',
                            border: 'none !important',
                            borderBottom: '1px solid black',
                          }"
                          class="px-0 bg-transparent border-top-0"
                          v-if="item.tax != 0"
                        >
                          <span class="h6">{{ $t("orders.form.Tax") }}</span>
                        </th>
                        <th
                          :style="{
                            backgroundColor: 'white !important',
                            border: 'none !important',
                            borderBottom: '1px solid black',
                          }"
                          class="px-0 bg-transparent border-top-0"
                        >
                          <span class="h6">{{ $t("orders.form.Total") }}</span>
                        </th>
                        <th
                          :style="{
                            backgroundColor: 'white !important',
                            border: 'none !important',
                            borderBottom: '1px solid black',
                          }"
                          class="px-0 bg-transparent border-top-0"
                        >
                          <span class="h6">{{ $t("الحالة") }}</span>
                        </th>
                        <th
                          :style="{
                            backgroundColor: 'white !important',
                            border: 'none !important',
                            borderBottom: '1px solid black',
                          }"
                          class="px-0 bg-transparent border-top-0"
                        >
                          <span class="h6">{{ $t("الإعدادات") }}</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(qItem, indexs) in item.quotationItems"
                        :key="qItem.id"
                        :style="{ border: 'none !important' }"
                      >
                        <td
                          class="px-0"
                          :style="{
                            border: 'none !important',
                            borderBottom: '1px solid black',
                          }"
                        >
                          {{ qItem.product_name }}
                        </td>
                        <!-- <td class="px-0">
                              {{ qItem.description }}
                          </td> -->
                        <td
                          class="px-0"
                          :style="{
                            border: 'none !important',
                            borderBottom: '1px solid black',
                          }"
                        >
                          {{ qItem.quantity.toFixed(1) }}
                          {{ qItem.unit ? qItem.unit.unit : "" }}
                        </td>
                        <td
                          class="px-0"
                          :style="{
                            border: 'none !important',
                            borderBottom: '1px solid black',
                          }"
                        >
                          {{ $moneyFormat(qItem.price) }}
                        </td>
                        <td class="px-0" v-if="item.discount != 0">
                          -{{ $moneyFormat(qItem.discount) }}
                        </td>
                        <td class="px-0" v-if="item.tax != 0">
                          {{ $moneyFormat(qItem.average) }}
                        </td>
                        <td
                          class="px-0"
                          :style="{
                            border: 'none !important',
                            borderBottom: '1px solid black',
                          }"
                        >
                          {{ $moneyFormat(qItem.total) }}
                        </td>
                        <td
                          class="px-0"
                          :style="{
                            border: 'none !important',
                            borderBottom: '1px solid black',
                          }"
                        >
                          <div
                            :class="'badge badge-' + value.color"
                            v-for="value in statusData"
                            v-if="value.value == qItem.status"
                          >
                            {{ value.title }}
                          </div>
                        </td>
                        <td
                          class="px-0"
                          :style="{
                            border: 'none !important',
                            borderBottom: '1px solid black',
                          }"
                        >
                          <i class="fas fa-edit" style="cursor: pointer; margin-left: 10px;;" @click="openStatus(indexs)"></i>
                          <i class="fas fa-print" style="cursor: pointer;" @click="printItem(indexs)"></i>
                        </td>
                      </tr>

                      <tr v-if="item.delivery > 0">
                        <td colspan="2" class="px-0 border-top border-top-2">
                          <strong>{{ $t("orders.show.ShippingFee") }}</strong>
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
                              : $t("orders.show.Modification")
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
                          <strong>{{ $t("orders.form.totalDiscount") }}</strong>
                        </td>
                        <td colspan="7" class="px-0 border-top border-top-2">
                          <span class="h3">
                            - {{ $moneyFormat(item.discount) }}
                          </span>
                        </td>
                      </tr>
                      <tr v-if="item.tax != 0">
                        <td colspan="2" class="px-0 border-top border-top-2">
                          <strong>{{ $t("orders.form.totalTaxes") }}</strong>
                        </td>
                        <td colspan="7" class="px-0 border-top border-top-2">
                          <span class="h3">
                            {{ $moneyFormat(item.tax) }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="w-100" v-if="item.terms != null">
                  <hr class="my-3" />
                  <h4 class="text-uppercase">
                    {{ $t("orders.form.termsOfOffer") }}
                  </h4>
                  <div class="text-muted mb-0" v-html="item.notes"></div>
                </div>
                <div
                  class="w-100 inv-footer"
                  v-if="$option.invoice_footer != null"
                >
                  <hr class="my-3" />
                  <div class="text-muted mb-0" v-html="item.terms"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card">
          <div class="card-header">
            <h4 class="card-header-title">
              {{ $t("orders.form.invoice") }} : #{{ item.code }}
            </h4>
          </div>
          <div class="card-body">
            <p>
              {{ $t("orders.show.createdIn") }} {{ item.created }}, (<small
                >{{ $t("orders.show.LastUpdate") }} {{ item.updated }}</small
              >)
            </p>
            <ul class="list-unstyled">
              <li v-if="item.client_type == 0">
                <strong>{{ $t("orders.show.Client") }}</strong> :
                <router-link :to="'/customers/' + item.customer.id">
                  {{ item.customer.name }}</router-link
                >
              </li>
              <li v-if="item.client_type == 1">
                <strong>{{ $t("orders.show.Client") }}</strong> :
                <router-link :to="'/suppliers/' + item.supplier.id">
                  {{ item.supplier.name }}</router-link
                >
              </li>
              <li>
                <strong>{{ $t("orders.show.Administrator") }}</strong> :
                {{ item.user.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h4 class="card-header-title">
              {{ $t("orders.form.Total") }}:
            </h4>
          </div>
          <div class="card-body">
            <h6 class="text-uppercase text-muted">
              {{ $t("orders.form.Subtotal") }}:
            </h6>
            <p class="mb-2">
              {{ $moneyFormat(item.subtotal + item.discount) }}
            </p>
            <h6 class="text-uppercase text-muted">
              {{ $t("orders.form.Total") }}:
            </h6>
            <p class="mb-2">
              {{ $moneyFormat(item.total) }}
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h4 class="card-header-title">{{ $t("orders.form.date") }}:</h4>
          </div>
          <div class="card-body">
            <h6 class="text-uppercase text-muted">
              {{ $t("orders.form.date") }}
            </h6>
            <p class="mb-2">
              {{ $dateFormat(item.date) }}
            </p>
            <h6 class="text-uppercase text-muted">
              {{ $t("orders.form.ExpiryDate") }}
            </h6>
            <p class="mb-2">
              {{ $dateFormat(item.expiry_date) }}
            </p>
          </div>
        </div>
        <showFile />
      </div>
    </div>
    <convertToInvoiceForm v-if="convertToInvoce" />
    <editStat v-if="edit_id != null" />
  </div>
</template>
<script>
import axios from "axios";
import convertToInvoiceForm from "./components/convertToInvoiceForm.vue";
import editStat from "./components/editStat.vue";
import showFile from "@/elements/show/showFile.vue";
export default {
  data() {
    return {
      path: "/orders",
      logo: localStorage.getItem("logo"),
      item: {},
      convertToInvoce: false,
      edit_id: null,
      statusData: [
        { title: this.$t('orders.NewOrder'), value: 0, color: 'dark'},
        { title: this.$t('orders.BeingProcessed'), value: 1, color: 'info' },
        { title: this.$t('orders.readyForShipping'), value: 2, color: 'info' },
        { title: this.$t('orders.UnderShipping'), value: 3, color: 'info' },
        { title: this.$t('orders.shipped'), value: 4, color: 'success' },
        { title: this.$t('orders.complete'), value: 5, color: 'success' },
        { title: this.$t('orders.returnd'), value: 6, color: 'danger'},
        { title: this.$t('orders.canceled'), value: 7, color: 'danger' },
      ],
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
    openStatus (id){
      this.edit_id = id
    },
    changeStatus(status) {
        axios
        .post(this.$linkGnirator('/orderItem/status/' + this.item.quotationItems[this.edit_id].id + '/' + status  ), {
            _method: 'POST'
        })
        .then(response => {
            this.getitem()
            this.edit_id = null
            return response
        })
    },
    conver() {
      this.convertToInvoce = true;
      this.$parent.model = 1;
    },
    printItem(id) {
      this.$parent.printedOrderItem = this.item;
      this.$parent.printedOrderItemId = id
    },
    print(id) {
      this.$parent.printedOrder = this.item;
    },
  },
  components: {
    convertToInvoiceForm,
    showFile,
    editStat
  },
};
</script>
