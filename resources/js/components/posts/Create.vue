<template>
  <div>
      <h1>Create</h1>
      <form @submit.prevent="savePost">
        <div class="form-group">
          <label>Title</label>
          <input type="text" v-model="fields.title" class="form-control">
          <div class="alert alert-danger" v-if="errors && errors.title">
            {{ errors.title[0] }}
          </div>
        </div>
        <div class="form-group">
          <label>Text</label>
          <textarea v-model="fields.text" class="form-control" rows="3"></textarea>
          <div class="alert alert-danger" v-if="errors && errors.text">
            {{ errors.text[0] }}
          </div>
        </div>
        <div class="form-group">
          <label>Category</label>
          <select class="form-control" v-model="fields.category_id">
            <option v-for="category in categories"
              :value="category.id" 
              :key="category.id">
              {{ category.name }}
              </option>
          </select>
          <div class="alert alert-danger" v-if="errors && errors.category_id">
            {{ errors.category_id[0] }}
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        categories: {},
        fields: {
          title: '',
          text: '',
          category_id: ''
        },
        errors: {}
      }
    },

    mounted() {
      axios.get('api/categories')
        .then(response => {
          this.categories = response.data.data
      })
    },

    methods: {
      savePost() {
        axios.post('api/posts', this.fields)
          .then(response => {
            this.$router.push('/');
        }).catch(error => {
          if(error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        })
      }
    }
  }
</script>

