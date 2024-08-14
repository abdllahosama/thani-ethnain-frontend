<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('pointOfSales.form.createAPointOfSale')"
          :description="
            $t('pointOfSales.form.fromHereYouCanCreateANewPointOfSale')
          "
          v-if="$route.name == 'pointOfSalesCreate'"
        />
        <addHeader
          :title="$t('pointOfSales.form.pointOfSaleAdjustment')"
          :description="
            $t('pointOfSales.form.fromHereYouCanModifyThePointOfSaleData')
          "
          v-if="$route.name == 'pointOfSalesEdit'"
        />
        <div class="mb-4 row">
          <formInput
            :title="$t('pointOfSales.form.namePointOfSale')"
            :checkError="'nameErorr'"
            v-model="item.name"
            :hasErorr="errors.name"
            maxlength="255"
            :error="$t('allerts.thisFieldIsRequired')"
          />
          <searchGroupInput
            :type="'safe'"
            :values="$database.safes"
            :inputs="[{ 'show': 'name'}]"
          />
          <searchGroupInput
            :type="'store'"
            :values="$database.stores"
            :inputs="[{ 'show': 'name'}]"
          />
          <searchGroupInput
            :type="'customer'"
            :values="$database.customers"
            :inputs="[{ 'title':$t('pointOfSales.form.VirtualAgent'),'show': 'name'}]"
          />

          <connectionInput
            :title="$t('pointOfSales.form.invoiceGroup')"
            :group="$t('pointOfSales.form.invoiceGroups')"
            v-model="item.invoice_group_id"
            :hasAdd="false"
            :open="'addStore'"
            :values="$database.invoiceGroups"
            :hasErorr="errors.invoice_group_id"
            :error="$t('allerts.thisFieldIsRequired')"
          />

          <checkInput
            :title="$t('pointOfSales.form.status')"
            :value="item.stat"
            v-model="item.stat"
          />
            
        <checkInput
            :title="$t('pointOfSales.form.customLogo')"
            :value="item.show_custom_logo"
            v-model="item.show_custom_logo"
          />
          <fileInput
            :title="$t('pointOfSales.form.addCustomLogo')"
            v-model="item.customLogo"
            :image="item.customLogo"
            :path="'logos'"
            :hasErorr="errors.image"
            :error="$t('allerts.ChooseASuitableFile')"
            :col="'col-12'"
            v-if="item.show_custom_logo == 1"

          />

          <formTextarea
            :title="$t('pointOfSales.form.invoiceFooter')"
            v-model="item.invoice_footer"
          />

          <dvider
            :title="$t('pointOfSales.form.PointOfSaleSettings')"
            :description="$t('pointOfSales.form.PointOfSaleSettings')"
          />
          <div class="form-group col-md-6 row">
            <label class="col-md-4">{{$t('pointOfSales.form.PrintingMethod')}}</label>
            <div class="col-md-7">
              <select
                type="text"
                class="form-control"
                v-model="item.print_type"
              >
                <option value="0">{{$t('pointOfSales.form.NoPrinting')}}</option>
                <option value="1">{{$t('pointOfSales.form.ThermalPaper(8cm)')}}</option>
                <option value="3">{{$t('pointOfSales.form.ThermalPaper(5cm)')}}</option>
                <option value="2">{{$t('pointOfSales.form.A4Paper')}}</option>
              </select>
            </div>
          </div>
          <formInput type="number" :title="$t('pointOfSales.form.printCount')" v-model="item.print_count" />
          <div class="form-group col-md-6 row">
            <label class="col-md-4">{{$t('pointOfSales.form.InvoiceLanguage')}}</label>
            <div class="col-md-7">
              <select
                type="text"
                class="form-control"
                v-model="item.print_language"
              >
                <option value="0">{{$t('pointOfSales.form.Arabic')}}</option>
                <option value="1">{{$t('pointOfSales.form.English')}}</option>
              </select>
            </div>
          </div>
          <div class="form-group col-md-6 row">
            <label class="col-md-4">{{$t('pointOfSales.form.QuantityView')}}</label>
            <div class="col-md-7">
              <select
                type="text"
                class="form-control"
                v-model="item.print_amount"
              >
                <option value="0">{{$t('pointOfSales.form.Normal')}}</option>
                <option value="1">{{$t('pointOfSales.form.double')}}</option>
              </select>
            </div>
          </div>
          <connectionInput
            :title="$t('pointOfSales.form.Discount')"
            :group="$t('pointOfSales.form.Discounts')"
            v-model="item.discount_id"
            :hasAdd="false"
            :values="$database.discounts"
          />
          <formInput type="number" :title="$t('pointOfSales.form.maximumDiscount')" v-model="item.max_discount" />
          <connectionInput
            :title="$t('pointOfSales.form.Tax')"
            :group="$t('pointOfSales.form.Taxes')"
            v-model="item.tax_id"
            :hasAdd="false"
            :values="$database.taxes"
          />
          <connectionInput
            :title="$t('pointOfSales.form.ListOfPrices')"
            :group="$t('pointOfSales.form.PriceLists')"
            v-model="item.priceList_id"
            :hasAdd="false"
            :values="$database.priceLists"
          />

          <div class="form-group col-md-6 row">
            <label class="col-md-4">{{$t('pointOfSales.form.NetProfitOffer')}}</label>
            <div class="col-md-7">
              <select type="text" class="form-control" v-model="item.show_earn">
                <option value="0">{{$t('pointOfSales.form.No')}}</option>
                <option value="1">{{$t('pointOfSales.form.DisplayAtPressing(f1)')}}</option>
                <option value="2">{{$t('pointOfSales.form.Yes')}}</option>
              </select>
            </div>
          </div>
          <div class="form-group col-md-6 row">
            <label class="col-md-4">{{$t('pointOfSales.form.WholesaleBid')}}</label>
            <div class="col-md-7">
              <select type="text" class="form-control" v-model="item.show_cost">
                <option value="0">{{$t('pointOfSales.form.No')}}</option>
                <option value="1">{{$t('pointOfSales.form.DisplayAtPressing(f2)')}}</option>
                <option value="2">{{$t('pointOfSales.form.Yes')}}</option>
              </select>
            </div>
          </div>
          <checkInput
            :title="$t('pointOfSales.form.BalanceView')"
            :value="item.show_balance"
            v-model="item.show_balance"
          />
          <checkInput
            :title="$t('pointOfSales.form.AdjustingTheSalePrice')"
            :value="item.change_price"
            v-model="item.change_price"
          />
          <checkInput
            :title="$t('pointOfSales.form.UseBarcode')"
            :value="item.barcode_allow"
            v-model="item.barcode_allow"
          />

          <checkInput
            :title="$t('pointOfSales.form.DiscountAdjustment')"
            :value="item.change_discount"
            v-model="item.change_discount"
          />

          <checkInput
            :title="$t('pointOfSales.form.AllowDiscountingForProducts')"
            :value="item.change_product_discount"
            v-model="item.change_product_discount"
          />

          <checkInput
            :title="$t('pointOfSales.form.AdjustThePriceList')"
            :value="item.change_priceList"
            v-model="item.change_priceList"
          />

          <checkInput
            :title="$t('pointOfSales.form.AddNotes')"
            :value="item.change_notes"
            v-model="item.change_notes"
          />

          <checkInput
            :title="$t('pointOfSales.form.ViewInvoices')"
            :value="item.invoice_allow"
            v-model="item.invoice_allow"
          />
          <checkInput
            :title="$t('pointOfSales.form.UsIngMarketers')"
            :value="item.marketer_allow"
            v-model="item.marketer_allow"
          />

          <checkInput
            :title="$t('pointOfSales.form.OpenTheCashDrawer')"
            :value="item.open_cash_drawer_allow"
            v-model="item.open_cash_drawer_allow"
          />

          <checkInput
            :title="$t('pointOfSales.form.MultipleInvoices')"
            :value="item.multi_invoice"
            v-model="item.multi_invoice"
          />

          <checkInput
            :title="$t('pointOfSales.form.showRest')"
            :value="item.show_rest"
            v-model="item.show_rest"
          />

          <checkInput
            :title="$t('pointOfSales.form.printUser')"
            :value="item.print_user"
            v-model="item.print_user"
          />
          
          <dvider
            :title="$t('pointOfSales.form.CustomerSettings')"
            :description="$t('pointOfSales.form.FromHereYouCanControlCustomerReturns')"
          />
          <checkInput
            :title="$t('pointOfSales.form.editCustomer')"
            :value="item.change_price"
            v-model="item.change_customer"
          />
          <checkInput
            v-if="item.change_customer"
            :title="$t('pointOfSales.form.AddressEditing')"
            :value="item.change_address"
            v-model="item.change_address"
          />
          <checkInput
            v-if="item.change_customer"
            :title="$t('pointOfSales.form.AllowingDebts')"
            :value="item.rest_allow"
            v-model="item.rest_allow"
          />
          <checkInput
            v-if="item.change_customer"
            :title="$t('pointOfSales.form.AddPayments')"
            :value="item.payment_allow"
            v-model="item.payment_allow"
          />
          <dvider
            :title="$t('pointOfSales.form.RestaurantSettings')"
            :description="$t('pointOfSales.form.ThatIsWhereYouCanControlRestaurantReturns')"
          />
          <formInput type="number" :title="$t('pointOfSales.form.Service')" v-model="item.service" />
          <div class="form-group col-md-6 row" v-if="$route.name != 'profile'">
            <label class="col-md-4">{{$t('pointOfSales.form.AvailableSections')}}</label>
            <div class="col-md-7">
              <multiselect
                v-model="selectedSections"
                :options="filterdSections"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :placeholder="$t('pointOfSales.form.ChooseTheDepartment')"
                label="name"
                track-by="name"
                :hide-selected="true"
              />
            </div>
          </div>
          <checkInput
            :title="$t('pointOfSales.form.ProductDisplay')"
            :value="item.show_products"
            v-model="item.show_products"
          />
          <checkInput
            v-if="item.show_products"
            :title="$t('pointOfSales.form.ViewProductPhotos')"
            :value="item.show_products_image"
            v-model="item.show_products_image"
          />
          <checkInput
            v-if="item.show_products"
            :title="$t('pointOfSales.form.ViewSections')"
            :value="item.show_sections"
            v-model="item.show_sections"
          />

          <checkInput
            v-if="item.show_sections"
            :title="$t('pointOfSales.form.showSectionIcons')"
            :value="item.show_sections_icon"
            v-model="item.show_sections_icon"
          />

          <checkInput
            v-if="item.show_sections"
            :title="$t('pointOfSales.form.ViewSectionPhotos')"
            :value="item.show_sections_image"
            v-model="item.show_sections_image"
          />

          <checkInput
            :title="$t('pointOfSales.form.UseTheLounge')"
            :value="item.hall_allow"
            v-model="item.hall_allow"
          />

          <checkInput
            :title="$t('pointOfSales.form.UseOfDelivery')"
            :value="item.delivery_allow"
            v-model="item.delivery_allow"
          />
          <checkInput
            :title="$t('pointOfSales.form.KitchenPrint')"
            :value="item.multi_print"
            v-model="item.multi_print"
          />

          <checkInput
            v-if="item.multi_print"
            :title="$t('pointOfSales.form.PrintingTheClientInTheKitchen')"
            :value="item.multi_print_customer"
            v-model="item.multi_print_customer"
          />

          <checkInput
            v-if="item.multi_print"
            :title="$t('pointOfSales.form.KitchenNotes')"
            :value="item.comment_allow"
            v-model="item.comment_allow"
          />

          <checkInput
            :title="$t('pointOfSales.form.NumberingOfApplications')"
            :value="item.order_number"
            v-model="item.order_number"
          />

          <checkInput
            :title="$t('pointOfSales.form.UsingAnInternalServer')"
            :value="item.local_server"
            v-model="item.local_server"
          />

          <checkInput
            :title="$t('pointOfSales.form.SplitTheBill')"
            :value="item.split_allow"
            v-model="item.split_allow"
          />

          <checkInput
            :title="$t('pointOfSales.form.deleteAfterPrint')"
            :value="item.delete_after_print"
            v-model="item.delete_after_print"
          />

          
          <dvider
            :title="$t('pointOfSales.form.InternalServerSettings')"
            :description="$t('pointOfSales.form.FromHereYouCanControlTheInternalServerSettings')"
            v-if="item.local_server"
          />

          <div class="form-group row col-md-6" v-if="item.local_server">
            <label class="col-md-4">{{$t('pointOfSales.form.InternalServerID')}}</label>
            <div class="col-md-7">
              <div class="icon-input">
                <span>http://</span>
                <input
                  type="text"
                  v-model="item.local_server_ip"
                  maxlength="255"
                  class="form-control"
                />
              </div>
            </div>
          </div>

          <dvider
            :title="$t('pointOfSales.form.NumberingSettings')"
            :description="$t('pointOfSales.form.FromHereYouCanControlTheNumberingSettingsOfInvoices')"
            v-if="item.order_number"
          />

          <formInput
            :title="$t('pointOfSales.form.TheBeginningOfNumbering')"
            type="number"
            v-model="item.start_order_number"
            v-if="item.order_number"
          />

          <formInput
            :title="$t('pointOfSales.form.EndOfNumbering')"
            type="number"
            v-model="item.end_order_number"
            v-if="item.order_number"
          />

          <dvider
            :title="$t('pointOfSales.form.PrintSettings')"
            :description="$t('pointOfSales.form.FromHereYouCanControlThePrintingReturns')"
            v-if="item.multi_print"
          />

          <printersTable class="col-12" v-if="item.multi_print" />

          <dvider
            :title="$t('pointOfSales.form.LoungeSettings')"
            :description="$t('pointOfSales.form.FromHereYouCanControlTheLoungeReturns')"
            v-if="item.hall_allow"
          />

          <hallTable class="col-12" v-if="item.hall_allow" />

          <dvider
            :title="$t('pointOfSales.form.PaymentMethodSettings')"
            :description="$t('pointOfSales.form.FromHereYouCanCntrolThePaymentMethodSettings')"
          />
           <checkInput
            :title="$t('pointOfSales.form.ModifyPaymentMethods')"
            :value="item.pay_methods_allow"
            v-model="item.pay_methods_allow"
          /> 
          <productsTable v-if="item.pay_methods_allow" class="col-12"/>

          <dvider
            :title="$t('pointOfSales.form.expensesSettings')"
            :description="$t('pointOfSales.form.FromHereYouCanCntrolTheExpensesSettings')"
          />

          <checkInput
            :title="$t('pointOfSales.form.AddExpenses')"
            :value="item.expense_allow"
            v-model="item.expense_allow"
          />

          <connectionInput
            :title="$t('pointOfSales.form.expensesInvoiceGroup')"
            :group="$t('pointOfSales.form.invoiceGroups')"
            v-if="item.expense_allow"
            v-model="item.expenses_invoice_group_id"
            :hasAdd="false"
            :values="$database.invoiceGroups"
            :hasErorr="errors.expenses_invoice_group_id"
            :error="$t('allerts.thisFieldIsRequired')"
          />

          <div class="form-group col-md-6 row" v-if="item.expense_allow">
            <label class="col-md-4">{{$t('pointOfSales.form.AvailableExpensesSections')}}</label>
            <div class="col-md-7">
              <multiselect
                v-model="selectedExpensesSections"
                :options="$database.expenseSections"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :placeholder="$t('pointOfSales.form.ChooseTheSections')"
                label="name"
                track-by="name"
                :hide-selected="true"
              />
            </div>
          </div>

          <dvider
            :title="$t('pointOfSales.form.shippingOperationsSettings')"
            :description="$t('pointOfSales.form.FromHereYouCanCntrolTheShippingOperationsSettings')"
          />

          <checkInput
            :title="$t('pointOfSales.form.UseOfDelivery')"
            :value="item.shipping_allow"
            v-model="item.shipping_allow"
          />

          <checkInput
            :title="$t('pointOfSales.form.UseOfDelivery')"
            :value="item.delivery_allow"
            v-model="item.delivery_allow"
            v-if="item.shipping_allow"
          />

          <div class="form-group col-md-6 row" v-if="item.shipping_allow && item.delivery_allow">
            <label class="col-md-4">{{$t('pointOfSales.form.AvailableDeliveries')}}</label>
            <div class="col-md-7">
              <multiselect
                v-model="selectedDeliveries"
                :options="$database.deliveries"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :placeholder="$t('pointOfSales.form.ChooseTheDelivery')"
                label="name"
                track-by="name"
                :hide-selected="true"
              />
            </div>
          </div>
          <connectionInput
            :title="$t('pointOfSales.form.shippingOperationsInvoiceGroup')"
            :group="$t('pointOfSales.form.invoiceGroups')"
            v-if="item.shipping_allow"
            v-model="item.shipping_operations_invoice_group_id"
            :hasAdd="false"
            :values="$database.invoiceGroups"
            :hasErorr="errors.shipping_operations_invoice_group_id"
            :error="$t('allerts.thisFieldIsRequired')"
          />
          <connectionInput
            :title="$t('shippingOperations.form.pickupLocation')"
            :group="$t('shippingOperations.form.pickupLocations')"
            v-if="item.shipping_allow"
            v-model="item.pickup_location_id"
            :values="$database.pickupLocations"
            :hasErorr="errors.pickup_location_id"
            :error="$t('shippingOperations.form.ThisFieldIsRequired')"
          />

          <connectionInput
            :title="$t('pointOfSales.form.defaultCity')"
            :group="$t('pointOfSales.form.defaultCity')"
            v-if="item.shipping_allow"
            v-model="item.city_id"
            :values="$database.cities"
            :hasErorr="errors.city_id"
            :error="$t('shippingOperations.form.ThisFieldIsRequired')"
          />

          <checkInput
            :title="$t('pointOfSales.form.directPrintingOfTheChargingProcess')"
            :value="item.print_delivery"
            v-model="item.print_delivery"
          />

          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'pointOfSalesCreate' && !$parent.stopEdit"
          >
            {{ $t('pointOfSales.form.createAPointOfSale') }}
          </a>
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'pointOfSalesEdit' && !$parent.stopEdit"
          >
            {{ $t('pointOfSales.form.pointOfSaleAdjustment') }}
          </a>
          <loading v-if="$parent.stopEdit"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import formInput from "@/elements/add/form/formInput.vue";
import formTextarea from "@/elements/add/form/formTextarea.vue";
import checkInput from "@/elements/add/form/checkInput.vue";
import connectionInput from "@/elements/add/form/connectionInput.vue";
import addHeader from "@/elements/add/header.vue";
import productsTable from "./components/quotation/productsTable.vue";
import searchGroupInput from "@/elements/add/form/searchGroupInput.vue";


import dvider from "@/elements/add/dvider.vue";
import loading from "@/elements/add/loading.vue";

import printersTable from "./components/form/printersTable.vue";
import hallTable from "./components/form/hallTable.vue";
export default {
  data() {
    return {
      path: "/pointOfSales",
      selectedSections: [],
      selectedDeliveries: [],
      selectedExpensesSections: [],
      filterdSections: [],
      item: {
        stat: 1,
        print_type: 0,
        print_language: 0,
        print_amount: 0,
        print_count: 1,
        show_balance: 0,
        show_earn: 0,
        show_cost: 0,
        change_price: 0,
        show_products: 0,
        show_products_image: 0,
        show_sections: 0,
        show_sections_image: 0,
        change_customer: 0,
        change_address: 0,
        rest_allow: 0,
        barcode_allow: 0,
        hall_allow: 0,
        delivery_allow: 0,
        delivery_id: '',
        marketer_allow: 0,
        pay_methods_allow: 0,
        open_cash_drawer_allow: 0,
        change_discount: 0,
        change_product_discount: 0,
        change_priceList: 0,
        change_notes: 0,
        kitchen_print: 0,
        multi_print: 0,
        multi_print_customer: 0,
        comment_allow: 0,
        invoice_allow: 0,
        order_number: 0,
        local_server: 0,
        invoice_show_products: 1,
        discount_id: 0,
        tax_id: 0,
        priceList_id: 0,
        multi_invoice: 0,
        hall_tables: [],
        printers: [],
        payment_methods: [],
        split_allow: 0,
        delete_after_print: 0,
        shipping_operations_invoice_group_id: 0,
        pickup_location_id: 0,
        expense_allow: 0,
        shipping_allow: 0,
        delivery_allow: 0,
        city_id: 0,
        show_rest: 0,
        print_user: 0,
        safe:{},
        store:{},
        customer:{},

      },
      errors: {
        name: false,
        safe_id: false,
        store_id: false,
        customer_id: false,
        invoice_group_id: false,
      },
    };
  },
  mounted() {
    this.$updateDatabase([
      "stores",
      "sections",
      "discounts",
      "priceLists",
      "safes",
      "customers",
      "invoiceGroups",
      "deliveries",
      "pickupLocations"
    ]);
    if (this.$route.name == "pointOfSalesEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    } else {
      this.addQuotationItem()
    }
    this.changeSections();
    var elm = this;
      window.addEventListener("keydown", function (e) {
        if (e.key == "F1" || e.key == "Meta") {
          e.preventDefault();
          elm.saveItem();
        }
      })
  },
  methods: {
    getItem() {
      axios
        .get(this.$linkGnirator(this.path + "/" + this.$route.params.id))
        .then((response) => {
          this.item = response.data;
          this.item.section_id = JSON.parse(this.item.section_id);
          if (Array.isArray(this.item.section_id)) {
            this.item.section_id.forEach((id) => {
              var section = this.$database.sections.find(
                (el) => el.id == id
              );
              if (section) {
                this.selectedSections.push(section);
              }
              if (id == 0) {
                this.selectedSections.push({
                  id: 0,
                  name: this.$t('pointOfSales.form.Uncategorized'),
                });
              }
            });
          }

          this.item.delivery_id = JSON.parse(this.item.delivery_id);
          if (Array.isArray(this.item.delivery_id)) {
            this.item.delivery_id.forEach((id) => {
              var deliveries = this.$database.deliveries.find((el) => el.id == id);
              if (deliveries) {
                this.selectedDeliveries.push(deliveries);
              }
            });
          }

          this.item.expenses_section_id = JSON.parse(this.item.expenses_section_id);
          if (Array.isArray(this.item.expenses_section_id)) {
            this.item.expenses_section_id.forEach((id) => {
              var expensesSections = this.$database.expenseSections.find((el) => el.id == id);
              if (expensesSections) {
                this.selectedExpensesSections.push(expensesSections);
              }
            });
          }

          if (this.item.payment_methods.length == 0) {
            this.addQuotationItem()
          }
          this.$parent.stopEdit = false;
        });
    },
    saveItem() {
      var error = 0;
      if (typeof this.item.name === "undefined" || this.item.name == "") {
        error = 1;
        this.errors.name = true;
      }
      if (typeof this.item.safe_id === "undefined" || this.item.safe_id == "") {
        error = 1;
        this.errors.safe_id = true;
      }
      if (
        typeof this.item.store_id === "undefined" ||
        this.item.store_id == ""
      ) {
        error = 1;
        this.errors.store_id = true;
      }
      if (
        typeof this.item.customer_id === "undefined" ||
        this.item.customer_id == ""
      ) {
        error = 1;
        this.errors.customer_id = true;
      }
      if (
        typeof this.item.invoice_group_id === "undefined" ||
        this.item.invoice_group_id == ""
      ) {
        error = 1;
        this.errors.invoice_group_id = true;
      }
      if (error == 0) {
        if (this.$route.name == "pointOfSalesCreate") {
          this.$parent.aletText = this.$t('pointOfSales.form.pointOfSaleSuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
        } else if (this.$route.name == "pointOfSalesEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText =
                this.$t('allerts.pointOfSaleHasBeenModifiedSuccessfully');
              this.$parent.alertType = "success";
              this.$router.go(-1);
              this.$parent.stopEdit = false;
              return response;
            });
        }
      } else {
        this.$parent.aletText = this.$t('allerts.pleaseMakeSureOfTheInput');
        this.$parent.alertType = "danger";
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },

    addTable() {
      this.item.hall_tables.push({
        name: "",
        priceList_id: 0,
      });
    },
    addPrinter() {
      this.item.printers.push({
        name: "",
      });
    },
    changeSections() {
      var sections = JSON.parse(JSON.stringify(this.$database.sections));
      sections.push({ id: 0, name: this.$t('pointOfSales.form.Uncategorized') });

      this.filterdSections = sections;
    },
    addQuotationItem() {
      this.item.payment_methods.push({
        safe_id: "",
        name: "",
      });
    },
  },

  watch: {
    "$database.sections": function () {
      this.changeSections();
    },
    selectedSections: function (val) {
      this.item.section_id = JSON.stringify(val.map((el) => el.id));
    },
    selectedDeliveries: function (val) {
      this.item.delivery_id = JSON.stringify(val.map((el) => el.id));
    },
    selectedExpensesSections: function (val) {
      this.item.expenses_section_id = JSON.stringify(val.map((el) => el.id));
    }
  },
  components: {
    formInput,
    formTextarea,
    addHeader,
    connectionInput,
    checkInput,
    loading,
    dvider,
    hallTable,
    printersTable,
    hallTable,
    productsTable,
    searchGroupInput,
  },
};
</script>
