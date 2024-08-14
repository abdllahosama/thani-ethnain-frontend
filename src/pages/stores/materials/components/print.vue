<template>
    <div class="print-model">
        <div id="printMe" ref="printMe" v-if="!loading">
            <div class="sticer2" v-if="$parent.sticerType == 1">
                <div class="product-name">
                    {{item.name}}
                </div>
                <div class="product-barcode">
                    *{{item.barcode}}*
                </div>
                <div class="product-price">
                    {{item.price}} {{$option.currency}}
                </div>
            </div>
            <div class="sticer" v-if="$parent.sticerType == 2">
                <div class="product-name">
                    {{item.name}}
                </div>
                <div class="product-barcode">
                    *{{item.barcode}}*
                </div>
                <div class="product-price">
                    {{item.price}} {{$option.currency}}
                </div>
            </div>
            <div class="sticer" v-if="$parent.sticerType == 2">
                <div class="product-name">
                    {{item.name}}
                </div>
                <div class="product-barcode">
                    *{{item.barcode}}*
                </div>
                <div class="product-price">
                    {{item.price}} {{$option.currency}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                item: {},
                loading: true
            }
        },
        methods: {
            checkIframeLoaded (myframe) {
                var iframeDoc = myframe.contentDocument || myframe.contentWindow.document;
                if (  iframeDoc.readyState  == 'complete' ) {
                    return 1;
                } else {
                    return 0;
                }
            },
            getitem() {
                this.item =  this.$parent.items.find(el => el.id == this.$parent.printBar);
                this.loading = false;
                var myel = this;
                setTimeout(function() {
                    var text = document.getElementById("printMe").innerHTML;
                    document.getElementById("printMe").remove();
                    var myframe = document.getElementById('lableIframe');
                    myframe.contentDocument.body.innerHTML = text;
                    setTimeout(function() {
                        myframe.focus();
                        myframe.contentWindow.print();
                        myel.colse();
                    }, 100);
                }, 20);
            },
            colse() {
                this.$parent.printBar = false;
                this.$parent.sticerType = 0;
            }
        },
        mounted() {
            this.getitem();
        }
    }

</script>
