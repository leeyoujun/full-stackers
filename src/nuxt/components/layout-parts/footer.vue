<template>
  <footer>
    <b-container>
      <h6 class="mb-0">&copy; {{ year }} Full-Stackers | All Rights Reserved.</h6>
    </b-container>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
}
</script>
