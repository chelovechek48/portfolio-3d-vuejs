<script setup>
import FirstScreen from '@components/FirstScreen.vue';
</script>

<template>
  <div class="page">
    <FirstScreen />
  </div>
</template>

<style lang="scss">
@forward '@styles';
@use '@vars/colors';

*::selection {
  color: #000;
  background: #00eeff;
}

.page {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  color: colors.$white;
  background-color: colors.$dark;
}
</style>
