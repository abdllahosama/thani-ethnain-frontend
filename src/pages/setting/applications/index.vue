<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('applications.AppStore')"
          :description="$t('applications.FromHereYouCanDownloadApplicationsForTheSystem')"
        />
        <div class="row">
          <applicationCard class="col-md-4" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import applicationCard from "./components/applicationCard.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
export default {
  data() {
    return {
      path: "/applications",
      item: {},
      errors: {
        name: false,
        rate: false,
      },
    };
  },
  mounted() {},
  methods: {},

  components: {
    addHeader,
    loading,
    applicationCard,
  },
};
</script>
