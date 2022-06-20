<template>
  <div class="page-wrapper single-post-wrapper">
    <div class="container">
    <loader v-if='loading || commentsLoading'/>
    <div v-else class="single-post">
      <div class="post-information">
        <a class="post-back-link" @click="goToAllPosts">See all posts</a>
        <h2 class="post-title">{{ post.title }}</h2>
        <p class="post-description">
          {{ post.body}}
        </p>
      </div>
      <div class="post-comments">
        <div class="post-title">Comments:</div>
        <div class="single-comment" v-for="(comment, index) in comments" :key="index">
          <p class="comments-author">
            <span class="post-label">Author: </span>
            <span class="comment-text">{{ comment.email }}</span>
          </p>
          <p class="comments-title">
            <span class="post-label">Title: </span>
            <span class="comment-text">{{ comment.name }}</span>
          </p>
          <p class="comments-description">
            <span class="post-label">Comment: </span>
            <span class="comment-text">{{ comment.body}}</span>
          </p>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SinglePost',
  data () {
    return {
      comments: [],
      post: {},
      loading: false,
      commentsLoading: false,
      usersMap: [],
      user: null
    }
  },
  mounted() {
    this.getSinglePost();
  },
  computed: {
    postId () {
      return this.$route.params.id || 0;
    }
  },
  methods: {
    getAllComments () {
      this.commentsLoading = true;
      let url = `https://jsonplaceholder.typicode.com/comments?postId=${this.postId}`
      axios.get(url).then(data => {
        if (data && data.data && Array.isArray(data.data)) {
          this.comments = data.data;
        }
       this.commentsLoading = false;
      })
      .catch(err => {
        this.commentsLoading = false
        console.log(err, 'err')
      })
    },
    getSinglePost() {
      this.loading = true;
      let url = `https://jsonplaceholder.typicode.com/posts/${this.postId}`
      axios.get(url).then(data => {

        console.log(data, 'data')
        if (data && data.data && this.postId !== 0) {
          this.post = data.data
          this.getAllComments();  
        }
       this.loading = false;
      })
      .catch(err => {
        this.loading = false
        console.log(err, 'err')
      })
    },
    goToAllPosts() {
      this.$router.push({
        name: "AllPosts"
      })
    }
  }
}
</script>
