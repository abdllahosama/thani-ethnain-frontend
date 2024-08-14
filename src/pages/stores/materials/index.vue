<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12">
              <indexHeader :title="$t('materials.Materials')"
                           :description="$t('materials.FromHereYouCanControlTheMaterials')"
                           
                           :explanationPath="path + '/explaination'" />
               <indexTable :searchText="$t('materials.SearchForRawMaterial')"
                           :emptyTableText="$t('materials.ThereAreNoMaterials')"
                           :localData="true"
                           :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                           :buttonRole="$user.admin || $user.role.products_add"
                           :cloumns="[
                                      {column: 'name',    title: $t('materials.TheNameOfTheMaterial') ,type: 'mainLink' , sort: true },
                                      {column: 'section_id', title:$t('products.category')      ,type: 'link', to:'section', sort: true, link: false, icon: 'folders' },
                                      {column: 'cost',    title:$t('materials.Cost')    ,type: 'text'     , sort: true, icon: 'dollar-sign' },
                                      {column: 'options', title:$t('products.settings'), type: 'options', options: [
                                          {name: 'show'},
                                          {name: 'edit',   role: $user.admin || $user.role.customers_edit},
                                          {name: 'printBarcode', title: $t('materials.BarcodePrint'), icon: 'barcode-alt'},
                                          {name: 'delete', role: $user.admin || $user.role.customers_delete},
                                      ]}
                                    ]"
                            :deleteText="{
                                     attention: $t('allerts.Attention'),
                                     areYouReallySureToDeleteTheItem: $t('allerts.areYouReallySureToDeleteTheItem'),
                                     close: $t('allerts.close'),
                                     confirm: $t('allerts.confirm'),
                                     loading: $t('allerts.loading'),
                                    }" />
            </div>
        </div>
        <importForm v-if="importShow"/>
    </div>
</template>
<script>
    import indexHeader from '@/elements/index/indexHeader.vue'
    import indexTable from '@/elements/index/indexTable.vue'
    import importForm from "./components/importForm.vue";

    export default {
        data() {
            return {
                path: '/materials',
                importShow: false
            }
        },
        methods: {
            importForm() {
                this.importShow = true;
            }
        },
        components: {
          indexHeader,
          indexTable,
          importForm
        }

    };

</script>
