<script setup>
import AppHero from '@components/AppHero.vue';
import ProjectList from '@components/ProjectList.vue';
</script>

<template>
  <div class="page">
    <AppHero />
    <ProjectList />
  </div>
</template>

<style lang="scss">
@forward '@styles';
@use '@vars/colors';
@use '@vars/breakpoints' as *;

:root {
  --color-text: #{colors.$white};
  --color-background: #{colors.$black};
  --color-aqua: #{colors.$aqua};
}

*::selection {
  color: #000;
  background: var(--color-aqua);
}

.container {
  width: 100%;
  max-width: $container;
  margin-inline: auto;
  padding-inline: $container-padding;
}

.page {
  color: var(--color-text);
  background-color: var(--color-background);

  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
