<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-header-title">
                    <i class="fal fa-thumbs-down"></i>
                    {{$t('main.topExpensesByCategory')}}
                </h4>
            </div>
            <div class="card-body bar-chart-padding" v-if="themed">
                <div class="chart cercular-shart" v-if="items.length != 0">
                    <apexchart height="210" :options="chartOptions" :series="series"></apexchart>
                </div>
                <img src="accounting/img/chartCover.png" class="chart-cover" v-if="items.length == 0 && $option.theme_type == 0">
                <img src="accounting/img/chartCover2.png" class="chart-cover" v-if="items.length == 0 && $option.theme_type != 0">
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                series: this.items.map(el => el.cost),
                chartOptions: {
                    chart: {
                        type: 'pie',
                        fontFamily: 'Tajawal'
                    },
                    colors: ['#2c7ae5', '#4d8ce2', '#7ca7e3', '#8ab1e5', '#a9c4e8', '#cfdcef'],
                    labels: this.items.map(el => el.name),
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                offset: -20
                            }
                        }
                    },
                    legend: {
                        show: true,
                        showForSingleSeries: false,
                        showForNullSeries: true,
                        showForZeroSeries: true,
                        position: 'right',
                        horizontalAlign: 'center',
                        verticalAlign: 'middle',
                        floating: false,
                        fontSize: '14px',
                        fontWeight: 400,
                        formatter: undefined,
                        inverseOrder: false,
                        width: undefined,
                        height: undefined,
                        tooltipHoverFormatter: undefined,
                        offsetX: 10,
                        offsetY: 40,
                        labels: {
                            colors: undefined,
                            useSeriesColors: false
                        },
                        markers: {
                            width: 12,
                            height: 12,
                            strokeWidth: 0,
                            strokeColor: '#fff',
                            fillColors: undefined,
                            radius: 2,
                            customHTML: undefined,
                            onClick: undefined,
                            offsetX: 0,
                            offsetY: 0
                        },
                        itemMargin: {
                            horizontal: 10,
                            vertical: 0
                        },
                        onItemClick: {
                            toggleDataSeries: true
                        },
                        onItemHover: {
                            highlightDataSeries: true
                        },
                    }

                },
                themed: false
            }
        },
        mounted () {
            if (this.$option.theme_type == 0) {
                this.chartOptions.colors = ['#2c7ae5', '#4d8ce2', '#7ca7e3', '#8ab1e5', '#a9c4e8', '#cfdcef'];
            } else if (this.$option.theme_type == 1) {
                this.chartOptions.colors = ['#8F3F8F', '#88C457', '#C1D55E', '#C55778', '#6A4995', '#E68CA7'];
            } else if (this.$option.theme_type == 2) {
                this.chartOptions.colors = ['#264653', '#2a9d8f', '#e63946', '#c55778', '#12263f75'];
            } else if (this.$option.theme_type == 3) {
                this.chartOptions.colors = ['#392c67', '#9d52b8', '#b85282', '#6852b8', '#392c6775'];
            } else if (this.$option.theme_type == 4) {
                this.chartOptions.colors = ['#011627', '#2ec4b6', '#c55778', '#e71d36', '#01162775'];
            } else if (this.$option.theme_type == 5) {
                this.chartOptions.colors = ['#011627', '#9d52b8', '#b85282', '#6852b8', '#01162775'];
            }
            this.themed = true;
        },
        props: ['items']
    }
</script>
