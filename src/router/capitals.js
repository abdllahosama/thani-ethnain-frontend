//capitals pages
import capitalsIndex from "@/pages/capitals/index.vue";
import capitalsForm from "@/pages/capitals/form.vue";
import capitalsShow from "@/pages/capitals/show.vue";


const routes =  [

    // customers routes
    { 
        path: "capitals",
        name: "capitals", 
        component: capitalsIndex 
    },
    {
        path: "capitals/create",
        name: "capitalsCreate",
        component: capitalsForm,
    },
    {
        path: "capitals/:id/edit",
        name: "capitalsEdit",
        component: capitalsForm,
    },
    { 
        path: "capitals/:id", 
        name: "capitalsShow", 
        component: capitalsShow 
    }
];

export default routes;
