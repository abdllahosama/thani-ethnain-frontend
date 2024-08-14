<template>
    <div class="modal fade show">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-card card">
              <div class="card-body">
                <div class="popuploader" v-if="loading">
                    <i class="far fa-spinner fa-spin"></i>
                </div>
                <iframe v-if="!loading" id="showIframe" class="show-ifrane"></iframe>
                <div class="print-model">
                    <div id="printMe" ref="printMe" v-if="!loading">
                        <div class="inv-container">
                            <div class="inv-header">
                                <img :src="logo"  v-if="$option.image != null">
                                <p>{{item.tracking_number}}</p>
                                <p class="details">الطلب:   <strong>{{item.invoice ? item.invoice.code : '--'}}</strong></p>
                                <p class="details">التاريخ:   <strong>{{$dateFormat(item.date, 'date')}}</strong></p>
                                <p class="details">الوقت:     <strong>{{$dateFormat(item.date, 'time')}}</strong></p>
                                <p class="details">المندوب:   <strong>{{item.delivery ? item.delivery.name : '--'}}</strong></p>
                            </div>
                            <div class="inv-body">
                                <div class="table-responcive">
                                    <table class="detail-table">
                                        <tbody>
                                            <tr>
                                                <td class="title">الاسم</td>
                                                <td colspan="3"> {{item.customer ? item.customer.name : '--'}} </td>
                                            </tr>
                                            <tr>
                                                <td class="title">رقم الهاتف</td>
                                                <td colspan="3">{{item.mobile}}</td>
                                            </tr>
                                            <tr>
                                                <td class="title">العنوان</td>
                                                <td colspan="3"> {{item.address1}}, {{item.address2}} </td>
                                            </tr>
                                            <tr>
                                                <td class="title">الشقه</td>
                                                <td>{{item.flat,
                                                }}</td>
                                                <td>الدور</td>
                                                <td>{{item.floor}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="table-responcive">
                                    <table class="detail-table">
                                        <tbody>
                
                                            <tr>
                                                <td class="title">ملاحظات</td>
                                            </tr>
                
                                            <tr class="description-height2">
                                                <td>-</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                                <div class="table-responcive">
                                    <table class="detail-table">
                                        <tbody>
                
                                            <tr>
                                                <td class="title">المبلغ</td>
                                                <td>{{$moneyFormat(item.cod)}}</td>
                                            </tr>
            
                                            <tr>
                                                <td class="title">التوصيل</td>
                                                <td>{{$moneyFormat(item.cost)}}</td>
                                            </tr>
            
                                            <tr>
                                                <td class="title">المبلغ</td>
                                                <td>{{$moneyFormat(parseFloat(item.cost ? item.cost : 0) + parseFloat(item.cod))}} </td>
                                            </tr>
                                            </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              <div class="card-footer card-footer-boxed">
                <div class="row align-items-center justify-content-between">
                  <div class="col-auto">
                  </div>
                  <div class="col-auto">
                    <!-- Link -->
                    <button class="btn btn-outline-danger" @click="colse()">
                        <i class="far fa-times"></i>
                        {{$parent.$t('components.pointOfSalesShow.colse')}}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
    export default {
        data() {
            return {
                logo: localStorage.getItem('logo'),
                item: {},
                loading: true,
                options: {}
            }
        },
        methods: {
            getitem() {
                this.item = this.$parent.shippingOperation
                var pointOfSale  = this.$database.pointOfSales.find(el => el.id == this.item.point_of_sale_id)
                if (pointOfSale) {this.options = pointOfSale}
                this.colsban  = this.options.print_amount == 0 && this.options.print_type != 3  ? 3: 2;
                if (this.item.discount != 0) {this.colsban +=1}
                this.loading = false
                var myel = this;
                setTimeout(function() {
                    var html = document.getElementById("printMe").innerHTML;
                    var css  = '<meta charset="utf-8" /><style>html{background: #818181;align-items: center;}body{margin: 0px auto !important;}.inv-design{min-height: 99%;}* {direction: rtl;font-size: 14px;font-weight: 600;}.inv-container {width: 7.5cm;margin-left:0.25cm;margin-right:0.25cm;box-sizing: border-box;background: white;padding: 10px;margin: 10px auto;}.inv-header {text-align: center;border-bottom: 2px solid black;}img{width: 165px;height: 91px}.details{text-align: right;margin: 5px;}.inv-body {border-bottom: 2px solid black;}.table-responcive {border-top: 1px solid black;border-right: 1px solid black;margin-bottom: 10px;margin-top: 10px;}.detail-table {width: 100%;border-collapse: collapse;}.detail-table tr td {border-bottom: 1px solid black;border-left: 1px solid black;padding: 5px 7px;}.title{background-color: #f1f3f4;}</style>'
                    var content = '<head>' + css + '</head><body>' + html + '</body>'
                    let iframe = document.getElementById('showIframe');
                    iframe.contentWindow.document.open();
                    iframe.contentWindow.document.write(content);
                    iframe.contentWindow.document.close();
                }, 20);
            },
            colse() {
                this.$parent.showShippingOp = false;
                this.$parent.shippingOperation = null;
            }
        },
        watch: {
            '$parent.shippingOperation': function () {
                this.getitem()
            }
        }
    }

</script>
