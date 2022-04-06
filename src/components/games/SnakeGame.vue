<template>
  <div
    class="h-100 w-100 d-flex justify-content-center align-items-center bg-light"
  >
    <canvas
      ref="canvas"
      width="400"
      height="400"
      style="background-color: black"
      class="px-0"
    ></canvas>
    <MDBRow class="px-5">
      <MDBBtn
        @click="isInit = !isInit"
        color="succcess"
        outline="dark"
        class="mb-5"
        >重新开始</MDBBtn
      >
      <MDBRange label="难度调节" v-model="degree" :min="1" :max="4"></MDBRange>
    </MDBRow>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { MDBRow, MDBBtn, MDBRange } from "mdb-vue-ui-kit";

const canvas = ref<HTMLCanvasElement>();

const isInit = ref<boolean>(false);

const degree = ref<number>(1);

//蛇身队列
let snake: number[];
/**
 * 运动方向
 *   1 right
 *  -1 left
 *  20 down
 * -20 up
 */
let direction: number;
//食物位置
let food: number;
let isDie: boolean;

const draw = (position: number, color: string): void => {
  const box = canvas.value.getContext("2d");
  box.fillStyle = color;
  box.fillRect(
    (position % 20) * 20 + 1,
    (0 | (position / 20)) * 20 + 1,
    18,
    18
  );
};

document.onkeydown = (e: KeyboardEvent): void => {
  let n;
  direction =
    snake[1] - snake[0] === (n = [-1, -20, 1, 20][e.keyCode - 37] || direction)
      ? direction
      : n;
};

const gameInit = () => {
  isDie = false;
  snake = [61, 60];
  direction = 1;
  while (snake.indexOf((food = (Math.random() * 400) | 0)) > 0);
  const box = canvas.value.getContext("2d");
  box.clearRect(0, 0, 400, 400);
  draw(food, "yellow");
};

const gameLoop = () => {
  if (isInit.value) {
    gameInit();
    isInit.value = false;
  }

  if (!isDie) {
    let n;
    //蛇头前进一个位置

    snake.unshift((n = snake[0] + direction));
    //判断是否出界或撞到蛇身
    if (
      snake.indexOf(n, 1) > 0 ||
      n < 0 ||
      n > 399 ||
      (direction === 1 && n % 20 === 0) ||
      (direction === -1 && n % 20 === 19)
    ) {
      isDie = true;
    } else {
      //绘制蛇头
      draw(n, "lime");
      //判断是否吃到食物
      if (n === food) {
        while (snake.indexOf((food = (Math.random() * 400) | 0)) > 0);
        draw(food, "yellow");
      } else {
        draw(snake.pop(), "black");
      }
    }
  }

  setTimeout(gameLoop, (5 - degree.value) * 100);
};
onMounted(() => {
  gameInit();
  gameLoop();
});
</script>
