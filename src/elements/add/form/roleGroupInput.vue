<template>
    <div class="col-12">
        <label class="mb-3">
          <div class="custom-control custom-switch">
            <label for="companies_all" class="bg-check-label">
              <i :class="'far fa-' + icon"></i>
              {{ title }} :
            </label>
            <input
              type="checkbox"
              id="companies_all"
              class="custom-control-input"
              value="1"
              v-model="selectedAll"
              @click="selectAll()"
            />
            <label for="companies_all" class="custom-control-label"></label>
          </div>
        </label>
        <div class="row">

          <div class="col-sm-3" v-for="(value, index) in values" :key="index">
            <div class="custom-control custom-switch small-switch">
              <label :for="value.key" class="check-label">
                {{ value.name }} :
              </label>
              <input
                type="checkbox"
                :id="value.key"
                v-model="$parent.item[value.key]"
                class="custom-control-input"
                value="1"
              />
              <label
                :for="value.key"
                class="custom-control-label"
              ></label>
            </div>
          </div>

        </div>
      </div>
</template>
<script>
export default {
    data (){
        return {
            selectedAll: false
        }
    },
    methods: {
        selectAll() {
          this.selectedAll = !this.selectedAll
            if (this.selectedAll == true) {
                this.values.forEach(value => {
                    this.$parent.item[value.key] = 1
                });
            } else {
              this.values.forEach(value => {
                    this.$parent.item[value.key] = 0
                });
            }
        },
    },
    props: ["title", "icon", "values"]
}
</script>
