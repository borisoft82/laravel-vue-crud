  <template>
    <div class="container">
      <select v-model="category_id" class="form-control col-md-3">
        <option value="">-- select category --</option>
        <option v-for="category in categories" :value="category.id" :key="category.id">
          {{ category.name}}
        </option>
      </select>
      <table class="table mt-3">
        <thead>
          <tr>
            <th scope="col">
              <a href="#" @click.prevent="changeSort('id')">#ID</a>
              <span v-if="sort_field == 'id' && sort_order == 'asc'">&uarr;</span>
              <span v-if="sort_field == 'id' && sort_order == 'desc'">&darr;</span>
            </th>
            <th scope="col">
              <a href="#" @click.prevent="changeSort('title')">Title</a>
              <span v-if="sort_field == 'title' && sort_order == 'asc'">&uarr;</span>
              <span v-if="sort_field == 'title' && sort_order == 'desc'">&darr;</span>
            </th>
            <th scope="col">
              <a href="#" @click.prevent="changeSort('text')">Text</a>
              <span v-if="sort_field == 'text' && sort_order == 'asc'">&uarr;</span>
              <span v-if="sort_field == 'text' && sort_order == 'desc'">&darr;</span>
            </th>
            <th scope="col">
              <a href="#" @click.prevent="changeSort('created_at')">Created</a>
              <span v-if="sort_field == 'created_at' && sort_order == 'asc'">&uarr;</span>
              <span v-if="sort_field == 'created_at' && sort_order == 'desc'">&darr;</span>
            </th>
            <th scope="col">
              <a href="#" @click.prevent="changeSort('updated_at')">Updated</a>
              <span v-if="sort_field == 'updated_at' && sort_order == 'asc'">&uarr;</span>
              <span v-if="sort_field == 'updated_at' && sort_order == 'desc'">&darr;</span>
            </th>
            <th scope="col">Category</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts.data" :key="post.id">
            <td>{{post.id}}</td>
            <td>{{post.title}}</td>
            <td>{{post.text}}</td>
            <td>{{post.created_at}}</td>
            <td>{{post.updated_at}}</td>
            <td>{{post.category_name}}</td>
            <td>
              <router-link class="btn btn-info btn-sm" :to="{ name: 'posts.edit', params: { id: post.id} }"><i class="bi bi-pencil-square"></i></router-link>
              <button @click="deletePost(post.id)" class="btn btn-danger btn-sm"><i class="bi bi-trash"></i></button>
              </td>
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
        posts: {},
        categories: {},
        category_id: '',
        sort_field: 'created_at',
        sort_order: 'desc'
      }
    },

    mounted() {
      this.getCategories();
      this.getResults();
    },

    watch: {
      category_id(value) {
        this.getResults();
      }
    },

    methods: {
      getResults(page = 1) {
        axios.get('/api/posts?page=' + page 
        + '&category_id=' + this.category_id 
        + '&sort_field=' + this.sort_field 
        + '&sort_order=' + this.sort_order)
          .then(response => {
            this.posts = response.data;
          });
    },

    getCategories() {
      axios.get('/api/categories')
          .then(response => {
            this.categories = response.data.data;
          });
    },

    changeSort(field) {
      if(this.sort_field === field) {
        this.sort_order = this.sort_order === 'asc' ? 'desc' : 'asc';
      } else {
        this.sort_field = field;
        this.sort_order = 'asc';
      }
      this.getResults();
    },

    deletePost(post_id) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert post!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if(result.value) {
          axios.delete('/api/posts/' + post_id)
          .then(response => {
            this.$swal('Post deleted successfully');
            this.getResults();
        }).catch(error => {
              this.$swal({
                icon: 'error',
                title: 'Validation error'
            });
          })
        }
      })
    }
  }
}
</script>
