<template>
  <footer>
    <b-container fluid class="bv-example-row">
      
      <b-row class="text-center justify-content-md-center mb-5">
        <b-col col lg="5">content-1</b-col>
        <b-col md="auto">content-2</b-col>
        <b-col col lg="5">content-3</b-col>
      </b-row>
      
      <b-row class="text-center justify-content-md-center mb-5">
        <b-col col lg="5">content-4</b-col>
        <b-col md="auto">content-5</b-col>
        <b-col col lg="5">content-6</b-col>
      </b-row>

      <b-row class="justify-content-md-center">
        <b-col md="auto">
          <h6 class="mb-0">&copy; {{ year }} Full-Stackers | All Rights Reserved.</h6>
        </b-col>
      </b-row>

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
