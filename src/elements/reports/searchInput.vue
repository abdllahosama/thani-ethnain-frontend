<template>

  <div class="form-group" v-click-outside="removeItemsList">
    <label>
      {{title}}
    </label>
    <div>
      <div class="search-container">
        <div :class="value != '' ? 'add-input' : ''">
          <input type="search"
                 :placeholder="plaseholder"
                 autocomplete="off"
                 v-model="search"
                 class="form-control"
                 @keydown="selectItem"
                 @keyup="searchItem"
                 @focus="searchItem"
                 :disabled="value != '' && value != null">
          <span class="btn btn-danger" v-if="value != '' && value != null"  @click="removeItem"><i class="fas fa-times"></i></span>
        </div>
        <ul class="list-unstyled search-selects" v-if="searchItems.length > 0 && value == '' && showItemsList">
          <li v-for="item in searchItems"
              :key="item.id"
              @click="addItemFromSearch(item[refrance], item[show])"
              :class="{'focusd': item.focused}">{{item[show]}}</li>
        </ul>
      </div>
    </div>
  </div>

</template>
<script>

  export default {
    data() {
      return {
        search: '',
        searchItems: [],
        showItemsList: false,
        addedItem: false
      }
    },
    methods: {
      searchItem() {
          this.$emit("input", '')
          this.showItemsList = true
          var editsearch = new RegExp(this.search, 'i')
          var items = this.values.sort(this.$dynamicSort({orderBy: 'name', orderType:'desc'})).filter(el => editsearch.test(el.name)).slice(0, 20)
          if (typeof items != 'undefined') {
            this.searchItems = items
          } else {
            this.searchItems = []
          }
      },
      selectItem(e) {
        if (
          (e.key == 'ArrowDown' && this.searchItems.length != 0) ||
          (e.key == 'ArrowUp' && this.searchItems.length != 0)
        ) {
          var item = this.searchItems.find(el => el.focused == true)
          var selected = this.searchItems.indexOf(item)
          var length = this.searchItems.length
          if (selected > -1) {
            this.$set(this.searchItems[selected], 'focused', false)
          }
          if (e.key == 'ArrowDown') {
            if (selected < length - 1) {
              this.$set(this.searchItems[selected + 1], 'focused', true)
            } else {
              this.$set(this.searchItems[0], 'focused', true)
            }
          } else if (e.key == 'ArrowUp') {
            if (selected > 0) {
              this.$set(this.searchItems[selected - 1], 'focused', true)
            } else {
              this.$set(this.searchItems[length - 1], 'focused', true)
            }
          }
        } else if (e.key == 'Enter') {
          var eitem = this.searchItems.find(el => el.focused == true)
          var eselected = this.searchItems.indexOf(eitem)
          if (eselected != -1) {
            this.addItemFromSearch(eitem[this.refrance], eitem[this.show])
          }
        }
      },
      addItemFromSearch(id, name) {
        this.$emit("input", id)
        this.search = name
        this.addedItem = true
        this.showItemsList = false
      },
      removeItemsList() {
        var chek = this
        chek.showItemsList = false
      },
      removeItem() {
        this.$emit("input", '')
        this.search = ''
        this.searchItems = []
      }
    },
    watch: {
      'value': function(val) {
        if (val != null) {
          var item = this.values.find(el => el.id == val)
          if (item != undefined) {
            this.search = item[this.show]
          }
        }
      },
    },
    props: ['title', 'show', 'refrance', 'plaseholder', 'values', 'value', 'disabled'],
  }

</script>
