<template>
<draggable :options="{ group: 'cards' }" group="cards" @start="drag=true" @end="drag=false"  ghostClass="ghost">

    <span class="element-card" v-for="articles in article.filter(article => article.categories[0] == listId)" :key="articles.id" @click="SendId(articles.id)">
        {{articles.title.rendered}}
    </span>
    
</draggable>
</template>

<script>
import {VueDraggableNext} from "vue-draggable-next";
import { mapState} from 'vuex';
export default {
    props: ["listId", "listName"],
    components: {
        draggable: VueDraggableNext,
    },
    mounted() {
        this.$store.dispatch('loadArticle')
    },
    computed: mapState([
        'article',
    ]),

    methods: {
        SendId(id) {
            this.$emit("setArticleId", id)
        },
    },
};
</script>

<style scoped>
.element-card {
position: relative;
background-color: white;
height: auto;
display: flex;
align-items: center;
padding: 10px;
border-radius: 5px;
min-height: 30px;
margin-bottom: 10px;
word-break: break-all;
text-align: left;
}
</style>
