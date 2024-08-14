<template>
    <div class="d-flex  mt-3 index-header">
        <div class="ml-auto">
            <h2 class="mb-3">
                {{title}} 
                <router-link :to="explanationPath" v-if="explanationPath != null" ><i class="far fa-question-circle"></i></router-link>
            </h2>
            <p class="text-muted">
                {{description}}
            </p>
            
        </div>

        <router-link class="btn btn-outline-primary add-btn ml-3"  :to="barcodePath" v-if="showBarcode"> 
         <i class="fas fa-barcode-alt mr-2"></i> طباعة الباركود 
        </router-link>
        <router-link class="btn btn-outline-primary add-btn ml-3"  :to="goldBarcodePath" v-if="showBarcode"> 
         <i class="fas fa-gem mr-2"></i> باركود الذهب 
        </router-link>
        
        <a :href="$linkGnirator(exportLink)" class="btn btn-outline-primary add-btn ml-3" download title="تصدير الي ملف ايكسل" v-if="showExport && $parent.$parent.conectStat"> <i class="fas fa-download mr-2"></i> تصدير </a>
        <a class="btn btn-light add-btn ml-3 disabled" dissabled v-if="showExport && !$parent.$parent.conectStat"><i class="fas fa-download mr-2" ></i> تصدير</a>
        <button class="btn btn-outline-primary add-btn ml-3" @click="$parent.importForm" v-if="showImport && ($user.admin || buttonRole) && $parent.$parent.conectStat" title="استيراد من ملف ايكسل"> <i class="fas fa-upload mr-2"></i> استيراد </button>
        <a class="btn btn-light add-btn ml-3 disabled" dissabled v-if="showImport && ($user.admin || buttonRole) && !$parent.$parent.conectStat"> <i class="fas fa-upload mr-2"></i> استيراد</a>
        
    </div>
</template>
<script>
    export default {
        props: ['title', 'description', 'path', 'explanationPath','buttonText', 'buttonRole', 'exportLink', 'showImport', 'showExport','showBarcode','barcodePath', 'goldBarcodePath']
    };
</script>
