<template>
  <div>
    <h3>최신글 목록</h3>

    <b-container id="btn-group-render-type">
      <button @click="toggleRenderType($event, 'list')">
        <b-icon-card-list></b-icon-card-list>
      </button>
      <button @click="toggleRenderType($event, 'thumbnail')">
        <b-icon-images></b-icon-images>
      </button>
    </b-container>
    <section v-if="renderType === 'list'">
      <b-list-group>
        <b-list-group-item v-for="(post, idx) of posts" :key="post._id">
          <b-container>
            <b-row>
              <b-col cols="2">
                <b-img thumbnail fluid :src="`https://picsum.photos/${90}/${90}/?image=${10 * idx}`" alt="Image 1"></b-img>
              </b-col>
              <b-col>
                <h4>{{ post.title }}</h4>
                <h5>{{ post.content }}</h5>
                {{ date_to_str(post.updatedAt) }}
              </b-col>
            </b-row>
          </b-container>
        </b-list-group-item>
      </b-list-group>
    </section>

    <section v-else>
      <b-container fluid class="p-4">
        <b-row>
          <b-col v-for="(post, idx) of posts" :key="post._id" cols="4">
            <b-img thumbnail fluid :src="`https://picsum.photos/${250}/${250}/?image=${10 * idx}`" alt="Image 1"></b-img>
            <p class="thumbnail-title">{{ post.title }}</p>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import { BListGroup, BListGroupItem, BImg, BContainer, BRow, BCol, BIconCardList, BIconImages } from 'bootstrap-vue'
export default {
  components: {
    BListGroup,
    BListGroupItem,
    BImg,
    BContainer,
    BRow,
    BCol,
    BIconCardList,
    BIconImages,
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      posts: [],
      renderType: 'thumbnail',
    }
  },
  computed: {
    bbsConfigId() {
      return this.$store.state.bbsConfigs.configs.find(({ slug }) => this.slug === slug)?._id
    },
  },
  async mounted() {
    //! 게시판, 블로그 등 카테고리 구분지을 필요 있다면
    // const { data: bbs } = await this.$axios.get("/api/configs/bbs");
    // console.log("bbs", bbs);

    //! pagination api로 개수 10개 제한해서 가져오기
    // const { data: posts } = await this.$axios.get("/api/posts");
    const size = 10
    const {
      data: { rows },
    } = await this.$axios.get('/api/posts/paginate', {
      params: { bbsConfigId: this.bbsConfigId, from: 0, size },
    })

    this.posts = rows //posts
  },

  methods: {
    date_to_str(timestamp) {
      const format = new Date(timestamp)
      var year = format.getFullYear()
      var month = format.getMonth() + 1
      if (month < 10) month = '0' + month
      var date = format.getDate()
      if (date < 10) date = '0' + date
      var hour = format.getHours()
      if (hour < 10) hour = '0' + hour
      var min = format.getMinutes()
      if (min < 10) min = '0' + min
      var sec = format.getSeconds()
      if (sec < 10) sec = '0' + sec
      return year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec
    },
    toggleRenderType(e, type) {
      this.renderType = type
    },
  },
}
</script>

<style>
#btn-group-render-type {
  display: inline-flex;
  justify-content: flex-end;
  padding: 0;
}

#btn-group-render-type > #btn-group-render-type:not(:last-child) > button {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

#btn-group-render-type > button {
  color: #6c757d;
  background-color: transparent;
  border: 1px solid #6c757d;
  padding: 0.375rem 0.75rem;

  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

#btn-group-render-type > button:hover {
  background: #5a6168;
  color: white;
}

.thumbnail-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
