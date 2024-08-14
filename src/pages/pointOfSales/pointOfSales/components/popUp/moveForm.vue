<template>
  <div class="modal fade show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="sm-stop-edit" v-if="loading"></div>
        <div class="modal-card card">
          <div class="card-header">
            <h4 class="card-header-title">{{$t('components.pointOfSalesPopUp.transferRequest')}}</h4>
            <button type="button" class="close" @click="close()">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="card-body">

            <div class="form-group row">
              <label class="col-sm-12">{{$t('components.pointOfSalesPopUp.fromTable')}}</label>
              <div class="col-md-12">
                  <input
                  class="form-control"
                  v-model="fromTable"
                  disabled
                  />
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-12">{{$t('components.pointOfSalesPopUp.toATable')}}</label>
              <div class="col-md-12">
                  <select
                  class="form-control"
                  v-model="toTable"
                  :class="{ 'is-invalid' : errors.toTable}"
                  >
                  <option value="">{{$t('components.pointOfSalesPopUp.ChooseATable')}}</option>
                  <template v-for="(table, index) in $tables[$parent.options.id]">
                    <option  :key="index" :value="index" v-if="index != 0 && index != $parent.moveTableId">{{table.name}}</option>
                  </template>
                  </select>
              </div>
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
              <template v-for="(item, index) in items">
                <tr  :key="index" v-if="!item.delete">
                  <td>
                    {{ item.name }}
                    {{ item.detailName ? "(" + item.detailName + ")" : "" }}
                  </td>
                  <td
                    :class="$parent.options.change_price ? 'quantity-input' : ''"
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
                      v-if="items.length > 0"
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
                <button
                  @click="moveOrder()"
                  class="btn btn-dark"
                  v-if="!loading"
                >
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
export default {
  data() {
    return {
      fromTable: "",
      toTable: "",
      items: [],

      errors: {
        toTable: false
      },

      showError: false,
      loading: false,

    }
  },
  methods:{
    moveOrder () {
      var error = 0
      if (typeof this.toTable === 'undefined' || this.toTable == '') {
        error = 1
        this.errors.toTable = true
      }
      var data = this.$getTable(this.$parent.options.id, this.$parent.moveTableId);
      this.items.forEach(item => {
          if (data.item.invoiceItems[item.index].quantity < item.quantity) {
              error = 1
              item.error = true
          } else {
              item.error = false
          }
      });
      if (error == 0) {
        this.$parent.aletText = this.$t('components.pointOfSalesPopUp.TheRequestHasBeenSuccessfullyTransferred');
        this.$parent.alertType = "success";

          this.items.forEach(item => {
              var cartOldItem = this.$tables[this.$parent.options.id][this.$parent.moveTableId].item.invoiceItems[item.index]
              var cartNewItem = this.$tables[this.$parent.options.id][this.toTable].item.invoiceItems.find(el => el.id == item.id &&  el.detail_id == item.detail_id)

              cartOldItem.quantity = cartOldItem.quantity - item.quantity
              
              if(!cartNewItem) {
                  this.$tables[this.$parent.options.id][this.toTable].item.invoiceItems.push(item)
                  var cartNewItem = this.$tables[this.$parent.options.id][this.toTable].item.invoiceItems.find(el => el.id == item.id &&  el.detail_id == item.detail_id)
              } else {
                  cartNewItem.quantity = (cartNewItem.quantity - 0)  + (item.quantity - 0)
              }
              if (this.$parent.options.multi_print == 1) {
                this.$parent.options.printers.forEach((printer, index) => {
                    if (cartOldItem['printedQuantity' + index] != null) {
                      if (cartOldItem['printedQuantity' + index] >= item.quantity) {
                        if (typeof cartNewItem['printedQuantity' + index] === "undefined" || cartNewItem['printedQuantity' + index] == null) {cartNewItem['printedQuantity' + index] = 0}
                        cartNewItem['printedQuantity' + index] = item['printedQuantity' + index] + item.quantity
                        cartOldItem['printedQuantity' + index] = cartOldItem['printedQuantity' + index]  - item.quantity
                      } else {
                        cartNewItem['printedQuantity' + index] = cartOldItem['printedQuantity' + index]
                        cartOldItem['printedQuantity' + index] = 0
                      }
                    }
                })
              } 
          })

      
        
        this.$tables[this.$parent.options.id][this.$parent.moveTableId].item.invoiceItems = this.$tables[this.$parent.options.id][this.$parent.moveTableId].item.invoiceItems.filter(el => el.quantity > 0)
        
        this.$parent.casherTableShow = true;

        var data = this.$getTable(this.$parent.options.id, this.$parent.selectedTable)
         
      if (data) {
        this.$parent.$parent.item = data.item;
        this.$parent.$parent.addedName = data.addedName;
        this.$parent.calculateTotal();
      }
      this.$parent.calculateTotal()

        this.close()
      }
    },
    close() {
      this.$parent.moveFormShow = false
      this.$parent.casherTableShow = true;
    },
    deleteItem (id) {
        this.items.splice(id, 1)
    }
  },
  mounted() {
    var data = this.$getTable(this.$parent.options.id, this.$parent.moveTableId);
    this.fromTable = this.$tables[this.$parent.options.id][this.$parent.moveTableId].name
    this.items = JSON.parse(JSON.stringify(data.item.invoiceItems))
    this.items.forEach((item, index) => {item.index = index; item.error = false})
  },
};
</script>