<template>
  <div>
    <b-list-group v-for="({ title }, $index) in posts.rows" :key="$index" horizontal>
      <b-list-group-item>Cras justo odio</b-list-group-item>
      <b-list-group-item>{{ title }}</b-list-group-item>
      <b-list-group-item>Morbi leo risus</b-list-group-item>
    </b-list-group>

    <b-pagination v-model="pagination.pageNumber" :total-rows="posts.total" :per-page="pagination.pageSize" @change="onChangePagination" />
  </div>
</template>
<script>
import { BListGroup, BListGroupItem, BPagination } from 'bootstrap-vue'

export default {
  components: { BListGroup, BListGroupItem, BPagination },
  data() {
    return {
      pagination: {
        pageNumber: 1,
        pageSize: 10,
      },
      posts: {
        total: 0,
        rows: [],
      },
    }
  },
  mounted() {
    this.onChangePagination()
  },
  methods: {
    async loadPage({ from, size }) {
      const {
        data: { total, rows },
      } = await this.$axios.get('/api/posts/paginate', { params: { from, size } })

      this.posts = { total, rows }
    },
    async onChangePagination(page = 1) {
      this.pagination.pageNumber = page
      this.loadPage({
        from: (this.pagination.pageNumber - 1) * this.pagination.pageSize,
        size: this.pagination.pageSize,
      })
    },
  },
}
</script>
