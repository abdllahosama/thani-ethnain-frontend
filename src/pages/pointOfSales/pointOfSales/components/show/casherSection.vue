
<template>
  <div class="casher-section" @click="openSection(section.id)">
      <div class="casher-section-image" :style="section.image != null ? image : ''"  v-if="!$parent.options.show_sections_icon && section.image != null"></div>
      <div class="casher-section-icon"   v-if="!$parent.options.show_sections_icon && section.image == null">
        <img :src="'accounting/img/noImage.png'" class="no-casher-img" >
      </div>
      <div class="casher-section-icon" v-if="$parent.options.show_sections_icon">
        <img :src="'accounting/img/icons/' + section.icon + '.png'" v-if="section.icon != null">
        <img :src="'accounting/img/noImage.png'" class="no-casher-img" v-if="section.icon == null">
      </div>
      <div class="casher-section-name">
          {{section.name}}
      </div>

  </div>
</template>
<script>
export default {
   data() {
        return {
            image: 'background-image: url("' + localStorage.getItem('site') + '/companiesUploads/' + localStorage.getItem('subdomain') + '/sections/' + this.section.image + '");',
        }
    },
  methods: {
    openSection(id) {
      this.$parent.selectedSecton = id;
      this.$parent.sectionItems = this.$parent.filteredProducts.filter((el) => el.section_id == id);
      this.$parent.filteredProducts.forEach(el => {
        el.quantity = 1
      })
      this.$parent.changeProductsPrice()
    },
  },
  props: ["section", "item"],

};
</script>
