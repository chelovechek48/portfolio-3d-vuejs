<script setup>
import ProjectDemo from '@components/ProjectDemo.vue';

import projects from '@/assets/json/projects.json';

const images = import.meta.glob('@images/projects/*.*', { eager: true });
const getImage = (imageName) => {
  const imageNameWithPath = `/src/assets/images/projects/${imageName}`;
  return images[imageNameWithPath].default;
};

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
        class="works__demo"
        :image="getImage(project.image)"
        :model="project.model"
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
    gap: 3rem;
    &:nth-child(even) {
      flex-direction: row-reverse;
    }
  }
  &__text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    z-index: 1;
  }
  &__demo {
    z-index: 2;
    --height: 45rem;
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
    z-index: 1;
    padding: 1rem 1.5rem;
    font-size: 1.5rem;
    font-weight: 500;

    position: relative;
    &::before {
      content: '';
      z-index: -1;
      position: absolute;
      inset: 0;
      background-color: var(--color-aqua);
      $clip-padding: 1.25rem;
      clip-path: polygon(
        100% 0,
        100% calc(100% - $clip-padding),
        calc(100% - $clip-padding) 100%,
        0 100%,
        0 0
      );
    }
  }
}
</style>
