<template>
  <div>
    <div v-if="bbsConfigId">
      <b-table small :fields="fields" responsive :items="posts.rows" :busy="loading" label-align-sm="center">
        <template #table-busy>
          <div class="text-center text-warning my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>불러오는 중...</strong>
          </div>
        </template>

        <template #cell(seq)="{ value: seq }">
          {{ seq }}
        </template>

        <template #cell(title)="{ value: title }">
          {{ title }}
        </template>

        <template #cell(createdAt)="{ value: createdAt }">
          {{ createdAt | dateFromNow }}
        </template>
      </b-table>
      <b-pagination v-model="pagination.pageNumber" :total-rows="posts.total" :per-page="pagination.pageSize" @change="onChangePagination" />
    </div>
    <div v-else class="text-center text-danger my-2">
      <strong>게시판이 존재하지 않습니다.</strong>
    </div>
  </div>
</template>
<script>
import 'moment/locale/ko.js'
import moment from 'moment'

import { BSpinner, BTable, BPagination } from 'bootstrap-vue'

export default {
  components: { BSpinner, BTable, BPagination },
  filters: {
    dateFromNow: date => {
      const d = moment(date)
      const diff = Date.now() - date.getTime()

      if (diff < 1000 * 60 * 9) return d.fromNow()

      if (diff < 1000 * 60 * 30) return d.format('YYYY-MM-DD HH:mm')

      return d.format('YYYY-MM-DD')
    },
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      fields: [
        {
          key: 'seq',
          label: '번호',
          class: 'text-center',
        },
        {
          key: 'title',
          label: '제목',
          thClass: 'text-center',
        },
        {
          key: 'createdAt',
          label: '등록일',
          class: 'text-center',
        },
      ],
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
  computed: {
    bbsConfigId() {
      return this.$store.state.bbsConfigs.configs.find(({ slug }) => this.slug === slug)?._id
    },
  },
  mounted() {
    this.onChangePagination()
  },
  methods: {
    async loadPage({ from, size }) {
      if (!this.bbsConfigId) return

      this.loading = true

      const {
        data: { total, rows },
      } = await this.$axios.get('/api/posts/paginate', { params: { bbsConfigId: this.bbsConfigId, from, size } })

      this.posts = { total, rows: rows.map(row => Object.assign(row, { createdAt: new Date(row.createdAt) })) }

      this.loading = false
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
