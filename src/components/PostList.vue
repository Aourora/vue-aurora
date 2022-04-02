<template>
  <MDBCard
    v-for="post in list"
    :key="post.id"
    @click="onClick(post.id)"
    class="mb-6"
  >
    <MDBRow class="g-0">
      <MDBCol md="4">
        <MDBCardImg class="img-fluid rounded" :src="post.image" alt="..." />
      </MDBCol>
      <MDBCol md="8">
        <MDBCardBody>
          <MDBCardTitle> {{ post.title }}</MDBCardTitle>
          <MDBCardText>
            {{ post.excerpt }}
          </MDBCardText>
          <MDBCardText>
            <small class="text-muted"> {{ post.createdAt }}</small>
          </MDBCardText>
        </MDBCardBody>
      </MDBCol>
    </MDBRow>
  </MDBCard>
</template>

<script setup lang="ts">
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBCardImg,
} from "mdb-vue-ui-kit";
import { PostProps } from "@/utils/props";
import { defineProps, PropType } from "vue";
import { useRouter } from "vue-router";
defineProps({
  list: { type: Array as PropType<PostProps[]>, required: true },
});

const router = useRouter();
const onClick = (id: number) => {
  router.push(`/postDetail/${id}`);
};
</script>

<style>
.post-list img {
  width: 200px;
  height: 150px;
}
</style>
