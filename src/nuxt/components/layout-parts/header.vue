<template>
  <b-navbar variant="faded" type="light">
    <b-container>
      <b-navbar-brand to="/">Full Stackers</b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item-dropdown text="블로그" right>
          <b-dropdown-item v-for="({ title, slug }, $index) in blogs" :key="$index" :to="`/bbs/${slug}`">
            {{ title }}
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="게시판" right>
          <b-dropdown-item v-for="({ title, slug }, $index) in bbses" :key="$index" :to="`/bbs/${slug}`">
            {{ title }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item to="/admin">관리자</b-nav-item>

        <b-nav-item-dropdown text="예제" right>
          <b-dropdown-item to="/example-bootstrap-vue-with-axios">부트스트랩과 Axios</b-dropdown-item>
          <b-dropdown-item to="/example-custom-component">사용자 정의 컴포넌트</b-dropdown-item>
          <b-dropdown-item to="#">서브 메뉴 3</b-dropdown-item>
          <b-dropdown-item to="#">서브 메뉴 4</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>

<script>
import { BNavbar, BNavbarBrand, BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem } from 'bootstrap-vue'

export default {
  components: { BNavbar, BNavbarBrand, BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem },
  computed: {
    stateBbsConfigs() {
      return this.$store.state.bbsConfigs.configs || []
    },
    blogs() {
      return this.stateBbsConfigs.filter(({ type }) => type === 'blog')
    },
    bbses() {
      return this.stateBbsConfigs.filter(({ type }) => type === 'bbs')
    },
  },
}
</script>
