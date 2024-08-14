<template>
  <div class="modal fade show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="sm-stop-edit" v-if="loading"></div>
        <div class="modal-card card">
          <div class="card-header">
            <h4 class="card-header-title">{{$t('components.pointOfSalesPopUp.splitBill')}}</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <customerSearchIPopUpinput class="col-12" />
              <phoneInputPopUpInput class="col-12" />
            </div>
            <div
              class="table-responsive cash-sm-table"
              v-if="$parent.options.show_products"
            >
              <table
                class="
                  table table-sm table-nowrap table-hover
                  pos-table pos-small-table
                "
              >
                <thead class="pos-table-head">
                  <tr>
                    <th>
                      <strong>{{$t('components.pointOfSalesPopUp.theProduct')}}</strong>
                    </th>
                    <th>{{$t('components.pointOfSalesPopUp.quantity')}}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody class="list">
                  <template v-for="(item, index) in item.invoiceItems">
                    <tr :key="index" v-if="!item.delete">
                      <td>
                        {{ item.name }}
                        {{ item.detailName ? "(" + item.detailName + ")" : "" }}
                      </td>
                      <td
                        :class="
                          $parent.options.change_price ? 'quantity-input' : ''
                        "
                      >
                        <div class="sm-quantity-btn">
                          <input
                            type="number"
                            v-model="item.quantity"
                            class="form-control"
                            min="1"
                          />
                        </div>
                      </td>
                      <td>
                        <button
                          class="btn btn-outline-danger min-tab-del-btn p-0"
                          @click="deleteItem(index)"
                          v-if="$parent.item.invoiceItems.length > 0"
                        >
                          <i class="far fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-footer card-footer-boxed">
            <div class="row align-items-center justify-content-between">
              <div class="col-auto"></div>
              <div class="col-auto">
                <!-- Link -->
                <button class="btn btn-outline-danger" @click="close()">
                  <i class="far fa-times"></i>
                  {{$t('components.pointOfSalesPopUp.Close')}}
                </button>
                <button class="btn btn-dark" v-if="!loading" @click="moveOrder()">
                  <i class="far fa-save"></i>
                  {{$t('components.pointOfSalesPopUp.construction')}}
                </button>
                <button class="btn btn-dark" v-if="loading">
                  {{$t('components.pointOfSalesPopUp.Download')}} <span class="loading-s1 sm-j">.</span
                  ><span class="loading-s2 sm-j">.</span
                  ><span class="loading-s3 sm-j">.</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import customerSearchIPopUpinput from "../inputs/customerSearchIPopUpinput.vue";
import phoneInputPopUpInput from "../inputs/phoneInputPopUpInput.vue";

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

        priceList_id: this.$parent.selectedTable == 0 ? this.$parent.options.priceList_id : this.$parent.options.hall_tables[this.$parent.selectedTable].priceList_id,
        order_type: this.$parent.selectedTable ? 2 : 0,

        marketer_id: 0,
        payment_method: "",
        totalDiscount: ''
      },
      shippingOperation: {},

      showError: false,
      loading: false,
    };
  },
  methods: {
    calculateTotal () {
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

      this.item.invoiceItems.forEach((invoiceItem) => {
        this.item.subTotal += invoiceItem.price > 0 ? invoiceItem.price * invoiceItem.quantity : 0;
        this.item.discount += invoiceItem.discount > 0 ? invoiceItem.discount * invoiceItem.quantity : 0;

        this.item.cost += invoiceItem.cost > 0 ? invoiceItem.cost * invoiceItem.quantity : 0;
        invoiceItem.total = ((invoiceItem.price - invoiceItem.discount) * invoiceItem.quantity).toFixed(1);
      });

      var discount = this.$database.discounts.find(el => el.id == this.$parent.options.discount_id);
      if (discount) {
        this.item.discount += (this.item.subTotal * this.item.discountRate) / 100;
      }
      if (this.item.totalDiscount > 0) {
        this.item.discount += (this.item.subTotal * this.item.totalDiscount) / 100;
      }
      var tax = this.$database.taxes.find(el => el.id == this.$parent.options.tax_id);
      if (tax && this.item.selectedTable != 0) {
        this.item.tax = ((this.item.subTotal - this.item.discount) * tax.rate) / 100;
      }
      if (this.$parent.options.service != "" && this.$parent.options.service > 0 && this.selectedTable != 0) {
        this.item.service = ((this.item.subTotal - this.item.discount) * this.$parent.options.service) / 100;
      }
      this.item.total =
        parseFloat(this.item.subTotal ? this.item.subTotal : 0) +
        parseFloat(this.item.edit ? this.item.edit : 0) +
        parseFloat(this.item.delivery ? this.item.delivery : 0) -
        parseFloat(this.item.discount ? this.item.discount : 0) +
        parseFloat(this.item.tax ? this.item.tax : 0) +
        parseFloat(this.item.service ? this.item.service : 0);

      this.item.paid = parseFloat(this.item.total ? this.item.total : 0);

      this.earning =
        parseFloat(this.item.total ? this.item.total : 0) -
        parseFloat(this.item.cost ? this.item.cost : 0);

      this.rest =
        parseFloat(this.item.total ? this.item.total : 0) -
        parseFloat(this.item.paid ? this.item.paid : 0);

      this.item.subTotal = parseFloat(this.item.subTotal ? this.item.subTotal : 0).toFixed(1);
      this.item.discount = parseFloat(this.item.discount ? this.item.discount : 0).toFixed(1);
      this.item.tax      = parseFloat(this.item.tax ? this.item.tax : 0).toFixed(1);
      this.item.service  = parseFloat(this.item.service ? this.item.service : 0).toFixed(1);
      this.item.total    = parseFloat(this.item.total ? this.item.total : 0).toFixed(1);
      this.item.paid     = parseFloat(this.item.paid ? this.item.paid : 0).toFixed(1);
    },
    moveOrder () {
      var error = 0
      if (error == 0) {
        if (this.item.invoiceItems.length != 0) {
          this.$parent.aletText = this.$t('components.pointOfSalesPopUp.TheRequestHasBeenSuccessfullyDivided');
          this.$parent.alertType = "success";

          this.calculateTotal()
          
          if ((typeof this.payment_method === "undefined" ||this.payment_method == "")) {
            this.$database.safes.find(el => el.id == this.$parent.options.safe_id).balance = parseFloat(this.$database.safes.find(el => el.id == this.$parent.options.safe_id).balance) + parseFloat(this.item.paid);
            localStorage.database = JSON.stringify(this.$database)
          }
         
          if (this.$parent.selectedTable == 0) {
            var orderType = "استلام";
          } else {
            var table = this.$tables[$parent.options.id][this.$parent.selectedTable];
            var orderType = table.name;
          }
          var date = this.$nowDate()
          var invoice = this.item
          invoice['customer_id'] = !this.item.customer_id && !this.item.customer.name ? this.$parent.options.customer_id : this.item.customer_id
          invoice['date'] = date
          invoice['discount_rate'] = this.discountRate
          invoice['table'] = this.selectedTable
          invoice['orderType'] = orderType
          invoice['tax_rate'] = this.taxRate
          invoice['totalDiscount'] = this.totalDiscount
          invoice['point_of_sale_id'] = this.$route.params.id
          
        
          if (this.$parent.options.order_number != 0) {
            var orderNumber = localStorage.getItem("orderNumber") !== null ? localStorage.getItem("orderNumber") : 0;
            orderNumber = orderNumber - 0 + 1;
            if (
              orderNumber > this.$parent.options.end_order_number ||
              orderNumber < this.$parent.options.start_order_number
            ) {
              orderNumber = this.$parent.options.start_order_number;
            }
            invoice["order_number"] = orderNumber;
            localStorage.setItem("orderNumber", orderNumber);
          }
          if (this.$parent.options.print_type != 0 && !this.$parent.printedCheck) {
            if (this.$parent.item.order_type != 1 || (this.$parent.item.order_type == 1 && this.$parent.options.print_delivery == 1)) {
              invoice.quotationItems = invoice.invoiceItems
              invoice.quotationItems.forEach(el => {el.product_name = el.name})
              invoice.subtotal = parseFloat(invoice.subTotal)
              this.$parent.$parent.printPointOfSale = invoice
            }
          }

          var myel = this;
          setTimeout(function () {
            if (myel.$parent.options.multi_print == 1) {
              var invoices = [];
              myel.$parent.options.printers.forEach((printer, index) => {
                var sections = printer.sections;
                var myCart = JSON.parse(JSON.stringify(invoice.invoiceItems));
                var products = [];
                sections.forEach((section) => {
                  var myItems = myCart.filter((el) => el.section_id == section);
                  const ids = myCart.map((el) => el.id);
                  myItems.forEach((item) => {
                    var id = ids.indexOf(item.id);
                    if (item["printedQuantity" + index] != null) {
                      item.quantity =
                        item.quantity - item["printedQuantity" + index];
                    }
                    myCart[id]["printedQuantity" + index] = myCart[id].quantity;
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
                    var innerInvoice = JSON.parse(JSON.stringify(invoice));
                    innerInvoice.invoiceItems = cleanProducts;

                    invoices.push({
                      invoice: innerInvoice,
                      printer: printer,
                      random: Math.random().toString(36).substr(2, 20),
                    });
                  }
                }
              });
              myel.$parent.kitchenInvoices = invoices;
              myel.$parent.printToKitchen();
              if (this.selectedTable != 0) {
                myel.$parent.openTable(0);
              }
            }
          }, 100);
          var invoice = this.$addToLocalDatabase(invoice, 'pointOfSalesInvoices');
          this.$savePosInvoice(invoice)
        }
        this.item.invoiceItems.forEach(item => {
            var cartOldItem = this.$parent.item.invoiceItems[item.index]
            cartOldItem.quantity = cartOldItem.quantity - item.quantity
        })
        this.$parent.item.invoiceItems = this.$parent.item.invoiceItems.filter(el => el.quantity != 0)
        this.$parent.calculateTotal()
        this.close()
      }
    },
    close() {
      this.$parent.splitFormShow = false;
    },
    deleteItem(id) {
      this.item.invoiceItems.splice(id, 1);
    },
  },
  mounted() {
    this.item.invoiceItems = JSON.parse(JSON.stringify(this.$parent.item.invoiceItems))
    this.item.invoiceItems.forEach((item, index) => {item.index = index; item.error = false})
  },
  components: {
    customerSearchIPopUpinput,
    phoneInputPopUpInput,
  },
};
</script>
