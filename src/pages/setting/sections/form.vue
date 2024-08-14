<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12">
                <addHeader :title="$t('sections.form.createSection')" :description="$t('sections.form.fromHereYouCanCreateANewProductSection')" v-if="$route.name == 'sectionsCreate'"/>
                <addHeader :title="$t('sections.form.editSection')" :description="$t('sections.form.fromHereModifyTheSectionData')"  v-if="$route.name == 'sectionsEdit'"/>
                <div class="mb-4 row">
                    <dvider :title="$t('sections.form.sectionInformation')" :description="$t('sections.form.basicSectionInformation')" noLine="true"/>
                    <fileInput :title="$t('sections.form.ClassificationPicture')" v-model="item.image" :image="item.image" :path="'sections'" :hasErorr="errors.image" :error="$t('allerts.ChooseASuitableFile')" :col="'col-12'"/>
                    <formInput :title="$t('sections.form.sectionName')" v-model="item.name" :hasErorr="errors.name" :error="$t('allerts.thisFieldIsRequired')"/>
                    <connectionInput :title="$t('sections.form.fatherSection')" :group="$t('sections.form.sections')" v-model="item.parent_id" :hasAdd="false" :values="$database.sections"/>
                    <div class="form-group col-md-6 row">
                      <label class="col-md-4">{{$t('sections.form.classificationIcon')}}</label>
                      <div class="col-md-7">
                        <select
                          type="text"
                          class="form-control"
                          v-model="item.icon"
                        >
                          <option value="">{{$t('sections.form.chooseIcon')}}</option>
                          <option v-for="(icon, index) in icons" :key="index">{{ icon }}</option>
                        </select>
                      </div>
                    </div>
          <!-- Divider -->
          <hr class="mt-5 mb-5 col-12" />
          <!-- Buttons -->
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'sectionsCreate' && !$parent.stopEdit"
          >
            {{ $t('sections.form.createSection') }}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'sectionsEdit' && !$parent.stopEdit"
          >
            {{ $t('sections.form.editSection') }}
          </a>
          <loading v-if="$parent.stopEdit"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import formInput from "@/elements/add/form/formInput.vue";
import fileInput from "@/elements/add/form/fileInput.vue";
import connectionInput from "@/elements/add/form/connectionInput.vue";
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
export default {
  data() {
    return {
      path: "/sections",
      item: {},
      sections: {},
      errors: {
        name: false,
      },
      icons: [
        'cake',
        'capuccino',
        'cauliflower',
        'cola',
        'crepe',
        'cup-of-drink',
        'dessert',
        'donut',
        'drink',
        'ezgif.com-gif-maker',
        'fast-food',
        'fish',
        'food ',
        'french-fries',
        'meat',
        'milk',
        'pasta',
        'pizza',
        'roast-chicken',
        'salad',
        'salt',
        'sandwich',
        'shrimp',
        'skewer',
        'sugar',
        'tea',
        'vegetables',
        'waffle'
      ]
    };
  },
  methods: {
    getItem() {
      axios
        .get(this.$linkGnirator(this.path + "/" + this.$route.params.id))
        .then((response) => {
          this.item = response.data;
          this.$parent.stopEdit = false;
        });
    },
    saveItem() {
      var error = 0;
      if (typeof this.item.name === "undefined" || this.item.name == "") {
        error = 1;
        this.errors.name = true;
      }
      if (error == 0) {
        if (this.$route.name == "sectionsCreate") {
          this.$parent.aletText = this.$t('allerts.sectionSuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
        } else if (this.$route.name == "sectionsEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText =
                this.$t('allerts.sectionHasBeenModifiedSuccessfully');
              this.$parent.alertType = "success";
              this.$router.go(-1);
              this.$parent.stopEdit = false;
              return response;
            });
        }
      } else {
        this.$parent.aletText = this.$t('allerts.pleaseMakeSureOfTheInput');
        this.$parent.alertType = "danger";
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
  },
  mounted() {
    this.$updateDatabase(["sections"]);

    if (this.$route.name == "sectionsEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    }
  },
  components: {
    formInput,
    fileInput,
    dvider,
    addHeader,
    connectionInput,
    loading,
  },
};
</script>
<style></style>
