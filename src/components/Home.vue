<template>
  <div class="container" v-if="this.$store.state.user.displayName">
    
  
    <hr>
    <h4>Welcome {{this.$store.state.user.displayName}}! What's happening?</h4>
    <br>
    <form id="addPost" @submit.prevent="Validate" method="post" action='/posts/create'>
    <div class="form-group">
      <input v-model="title" type="text" class="form-control" id="title" name="title" placeholder="Title" data-vv-as="title" data-vv-delay="500" v-validate="'required'">
      <p class="text-danger" align="left" v-if="errors.has('title')">{{ errors.first('title') }}</p>
    </div>
    <div class="form-group">
      <textarea v-model="body" class="form-control" id="body" rows="5"  name="body" placeholder="Write your thoughts here..." data-vv-as="body"  data-vv-delay="500" v-validate="'required'">
      </textarea>
      <p class="text-danger" align="left" v-if="errors.has('body')">{{ errors.first('body') }}</p>
    </div>
       <button class="btn btn-primary" type="submit" onclick="location.reload()">Post!</button>
    </form>
    <hr>
    <center>
   <table class="table table-striped table-borderes">
   <thead>
   <tr>
     <th> title </th>
     <th> body </th>
     <th> Post Date </th>
   </tr>
   </thead>
   <tr v-for="posts_alias in posts">
   <td class="text-left">{{posts_alias.title}}</td>
   <td class="text-left">{{posts_alias.body}}</td>
   <td class="text-left">{{posts_alias.createdOn}}</td>
   </table>
  </div>
  <div class="container" v-else>
    <h4>You must login to access Toro Net!</h4>
    <img src="https://qph.ec.quoracdn.net/main-qimg-0102f6e770d2ce1f45bd7066524b8f70" alt="Avatar" style="width:20% height=20%" class="w3-circle w3-margin-top">
  </div>
  
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data(){

    return {
     // title: "title",
     // body: "body"
     posts: [],
    }
  },

  methods: {
    Validate(e) {
      e.preventDefault()
      this.$validator.validateAll().then((result) => {
        if (result){

          const newPost={
           userId: this.$store.state.user,
            title: this.title,
            body: this.body,
            createdOn: new Date
          
          }
          console.log(newPost)
          /* document.querySelector("#addPost").submit() */
          this.$store.dispatch("addPost", newPost )
          this.body="Write your thoughts here..."
          this.title=""
          this.$router.push('/');
          return
         }
      })
    }
  },
  mounted() {
 axios.get('http://localhost:3000/posts')
 .then((response) => {
 console.log(response.data);
 this.posts = response.data;
 })
.cathc((error) => {
  console.log(error);
});
  }
}
</script>
