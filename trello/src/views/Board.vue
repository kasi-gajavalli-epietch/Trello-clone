<template>
<main class="list-container">
    <section class="list-wrapper">
        <div id="app">
            <Modal :ArticleId="articleId" v-show="this.isModalVisible" @close="closeModal"/>
        </div>
        <draggable :options="{ group: 'lists' }" group="lists" ghostClass="ghost" class="list-draggable">
            <div class="list-card" v-for="categories in category" :key="categories.id" >
                <div style="padding-left:20px"><button type="button" class="delete close btn btn-default" data-dismiss="modal" @click="deleteCategory(categories.id)"><h3>x</h3></button></div>
                <label class="list-header" style="display:block;">
                    <input class="cat-name" v-on:blur="updateCategory(categories)" v-model="categories.name" />
                </label>

                <div class="list-content">
                    <card-list :listId="categories.id" :listName="categories.name" @setArticleId="setArticleId" />
                </div>
                
                <div class="list-footer">
                   <input type="text" class="input-cards" placeholder="Create a new card" v-model="title" @keyup.enter="cardName(categories.id)" />
                </div>
            </div>
            
        </draggable>
        <input type="text" class="input-new-list" placeholder="Create a new category" ref="NewCategory" @keyup.enter="PostNewCategory" />
    </section>
</main>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import CardList from "@/components/CardList.vue";
import Card from "@/components/Card.vue";
import Modal from "@/components/Modal.vue";
import { mapState } from 'vuex';

const baseURL = 'https://twp.oxy-development.fr/wp-json/wp/v2/categories'
const basesURL = 'https://twp.oxy-development.fr/wp-json/wp/v2/posts'
export default {
    components: {
        draggable: VueDraggableNext,
        CardList,
        Card,
        Modal,
    },
    data() {
        return {
            listName: "",
            isModalVisible: false,
            articleId: null,
            categoryVisible: false,
            categoryId: null,
            categoryName: null,
        };
    },

    mounted() {
        this.$store.dispatch('loadCategory'),
        this.$store.dispatch('loadArticle')
    },

    methods: {
        setArticleId(id) {
            this.articleId = id;
            this.showModal();
        },
        
        createList() {
            if (this.listName !== "") {
                this.$store.dispatch("createList", this.listName);
                this.listName = "";
            }
        },
        showModal() {
            if (this.isModalVisible == false) {
                this.isModalVisible = true;
            } else {
                this.isModalVisible = false;
            }
        },

        
        
        closeModal(){
            this.isModalVisible = false;
        },

        

        async cardName(categoryId) {
           
            var formdatas = new FormData();
            formdatas.append("title", this.title);
            formdatas.append("categories", categoryId);
            formdatas.append("status", "publish");
            const resu = await fetch(`${basesURL}`, {
          method: "post",
          headers: {
            'Authorization': 'Basic ZXBpdGVjaDpFcGl0ZWNoMTM=',
            
          },
          body: formdatas,
             });
             window.alert("the new card"+" '"+(this.title)+"' "+"has been added, please click OK to reload the webpage ");
             window.location.reload(); 
        },
        

        // start fonction post 
        async PostNewCategory() {
            console.log("Post new category")
            console.log(this.$refs.NewCategory.value)
            var formdata = new FormData();
            formdata.append("name",  this.$refs.NewCategory.value);

            const res = await fetch(`${baseURL}`, {
          method: "post",
          headers: {
            'Authorization': 'Basic ZXBpdGVjaDpFcGl0ZWNoMTM=',
          },
          body: formdata,
             });
             window.alert("the new category"+" '"+(this.$refs.NewCategory.value)+"' "+"has been added, please click OK to reload the webpage ");
             window.location.reload()

        },
        updateCategory(categories){
            console.log("save category : ", categories.id);
            var formdata = new FormData();
            formdata.append("name", categories.name);
            const url = "https://twp.oxy-development.fr/wp-json/wp/v2/categories/"+categories.id+"?force=true";
            fetch(url, {
                headers: {
                'Authorization': 'Basic ZXBpdGVjaDpFcGl0ZWNoMTM=',
                },
                method: "POST",
                body: formdata,
            });
        },
        deleteCategory(id){
        console.log("delete category : ", id);
        const url = "https://twp.oxy-development.fr/wp-json/wp/v2/categories/"+id+"?force=true";
            fetch(url, {
                headers: {
                'Authorization': 'Basic ZXBpdGVjaDpFcGl0ZWNoMTM=',
                },
                method: "DELETE",
            }),
            window.alert("the article has been deleted, please click OK to reload the webpage ");
            window.location.reload();
        },
    },

    computed: mapState([
        'category',
        'article'
    ]),

};
</script>

<style scoped>
p{
background: rgb(88, 83, 83);
background-clip: border-box;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
font-size: 16px;
}
.cat-name{
background: rgb(88, 83, 83);
background-clip: border-box;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
font-size: 16px;
}


.input-cards {
  position: relative;
  background-color: white;
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  word-break: break-all;
  font-size: 14px;
}
.list-container {
    position: relative;
    display: flex;
    width: 100vw;
    height: 100vh;
    z-index: 10;
}

.list-wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    min-width: 100vw;
    height: 100vh;
    padding: 20px;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    background-image: url("../assets/montains.jpeg");
    gap: 20px;
    overflow-x: scroll;
    overflow-y: hidden;
}

.ghost {
    opacity: 0.5;
}

.list-draggable {
    display: flex;
    gap: 20px;
}

.input-new-list {
    display: flex;
    height: 30px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(235, 236, 240, 0.5);
    min-width: 260px;
}

.input-new-list::placeholder {
    color: black;
}

.list-card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 300px;
    height: auto;
    /* z-index: -1; */
}

.list-header {
    position: relative;
    display: flex;
    justify-content: center;
    word-break: break-all;
    align-items: center;
    min-width: 280px;
    max-width: 280px;
    line-height: 50px;
    padding: 10px 10px 0px 10px;
    background-color: rgba(235, 236, 240, 1);
    border-radius: 10px 10px 0px 0px;
    color: rgba(24, 43, 77, 1);
    user-select: none;
}

.list-content {
    overflow-y: scroll;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 280px;
    max-width: 280px;
    height: auto;
    background-color: rgba(235, 236, 240, 1);
    padding: 0px 10px 0px 10px;
    /* box-shadow: 1.5px 1.5px 1.5px 0.1px rgba(255, 255, 255, 0.1); */
    color: rgba(24, 43, 77, 1);
    border:solid;
    border-width: 0px;
}

.list-footer {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 280px;
    background-color: rgba(235, 236, 240, 1);
    border-radius: 0px 0px 10px 10px;
    color: white;
    padding: 0px 10px 10px 10px;
}
</style>
