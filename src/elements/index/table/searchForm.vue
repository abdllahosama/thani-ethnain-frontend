<template>
    <div>
        <div class="card-header">
            <div class="input-group input-group-flush">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <i class="fa fa-search"></i>
                    </span>
                </div>
                <input class="form-control list-search" type="search" :placeholder="searchText" v-model="$parent.params.search">
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['searchText']
    };

</script>
