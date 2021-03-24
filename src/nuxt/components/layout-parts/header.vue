<template>
  <b-navbar variant="faded" type="light">
    <b-container>
      <b-navbar-brand to="/">Full Stackers</b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item to="/blog">블로그</b-nav-item>
        <b-nav-item to="/bbs">게시판</b-nav-item>
        <b-nav-item to="/admin">관리자</b-nav-item>

        <!-- Navbar dropdowns -->
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
}
</script>
