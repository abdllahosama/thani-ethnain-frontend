<template>
    <div class="print-model">
        <div id="printMe" ref="printMe">
            <div v-for="(item, index) in $parent.options.quotationItems" :key="index">
                <div v-for="(i, index) in parseFloat(item.quantity > 0 ? item.quantity : 0)" :key="index">
                    <div class="sticer3" v-if="$parent.options.type == 1 && $parent.options.logoPrint" :style="'height: ' + $parent.options.height + 'mm;width: ' + $parent.options.width + 'mm;text-align:center;font-weight:800;padding: ' + $parent.options.height_padding + 'mm ' + $parent.options.width_padding + 'mm;box-sizing: border-box;'">
                        <div class="data-container">
                            <div :style="'width: 50%;text-align: left;display: inline-block;height: 40px'">
                                <img :src="logo" v-if="$option.image != null" style="max-height:90%; max-width:90%;display:block;margin:5% auto;" />
                            </div>
                            <div style=" width: 50%;text-align: right;display: inline-block; padding-right:10px;box-sizing: border-box;">
                                <div class="product-name" style="font-size: 9px; direction: rtl">
                                    {{item.product_name}} <br/> {{item.product_description || item.product_code ? '(' : ''}}{{item.product_code}} {{item.product_description || item.product_code ? ' - ' : ''}} {{item.product_description}}{{item.product_description || item.product_code ? ')' : ''}}
                                </div>

                                <div class="product-price" v-if="$option.barcode_price_show" style="font-size: 9px; direction: rtl">
                                    {{item.price}} {{$option.currency}}
                                </div>
                                <div class="product-price" v-if="$option.barcode_company_show">
                                    {{$option.name}}
                                </div>
                            </div>
                        </div>
                        <barcode 
                            :value="item.barcode"
                            font-size="0"
                            :height="(($parent.options.height - $parent.options.height_padding * 2) * 3.7795275591  - 60) + 'px'"
                            width="2px"
                            :style="'margin-top: 2px;margin-bottom: 2px;height: ' + (($parent.options.height - $parent.options.height_padding * 2) * 3.7795275591  - 60) + 'px'"
                            margin-top="-4"
                            margin-bottom="-4"
                            class="barcode"
                        />
                        <div :style="'letter-spacing: 5px;font-size: 13px;margin-bottom: -3px;margin-top: -3px;'">{{item.barcode}}</div>
                    </div>
                    <div class="sticer2" v-if="$parent.options.type == 1 && !$parent.options.logoPrint" :style="'height: ' + $parent.options.height + 'mm;width: ' + $parent.options.width + 'mm;text-align:center;font-weight:800;padding: ' + $parent.options.height_padding + 'mm ' + $parent.options.width_padding + 'mm;box-sizing: border-box;'">
                        <div class="product-name">
                            {{item.product_name}}
                        </div>
                        <barcode 
                            :value="item.barcode"
                            font-size="0"
                            :height="(($parent.options.height - $parent.options.height_padding * 2) * 3.7795275591  - 50) + 'px'"
                            width="2px"
                            :style="'margin-top: 2px;margin-bottom: 2px;height: ' + (($parent.options.height - $parent.options.height_padding * 2) * 3.7795275591  - 50) + 'px'"
                            margin-top="-4"
                            margin-bottom="-4"
                            class="barcode"
                        />
                        <div :style="'letter-spacing: 5px;font-size: 13px;margin-bottom: -3px;margin-top: -3px;'">{{item.barcode}}</div>

                        <div class="product-price" v-if="$option.barcode_price_show">
                            {{item.price}} {{$option.currency}}
                        </div>
                        <div class="product-price" v-if="$option.barcode_company_show">
                            {{$option.name}}
                        </div>
                    </div>
                    <div class="sticer" v-if="$parent.options.type == 2" :style="'height: ' + $parent.options.height / 2 + 'mm;width: ' + $parent.options.width + 'mm;text-align:center;font-weight:800;'">
                        <div class="product-name">
                            {{item.product_name}}
                        </div>
                        <barcode 
                            :value="item.barcode"
                            font-size="0"
                            :height="($parent.options.height / 2 * 3.7795275591 - 30) + 'px'"
                            width="2px"
                            :style="'margin-top: 2px;margin-bottom: 2px;height: ' + ($parent.options.height / 2 * 3.7795275591  - 30) + 'px'"
                            margin-top="-4"
                            margin-bottom="-4"
                            class="barcode"
                        />
                    </div>
                    <div class="sticer"  v-if="$parent.options.type == 2" :style="'height: ' + $parent.options.height / 2 + 'mm;width: ' + $parent.options.width + 'mm;text-align:center;font-weight:800;'">
                        <div class="product-name">
                            {{item.product_name}}
                        </div>
                        <barcode 
                            :value="item.barcode"
                            font-size="0"
                            :height="($parent.options.height / 2 * 3.7795275591 - 30) + 'px'"
                            width="2px"
                            :style="'margin-top: 2px;margin-bottom: 2px;height: ' + ($parent.options.height / 2 * 3.7795275591  - 30) + 'px'"
                            margin-top="-4"
                            margin-bottom="-4"
                            class="barcode"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VueBarcode from 'vue-barcode';
export default {
  data() {
    return {
      logo: localStorage.getItem("logo"),
    }
  },
  components: {
    'barcode': VueBarcode
  }

}
</script>