  <template>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#ID</th>
            <th scope="col">Title</th>
            <th scope="col">Text</th>
            <th scope="col">Created</th>
            <th scope="col">Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts.data" :key="post.id">
            <td>{{post.id}}</td>
            <td>{{post.title}}</td>
            <td>{{post.text}}</td>
            <td>{{post.created_at}}</td>
            <td>{{post.updated_at}}</td>
          </tr>
        </tbody>
      </table>
      <pagination :data="posts" @pagination-change-page="getResults"></pagination>
    </div>
</template>

<script>
  import pagination from 'laravel-vue-pagination';

  export default {
    components:{
            pagination
        },

    data() {
      return {
        posts: {}
      }
    },

    mounted() {
      this.getResults();
    },

    methods: {
      getResults(page = 1) {
        axios.get('/api/posts?page=' + page)
          .then(response => {
            this.posts = response.data;
          });
    }
  }
  }
</script>
