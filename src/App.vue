<script setup>
import AppHero from '@components/AppHero.vue';
import AppWorks from '@components/AppWorks.vue';
import CanvasSphere from '@components/CanvasSphere.vue';
</script>

<template>
  <div class="page">
    <CanvasSphere />
    <AppHero />
    <AppWorks />
  </div>
</template>

<style lang="scss">
@forward '@styles';
@use '@vars/colors';
@use '@vars/breakpoints' as *;

*::selection {
  color: #000;
  background: colors.$aqua;
}

.container {
  width: 100%;
  max-width: $container;
  margin-inline: auto;
  padding-inline: $container-padding;
}

.page {
  color: colors.$white;
  background-color: colors.$black;

  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
