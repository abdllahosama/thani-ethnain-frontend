<template>
    <div class="print-model">
        <div id="printMe" ref="printMe" v-if="!loading">
            <div class="inv-container">
                <div class="inv-header">
                    <img :src="logo"  v-if="$option.image != null">
                    <p>{{item.tracking_number}}</p>
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
                                    <td>{{item.apartment}}</td>
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
    
                                <tr>
                                    <td class="title">الطلب</td>
                                    <td>{{item.invoice ? item.invoice.code : '--'}}</td>
                                </tr>
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <p class="pioneer-data">تم الإنشاء بواسطة Pioneer للبرمجيات 01019654321</p>
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
                var myel = this;
                if(this.options.local_server == 0){
                    if(typeof ipcRenderer !== 'undefined'){
                    setTimeout(function() {
                        var html = document.getElementById("printMe").innerHTML;
                        var css  = '<meta charset="utf-8" /><style>* {direction: rtl;font-size: 14px;font-weight: 600;}.inv-container {width: 7.5cm;margin-left:0.25cm;margin-right:0.25cm;box-sizing: border-box;}.inv-header {text-align: center;border-bottom: 2px solid black;}img{width: 165px;height: 91px}.details{text-align: right;margin: 5px;}.inv-body {border-bottom: 2px solid black;}.table-responcive {border-top: 1px solid black;border-right: 1px solid black;margin-bottom: 10px;margin-top: 10px;}.detail-table {width: 100%;border-collapse: collapse;}.detail-table tr td {border-bottom: 1px solid black;border-left: 1px solid black;padding: 5px 7px;}.title{background-color: rgb(241 243 244);}</style>'
                        var content = '<head>' + css + '</head><body>' + html + '</body>'
                        var printDetails = {
                            options: {
                                preview: false,
                                copies: 1,
                                printerName: 'default',
                                silent: true
                            },
                            data: content
                        }
                        ipcRenderer.send('print', JSON.stringify(printDetails))
                        document.getElementById("printMe").remove();
                        myel.colse();
                    }, 20);
                    } else {
                    setTimeout(function() {
                        var html = document.getElementById("printMe").innerHTML;
                        var css  = '<meta charset="utf-8" /><style>' + myel.$print + myel.$option.invoice_css + '</style><style>* {direction: rtl;font-size: 14px;font-weight: 600;}.inv-container {width: 7.5cm;margin-left:0.25cm;margin-right:0.25cm;box-sizing: border-box;}.inv-header {text-align: center;border-bottom: 2px solid black;}img{width: 165px;height: 91px}.details{text-align: right;margin: 5px;}.inv-body {border-bottom: 2px solid black;}.table-responcive {border-top: 1px solid black;border-right: 1px solid black;margin-bottom: 10px;margin-top: 10px;}.detail-table {width: 100%;border-collapse: collapse;}.detail-table tr td {border-bottom: 1px solid black;border-left: 1px solid black;padding: 5px 7px;}.title{background-color: rgb(241 243 244);}</style>'
                        var content = '<head>' + css + '</head><body>' + html + '</body>'
                        var iframe = document.createElement('iframe');
                        var html = content;
                        document.body.appendChild(iframe);
                        iframe.contentWindow.document.open();
                        iframe.classList.add("printIframe");
                        iframe.contentWindow.document.write(html);
                        iframe.contentWindow.document.close();

                        iframe.onload = function() {
                        iframe.focus();
                        iframe.contentWindow.print();
                        iframe.remove();
                        };
                        myel.colse();
                    }, 20);
                    }
                } else {
                    setTimeout(function() {
                        var html = document.getElementById("printMe").innerHTML
                        var css  = '<meta charset="utf-8" /><style>' + myel.$print + myel.$option.invoice_css + '</style><style>* {direction: rtl;font-size: 14px;font-weight: 600;}.inv-container {width: 7.5cm;margin-left:0.25cm;margin-right:0.25cm;box-sizing: border-box;}.inv-header {text-align: center;border-bottom: 2px solid black;}img{width: 165px;height: 91px}.details{text-align: right;margin: 5px;}.inv-body {border-bottom: 2px solid black;}.table-responcive {border-top: 1px solid black;border-right: 1px solid black;margin-bottom: 10px;margin-top: 10px;}.detail-table {width: 100%;border-collapse: collapse;}.detail-table tr td {border-bottom: 1px solid black;border-left: 1px solid black;padding: 5px 7px;}.title{background-color: rgb(241 243 244);}</style>'
                        var content = '<head>' + css + '</head><body>' + html + '</body>'
                        const xhr = new XMLHttpRequest();
                        xhr.open("POST", "http://" + myel.options.local_server_ip, true);
                        var params = [{printer_name: 'default', data: content}];
                        xhr.send(JSON.stringify(params));

                    }, 20);
                }
            },
            colse() {
                this.$parent.printShippingOperation = false;
            }
        },
        mounted() {
            this.item = this.$parent.printShippingOperation
            var pointOfSale  = this.$database.pointOfSales.find(el => el.id == this.item.point_of_sale_id)
            if (pointOfSale) {this.options = pointOfSale}
            this.loading = false
            this.getitem();
        }
    }

</script>
