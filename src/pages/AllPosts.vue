<template>
  <div class="page-wrapper">
    <div class="container">
      <loader v-if='loading'/>
      <div class="posts" v-else-if='posts.length'>
        <div class="search-form">
          <input class="search-field" type="text" v-model="searchQuery" placeholder="Search posts..." />
        </div>
        <div class="single-post" v-for="(post, index) in searchedPosts" :key="index">
          <div class="post-author" v-if="post.author">
            <p class="author-placeholder">Author: </p>
            <p class="author-name"></p> {{ post.author.username }}
          </div> 
          <div class="post-information">
            <h2 class="post-title" @click="openSinglePost(post.id)">{{ post.title }}</h2>
            <p class="post-description">
              {{ post.body}}
            </p>
          </div>
          <a class="post-read-link" @click="openSinglePost(post.id)">
              Read
          </a>
        </div>
      </div>
      <p v-else class="404-message">There is no posts.</p>
      <div v-if="this.searchQuery && !this.searchedPosts.length">
        <p>No results found!</p>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'AllPosts',
  data() {
    return {
      posts: [],
      loading: false,
      usersMap: {},
      searchQuery: null
    }
  },
  mounted () {
    const postPromise = this.getAllPosts()
    const usersPromise = this.getUsers()
    this.loading = true
    Promise.all([postPromise, usersPromise]).then((response) => {
        this.loading = false
    }).catch(err => {
      this.loading = false
      console.log(err)
    })
  },
  computed: {
    searchedPosts() {
      if(this.searchQuery) {
        return this.posts.filter((post) =>
          post.author.username.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      else {
        return this.posts;
      }
    }
  },
  methods: {
    getAllPosts () {
      return new Promise ((resolve, reject) => {
          axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
            if (response && response.data && Array.isArray(response.data)) {
              this.posts = response.data;
              resolve("OK")
            }
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    getUsers () {
      return new Promise ((resolve, reject) => {
        axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
          if (response && response.data && Array.isArray(response.data)) {
            response.data.forEach(user => {
              this.usersMap[user.id] = user;
            })
            //get user for each post
            this.posts.forEach(post => {
              post.author = this.usersMap[post.userId];
            });
            this.$forceUpdate();
            resolve("OK")
          }
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    openSinglePost (postId) {
      this.$router.push({
        name: "SinglePost",
        params: { id: postId }
      })
    }
  },
  components: {
    
  },
}
</script>
