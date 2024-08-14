<template>

  <div>
    <div class="card card-fill">
      <div class="card-header">
        <h4 class="card-header-title">
          {{$t('suppliers.show.SalesStats')}}
        </h4>
      </div>
      <div class="card-body bar-chart-padding" v-if="themed">
        <div class="chart">
          <apexchart height="330" :options="chartOptions" :series="series"></apexchart>
        </div>
      </div>
    </div>
  </div>

</template>
<script>

  export default {
    data() {
      return {
        chartOptions: {
          chart: {
            id: 'vuechart-example',
            type: 'bar',
            fontFamily: 'Tajawal',
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '40px',
              endingShape: 'rounded'
            }
          },
          colors: ['#2c7ae5', '#d2ddec'],
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: [
              this.$t('main.January'),
              this.$t('main.February'),
              this.$t('main.March'),
              this.$t('main.April'),
              this.$t('main.May'),
              this.$t('main.June'),
              this.$t('main.July'),
              this.$t('main.August'),
              this.$t('main.September'),
              this.$t('main.October'),
              this.$t('main.November'),
              this.$t('main.December')
            ]
          },
          yaxis: {
            title: {
              text: this.$option.currency
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function(val) {
                return val + this.$option.currency
              }
            }
          }
        },
        series: [
          {
            name: this.$t('main.Invoiced'),
            data: this.items.total
          },
          {
            name: this.$t('main.Paid'),
            data: this.items.paid
          }
        ],
        themed: false
      }
    },
    mounted() {
      if (this.$option.theme_type == 0) {
        this.chartOptions.colors = ['#2c7ae5', '#d2ddec']
      } else {
        this.chartOptions.colors = ['#6A4995', 'rgba(142, 115, 179, 0.4)']
      }
      this.themed = true
    },
    props: ['items']
  }

</script>
