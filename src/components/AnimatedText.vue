<script setup>
defineProps({
  tag: {
    type: String,
    required: false,
    default: 'span',
  },
  text: {
    type: String,
    required: true,
  },
  color: {
    type: Object,
    required: false,
    default: () => ({
      text: 'var(--color-text)',
      fill: 'var(--color-aqua)',
    }),
  },
  timing: {
    type: Object,
    required: false,
    default: () => ({
      duration: '3s',
      delay: '1s',
    }),
  },
});
</script>

<template>
  <component
    class="animated-text__wrapper"
    :is="tag"
    :style="`
      --color: ${color.text};
      --fill: ${color.fill};
      --duration: ${timing.duration};
      --delay: ${timing.delay};
    `"
  >
    {{ text }}
    <span class="animated-text">
      {{ text }}
    </span>
  </component>
</template>

<style lang="scss" scoped>
@use '@vars/animations';

$ease: cubic-bezier(0.25, 0.1, 0.25, 1.0);
.animated-text {
  &__wrapper {
  z-index: 1;
  position: relative;

  color: transparent;
  background-image: linear-gradient(
    90deg,
    transparent 50%, var(--fill) 50%
  );
  background-size: 200%;
  animation:
    move-fill
    var(--duration) var(--delay)
    $ease;

  }

  & {
    z-index: -1;
    position: absolute;
    inset: 0;
    pointer-events: none;

    opacity: 0;
    color: var(--color);
    animation:
      show-text
      var(--duration) var(--delay)
      $ease
      forwards;
  }
}
</style>
