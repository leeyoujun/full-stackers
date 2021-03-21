<template>
  <b-navbar variant="faded" type="light">
    <b-container>
      <b-navbar-brand to="/">Full Stackers</b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item to="/blog">블로그</b-nav-item>
        <b-nav-item to="/bbs">게시판</b-nav-item>
        <b-nav-item to="/admin">관리자</b-nav-item>

        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="메뉴 1" right>
          <b-dropdown-item to="#">서브 메뉴 1</b-dropdown-item>
          <b-dropdown-item to="#">서브 메뉴 2</b-dropdown-item>
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
