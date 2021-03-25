<template>
  <div>
    <h2 class="mb-4">{{ stateBbsConfigTitle }}</h2>
    <bbs-list :slug="paramsSlug" />
  </div>
</template>

<script>
import BbsList from '~/components/bbs/list'

export default {
  components: { BbsList },
  computed: {
    paramsSlug() {
      return this.$route.params.slug
    },
    stateBbsConfigs() {
      return this.$store.state.bbsConfigs?.configs || []
    },
    stateBbsConfig() {
      return this.stateBbsConfigs.find(({ slug }) => this.paramsSlug === slug)
    },
    stateBbsConfigTitle() {
      return this.stateBbsConfig?.title
    },
  },
}
</script>
