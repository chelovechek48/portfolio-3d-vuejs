<script setup>
import CanvasSphere from '@components/CanvasSphere.vue';
</script>

<template>
  <header class="hero">
    <div class="hero__container container">
      <span class="hero__span">
        Максим Иванюхин
      </span>
      <h1 class="hero__title">
        Фронтенд разработчик
      </h1>
    </div>
    <CanvasSphere class="hero__animated-sphere" />
  </header>
</template>

<style lang="scss" scoped>
@use '@vars/mixins' as *;

.hero {
  min-height: 100dvh;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &__animated-sphere {
    z-index: 1;
    position: absolute;
    pointer-events: none;
  }

  &__container {
    z-index: 2;
    text-align: center;
  }

  &__title {
    font-size: 6rem;
    font-size: clamp(1.5rem, 5vw, 6rem);
    font-weight: 600;
    word-break: break-word;
  }

  &__span {
    font-size: 2.25rem;
    font-weight: 600;
    letter-spacing: 0.25em;
    @include fill-text;
  }
}
</style>
