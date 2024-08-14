<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-header-title">
                    <i class="fal fa-chart-bar"></i>
                    {{$t('main.totalbills')}} <span class="vs">VS</span> {{$t('main.totalPaid')}}
                </h4>
                <span class="text-muted mr-3">
                    {{$t('main.lastYear')}}:
                </span>
                <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="cardToggle" v-model="lastYear" @change="toggleYear"/>
                    <label class="custom-control-label" for="cardToggle"></label>
                </div>
            </div>
            <div class="card-body bar-chart-padding" v-if="themed">
                <div class="chart">
                    <apexchart  height="310" :options="chartOptions" :series="series"></apexchart>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                lastYear: false,
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
                        },
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
                        categories: [this.$t('main.January'), this.$t('main.February'), this.$t('main.March'), this.$t('main.April'), this.$t('main.May'), this.$t('main.June'), this.$t('main.July'), this.$t('main.August'), this.$t('main.September'), this.$t('main.October'), this.$t('main.November'),this.$t('main.December')],
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
                                return val + ' EGP'
                            }
                        }
                    }
                },
                series: [{
                    name: this.$t('main.Invoiced'),
                    data: this.items.total
                }, {
                    name: this.$t('main.Paid'),
                    data: this.items.paid
                }],
                themed: false
            }
        },
        methods: {
            toggleYear () {
                if (this.lastYear) {
                    this.series = [{
                        name: this.$t('main.Invoiced'),
                        data: this.lastYierItems.total
                    }, {
                        name: this.$t('main.Paid'),
                        data: this.lastYierItems.paid
                    }];
                } else {
                    this.series = [{
                        name: this.$t('main.Invoiced'),
                        data: this.items.total
                    }, {
                        name: this.$t('main.Paid'),
                        data: this.items.paid
                    }];
                }
                
            },
        },
        mounted () {
            if (this.$option.theme_type == 0) {
                this.chartOptions.colors = ['#2c7ae5', '#d2ddec'];
            } else if (this.$option.theme_type == 1) {
                this.chartOptions.colors = ['#6A4995', 'rgba(142, 115, 179, 0.4)'];
            } else if (this.$option.theme_type == 2) {
                this.chartOptions.colors = ['#264653', '#26465375'];
            } else if (this.$option.theme_type == 3) {
                this.chartOptions.colors = ['#392c67', '#392c6775'];
            } else if (this.$option.theme_type == 4) {
                this.chartOptions.colors = ['#011627', '#01162775'];
            } else if (this.$option.theme_type == 5) {
                this.chartOptions.colors = ['#392c67', '#392c6785'];
            }
            this.themed = true;
        },
        props: ['items', 'lastYierItems']
    }

</script>
