<template>
  <div class="d-flex">
    <div class="pos-multi-invoice-container" v-for="(invoice, index) in invoices" :key="index">
      <div class="btn pos-multi-invoice-btn" :class="$parent.selectedInvoice == invoice.id? 'btn-primary' : 'btn-outline-primary'" @click="openInvoice(invoice.id)">{{invoice.name}} </div>
       <button class="btn btn-danger pos-multi-invoice-close" v-if="index != 0 && $parent.selectedInvoice != invoice.id" @click="colseInvoice(invoice.id)">X</button>
    </div>
    <div class="btn btn-success pos-multi-invoice-btn" @click="addInvoice">+</div>
  </div>
</template>
<script>


export default {
  data() {
    return {
      invoices: []
    };
  },
  methods: {
    openInvoice (id) {
        this.$parent.saveInvoice()
        this.$parent.selectedInvoice = id
        var data = this.$localDatabase.multiInvoice.find(el => el.id == id)
        this.$parent.item = data.item;

        this.$parent.calculateTotal();
    },
    addInvoice () {
      var name = this.$localDatabase.multiInvoice[this.$localDatabase.multiInvoice.length - 1] ? this.$localDatabase.multiInvoice[this.$localDatabase.multiInvoice.length - 1].name + 1 : 1
      var id = this.$localDatabase.multiInvoice[this.$localDatabase.multiInvoice.length - 1] ? this.$localDatabase.multiInvoice[this.$localDatabase.multiInvoice.length - 1].id + 1 : 1
      this.$localDatabase.multiInvoice.push({
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

          priceList_id: 0,

          marketer_id: 0,
          payment_method: "",
          totalDiscount: "",
          order_type: 0,

          printedCheck: false,
          awaitPay: false
        },
        name: name,
        id : id
      });
      this.invoices = this.$localDatabase.multiInvoice
      localStorage.localDatabase = JSON.stringify(this.$localDatabase);
    },
    colseInvoice (id) {
      var index = this.$localDatabase.multiInvoice.findIndex(el => el.id == id)
      this.$localDatabase.multiInvoice.splice(index, 1)
      this.invoices = this.$localDatabase.multiInvoice
      localStorage.localDatabase = JSON.stringify(this.$localDatabase);
    }
  },
  mounted() {
    this.invoices = this.$localDatabase.multiInvoice
    if (this.$localDatabase.multiInvoice.length < 1) {
      this.addInvoice()
    }
  },
  watch: {

  }
};
</script>

