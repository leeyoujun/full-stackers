<template>
  <b-container>
    <layout-parts-header />

    <b-row>
      <b-col>
        <layout-parts-sidenav />
      </b-col>
      <b-col>
        <nuxt />
      </b-col>
    </b-row>

    <layout-parts-footer />
  </b-container>
</template>

<script>
import LayoutPartsHeader from '~/components/layout-parts/header'
import LayoutPartsSidenav from '~/components/layout-parts/sidenav'
import LayoutPartsFooter from '~/components/layout-parts/footer'

export default {
  components: { LayoutPartsHeader, LayoutPartsSidenav, LayoutPartsFooter },
}
</script>
