<template>
  <MDBFooter class="footer-container" bg="dark" :text="['center', 'white']">
    <MDBContainer class="p-4 pb-0">
      <section class="mb-4">
        <MDBBtn tag="a" outline="light" href="#!" floating class="m-1">
          <MDBIcon iconStyle="fab" icon="facebook-f"></MDBIcon>
        </MDBBtn>
        <MDBBtn tag="a" outline="light" href="#!" floating class="m-1">
          <MDBIcon iconStyle="fab" icon="twitter"></MDBIcon>
        </MDBBtn>
        <MDBBtn tag="a" outline="light" href="#!" floating class="m-1">
          <MDBIcon iconStyle="fab" icon="google"></MDBIcon>
        </MDBBtn>
        <MDBBtn tag="a" outline="light" href="#!" floating class="m-1">
          <MDBIcon iconStyle="fab" icon="instagram"></MDBIcon>
        </MDBBtn>
        <MDBBtn tag="a" outline="light" href="#!" floating class="m-1">
          <MDBIcon iconStyle="fab" icon="linkedin-in"></MDBIcon>
        </MDBBtn>
        <MDBBtn tag="a" outline="light" href="#!" floating class="m-1">
          <MDBIcon iconStyle="fab" icon="github"></MDBIcon>
        </MDBBtn>
      </section>
    </MDBContainer>
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
      © 2020 Copyright:
      <a class="text-white" href="https://kaiking.ltd/">kaiking.ltd</a>
    </div>
    <!-- Copyright -->
  </MDBFooter>
</template>
<script setup lang="ts">
import { MDBFooter, MDBContainer, MDBBtn, MDBIcon } from "mdb-vue-ui-kit";
</script>

<style>
.footer-container {
  height: 152px;
}
</style>
