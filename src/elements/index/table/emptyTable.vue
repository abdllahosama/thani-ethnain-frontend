<template>
    <tr>
        <td colspan="20" class="empty-table">
            <i class="fas fa-inbox d-block"></i>
            {{emptyTableText}}
            <p>{{emptyTableSubText}}</p>
        </td>
    </tr>
</template>
<script>
    export default {
        props: ['emptyTableText', 'emptyTableSubText']
    };
</script>
