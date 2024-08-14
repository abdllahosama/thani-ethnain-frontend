<template>
    <div class="print-model">
        <div id="printMe" ref="printMe">
            <div>
                <div class="gold-container" v-for="i in Math.ceil($parent.options.quotationItems.length / 2)" :key="i">
                    <div class="ticket-top">
                        <div class="ticket-front">
                            <img class="ticket-logo" :src="logo">
                            <p class="title-ticket" :style="$parent.options.quotationItems[((i-1) * 2)].type == 3 ? 'font-size:  10px;margin-top: 15px;' : ''">
                                {{$parent.options.quotationItems[((i-1) * 2)].type == 1 ? 'GOLD' : ''}}
                                {{$parent.options.quotationItems[((i-1) * 2)].type == 2 ? 'SILVER' : ''}}
                                {{$parent.options.quotationItems[((i-1) * 2)].type == 3 ? 'DIAMOND' : ''}}
                                <br v-if="$parent.options.quotationItems[((i-1) * 2)].type == 3"/>
                                <span style="font-size:  13px;" v-if="$parent.options.quotationItems[((i-1) * 2)].type == 3">CT: {{$parent.options.quotationItems[((i-1) * 2)].diamond_count}}g</span>
                            </p>
                        </div>
                        <div class="ticket-back">
                            <img class="ticket-logo" :src="logo">
                            <div class="ticket-content">
                                <p class="title-ticket2" v-if="$parent.options.quotationItems[((i-1) * 2)].type == 1">W:{{$parent.options.quotationItems[((i-1) * 2)].gold_wight}}g</p>
                                <p class="title-ticket2" v-if="$parent.options.quotationItems[((i-1) * 2)].type == 1">K:{{$parent.options.quotationItems[((i-1) * 2)].k}}</p>
                                
                                <p class="title-ticket2" v-if="$parent.options.quotationItems[((i-1) * 2)].type == 2">W:{{$parent.options.quotationItems[((i-1) * 2)].gold_wight}}g</p>
                                <p class="title-ticket2" v-if="$parent.options.quotationItems[((i-1) * 2)].type == 2">K:{{$parent.options.quotationItems[((i-1) * 2)].k}}</p>
                                
                                <p class="title-ticket2" v-if="$parent.options.quotationItems[((i-1) * 2)].type == 3">G:{{$parent.options.quotationItems[((i-1) * 2)].gold_wight}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="ticket-bottom" v-if="!(Math.ceil($parent.options.quotationItems.length / 2) == i && $parent.options.quotationItems.length%2 == 1)">
                        <div class="ticket-front">
                            <img class="ticket-logo" :src="logo">
                            <p class="title-ticket" :style="$parent.options.quotationItems[((i-1) * 2) + 1].type == 3 ? 'font-size:  10px;margin-top: 10px;' : ''">
                                {{$parent.options.quotationItems[((i-1) * 2) + 1].type == 1 ? 'GOLD' : ''}}
                                {{$parent.options.quotationItems[((i-1) * 2) + 1].type == 2 ? 'SILVER' : ''}}
                                {{$parent.options.quotationItems[((i-1) * 2) + 1].type == 3 ? 'DIAMOND' : ''}}
                                <br v-if="$parent.options.quotationItems[((i-1) * 2) + 1].type == 3"/>
                                <span style="font-size:  13px;" v-if="$parent.options.quotationItems[((i-1) * 2) + 1].type == 3">G: {{$parent.options.quotationItems[((i-1) * 2) + 1].gold_wight}}g</span>
                            </p>
                        </div>
                        <div class="ticket-back">
                            <img class="ticket-logo" :src="logo">
                            <div class="ticket-content">
                                <p class="title-ticket2" v-if="$parent.options.quotationItems[((i-1) * 2) + 1].type == 1">W:{{$parent.options.quotationItems[((i-1) * 2) + 1].gold_wight}}g</p>
                                <p class="title-ticket2" v-if="$parent.options.quotationItems[((i-1) * 2) + 1].type == 1">K:{{$parent.options.quotationItems[((i-1) * 2) + 1].k}}</p>
                                
                                <p class="title-ticket2" v-if="$parent.options.quotationItems[((i-1) * 2) + 1].type == 2">W:{{$parent.options.quotationItems[((i-1) * 2) + 1].gold_wight}}g</p>
                                <p class="title-ticket2" v-if="$parent.options.quotationItems[((i-1) * 2) + 1].type == 2">K:{{$parent.options.quotationItems[((i-1) * 2) + 1].k}}</p>
                                
                                <p class="title-ticket2" v-if="$parent.options.quotationItems[((i-1) * 2) + 1].type == 3">CT:{{$parent.options.quotationItems[((i-1) * 2) + 1].diamond_count}}</p>
                                <p class="title-ticket2" v-if="$parent.options.quotationItems[((i-1) * 2) + 1].type == 3">ST:{{$parent.options.quotationItems[((i-1) * 2) + 1].diamond_wight}}</p>
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
      logo: localStorage.getItem("logo"),
    };
  },
};
</script>
