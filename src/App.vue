<template>
    <div class="pcoded iscollapsed" nav-type="st6" theme-layout="vertical" vertical-placement="left" vertical-layout="wide" pcoded-device-type="desktop" v-bind:vertical-nav-type="nav" vertical-effect="shrink" vnavigation-view="view1" fream-type="theme1" sidebar-img="false" sidebar-img-type="img1" layout-type="light">
        <div class="pcoded-overlay-box"></div>
        <router-view/>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                nav: 'expanded'
            };
        },
        methods: {
            toggleside: function() {
                if (this.nav == 'offcanvas') {
                    this.nav = 'expanded';
                } else {
                    this.nav = 'offcanvas';
                }
            }
        }
    };

</script>