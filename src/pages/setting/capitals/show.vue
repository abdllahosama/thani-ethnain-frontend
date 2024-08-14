<template>
  <div class="container-fluid">
    <div class="row">
      <showHeader
        class="col-12 mt-3"
        :icon="'archway'"
        :title="item.name"
        :stat="item.stat"
        :statText="
          item.stat
            ? $t('capitals.show.active')
            : $t('capitals.show.inactive')
        "
        :subData="[
          {
            title: $t('capitals.show.currentBalance'),
            value: this.$moneyFormat(item.cost),
          },
        ]"
        :buttons="[
          {
            title: $t('capitals.show.edit'),
            icon: 'edit',
            link: path + '/' + $route.params.id + '/edit',
            role: $user.admin || $user.role.customers_edit,
          },
        ]"
      />
      <showCard
        class="col-12"
        :title="$t('capitals.show.OriginInformation')"
        :cloumns="{
          firstCloum: [
            { icon: 'signature', title: $t('capitals.show.OriginalName'), value: item.name },
            {
              icon: 'minus-hexagon',
              title: $t('capitals.show.DepreciationRate'),
              value: item.depreciation_rate,
            },
            { icon: 'calendar', title: $t('capitals.show.PurchaseDate'), value: item.date },
          ],
          scondCloum: [
            {
              icon: 'dollar-sign',
              title: $t('capitals.show.Value'),
              value: this.$moneyFormat(item.cost),
            },
            {
              icon: 'toggle-on',
              title: $t('capitals.show.Status'),
              value: item.stat != 0 ? $t('capitals.show.effective') : $t('capitals.show.Ineffective'),
            },
            {
              icon: 'calendar',
              title: $t('capitals.show.DateOfSale'),
              value: item.expiry_date,
            },
          ],
        }"
        :paragraphs="[
          { title: $t('capitals.show.DescriptionOfTheOriginal'), value: item.descripton },
          { title: $t('capitals.show.OtherDetailedData'), value: item.details },
          { title: $t('capitals.show.Reviews'), value: item.notes },
        ]"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";

import showHeader from "@/elements/show/showHeader.vue";
import showCard from "@/elements/show/showCard.vue";
export default {
  data() {
    return {
      path: "/capitals",
      loaded: false,
      item: {},
    };
  },
  mounted() {
    this.getItems();
  },
  methods: {
    getItems() {
      var item = this.$database.capitals.find(
        (el) => el.id == this.$route.params.id
      );
      if (item) {
        this.item = item;
      }
      axios
        .get(this.$linkGnirator(this.path + "/" + this.$route.params.id))
        .then((response) => {
          this.item = response.data;
          this.loaded = true;
        });
    },
  },
  components: {
    showHeader,
    showCard,
  },
};
</script>
