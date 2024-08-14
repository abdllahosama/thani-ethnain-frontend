<template>

  <div class="form-group col-md-6 row">
    <label class="col-md-4">
             اسم الشريك
         </label>
    <div class="col-md-7">
      <div class="search-container" v-click-outside="removePartnerList">
        <div :class="this.$parent.item.partner_id != 0 && !disabled ? 'add-input' : ''">
          <input type="search"
                 autocomplete="off"
                 v-model="$parent.item.partner.name"
                 class="form-control"
                 maxlength="255"
                 @keydown="selectPartner"
                 @keyup="searchCustmer"
                 @focus="searchCustmer"
                 :class="{ 'is-invalid' : $parent.errors.name}"
                 :disabled="this.$parent.item.partner_id != 0">
          <span class="btn btn-danger" v-if="this.$parent.item.partner_id != 0 && !disabled" @click="removePartner"><i class="fas fa-times"></i></span>
        </div>
        <div class="invalid-feedback">هذا الحقل مطلوب</div>
        <ul class="list-unstyled search-selects" v-if="searchPartners.length > 0 && $parent.item.partner_id == 0 && showPartnersList">
          <li v-for="partner in searchPartners"
              :key="partner.id"
              @click="addPartnerFromSearch(partner.id)"
              :class="{'focusd': partner.focused}">{{partner.name}}</li>
        </ul>
      </div>
    </div>
  </div>

</template>
<script>

  export default {
    data() {
      return {
        searchPartners: [],
        showPartnersList: false,
        addedPartner: false
      }
    },
    methods: {
      searchCustmer() {
        var search = this.$parent.item.partner.name
        if (this.addedPartner) {
          this.addedPartner = false
        } else {
          this.$parent.item.partner_id = 0
          this.showPartnersList = true
          var editsearch = new RegExp(search, 'i')
          var partners = this.$database.partners.sort(this.$dynamicSort({ orderBy: "name", orderType: "desc" })).filter(el => editsearch.test(el.name)).slice(0, 20)
          if (typeof partners != 'undefined') {
            this.searchPartners = partners
          } else {
            this.searchPartners = []
          }
        }
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
          var epartner = this.searchPartners.find(el => el.focused == true)
          var eselected = this.searchPartners.indexOf(epartner)
          if (eselected != -1) {
            this.addPartnerFromSearch(epartner.id, epartner.name)
            this.showPartnersList = false
          }
        }
      },
      addPartnerFromSearch(id) {
        var partner = this.$database.partners.find(el => el.id == id)
        this.$parent.item.partner_id = id
        this.$parent.item.partner = partner
        this.addedPartner = true
      },
      removePartnerList() {
        var chek = this
        setTimeout(function() {
          chek.showPartnersList = false
        }, 100)
      },
      removePartner() {
        this.$parent.item.partner_id = 0
        this.$parent.item.partner = {}
        this.searchPartners = []
      }
    },
    props: ['disabled'],
  }

</script>
