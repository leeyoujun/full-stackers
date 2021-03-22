<template>
  <div>
    <b-button variant="primary" @click="axiosExample"> 호출 </b-button>

    <ul>
      <li v-for="({ title }, $index) in posts" :key="$index">
        {{ title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { BButton } from 'bootstrap-vue'

export default {
  components: { BButton },
  data() {
    return {
      posts: [],
    }
  },
  async mounted() {
    this.axiosExample()
  },
  methods: {
    async axiosExample() {
      /* ***************************************
       * axios 사용 예제
       * ***************************************
       * URL: /api/posts
       * METHOD: GET
       *
       * src/services/PostService.js에 구현한 API 호출
       *
       * constructor에서 라우트에 매핑한 함수가 호출됨. ( `PostService.getPosts` )
       * ************************************* */
      const { data: posts } = await this.$axios.get('/api/posts')

      // 서버로 부터 응답받은 json 데이터
      this.posts = posts
    },
  },
}
</script>
