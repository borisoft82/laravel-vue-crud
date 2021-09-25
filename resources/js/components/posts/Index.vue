  <template>
    <div>
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
          <tr v-for="post in posts" :key="post.id">
            <td>{{post.id}}</td>
            <td>{{post.title}}</td>
            <td>{{post.text}}</td>
            <td>{{post.created_at}}</td>
            <td>{{post.updated_at}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        posts: []
      }
    },

    mounted() {
      axios.get('/api/posts').then(response => {
        this.posts = response.data.data;
      });
    }
  }
</script>
