<template>
  <div class="background-container">
    <div class="d-flex justify-content-center align-items-center card-form">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.background-container {
  background-image: url("../../public/bg.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  height: calc(100vh - 232px);
}
.card-form {
  right: 20%;
  top: 25%;
  position: absolute;
  width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
