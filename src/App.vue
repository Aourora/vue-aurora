<template>
  <div class="container">
    <global-header :user="userData" />
    <router-view></router-view>
    <global-footer></global-footer>
  </div>
</template>

<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css";

import GlobalHeader from "./components/GlobalHeader.vue";

import GlobalFooter from "./components/GlobalFooter.vue";
import { useStore } from "./store";
import { computed } from "vue";

const userData = computed(() => useStore().state.user);
</script>
