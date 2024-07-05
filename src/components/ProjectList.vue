<script setup>
import ProjectDemo from '@components/ProjectDemo.vue';

const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
});

</script>

<template>
  <ul class="container">
    <li
      v-for="project in projects" :key="project.id"
      class="works__item"
    >
      <div class="works__text">
        <span class="works__span" />
        <h2 class="works__title">
          {{ project.title }}
        </h2>
        <p class="works__description">
          {{ project.description }}
        </p>
        <a class="works__button" href="#">
          Открыть демо
        </a>
      </div>
      <ProjectDemo
        :image="project.image"
        class="works__image"
      />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@use '@vars/colors';

.works {
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  &__span {
    width: 100%;
    height: 3px;
    background-color: var(--color-aqua);

    display: flex;
    align-items: flex-end;

    &::before {
      content: '';
      width: 10rem;
      margin-left: -1.5rem;
      height: 1.5rem;
      background-color: var(--color-aqua);
      clip-path: polygon(0 0, 85% 0, 100% 100%, 15% 100%);
    }
  }

  &__title {
    font-size: 2rem;
  }
  &__description {
    font-size: 1.25rem;
    line-height: 1.5;
  }
  &__button {
    color: var(--color-background);
    background-color: var(--color-aqua);
    padding: 1rem 1.5rem;
    font-size: 1.5rem;
    font-weight: 500;
  }

  &__image {
    // aspect-ratio: 15 / 10;
    $height: 45rem;
    margin-right: calc(0px - $height * 0.3);
    margin-left: calc(0px - $height * 0.25);
    height: $height;
  }
}
</style>
