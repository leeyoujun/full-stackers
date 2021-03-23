<template>
  <div>
    <layout-parts-header />

    <b-container class="pb-4">
      <nuxt class="py-4" />
    </b-container>

    <layout-parts-footer class="fixed-bottom py-3 px-2 bg-white shadow-sm" />
  </div>
</template>

<script>
import LayoutPartsHeader from '~/components/layout-parts/header'
import LayoutPartsFooter from '~/components/layout-parts/footer'

export default {
  components: { LayoutPartsHeader, LayoutPartsFooter },
}
</script>
