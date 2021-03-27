

<template>
  <footer class="bg-dark">
    <b-container fluid class="bv-example-row">
      
      <b-row class="text-center justify-content-md-center mb-5">
        <b-col col lg="2">link1</b-col>
        <b-col col lg="2">link2</b-col>
        <b-col col lg="2">link3</b-col>
        <b-col cols="2">
          <b-input-group size="lg">
            <b-input-group-prepend is-text>
              <b-icon icon="envelope"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="email" placeholder="me@example.com"></b-form-input>
          </b-input-group>
        </b-col>
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
import { BInputGroup,BInputGroupPrepend,BIcon,BFormInput,BIconEnvelope } from 'bootstrap-vue'



export default {
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
  components: { BInputGroup,BInputGroupPrepend,BIcon,BFormInput,BIconEnvelope },
}
</script>
