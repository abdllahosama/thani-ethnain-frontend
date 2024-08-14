<template>
  <div >
      <div class="form-group">
        <label for="exampleInputEmail1">{{$t('reports.overview.duration')}}</label>
        <VueCtkDateTimePicker
          :label="$t('reports.overview.ChooseTimeAndDate')"
          :button-now-translation="$t('reports.overview.now')"
          v-model="date"
          format="YYYY-MM-DD"
          formated="YYYY-MM-DD"
          color="#631263"
          button-color="#631263"
          locale="ar"
          :range="true"
          :onlyDate="true"
          :custom-shortcuts="[
            { key: 'thisWeek', label: $t('reports.overview.thisWeek'), value: 'isoWeek' },
            { key: 'lastWeek', label: $t('reports.overview.theLastWeek'), value: '-isoWeek' },
            { key: 'last7Days', label: $t('reports.overview.theLastDays'), value: 7 },
            { key: 'last30Days', label: $t('reports.overview.theLast30Days'), value: 30 },
            { key: 'thisMonth', label: $t('reports.overview.thisMonth'), value: 'month' },
            { key: 'lastMonth', label: $t('reports.overview.previousMonth'), value: '-month' },
            { key: 'thisYear', label:$t('reports.overview.thisYear'), value: 'year' },
            { key: 'lastYear', label: $t('reports.overview.lastYear'), value: '-year' },
          ]"
        />
      </div>
  </div>
</template>
<script>
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

export default {
  data() {
    return {
      date: {
        start: new Date().toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0, 10),
        end: "",
      },
    };
  },
  components: {
    VueCtkDateTimePicker,
  },
  methods: {
    fixNumbers(str) {
      let arabicNumbers = [
        /٠/g,
        /١/g,
        /٢/g,
        /٣/g,
        /٤/g,
        /٥/g,
        /٦/g,
        /٧/g,
        /٨/g,
        /٩/g,
      ];
      if (typeof str === "string") {
        for (var i = 0; i < 10; i++) {
          str = str.replace(arabicNumbers[i], i);
          str = str.replace("ص", "am").replace("م", "pm");
        }
      }
      return str;
    },
  },
  watch: {
    date: function (val) {
      let firstDate = this.fixNumbers(val.start);
      let lastDate = this.fixNumbers(val.end);
      this.$parent.params.startDate = firstDate;
      this.$parent.params.endDate = lastDate;
    },
  },
};
</script>
