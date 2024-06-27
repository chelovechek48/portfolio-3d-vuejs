<script setup>
import CanvasCubes from '@components/CanvasCubes.vue';
</script>

<template>
  <header class="hero">
    <div class="hero__container">
      <span class="hero__span">
        Максим Иванюхин Vue.js
      </span>
      <h1 class="hero__title">
        Фронтенд разработчик
      </h1>
    </div>
    <CanvasCubes class="hero__canvas" />
  </header>
</template>

<style lang="scss" scoped>
.hero {
  flex: 1 1 auto;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &__canvas {
    z-index: 1;
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  &__container {
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

  }

  &__span {
    color: #919191;
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: 0.25em;
  }

  &__title {
    color: #fff;
    font-size: 6.25rem;
    font-weight: 600;
  }
}
</style>
