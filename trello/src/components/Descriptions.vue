<template>
<div class="text">
    
    <h4 style="color: darkgray;">Descriptions</h4>
    <div>  
        <span class="element-card" v-for="articles in article.filter(article => article.id == ArticleId)" :key="articles.id">
            <div class="div">
                <textarea class="art-description" v-on:blur="updateDescription(articles)" v-model="articles.content.rendered"></textarea>
                <button @click="deleteDescription(articles.id)" type="button" class="delete close btn btn-default" data-dismiss="modal"><p>Delete</p></button>-->
            </div>
        </span>
    </div>
    <!--<div class="boucleDescription">
    
        <div class="boucle" v-for="description in descriptions.filter(description => description.post == ArticleId)" :key="description.id" >
                <div>{{description.content.rendered}} <button class="size btn btn-danger" @click="deleteDescription(description.id)">delete</button></div>
                <div class="descriptionSource" style="display:flex; justify-content: space-between;">
                    <div>{{"description.author_name"}}</div>
                    <div>{{description.date}}</div>
                </div>
                        
        </div>
        <div class = "flex" v-if="true">
            <input style="width: 95%; height:100px;" type="text" class="input-card" v-model="content" @keyup.enter="addDescription(ArticleId)" />
        </div>
    </div>-->
    
</div>

</template>

<script>
import {mapState} from 'vuex';
const baseURL = 'https://twp.oxy-development.fr/wp-json/wp/v2/posts'
export default {

    props: ["ArticleId","content"],
    
    mounted() {
        this.$store.dispatch('loadDescriptions'),
        console.log("mounted"),
        this.Isdescriptions();
    },
    computed: mapState([
        'descriptions',
    ]),
    data (){
        return {
        Isdescription: true,
        AddnewDescriptions: false,
        }
    },
    
    methods:{
            Isdescriptions(){
            console.log(1,"coucou")
            this.Iscdescription=true
            console.log(2, this.Isdescription)
           
            },
            deleteDescription(id){
                const url = "https://twp.oxy-development.fr/wp-json/wp/v2/posts/"+id+"?force=true";
                fetch(url, {
                    headers: {
                    'Authorization': 'Basic ZXBpdGVjaDpFcGl0ZWNoMTM=',
                    },
                    method: "DELETE",
                }),
                window.alert("The description has been deleted, please click OK to reload the webpage ");
                window.location.reload();
            },
            DisplayDescription(){
                console.log(1, "add description")
                if (this.AddnewDescriptions == true){
                    this.AddnewDescriptions = false}
                else {this.AddnewDescriptions = true}
                console.log(2, this.AddnewDescriptions)
            },
             async addDescription(categoryId){
                console.log("Write your description")
                console.log(categoryId)
                var formdatas = new FormData();
                formdatas.append("content", this.content);
                formdatas.append("post", categoryId);
                const resu = await fetch(`${baseURL}`, {
                    method: "post",
                    headers: {
                        'Authorization': 'Basic ZXBpdGVjaDpFcGl0ZWNoMTM=',
                    },
                    body: formdatas,
                });
                window.alert("Your description"+" '"+(this.content)+"' "+"has been added, please click OK to reload the webpage ");
                window.location.reload();

            },
            
    },
}
</script>
<style scoped>
.description, .first-posts{
  padding: 2px 20px;
}
h3 {
font-family: Impact, sans-serif;
Color:gray;
}
h4{
  color:black;
  padding-bottom: 5px;
  margin-top:13px;
}

textarea{
 border:none;
  height: 10%;
  width: 95%;
  resize:none;
  outline:none;
}
#btn-hide{
  border:none;
  padding:none;
  background: #87CEEB;
  width:250px;
  height: 40px;
}
.description{
  padding: 5px 25px;
}
.flex{
    display: flex;
    width: 100%;
}
p{
    margin-bottom: 0px;
    height: auto;
    text-align: left;
    width: 100%;
    line-height: 20px;
}
h8{
    margin-bottom: 0rem;
}
.input-card{
  
    width: 100%;
    border-radius: 10px;
    height: 30px;
    font-size: 14px;
    margin-top: 10px;
}
.size{
    font-size: 10px;
    transition-duration: 0.4s;
     background-color: white;
  color: rgb(245, 6, 6);
  border: 2px solid #e41111;
  padding: 0px 10px;
  width: auto;
}
.size:hover {
  background-color: #e95252; /* Green */
  color: white;
}
.btn {
height: 70%;
margin-right :10px;
border-radius: 10px;
padding-bottom: 0px;
padding-top: 0px;
padding-left: 5px;
padding-right: 5px;

}
.boucleDescription {
    flex: 1 1 160px;
}

.boucle{
    color: rgb(66, 66, 66);
    font-size: 15px;
    height: auto;
    margin-bottom:5px;
    background-color: white;
    width: 90%;
    height:auto;
}
</style>