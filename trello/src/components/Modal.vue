<template>
    <div class="modal-backdrop">
        <div class="modal">  
            <span class="element-card" v-for="articles in article.filter(article => article.id == ArticleId)" :key="articles.id">
                <div class="div">
                    <div class="left">
                        <button @click="close" type="button" class="close btn btn-default" data-dismiss="modal"><p>X</p></button>
                    </div>
                    <input class="art-title" style="background-color: #e0e0e0;" v-on:blur="updateArticle(articles)" v-model="articles.title.rendered" />
                    <!-- <p>{{articles.title.rendered}}</p> -->
                    <h2 style="color:darkgray;">Descriptions</h2>
                    <textarea class="art-description" v-on:blur="updateDescription(articles)" v-model="articles.content.rendered"></textarea>
                     <button @click="deleteDescription(articles.id)" type="button" class="delete close btn btn-default" data-dismiss="modal"><p>Delete</p></button>
                    
                    <comments :ArticleId="articles.id"/>
                    
                    <button @click="deleteArticle(articles.id)" type="button" class="delete close btn btn-default" data-dismiss="modal"><p>Delete {{articles.title.rendered}}</p></button>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import Comments from "@/components/Comments.vue";
export default {
    components: {
        Comments,
    },
    props: ["ArticleId"],
    mounted() {
        this.$store.dispatch('loadArticle')
    },
    computed: mapState([
        'article',
    ]),
    methods:{
        close(){
            console.log("close")
            this.$emit("close")
        },

        deleteArticle(id){
          
            const url = "https://twp.oxy-development.fr/wp-json/wp/v2/posts/"+id+"?force=true";
                fetch(url, {
                    headers: {
                    'Authorization': 'Basic ZXBpdGVjaDpFcGl0ZWNoMTM=',
                    },
                    method: "DELETE",
                }),
                window.alert("Cet article a été supprimé ");
                window.location.reload();
        },
         updateArticle(articles){
            console.log(articles)
            var formdata = new FormData();
            formdata.append("title", articles.title.rendered);
            const url = "https://twp.oxy-development.fr/wp-json/wp/v2/posts/"+articles.id+"?force=true";
            fetch(url, {
                headers: {
                'Authorization': 'Basic ZXBpdGVjaDpFcGl0ZWNoMTM=',
                },
                method: "POST",
                body: formdata,
            });
            
            
        },  
        //delete description articles.content.rendered
        deleteDescription(id){
            var formdata = new FormData();
            formdata.append("content", "");
            const url = "https://twp.oxy-development.fr/wp-json/wp/v2/posts/"+id+"?force=true";
            fetch(url, {
                headers: {
                'Authorization': 'Basic ZXBpdGVjaDpFcGl0ZWNoMTM=',
                },
                method: "POST",
                body: formdata,
            });
            window.alert("La description a été supprimé ");
            window.location.reload();
        },
       //add description articles.content.rendered
        updateDescription(articles){
            console.log(articles)
            var formdata = new FormData();
            formdata.append("content", articles.content.rendered);
            const url = "https://twp.oxy-development.fr/wp-json/wp/v2/posts/"+articles.id+"?force=true";
            fetch(url, {
                headers: {
                'Authorization': 'Basic ZXBpdGVjaDpFcGl0ZWNoMTM=',
                },
                method: "POST",
                body: formdata,
            });
            
            
        },
    }
}
</script>

<style scoped>

p{
    text-overflow: ellipsis;
}
.div{
    background: #e0e0e0;
    padding: 10px;
    width: 100%;
    height: auto;
    /*overflow-y: scroll;
    scrollbar-color: rebeccapurple green;
    scrollbar-width: thin;*/
        
       


}

.delete{
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-top: 10px;
    height: auto;
}
.left{

  width: 29px;
}
p{
    text-align: center;
    background: rgb(88, 83, 83);
    background-clip: border-box;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 20px;
    margin-top: 20px;
    text-overflow: ellipsis;
}
p{
    margin-top: 0,5rem;
    margin-bottom: 0rem;
    font-weight: 500;
    line-height: 1.2;
}
.close{
    transition-duration: 0.4s;
    background-color: white;
    color: rgb(245, 6, 6);
    border: 2px solid #e41111;
    border-radius: 10px;
    padding: 0px 7px;
    
   }

.close:hover {
  background-color: #e95252; /* Green */
  color: white;
}
.element-card{
    background: beige;
    margin-bottom: 0px;
    display: flex;
    border-radius: 10px;
    overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
}

.boucleComment {
  text-align: center;
  color: grey;
  font-size: 20px;

}
.modal-backdrop {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;

}

.modal {
    
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: auto;
    height: auto;
    max-width: 800px;
    position: relative;
    background:#e0e0e0;
    top: 50px;
    /* z-index: 1; */
    border-radius: 10px;
    padding: 10px;
    min-width: 250px;
    max-width: 70%;
    max-height: 70%;
    /*overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;*/
}

.modal-header,
.modal-footer {
    padding: 15px;
    display: flex;
}

.modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
}

.modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
}

.modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
}

.modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
}

.modal-body {
    position: relative;
    padding: 20px 10px;
}

.btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
}

.btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
}

.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity .5s ease;
}
.art-description{
    background-color: white;
    height: 100px;
    width: 500px;
    border:none;
    outline:none;
    resize:none;
}

</style>