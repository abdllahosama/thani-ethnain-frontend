<template>

  <div :class="withoutGroup ? 'col-md-12' : 'col-md-6 row form-group'" >
    <div class="row form-group" v-if="withoutGroup">
      <label class="col-md-4">
        {{$t("groupInput." +  type + show)}}
      </label>
      <div class="col-md-7">
        <div class="search-container" v-click-outside="removeItemsList">
          <div :class="$parent.$parent.item[innerModel] != 0 && $parent.$parent.item[innerModel] != null && close ? 'add-input' : ''">
            <input type="search"
                  :placeholder="plaseholder"
                  autocomplete="off"
                  v-model="$parent.$parent.item[innerTarget][show]"
                  class="form-control"
                  @keydown="selectItem"
                  @keyup="searchItem"
                  @focus="searchItem"
                  :disabled="$parent.$parent.item[innerModel] != 0 && $parent.$parent.item[innerModel] != null">
            <span class="btn btn-danger" v-if="$parent.$parent.item[innerModel] != 0 && $parent.$parent.item[innerModel] != null && close"  @click="removeItem"><i class="fas fa-times"></i></span>
          </div>
          <ul class="list-unstyled search-selects" v-if="searchItems.length > 0 && $parent.$parent.item[innerModel] == 0 && showItemsList">
            <li v-for="item in searchItems"
                :key="item.id"
                @click="addItemFromSearch(item['id'])"
                :class="{'focusd': item.focused}">{{item[show]}}</li>
          </ul>
        </div>
      </div>
    </div>
    <label class="col-md-4" v-if="!withoutGroup">
      {{$t("groupInput." +  type + show)}}
    </label>
    <div class="col-md-7"  v-if="!withoutGroup">
      <div class="search-container" v-click-outside="removeItemsList">
        <div :class="$parent.$parent.item[innerModel] != 0 && $parent.$parent.item[innerModel] != null && close ? 'add-input' : ''">
          <input type="search"
                :placeholder="plaseholder"
                autocomplete="off"
                v-model="$parent.$parent.item[innerTarget][show]"
                class="form-control"
                @keydown="selectItem"
                @keyup="searchItem"
                @focus="searchItem"
                :disabled="$parent.$parent.item[innerModel] != 0 && $parent.$parent.item[innerModel] != null">
          <span class="btn btn-danger" v-if="$parent.$parent.item[innerModel] != 0 && $parent.$parent.item[innerModel] != null && close"  @click="removeItem"><i class="fas fa-times"></i></span>
        </div>
        <ul class="list-unstyled search-selects" v-if="searchItems.length > 0 && $parent.$parent.item[innerModel] == 0 && showItemsList">
          <li v-for="item in searchItems"
              :key="item.id"
              @click="addItemFromSearch(item['id'])"
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
        showItemsList: false
      }
    },
    methods: {
      searchItem() {
          this.$parent.$parent.item[this.innerModel] = 0
          this.showItemsList = true

          if (this.$parent.$parent.item[this.innerTarget] == null || this.$parent.$parent.item[this.innerTarget] == undefined) {
            this.$parent.$parent.item[this.innerTarget] = {}
          }
          var editsearch = new RegExp(this.$parent.$parent.item[this.innerTarget][this.show], 'i')
          var items = this.values.sort(this.$dynamicSort({orderBy: this.show, orderType:'desc'})).filter(el => editsearch.test(el[this.show]) && el[this.show] != null).slice(0, 20)
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
            this.addItemFromSearch(eitem['id'])
          }
        }
      },
      addItemFromSearch(id) {
        this.$parent.$parent.item[this.innerModel] = id
        var item = this.values.find(el => el.id == id)
        this.$parent.$parent.item[this.innerTarget] = item
        this.showItemsList = false
      },
      removeItemsList() {
        var chek = this
        chek.showItemsList = false
      },
      removeItem() {
        this.$parent.$parent.item[this.innerModel] = 0
        this.searchItems = []
        this.$parent.$parent.item[this.innerTarget] = {}
      }
    },
    mounted () {
      if (this.$parent.$parent.item[this.innerTarget] == null || this.$parent.$parent.item[this.innerTarget] == undefined) {
        this.$parent.$parent.item[this.innerTarget] = {}
      }
    },
    watch: {
      "$parent.$parent.item": function () {
        if (this.$parent.$parent.item[this.innerTarget] == null || this.$parent.$parent.item[this.innerTarget] == undefined) {
          this.$parent.$parent.item[this.innerTarget] = {}
        } 
      },
    },
    props: ['title', 'show', 'plaseholder', 'values', 'disabled', 'type', 'close', 'innerModel', 'innerType', 'innerTarget', 'withoutGroup', 'database'],
  }

</script>
