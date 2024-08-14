<template>

  <div class="row pt-4 quotation-item mb-3 pb-3">
    <div class="col-xl-6">
      <label class="d-xl-none"> {{$t('partnersSettlements.form.partnerName')}}</label>
      <div class="search-container" v-click-outside="removeItemList">
        <div :class="item.partner_id != 0 ? 'add-input' : ''">
          <input type="text"
                 class="form-control w-100"
                 :class="{ 'is-invalid' : item.partnerNameError}"
                 autocomplete="off"
                 :placeholder="$t('partnersSettlements.form.partnerName')"
                 v-model="item.partner_name"
                 @change="updateItem()"
                 @keydown="selectPartner"
                 @keyup="searchItem"
                 @focus="searchItem"
                 :disabled="item.partner_id != 0">
          <span class="btn btn-danger" v-if="item.partner_id != 0 " @click="removeItem"><i class="fas fa-times"></i></span>
        </div>
        <ul class="list-unstyled search-selects" v-if="searchPartners.length > 0 && showItemsList">
          <li v-for="partner in searchPartners" :key="partner.id" @click="changePartner(partner)" :class="{'focusd': partner.focused}" :title="partner.description">
          {{partner.name}} 
          </li>
        </ul>
      </div>
    </div>
    <div class="col-xl-3">
      <label class="d-xl-none"> {{$t('partnersSettlements.form.theAmount')}} </label>
      <div class="add-input table-add-input">
        <input type="number"
                class="form-control w-100"
                :class="{ 'is-invalid' : item.priceError}"
                placeholder="0"
                v-model="item.cost"
                @change="updateItem()"
                :disabled="$user.admin || $user.role.invoices_edit_partner ? false : true">
        <span>{{$parent.$option.currency}}</span>
      </div>
    </div>
    <div class="col-xl-2"><label class="d-xl-none pl-3">{{$t('partnersSettlements.form.theRatio')}} : </label>{{item.percent.toFixed(1)}} %</div>
    <div class="col-xl-1">
        <button class="btn btn-danger" @click="deleteItem()" :disabled="$parent.$parent.item.quotationItems.length <= 1">
            <i class="far fa-trash"></i>
        </button>
      </div>
    </div>

</template>
<script>

  export default {
    data() {
      return {
        searchPartners: {},
        noSearch: false,
        showItemsList: false,
        items: {}
      }
    },
    methods: {
      searchItem() {
        this.showItemsList = true
        var search = this.item.partner_name
        var editsearch = new RegExp(search, 'i')
        var partners = this.$database.partners.sort(this.$dynamicSort({orderBy: 'name', orderType:'desc'})).filter(el => editsearch.test(el.name)).slice(0, 20)
        if (typeof partners != 'undefined') {
          this.searchPartners = partners
        } else {
          this.searchPartners = []
        }
      },
      updateItem() {

        this.$parent.$parent.changePrice()
      },
      changePartner(Partner) {
        this.item.partner_id = Partner.id
        this.item.maxQuantity = Partner.quantity
        this.item.partner_name = Partner.name
        this.item.description = Partner.description
        this.item.unit_id = Partner.unit_id
        this.item.quantity = 1
        this.item.cost = 0
        this.searchPartners = {}
        this.noSearch = true

        this.updateItem()
        this.removeItemList()
      },
      blurSearch() {
        setTimeout(() => {
          this.searchPartners = {}
        }, 200)
      },
      deleteItem() {
        this.$parent.$parent.item.quotationItems.splice(this.$parent.$parent.item.quotationItems.indexOf(this.item), 1)
        this.$parent.$parent.changePrice()
      },
      selectPartner(e) {
        if (
          (e.key == 'ArrowDown' && this.searchPartners.length != 0) ||
          (e.key == 'ArrowUp' && this.searchPartners.length != 0)
        ) {
          var partner = this.searchPartners.find(el => el.focused == true)
          var selected = this.searchPartners.indexOf(partner)
          var length = this.searchPartners.length
          if (selected > -1) {
            this.$set(this.searchPartners[selected], 'focused', false)
          }
          if (e.key == 'ArrowDown') {
            if (selected < length - 1) {
              this.$set(this.searchPartners[selected + 1], 'focused', true)
            } else {
              this.$set(this.searchPartners[0], 'focused', true)
            }
          } else if (e.key == 'ArrowUp') {
            if (selected > 0) {
              this.$set(this.searchPartners[selected - 1], 'focused', true)
            } else {
              this.$set(this.searchPartners[length - 1], 'focused', true)
            }
          }
        } else if (e.key == 'Enter') {
          var item = this.$parent.filteredItems.find(el => el.barcode == this.item.partner_name)
          if (item) {
            this.changePartner(item)
          } else {
            var epartner = this.searchPartners.find(el => el.focused == true)
            var eselected = this.searchPartners.indexOf(epartner)
            if (eselected != -1) {
              this.changePartner(epartner)
            }
          }
        }
      },
      removeItemList() {
        this.showItemsList = false
      },
      removeItem () {
        this.item.partner_id = ''
        this.item.partner_name = ''
        this.item.description = ''
        this.item.price = ''
        this.item.quantity =
        this.updateItem()
      }
    },
    mounted () {
      this.items = this.$database.partners.concat(this.$database.materials)
    },
    props: ['item', 'index']
  }

</script>
