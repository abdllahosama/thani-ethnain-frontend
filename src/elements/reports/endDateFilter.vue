<template>
  <div >
      <div class="form-group">
        <label for="exampleInputEmail1">تاريخ السداد</label>
        <VueCtkDateTimePicker
          label="إختر الوقت والتاريخ"
          button-now-translation="الان"
          v-model="date"
          format="YYYY-MM-DD"
          formated="YYYY-MM-DD"
          color="#631263"
          button-color="#631263"
          locale="ar"
          :range="true"
          :onlyDate="true"
          :custom-shortcuts="[
            { key: 'thisWeek', label: 'هذا الأسبوع', value: 'isoWeek' },
            { key: 'lastWeek', label: 'الاسبوع السابق', value: '-isoWeek' },
            { key: 'last7Days', label: 'أخر  7 ايام ', value: 7 },
            { key: 'last30Days', label: 'أخر 30 يوم', value: 30 },
            { key: 'thisMonth', label: 'هذا الشهر', value: 'month' },
            { key: 'lastMonth', label: 'الشهر السابق', value: '-month' },
            { key: 'thisYear', label: 'هذا العام', value: 'year' },
            { key: 'lastYear', label: 'العام السابق', value: '-year' },
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
      this.$parent.params.paymentStartDate = firstDate;
      this.$parent.params.paymentEndDate = lastDate;
    },
  },
};
</script>
