<template>
  <MDBRow :cols="['1', 'md-3']" class="g-4 mx-2 my-2"
    ><MDBCol v-for="column in columnList" :key="column.id">
      <MDBCard @click="onClick(column.id)" class="card-container">
        <MDBCardImg :src="column.avatar" class="h-50" top alt="..." />
        <MDBCardBody style="background-color: #bdbdbd" class="h-50">
          <MDBCardTitle>{{ column.title }}</MDBCardTitle>
          <MDBCardText class="card-text-container">
            {{ column.description }}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>
</template>

<script setup lang="ts">
import { ColumnProps } from "@/utils/props";
import { computed, defineProps, PropType } from "vue";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBCardImg,
} from "mdb-vue-ui-kit";
import { useRouter } from "vue-router";

const props = defineProps({
  list: {
    type: Array as PropType<ColumnProps[]>,
    required: true,
  },
});

const columnList = computed(() => {
  return props.list.map((cloumn) => {
    if (!cloumn.avatar) {
      cloumn.avatar = require("@/assets/column.png");
    }
    return cloumn;
  });
});

const router = useRouter();

const onClick = (id: number): void => {
  router.push(`/columnDetail/${id}`);
};
</script>

<style>
.card-container {
  height: 600px;
}
.card-text-container {
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100px;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
}
</style>
