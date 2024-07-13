<script setup>
import spritePath from '@icons/sprite.svg';

defineProps({
  iconId: {
    type: String,
    required: true,
  },
  viewBox: {
    type: String,
    required: false,
    default: '0 0 1 1',
  },
  sprite: {
    type: String,
    required: false,
    default: spritePath,
  },
});
</script>

<template>
  <svg :viewBox="viewBox">
    <use :xlink:href="`${sprite}#${iconId}`" />
  </svg>
</template>

<style lang="scss" scoped>
svg {
  height: 100%;
}
</style>
