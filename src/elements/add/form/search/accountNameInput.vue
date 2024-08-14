<template>

  <div class="form-group col-md-6 row">
    <label class="col-md-4">
             اسم الحساب
         </label>
    <div class="col-md-7">
      <div class="search-container" v-click-outside="removeAccountList">
        <div :class="this.$parent.item.account_id != 0 && !disabled ? 'add-input' : ''">
          <input type="search"
                 autocomplete="off"
                 v-model="$parent.item.account.name"
                 class="form-control"
                 maxlength="255"
                 @keydown="selectAccount"
                 @keyup="searchCustmer"
                 @focus="searchCustmer"
                 :class="{ 'is-invalid' : $parent.errors.name}"
                 :disabled="this.$parent.item.account_id != 0">
          <span class="btn btn-danger" v-if="this.$parent.item.account_id != 0 && !disabled" @click="removeAccount"><i class="fas fa-times"></i></span>
        </div>
        <div class="invalid-feedback">هذا الحقل مطلوب</div>
        <ul class="list-unstyled search-selects" v-if="searchAccounts.length > 0 && $parent.item.account_id == 0 && showAccountsList">
          <li v-for="account in searchAccounts"
              :key="account.id"
              @click="addAccountFromSearch(account.id)"
              :class="{'focusd': account.focused}">{{account.name}}</li>
        </ul>
      </div>
    </div>
  </div>

</template>
<script>

  export default {
    data() {
      return {
        searchAccounts: [],
        showAccountsList: false,
        addedAccount: false
      }
    },
    methods: {
      searchCustmer() {
        var search = this.$parent.item.account.name
        if (this.addedAccount) {
          this.addedAccount = false
        } else {
          this.$parent.item.account_id = 0
          this.showAccountsList = true
          var editsearch = new RegExp(search, 'i')
          var accounts = this.$database.accounts.sort(this.$dynamicSort({ orderBy: "name", orderType: "desc" })).filter(el => editsearch.test(el.name)).slice(0, 20)
          if (typeof accounts != 'undefined') {
            this.searchAccounts = accounts
          } else {
            this.searchAccounts = []
          }
        }
      },
      selectAccount(e) {
        if (
          (e.key == 'ArrowDown' && this.searchAccounts.length != 0) ||
          (e.key == 'ArrowUp' && this.searchAccounts.length != 0)
        ) {
          var account = this.searchAccounts.find(el => el.focused == true)
          var selected = this.searchAccounts.indexOf(account)
          var length = this.searchAccounts.length
          if (selected > -1) {
            this.$set(this.searchAccounts[selected], 'focused', false)
          }
          if (e.key == 'ArrowDown') {
            if (selected < length - 1) {
              this.$set(this.searchAccounts[selected + 1], 'focused', true)
            } else {
              this.$set(this.searchAccounts[0], 'focused', true)
            }
          } else if (e.key == 'ArrowUp') {
            if (selected > 0) {
              this.$set(this.searchAccounts[selected - 1], 'focused', true)
            } else {
              this.$set(this.searchAccounts[length - 1], 'focused', true)
            }
          }
        } else if (e.key == 'Enter') {
          var eaccount = this.searchAccounts.find(el => el.focused == true)
          var eselected = this.searchAccounts.indexOf(eaccount)
          if (eselected != -1) {
            this.addAccountFromSearch(eaccount.id, eaccount.name)
            this.showAccountsList = false
          }
        }
      },
      addAccountFromSearch(id) {
        var account = this.$database.accounts.find(el => el.id == id)
        this.$parent.item.account_id = id
        this.$parent.item.account = account
        this.addedAccount = true
      },
      removeAccountList() {
        var chek = this
        setTimeout(function() {
          chek.showAccountsList = false
        }, 100)
      },
      removeAccount() {
        this.$parent.item.account_id = 0
        this.$parent.item.account = {}
        this.searchaccounts = []
      }
    },
    props: ['disabled'],
  }

</script>
