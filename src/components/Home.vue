<template>
  <div class="container" v-if="this.$store.state.user.displayName">
  
    <form id="searchFriends" @submit.prevent="ValidateSearch" method="post" action='/users/list'>
    <div class="form-group">
      <input v-model="search" type="text" class="form-control" id="search" name="search" placeholder="search" data-vv-as="serch" data-vv-delay="500" v-validate="'required'">
      <p class="text-danger" align="left" v-if="errors.has('search')">{{ errors.first('search') }}</p>
    </div>
    <button class="btn btn-primary" type="submit">Search</button>
    </form>
  
    <hr>
    <h4>Welcome {{this.$store.state.user.displayName}}! What's happening?</h4>
    <br>
    <form id="addPost" @submit.prevent="Validate" method="post" action='.'>
    <div class="form-group">
      <input v-model="title" type="text" class="form-control" id="title" name="title" placeholder="Title" data-vv-as="title" data-vv-delay="500" v-validate="'required'">
      <p class="text-danger" align="left" v-if="errors.has('title')">{{ errors.first('title') }}</p>
    </div>
    <div class="form-group">
      <textarea v-model="body" class="form-control" id="body" rows="5"  name="body" placeholder="Write your thoughts here..." data-vv-as="body"  data-vv-delay="500" v-validate="'required'">
      </textarea>
      <p class="text-danger" align="left" v-if="errors.has('body')">{{ errors.first('body') }}</p>
    </div>
       <button class="btn btn-primary" type="submit">Post!</button>
    </form>
    <hr>
    <ul>
   <li v-for:"post in posts"> {{ post.title }} </li>
    </ul>
  
  </div>
  <div class="container" v-else>
    <h4>You must login to access Toro Net!</h4>
    <img src="https://qph.ec.quoracdn.net/main-qimg-0102f6e770d2ce1f45bd7066524b8f70" alt="Avatar" style="width:20% height=20%" class="w3-circle w3-margin-top">
  </div>
  
</template>

<script>
export default {
  name: 'Home',
  data:{
    posts:[],
    users:[]
  },
  methods: {
    Validate(e) {
      e.preventDefault()
      this.$validator.validateAll().then((result) => {
        if (result){
          document.querySelector("#addPost").submit()
          this.$router.push('/');
          return
      }
    })
    },
    ValidateSearch(e) {
      e.preventDefault()
      this.$validator.validateAll().then((result) => {
        if (result){
          var searchText=this.$route.params.search
          alert('called search')
         this.$http.get("/localhost:3000/users/list/"+search).then((response) => {
          this.$router.push('/');
          return
         })
      }
    })
    }
  },
  mounted() {
    this.posts=this.$store.dispatch('getPosts')
    this.$store.dispatch('getUser')
  },
}
</script>
