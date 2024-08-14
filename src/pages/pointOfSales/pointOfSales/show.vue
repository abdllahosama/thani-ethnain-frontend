<template>
  <div class="container-fluid" :key="refresh">
      <showButtons class=" pos-buttons-container" />
      <div class="mt-3 pos-items-container">
        <alert :text="aletText" :type="alertType" v-if="aletText != null" />
        <multiInvoices v-if="selectedTable == 0 && options.multi_invoice" />
        <div class="products-contaner">
          <div class="d-flex">
            <itemSearchInput class="w-100" />
            <div class="dropdown" :class="{'show' : showMnue}"  v-click-outside="removeMnue">
              <button class="btn btn-light pos-filter-btn"  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" :aria-expanded="showMnue" @click="toggleMnue()"><i class="fas fa-sliders-h"></i></button>

              <div class="dropdown-menu" :class="{'show' : showMnue}" aria-labelledby="dropdownMenuButton sort-popup">
                <a class="dropdown-item" @click="sortItems('name', 'desc')"><i class="far fa-sort-alpha-up"></i>{{$t('pointOfSales.show.sortName')}}</a>
                <a class="dropdown-item" @click="sortItems('name', 'asc')"><i class="far fa-sort-alpha-down"></i>{{$t('pointOfSales.show.sortName')}}</a>
                <a class="dropdown-item" @click="sortItems('price', 'desc')"><i class="fas fa-sort-numeric-up"></i>{{$t('pointOfSales.show.sortPrice')}}</a>
                <a class="dropdown-item" @click="sortItems('price', 'asc')"><i class="fas fa-sort-numeric-down"></i>{{$t('pointOfSales.show.sortPrice')}}</a>
                <a class="dropdown-item" @click="sortItems('id', 'desc')"><i class="far fa-sort-amount-up"></i>{{$t('pointOfSales.show.sortSeniority')}}</a>
                <a class="dropdown-item" @click="sortItems('id', 'asc')"><i class="far fa-sort-amount-down"></i>{{$t('pointOfSales.show.sortNewest')}}</a>
              </div>
            </div>
            
          </div>
          <div
            class="sections-container"
            v-if="options.show_sections"
          >
            <casherSection
              :class="{
                  'sections-without-image' : options.show_sections_image == 0,
                  'active' : selectedSecton == section.id
              }"
              v-for="section in options.sections"
              :key="section.id"
              :section="section"
            />
          </div>



        <div
          class="products-contaner"
          v-if="
            options.show_products &&
            options.show_sections &&
            selectedSecton != null
          "
        >
          <div class="row">
            <casherProduct
              class="col-xl-3 col-lg-2-4 col-md-4 col-6"
              :class="{
                'products-without-image': options.show_products_image == 0
              }"
              v-for="item in sectionItems"
              :key="item.id"
              :item="item"
            />
            <div
              class="col-12 text-center"
              v-if="sectionItems.length == 0"
            >
              <div class="empty-table">
                <img src="accounting/img/empty-basket.png">
                <p> {{$t('pointOfSales.show.ThereAreNoProducts')}} </p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="row"
          v-if="options.show_products && !options.show_sections"
        >
          <div
            class="col-xl-2 col-lg-2-4 col-md-3 col-4"
            v-for="item in items"
            :key="item.id"
          >
            <casherProduct :item="item"></casherProduct>
          </div>
        </div>
        <productsTable v-if="!options.show_products" />
      </div>
    </div>
    <sidebar class="pos-sidebar-container"/>
    <payForm v-if="payFormShow" />
    <casherTables v-if="casherTableShow" />
    <commentForm v-if="commentFormShow" />
    <productCommentForm v-if="productCommentFormShow" />
    <moveForm v-if="moveFormShow" />
    <margeForm v-if="margeFormShow" />
    <splitTableForm v-if="splitTableFormShow" />
    <shippingOperationForm v-if="shippingOperationShow" />
    <kitchen
      :kitchenInvoice="kitchenInvoice"
      v-for="(kitchenInvoice, index) in kitchenInvoices"
      :key="index"
    />
    <productOptions v-if="productOptionsFormShow" />
    <productSelection v-if="productSelectionFormShow" />
    <splitForm v-if="splitFormShow" />
    <bookingForm v-if="bookingFormShow" />
    <removeBookingForm v-if="removeBookingFormShow" />
    <cashForm v-if="cashFormShow" />

    <printersForm v-if="printersShow" />
  </div>
</template>
<script>
import axios from "axios";

import showButtons from "./components/show/showButtons.vue";
import casherProduct from "./components/show/casherProduct.vue";
import casherSection from "./components/show/casherSection.vue";
import casherTable from "./components/show/casherTable.vue";
import sidebar from "./components/show/sidebar.vue";
import productsTable from "./components/show/productsTable.vue";

import itemSearchInput from "./components/inputs/itemSearchInput.vue";

import payForm from "./components/popUp/payForm.vue";
import casherTables from "./components/popUp/table.vue";
import commentForm from "./components/popUp/commentForm.vue";
import productOptions from "./components/popUp/productOptions.vue";
import productSelection from "./components/popUp/productSelection.vue";
import splitForm from "./components/popUp/splitForm.vue";
import bookingForm from "./components/popUp/bookingForm.vue";
import removeBookingForm from "./components/popUp/removeBookingForm.vue";
import printersForm from "./components/popUp/printersForm.vue";

import productCommentForm from "./components/popUp/productCommentForm.vue";
import moveForm from "./components/popUp/moveForm.vue";
import margeForm from "./components/popUp/margeForm.vue";
import splitTableForm from "./components/popUp/splitTableForm.vue";
import cashForm from "./components/popUp/cashForm.vue";
import shippingOperationForm from "./components/popUp/shippingOperationForm.vue";

import kitchen from "./components/print/kitchen.vue";


import multiInvoices from "./components/multiInvoices.vue"

import alert from "./components/show/alert.vue";

export default {
  data() {
    return {
      item: {
        customer_id: 0,
        customer: {
          id: "",
          name: "",
          phone: "",
          address:""
        },
        edit: null,
        edit_text: "",
        invoiceItems: [],
        notes: "",
        subtotal: 0,
        tax: 0,
        discount: 0,
        service: 0,
        total: 0,
        cost: 0,
        earning: 0,
        paid: null,
        rest: 0,
        cash: '',
        totalWithShipping: 0,

        priceList_id: 0,

        marketer_id: 0,
        payment_method: "",
        totalDiscount: "",
        order_type: 0,

        printedCheck: false,
        awaitPay: false
      },
      shippingOperation: {
        shipping_address_id: 0,
        delivery_id: 0,
        delivery: {
          name: "",
        },
        address1: "",
        address2: "",
        city: "",
        floor: "",
        flat: "",
        mobile: "",
        mobile2: "",
        cost: "",
        city_id: 0
      },
      options: {},
      sectionitems: [],
      

      quantity: "",

      priceList_name: "",

      


      invoceId: 0,
      showInvoice: false,
      kitchenPrint: false,
      showCost: false,
      showEarn: false,

      selectedSecton: null,
      selectedTable: 0,

      payFormShow: false,
      casherTableShow: false,
      commentFormShow: false,
      productCommentFormShow: false,
      productOptionsFormShow: false,
      productSelectionFormShow: false,
      bookingFormShow: false,
      removeBookingFormShow: false,
      printersShow: false,
      cashFormShow: false,
      shippingOperationShow: false,

      productSelects: [],
      productOptionsId: 0,
      productOptionsDetailId: null,
      productOptionsQuantity: 1,

      moveFormShow: false,
      margeFormShow: false,
      moveTableId: "",

      commentPrint: false,

      runDetails: 0,

      comment: "",
      printer: "",

      printInvoice: false,
      printKitchen: false,
      printComment: false,

      kitchenData: "",
      kitchenInvoices: [],

      aletText: null,
      alertType: "",

      colsban: 3,

      selectedProduct: 0,


      splitFormShow: false,
      splitTableFormShow: false,

      items: [],
      filteredProducts: [],

      selectedPrenters: [],

      printersAllaw: false,

      addedName: [],
      
      selectedInvoice: 1,

      showMnue: false,

      refresh: 0
    };
  },
  methods: {
    calculateTotal() {
      this.item.invoiceItems.forEach((item) => {
        if (item.refrance_product_id) {
          var refrance = this.item.invoiceItems.find((el) => el.refrance_id == item.refrance_product_id);
          if (refrance) {
            item.quantity = refrance.quantity;
          } else {
            item.remove = true;
          }
        }
      });
      this.item.invoiceItems = this.item.invoiceItems.filter((el) => !el.remove);
      this.item.subTotal = 0;
      this.item.discount = 0;
      this.item.tax = 0;
      this.item.service = 0;
      this.item.cost = 0;
      this.item.totalWithShipping = 0;

      this.item.invoiceItems.forEach((invoiceItem) => {
        this.item.subTotal += invoiceItem.price > 0 ? invoiceItem.price * invoiceItem.quantity : 0;
        this.item.discount += invoiceItem.discount > 0 ? invoiceItem.discount * invoiceItem.quantity : 0;

        this.item.cost     += invoiceItem.cost > 0 ? invoiceItem.cost * invoiceItem.quantity : 0;
        invoiceItem.total   = ((invoiceItem.price - invoiceItem.discount) * invoiceItem.quantity).toFixed(1);
      });

      var discount = this.$database.discounts.find(el => el.id == this.options.discount_id);
      if (discount) {
        this.item.discount += (this.item.subTotal * this.item.discountRate) / 100;
      }
      if (this.item.totalDiscount > 0) {
        this.item.discount += (this.item.subTotal * this.item.totalDiscount) / 100;
      }
      var tax = this.$database.taxes.find(el => el.id == this.options.tax_id);
      if (tax && this.item.selectedTable != 0) {
        this.item.tax = ((this.item.subTotal - this.item.discount) * tax.rate) / 100;
      }
      if (this.options.service != "" && this.options.service > 0 && this.selectedTable != 0) {
        this.item.service = ((this.item.subTotal - this.item.discount) * this.options.service) / 100;
      }
      this.item.total =
        parseFloat(this.item.subTotal ? this.item.subTotal : 0) +
        parseFloat(this.item.edit ? this.item.edit : 0) +
        parseFloat(this.item.delivery ? this.item.delivery : 0) -
        parseFloat(this.item.discount ? this.item.discount : 0) +
        parseFloat(this.item.tax ? this.item.tax : 0) +
        parseFloat(this.item.service ? this.item.service : 0);

      this.item.totalWithShipping = parseFloat(this.item.total ? this.item.total : 0) + parseFloat(this.shippingOperation.cost ? this.shippingOperation.cost : 0);
      this.item.paid = parseFloat(this.item.total ? this.item.total : 0);

      this.earning =
        parseFloat(this.item.total ? this.item.total : 0) -
        parseFloat(this.item.cost ? this.item.cost : 0);

      this.rest =
        parseFloat(this.item.total ? this.item.total : 0) -
        parseFloat(this.item.paid ? this.item.paid : 0);

      this.item.subTotal          = parseFloat(this.item.subTotal ? this.item.subTotal : 0).toFixed(1);
      this.item.discount          = parseFloat(this.item.discount ? this.item.discount : 0).toFixed(1);
      this.item.tax               = parseFloat(this.item.tax ? this.item.tax : 0).toFixed(1);
      this.item.service           = parseFloat(this.item.service ? this.item.service : 0).toFixed(1);
      this.item.total             = parseFloat(this.item.total ? this.item.total : 0).toFixed(1);
      this.item.paid              = parseFloat(this.item.paid ? this.item.paid : 0).toFixed(1);
      this.item.totalWithShipping = parseFloat(this.item.totalWithShipping ? this.item.totalWithShipping : 0).toFixed(1);
      this.saveTable();
      this.saveInvoice();
    },
    calculateRest() {
      this.item.rest = this.item.total - this.item.paid;
    },
    deleteItem(id) {
      this.item.invoiceItems.splice(id, 1);
      this.calculateTotal();
    },
    changePriceList() {
      this.item.invoiceItems.forEach((item) => {
        var product = this.filteredProducts.find((el) => el.id == item.id);
        var price = product.price;
        if (this.item.priceList_id != 0) {
          var priceList  = this.$database.productPrices.find((el) => el.priceList_id == this.item.priceList_id && el.product_id == product.id);
          if (priceList) {price = priceList.price;}
        }
        item.price = price;
      });
      this.calculateTotal();
    },
    changeProductsPrice() {
      this.filteredProducts.forEach((item) => {
        var priceListPrice = this.$database.productPrices.find(el => el.product_id == item.id && el.priceList_id == this.item.priceList_id);
        if (priceListPrice) {
          item.showPrice = priceListPrice.price;
        } else {
          item.showPrice = item.price;
        }
        var productPrices = this.$database.productPrices.filter(el => el.product_id == item.id && el.detail_id != 0);
        item.productDetails = [];

        productPrices.forEach((productPrice) => {
          if (productPrice.price > 0) {
            var detail = this.$database.details.find(
              (el) => el.id == productPrice.detail_id
            );

            if (detail) {
              item.productDetails.push({
                name: detail.name,
                id: detail.id,
                price: productPrice.price,
              });
            }
          }
        });
      });
    },
    checkOut() {
      if (this.item.invoiceItems.length != 0) {
        this.aletText = this.$t('pointOfSales.show.TheInvoiceHasBeenSuccessfullyAdded');
        this.alertType = "success";

        if ((typeof this.payment_method === "undefined" ||this.payment_method == "")) {
          this.$database.safes.find(el => el.id == this.options.safe_id).balance = parseFloat(this.$database.safes.find(el => el.id == this.options.safe_id).balance) + parseFloat(this.item.paid);
          if (this.item.order_type == 1) {
            let cost = this.shippingOperation.cost ? this.shippingOperation.cost : 0
            this.$database.safes.find(el => el.id == this.options.safe_id).balance = parseFloat(this.$database.safes.find(el => el.id == this.options.safe_id).balance) + parseFloat(cost);
          }
          localStorage.database= JSON.stringify(this.$database)
        }
        
        if (this.selectedTable != 0) {
          var table = this.options.hall_tables[this.selectedTable];
          var table_name = table.name;
        }

        var date = this.$nowDate()
        var invoice = this.item;
        invoice['customer_id'] = !this.item.customer_id && !this.item.customer.name ? this.options.customer_id : this.item.customer_id
        invoice['date'] = date
        invoice['discount_rate'] = this.discountRate
        invoice['table_name'] = table_name
        invoice['table'] = this.selectedTable
        invoice['tax_rate'] = this.taxRate
        invoice['point_of_sale_id'] = this.$route.params.id
        invoice['session_number'] = this.options.session_number

        if (this.options.order_number != 0) {
          var sessionNumber = localStorage.getItem("sessionNumber") !== null ? localStorage.getItem("sessionNumber"): 0;
          var orderNumber = localStorage.getItem("orderNumber") !== null ? localStorage.getItem("orderNumber"): 0;
          orderNumber = parseInt(orderNumber) + 1;
          if (orderNumber > this.options.end_order_number || orderNumber < this.options.start_order_number || sessionNumber != this.options.session_number) {
            orderNumber = this.options.start_order_number;
          }
          invoice["order_number"] = orderNumber;
          localStorage.setItem("orderNumber", orderNumber);
          localStorage.setItem("sessionNumber", this.options.session_number);
        }

        invoice = this.$addToLocalDatabase(invoice, 'pointOfSalesInvoices');
        this.$savePosInvoice(invoice)
        if (this.item.order_type == 1) {
          var shippingOperation                = this.shippingOperation;
          shippingOperation.invoice_group      = this.options.shipping_operations_invoice_group_id
          shippingOperation.pickup_location_id = this.options.pickup_location_id
          shippingOperation.safe_id            = this.options.safe_id
          shippingOperation.client_type        = 0
          shippingOperation.customer_id        = this.item.customer_id
          shippingOperation.customer           = this.item.customer
          shippingOperation.date               = date
          shippingOperation.point_of_sale_id   = this.$route.params.id
          shippingOperation.session_number     = this.options.session_number
          shippingOperation.cod                = this.item.total
          shippingOperation.tracking_number    = Math.floor(Math.random() * 999999)
          shippingOperation.status             = 0
          shippingOperation.invoice            = {code: invoice.order_number, upload_key: invoice.upload_key} 
          shippingOperation.total              = parseFloat(this.item.total) + parseFloat(this.shippingOperation.cost ? this.shippingOperation.cost : 0)
          shippingOperation.refrance_invoice   = invoice.upload_key
          this.$addToLocalDatabase(shippingOperation, 'shippingOperations');
          invoice.shippingOperation            = shippingOperation
        }

        if (this.options.print_type != 0 && !this.item.awaitPay) {
          if (this.item.order_type != 1 || (this.item.order_type == 1 && this.options.print_delivery == 1)) {
            invoice.quotationItems = invoice.invoiceItems
            invoice.quotationItems.forEach(el => {el.product_name = el.name})
            invoice.subtotal = parseFloat(invoice.subTotal)
            this.$parent.printPointOfSale = invoice
          }
        }

        var myel = this;
        setTimeout(function () {
          if (myel.options.multi_print == 1) {
            var invoices = [];
            myel.options.printers.forEach((printer, index) => {
              var sections = printer.sections;
              var myCart = JSON.parse(JSON.stringify(invoice.invoiceItems));
              var products = [];
              sections.forEach((section) => {
                var myItems = myCart.filter((el) => el.section_id == section);
                const ids = myCart.map((el) => el.id);
                myItems.forEach((item) => {
                  var id = ids.indexOf(item.id);
                  if (item["printedQuantity" + index] != null) {
                    item.quantity = item.quantity - item["printedQuantity" + index];
                  }
                  myCart[id]["printedQuantity" + index] = myCart[id].quantity;
                });
                products = products.concat(myItems);
              });
              if (products.length > 0) {
                var cleanProducts = [];
                products.forEach((product) => {
                  if (product.quantity > 0) { cleanProducts.push(product);}
                });
                if (cleanProducts.length > 0) {
                  var innerInvoice = JSON.parse(JSON.stringify(invoice));
                  innerInvoice.invoiceItems = cleanProducts;
                  innerInvoice.date         = Date.parse(date) / 1000
                  innerInvoice.table_name   = table_name;

                  invoices.push({
                    invoice: innerInvoice,
                    printer: printer,
                    random: Math.random().toString(36).substr(2, 20),
                  });
                }
              }
            });
            myel.kitchenInvoices = invoices;
            myel.printToKitchen();
            //if (this.selectedTable != 0) { myel.openTable(0);}
          }
        }, 100);
       this.resetPointOfSale();
      }
      this.$updateDatabase(["pointOfSales"]);
    },
    preparePointOfSale() {
      var item = this.$database.pointOfSales.find((el) => el.id == this.$route.params.id);
      if (item) {
        this.options = item;
        this.$updatePosInvoice(this.options.id, this.options.session_number)
        this.options.sections = [];
        try { this.options.section_id = JSON.parse(this.options.section_id);} catch (e) {}
        if (Array.isArray(this.options.section_id)) {
          this.options.section_id.forEach((id) => {
            var section = this.$database.sections.find(el => el.id == id);
            if (section) {this.options.sections.push(section);}
            if (id == 0) {
              this.options.sections.push({
                id: 0,
                name: this.$t('pointOfSales.show.Uncategorized'),
              });
            }
          });
        }
        // add descount to pos
        if (this.options.discount_id) {
          var discount = this.$database.taxes.find(el => el.id == this.options.discount_id);
          if (discount) {this.discountRate = discount.rate;}
        }
        //add tax to pos
        if (this.options.tax_id) {
          var tax = this.$database.taxes.find(el => el.id == this.options.tax_id);
          if (tax) {this.taxRate = tax.rate;}
        }
        
        // add price list to pos
        this.item.priceList_id = this.options.priceList_id;

        //get history item
        if (this.options.hall_allow) {
          var data = this.$getTable(this.options.id, 0);
          if (data) {
            this.item = data.item;
          }
        }
        this.changeProductsPrice()
        this.payment_method = "";
      }
    },
    resetPointOfSale() {
      this.item = {
        customer_id: 0,
        customer: {
          id: "",
          name: "",
          phone: "",
          address:""
        },
        edit: null,
        edit_text: "",
        invoiceItems: [],
        delivery: null,
        delivery_id: 0,
        delivery_name: "",
        
        notes: "",

        subtotal: 0,
        tax: 0,
        discount: 0,
        service: 0,
        total: 0,
        cost: 0,
        earning: 0,
        paid: null,
        rest: 0,
        cash: '',
        totalWithShipping: 0,

        priceList_id: this.selectedTable == 0 ? this.options.priceList_id : this.options.hall_tables[this.selectedTable].priceList_id,

        marketer_id: 0,
        payment_method: "",
        totalDiscount: '',
        order_type: this.selectedTable ? 2 : 0,
        printedCheck: false,
        awaitPay: false
      };
      this.shippingOperation = {
        shipping_address_id: 0,
        delivery_id: 0,
        delivery: {
          name: "",
        },
        address1: "",
        address2: "",
        city: "",
        floor: "",
        flat: "",
        mobile: "",
        mobile2: "",
        cod: "",
        cost: "",
        city_id: 0
      }
      this.calculateTotal();
    },
    multiPrint() {
      var checkedPrenters = this.options.printers.filter(el => el.alert == 1)
      var myCheck = 0 
      if(checkedPrenters.length == 0) {
        myCheck = 1
      } else if (checkedPrenters.length != 0 && this.printersAllaw) {
        myCheck = 1
      }
      if (myCheck) {
        this.aletText = this.$t('pointOfSales.show.TheProcessingOrderWasSuccessfullyPrinted');
        this.alertType = "success";
        var invoices = [];

        let date = this.$nowDate()
        
        var table = this.options.hall_tables[this.selectedTable];
        var table_name = table.name;
       
        if (this.options.multi_print == 1) {
          var myel = this;
          this.options.printers.forEach((printer, index) => {
            var sections = printer.sections;
            var myCart = JSON.parse(JSON.stringify(this.item.invoiceItems));
            var products = [];
            sections.forEach((section) => {
              var myItems = myCart.filter((el) => el.section_id == section);
              const ids = this.item.invoiceItems.map((el) => el.id);
              myItems.forEach((item) => {
                var id = ids.indexOf(item.id);
                if (item["printedQuantity" + index] != null) {
                  item.quantity = item.quantity - item["printedQuantity" + index];
                }
                this.item.invoiceItems[id]["printedQuantity" + index] = this.item.invoiceItems[id].quantity;
              });
              products = products.concat(myItems);
            });
            if (products.length > 0) {
              var cleanProducts = [];
              products.forEach((product) => {
                if (product.quantity > 0) {
                  cleanProducts.push(product);
                }
              });
              if (cleanProducts.length > 0) {
                var innerInvoice = JSON.parse(JSON.stringify(this.item));
                innerInvoice.date         = Date.parse(date) / 1000;
                innerInvoice.invoiceItems = cleanProducts;
                innerInvoice.table_name   = table_name;
                if(this.printersAllaw) {
                  var check = this.selectedPrenters.indexOf(index)

                  if (check != -1) {
                    invoices.push({
                      invoice: innerInvoice,
                      printer: printer,
                      random: Math.random().toString(36).substr(2, 20),
                    });
                  }
                } else {
                  invoices.push({
                    invoice: innerInvoice,
                    printer: printer,
                    random: Math.random().toString(36).substr(2, 20),
                  });
                }
              }
            }
          });
        }

        this.kitchenInvoices = invoices;
        this.printersAllaw = false
        this.selectedPrenters = []
        this.printToKitchen();
        if (!this.options.delete_after_print) {
            this.item.printedCheck = true;
            this.item.invoiceItems.forEach((item) => {item.printedCheck = true;});
        }
        this.saveTable();
        this.openTable(0);
      } else {
        this.selectedPrenters = []
        this.printersShow = true;
      }
    },
    showPayment() {
      this.payFormShow = true;
    },
    showTable() {
      this.casherTableShow = true;
    },
    showComment() {
      this.commentFormShow = true;
    },
    showProductComment(id) {
      this.selectedProduct = id;
      this.productCommentFormShow = true;
    },
    showProductOptions() {
      this.productOptionsFormShow = true;
    },
    showSplitForm() {
      this.splitFormShow = true;
    },
    showCash() {
      this.cashFormShow = true;
    },
    printToKitchen() {
      this.kitchenInvoices.forEach((kitchenInvoice) => {
        var myel = this;
          if (this.options.local_server == 0) {
            if (typeof ipcRenderer !== "undefined") {
              setTimeout(function () {
                var html = document.getElementById("printKitchen" + kitchenInvoice.random).innerHTML;
                var css =
                  '<meta charset="utf-8" /><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet"><style>' +
                  myel.$print +
                  myel.$option.invoice_css +
                  "</style>";
                var content = "<head>" + css + "</head><body>" + html + "</body>";
                var printDetails = {
                  options: {
                    copies: 1,
                    printerName: kitchenInvoice.printer.name,
                  },
                  data: content,
                };
                for (let i = 0; i < kitchenInvoice.printer.copies; i++) {
                  ipcRenderer.send("print", JSON.stringify(printDetails));
                }
              }, 20);
            } else {
              setTimeout(function () {
                var html = document.getElementById(
                  "printKitchen" + kitchenInvoice.random
                ).innerHTML;
                var css =
                  '<meta charset="utf-8" /><style>' +
                  myel.$print +
                  myel.$option.invoice_css +
                  "</style>";
                var content = "<head>" + css + "</head><body>" + html + "</body>";
                var iframe = document.createElement("iframe");
                var html = content;
                document.body.appendChild(iframe);
                iframe.contentWindow.document.open();
                iframe.classList.add("printIframe");
                iframe.contentWindow.document.write(html);
                iframe.contentWindow.document.close();

                iframe.onload = function () {
                  iframe.focus();
                  for (let i = 0; i < kitchenInvoice.printer.copies; i++) {
                    iframe.contentWindow.print();
                  }
                  iframe.remove();
                };
              }, 20);
            }
          } else {
            setTimeout(function () {
              var html = document.getElementById(
                "printKitchen" + kitchenInvoice.random
              ).innerHTML;
              var css =
                '<meta charset="utf-8" /><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet"><style>' +
                myel.$print +
                myel.$option.invoice_css +
                "</style>";
              var content = "<head>" + css + "</head><body>" + html + "</body>";
              for (let i = 0; i < kitchenInvoice.printer.copies; i++) {
                axios.post(myel.$linkGnirator("/sendPrinter"), { printer_name: kitchenInvoice.printer.name, data: content })
              }
            }, 20);
          }
      });
    },
    openTable(id) {
      if (!this.$tables[this.options.id][id].book) {
        this.saveTable()
        var data = this.$getTable(this.options.id, id);
        this.selectedTable = id
        this.item = data.item;
        this.addedName = data.addedName
        this.calculateTotal();
        this.selectedSecton = this.options.sections ? this.options.sections[0].id: null;
        this.sectionItems = this.filteredProducts.filter((el) => el.section_id == this.selectedSecton);
        this.changeProductsPrice()
        this.casherTableShow = false;
      } else {
        this.showRemoveBookingForm(id)
      }      
    },
    printCheck() {
      if (this.item.invoiceItems.length != 0 ) {
        this.aletText = "تم طباعه الفاتورة بنجاح";
        this.alertType = "success";
        var date = this.$nowDate()

        if (this.selectedTable != 0) {
          var table = this.options.hall_tables[this.selectedTable];
          var table_name = table.name;
        }

        var invoice = this.item;
        invoice['customer_id'] = !this.item.customer_id && !this.item.customer.name ? this.options.customer_id : this.item.customer_id
        invoice['date'] = Date.parse(date) / 1000
        invoice['table_name'] = table_name
        invoice['without_number'] = true
        invoice['discount_rate'] = this.discountRate
        invoice['tax_rate'] = this.taxRate
        invoice['point_of_sale_id'] = this.$route.params.id


        
        if (!this.options.delete_after_print) {
            this.item.printedCheck = true;
            this.item.awaitPay = true;
            this.item.invoiceItems.forEach((item) => {item.printedCheck = true;});
        }
        if (this.options.print_type != 0) {
          invoice.quotationItems = invoice.invoiceItems
          invoice.quotationItems.forEach(el => {el.product_name = el.name})
          invoice.subtotal = parseFloat(invoice.subTotal)
          this.$parent.printPointOfSale = invoice
        }
      }
      this.saveTable();
    },
    saveTable() {
      if (this.options.hall_allow) {
        this.$saveTable(this.item, this.options.id, this.selectedTable)
      }
    },
    saveInvoice() {
      if (this.selectedTable == 0 && this.options.multi_invoice) {
        var invoice = this.$localDatabase.multiInvoice.find(el => el.id == this.selectedInvoice)
        invoice.item = this.item
        invoice.shippingOperation = this.shippingOperation
      }
    },
    updateQuantities() {
      this.filteredProducts = [];
      var items = JSON.parse(JSON.stringify(this.$database.products));
      items.forEach((item) => {
        if (item.track_quantity == 0) {
          this.filteredProducts.push(item);
        } else {
          var productQuantity = this.$database.productQuantities.find(
            (el) =>
              el.product_id == item.id && el.store_id == this.options.store_id
          );
          if (productQuantity) {
            if (productQuantity.quantity > 0) {
              item.max_quantity = productQuantity.quantity;
              this.filteredProducts.push(item);
            }
          }
        }
      });
    },
    openShipping() {
      if (this.shippingOperation.city_id == 0 && this.options.city_id != 0) {
        this.shippingOperation.cost = this.$database.cities.find(el => el.id == this.options.city_id) ?  this.$database.cities.find(el => el.id == this.options.city_id).price : "",
        this.shippingOperation.city_id = this.options.city_id
      }
      this.shippingOperationShow = true;
    },
    toggleMnue() {
      this.showMnue = !this.showMnue
    },
    removeMnue () {
      this.showMnue = false
    },
    sortItems (name, type) {
      let params = {
        orderType: '',
        orderBy:''
      }
      params.orderBy = name
      params.orderType = type
      let section = this.selectedSecton
      this.selectedSecton = null
      this.filteredProducts = this.filteredProducts.sort(this.$dynamicSort(params))
      this.sectionItems = this.filteredProducts.filter((el) => el.section_id == section);
      this.changeProductsPrice()
      this.selectedSecton = section
      this.removeMnue()
    },
    refreshPos () {
      this.$updateDatabase([
        "pointOfSales",
        "customers",
        "products",
        "sections",
        "priceLists",
        "details",
        "productPrices",
        "productOption",
        "productOptionItems",
        "cities",
        "safes"
      ]);
    }
  },

  mounted() {
    this.options = this.$database.pointOfSales.find(el => el.id == this.$route.params.id)
    if (this.options.hall_allow == 1) {
      this.$intPosTables(this.$route.params.id);
    }
    this.items = this.$database.products;
    this.$updateDatabase([
      "pointOfSales",
      "customers",
      "products",
      "sections",
      "priceLists",
      "details",
      "productPrices",
      "productOption",
      "productOptionItems",
      "cities",
      "safes",
      "shippingAddresses"
    ]);
    this.$parent.showSdebar = false;
   
    this.preparePointOfSale();
    if (this.options.show_sections) {
      this.selectedSecton = this.options.sections ? this.options.sections[0].id: null;
      this.sectionItems = this.filteredProducts.filter((el) => el.section_id == this.selectedSecton);
      this.changeProductsPrice()
    }
    var cash = this;
    this.payment_method = "";
    window.addEventListener("keydown", function (e) {
      if (e.key == "F1") {
        e.preventDefault();
        cash.showEarn = !cash.showEarn;
      } else if (e.key == "F2") {
        e.preventDefault();
        cash.showCost = !cash.showCost;
      } else if (e.key == "F3") {
        e.preventDefault();
        cash.checkOut();
      } else if (e.key == "F4") {
        e.preventDefault();
        cash.multiPrint();
      } else {
        var inputs = ["input", "select", "button", "textarea"];
        if (
          inputs.indexOf(document.activeElement.tagName.toLowerCase()) == -1
        ) {
          var targ = document.getElementById("searchInput");
          if (targ) {
            targ.focus();
          }
        }
      }
    });
    this.updateQuantities();
  },

  components: {
    showButtons,
    productsTable,
    kitchen,
    itemSearchInput,
    casherProduct,
    casherSection,
    casherTable,
    sidebar,
    payForm,
    casherTables,
    commentForm,
    productCommentForm,
    moveForm,
    margeForm,
    alert,
    productOptions,
    productSelection,
    splitForm,
    splitTableForm,
    cashForm,
    bookingForm,
    removeBookingForm,
    shippingOperationForm,
    printersForm,
    multiInvoices,
  },
  watch: {
    "$database.pointOfSales": function () {
      this.options.session_number = this.$database.pointOfSales.find(el => el.id == this.$route.params.id).session_number
    },
    'item.priceList_id': function (val) {
      if (val != 0 && val != null && val != "") {
        var priceList = this.$database.priceLists.find(
          (el) => el.id == val
        );
        this.priceList_name = priceList.name;
      }
      this.changePriceList()
      this.changeProductsPrice()
    },
    aletText: function () {
      setTimeout(() => {
        this.aletText = null;
        this.alertType = null;
      }, 4000);
    },
    "options.store_id": function () {
      this.updateQuantities();
    },
    "$database": function () {
      this.updateQuantities();
      if (this.options.show_sections) {
        this.sectionItems = this.filteredProducts.filter((el) => el.section_id == this.selectedSecton);
        this.changeProductsPrice()
      }
    },
    "item.totalDiscount": function () {
      if (this.options.max_discount > 0 && this.item.totalDiscount > this.options.max_discount){
      this.item.totalDiscount = this.options.max_discount
      } else if (this.item.totalDiscount > 100) {
        this.item.totalDiscount = 100
      }
    },
    'item.edit': function (val) {
      if (val < 0) {
        this.item.edit = 0;
      }
    }
  },
};
</script>
