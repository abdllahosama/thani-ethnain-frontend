<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h3 class="card-header-title title-customer">
          <i :class="'far ' + icon"></i> {{ cardTitle }}
        </h3>
      </div>
      <ul class="list-group list-group-flush">
        <template v-for="(report, index) in reports">
          <li class="list-group-item" v-if="report.role" :key="index">
            <router-link :to="report.link">{{ report.name }}</router-link>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["cardTitle", "reports", "icon"],
};
</script>
