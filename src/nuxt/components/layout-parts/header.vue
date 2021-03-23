<template>
  <header class="header-design">
    <div class="footer-wave">
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
    </div>
  </header>
</template>

<style scoped>
.header-design {
  background-color: #a4508b;
  background-image: linear-gradient(326deg, #a4508b 0%, #5f0a87 74%);
  height: 120px;
  text-align: center;
}

.footer-wave {
  max-width: 102%;
  width: 100%;
  height: 187.8px;
  left: 0;
  z-index: 1;
  bottom: -67px;
  background: url(https://1.bp.blogspot.com/-NYl6L8pz8B4/XoIVXwfhlNI/AAAAAAAAU3k/nxJKiLT706Mb7jUFiM5vdCsOSNnFAh0yQCLcBGAsYHQ/s1600/hero-wave.png)
    repeat-x;
  animation: wave 10s cubic-bezier(0.44, 0.66, 0.67, 0.37) infinite;
}

@keyframes wave {
  0% {
    background-position: 0;
  }
  100% {
    background-position: 1440px;
  }
}
</style>

<script>
import { BNavbar, BNavbarBrand, BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem } from 'bootstrap-vue'

export default {
  components: { BNavbar, BNavbarBrand, BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem },
}
</script>
