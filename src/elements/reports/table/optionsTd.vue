<template>
    <td class="text-right edit-td">

        <!-- Dropdown -->

        <router-link :to=" $parent.path + '/'+$parent.items[id].id" class="btn btn-light" v-if="!withoutShow" title="عرض">
            <i class="fas fa-search"></i>
        </router-link>
        <router-link :to="$parent.path + '/'+$parent.items[id].id+'/edit'" class="btn btn-light" v-if="$user.admin || editRole" title="تعديل">
            <i class="fas fa-edit"></i>
        </router-link>
        <a @click="$parent.sureDelete(id)" class="btn btn-light" v-if="$user.admin || deleteRole" title="حذف">
            <i class="fas fa-trash"></i>
        </a>

    </td>
</template>
<script>
    export default {
        props: ['id', 'withoutShow', 'editRole', 'deleteRole']
    };

</script>
