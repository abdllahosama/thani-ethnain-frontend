<template>
    <div class="card">
        <div class="card-header p-4">
            <div class="row">
                <div class="col-lg-4 report-title text-lg-right text-center">
                    <h4 class="card-header-title">
                    <i class="fal fa-chart-bar"></i>
                    {{title}}
                    </h4>
                </div>
                <div class="col-lg-4 report-data text-center">
                    <template v-for="(detail, index) in details">
                        <p class="mb-1" v-if="detail.value" :key="index"><strong>{{detail.title}}: </strong>{{ detail.value }}</p>
                    </template>
                </div>
                <div class="col-lg-4 report-date text-lg-left text-center">
                    <p class="mb-1">
                      {{ $parent.searchStartDate ? 'من ' + $parent.searchStartDate : '' }} {{ $parent.searchEndDate ? 'إلى ' + $parent.searchEndDate : '' }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['title' , 'details']
}
</script>
