<template>
  <nav class="navbar navbar-expand-md nav-padding navbar-light d-md-flex">
    <div class="container-fluid">
      <!--a
        @click="toggleside()"
        class="navbar-user-link nav-icon icon-ml d-none d-md-block"
        role="button"
        :title="$t('navBar.sideMenu')"
      >
        <span class="icon">
          <i class="far fa-bars"></i>
        </span>
      </!--a>
      <a--
        @click="fullscreen()"
        class="navbar-user-link nav-icon icon-ml d-none d-md-block"
        role="button"
        :title="$t('navBar.screenZoom')"
      >
        <span class="icon">
          <i class="far fa-desktop-alt"></i>
        </span>
      </a-->
      <!--a
        @click="darkMode()"
        class="navbar-user-link nav-icon icon-ml"
        role="button"
        :title="$t('navBar.nightMode')"
      >
        <span class="icon">
          <i class="far fa-moon"></i>
        </span>
      </a>
      <div class="navbar-user-link nav-icon icon-ml">
        <i class="fas" :class="$parent.conectStat ? 'fa-wifi' : 'fa-wifi-slash'"></i>
      </div-->
      <div class="w-50 d-none d-md-block"></div>
      <span class="v-dvider ml25 d-none d-md-block"></span>
            <div class="w-50 d-none d-md-block"></div>
            <!-- User -->
            <div class="dropdown"  v-click-outside="removeCompaniesMenu">
                <a class="navbar-user-link nav-icon  dropdown-toggle w-100 pointer-cursor" @click="showCompaniesMenu">
                    <span class="icon">
                        <i class="far fa-city"></i> {{$option.name}}
                    </span>
                </a>
                <ul class="dropdown-menu" :class="showCompanies ? 'show' : ''" v-if="$companies.length != 1">
                    <li v-for="item in $companies" :key="item.id">
                        <a class="dropdown-item" @click="$changeCompany(item.id)">{{item.name}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
  data() {
    return {
      dark: true,
      showCompanies: false,
      showLanguage: false,
      
    };
  },
  methods: {
    fullscreen() {
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement
        ? document.cancelFullScreen
          ? document.cancelFullScreen()
          : document.mozCancelFullScreen
          ? document.mozCancelFullScreen()
          : document.webkitCancelFullScreen && document.webkitCancelFullScreen()
        : document.documentElement.requestFullscreen
        ? document.documentElement.requestFullscreen()
        : document.documentElement.mozRequestFullScreen
        ? document.documentElement.mozRequestFullScreen()
        : document.documentElement.webkitRequestFullscreen &&
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    },
    toggleside() {
      if (this.$parent.showSdebar == false) {
        this.$parent.showSdebar = true;
      } else {
        this.$parent.showSdebar = false;
      }
    },
    darkMode() {
      if (this.dark == false) {
        this.dark = true;
      } else {
        this.dark = false;
      }
      document.getElementById("stylesheetDark").disabled = this.dark;
    },
    showCompaniesMenu() {
      this.showCompanies = !this.showCompanies;
    },
    showLanguageMenu() {
      this.showLanguage = !this.showLanguage;
    },
    removeLanguageMenu() {
      this.showLanguage = false;
    },
    removeCompaniesMenu() {
      this.showCompanies = false;
    },
    
  },
};
</script>
