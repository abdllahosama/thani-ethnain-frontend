<template>
  <div >
      <div class="form-group">
        <label for="exampleInputEmail1"> التاريخ</label>
        <VueCtkDateTimePicker
          label="إختر الوقت والتاريخ"
          button-now-translation="الان"
          v-model="date"
          format="YYYY-MM-DD"
          formated="YYYY-MM-DD"
          color="#631263"
          button-color="#631263"
          locale="ar"
          :onlyDate="true"
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
      date:  new Date().toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0, 10),
    };
  },
  components: {
    VueCtkDateTimePicker,
  },
  watch: {
    date: function () {
      this.$parent.params.date = this.$fixDate(this.date);
    },
  },
};
</script>
