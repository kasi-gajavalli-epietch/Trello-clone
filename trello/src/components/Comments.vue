<template>
<div class="text">
    <h4 style="color:darkgray; margin-top: 20px;">Comments</h4>
    <div class="boucleComment">
  
        <div class="boucle" v-for="comment in comments.filter(comment => comment.post == ArticleId)" :key="comment.id" >
            <div style="display:inline-flex;gap: 5px;"><p>Posted by:</p><strong> {{comment.author_name}}</strong></div> 
            <div style="width:500px; height: auto; padding:1px; border-radius:5px; background-color: white;"> <input class="com-cont" v-on:blur="() => updateComment(comment)"  v-model="comment.content.rendered"/></div>
            <div style="display: flex; justify-content: space-between; padding-top:0px; margin-top:0px;">
            <!-- <span v-html="comment.content.rendered"></span> -->
                <p>{{comment.date}}</p>
                  
                <button class="size btn btn-danger" @click="deleteComment(comment.id)">Delete</button>
            </div>
                    
        </div>
        
        <div class = "flex" v-if="true">
            <input type="text" class="input-card" placeholder="Create a New Comments" v-model="content" @keyup.enter="addComment(ArticleId)" />
        </div>
    </div>
</div>


</template>

<script>
import {mapState} from 'vuex';
const baseURL = 'https://twp.oxy-development.fr/wp-json/wp/v2/comments'
export default {

    props: ["ArticleId", "content"],
    
    mounted() {
        this.$store.dispatch('loadComments'),
        //console.log("mounted"),
        this.Iscomments();
    },
    computed: mapState([
        'comments',
    ]),
    data (){
        return {
            IsComment: true,
            AddnewComments: false
        }
    },
    
    methods:{
            Iscomments(){
           
            this.Iscomment=true
            
           
            },
            deleteComment(id){
                const url = "https://twp.oxy-development.fr/wp-json/wp/v2/comments/"+id+"?force=true";
                fetch(url, {
                    headers: {
                    'Authorization': 'Basic ZXBpdGVjaDpFcGl0ZWNoMTM=',
                    },
                    method: "DELETE",
                }),
                window.alert("the comment has been deleted, please click OK to reload the webpage ");
                window.location.reload();
                  
                },
                
            
            DisplayComment(){
                
                if (this.AddnewComments == true){
                    this.AddnewComments = false}
                else {this.AddnewComments = true}
               
            },
            async addComment(categoryId){
               
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
                window.alert("the new comment"+" '"+(this.content)+"' "+"has been added, please click OK to reload the webpage ");
                window.location.reload();

            },
        updateComment(comment){
            console.log(comment)
            var formdata = new FormData();
            formdata.append("content", comment.content.rendered);
            const url = "https://twp.oxy-development.fr/wp-json/wp/v2/comments/"+comment.id+"?force=true";
            fetch(url, {
                headers: {
                'Authorization': 'Basic ZXBpdGVjaDpFcGl0ZWNoMTM=',
                },
                method: "POST",
                body: formdata,
            });
            
            
        },   
    },
}
</script>

<style>

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
.boucleComment>* {
    flex: 1 1 160px;
}

.boucle{
    color: rgb(66, 66, 66);
    font-size: 15px;
    height: auto;
    margin-bottom:5px;
    width:500px;

}
</style>