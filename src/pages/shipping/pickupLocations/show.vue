<template>
    <div class="container-fluid">
        <div class="row">
          <showHeader class="col-12 mt-3"
            :icon="'store-alt'"
            :title="item.name"
            :subData="[
              {title: $t('pickupLocations.form.theState'), value: item.country},
              {title: $t('pickupLocations.form.city'), value: item.city},
            ]"
            :buttons="[
              {title: $t('pickupLocations.show.modulation'), icon: 'edit', link: path+'/'+$route.params.id+'/edit', role: $user.admin || $user.role.pickup_locations_edit}
            ]"
          />
          <showCard class="col-12"
            :title="$t('pickupLocations.show.theAddressOfThePickupLocations')"
            :cloumns="{
              firstCloum: [
                {icon: 'map-marker-alt', title: $t('pickupLocations.show.title'), value: item.address1},
                {icon: 'location-arrow', title: $t('pickupLocations.show.theEntity'), value: item.entity},
                {icon: 'map-marked', title: $t('pickupLocations.show.postalCode'), value: item.zip},
              ],
              scondCloum: [
                {icon: 'map-marker-alt', title: $t('pickupLocations.show.supplement'), value: item.address2},
                {icon: 'city', title: $t('pickupLocations.show.city'), value: item.city},
                {icon: 'globe-americas', title: $t('pickupLocations.show.theState'), value: item.country},
              ]
            }" 
          />
          <showCard class="col-12"
            :title="$t('pickupLocations.show.contactInformation')"
            :cloumns="{
              firstCloum: [
                {icon: 'phone', title: $t('pickupLocations.show.mobileNumber'), value: item.mobile}
              ],
              scondCloum: [
                {icon: 'phone', title: $t('pickupLocations.show.anotherNumber'), value: item.mobile2}
              ]
            }" 
          />
        </div>
    </div>
</template>
<script>
    import axios from 'axios';

    import showHeader from '@/elements/show/showHeader.vue'
    import showCard from '@/elements/show/showCard.vue'

    export default {
        data() {
            return {
                path: '/pickupLocations',
                item: {},
            }
        },
        mounted() {
            this.getItems();
        },
        methods: {
            getItems() {
              var item = this.$database.pickupLocations.find(el => el.id == this.$route.params.id)
              if (item) {
                this.item = item
              }
              axios.get(this.$linkGnirator(this.path + '/' + this.$route.params.id))
                  .then(response => {
                      this.item = response.data;
                  });
            }
        },
        components: {
            showHeader,
            showCard
        }
    };

</script>
<style>
</style>
