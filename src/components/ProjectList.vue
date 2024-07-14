<script setup>
import CanvasModel from '@components/CanvasModel.vue';
import AppSvg from '@components/AppSvg.vue';

import projects from '@/assets/json/projects.json';

const images = import.meta.glob('@images/projects/*.*', { eager: true });
const getImages = (imagesSource) => {
  const entries = Object.entries(imagesSource);
  const obj = {};
  entries.forEach((el) => {
    const type = el[0];
    const path = el[1];
    const imageNameWithPath = `/src/assets/images/projects/${path}`;
    obj[type] = images[imageNameWithPath].default;
  });
  return obj;
};

</script>

<template>
  <ul class="works__list container">
    <li
      v-for="project in projects" :key="project.link"
      class="works__item"
    >
      <div class="works__text" ref="text">
        <span class="works__span" />
        <h2 class="works__title">
          {{ project.title }}
        </h2>
        <p class="works__description">
          {{ project.description }}
        </p>
        <div class="works__button-list">
          <a class="works__button works__button_git" :href="project.link.github" target="_blank">
            <AppSvg icon-id="github" />
          </a>
          <a class="works__button works__button_demo" :href="project.link.demo" target="_blank">
            Открыть демо
          </a>
        </div>
      </div>
      <CanvasModel
        class="works__demo"
        :images="getImages(project.image)"
        :model="project.model"
      />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@use '@vars/colors';
@use '@vars/breakpoints' as *;

.works {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }
  &__item {
    display: flex;
    align-items: center;
    gap: clamp(1rem, 3vw, 3rem);
    &:nth-child(even) {
      flex-direction: row-reverse;
    }

    flex-wrap: wrap;
    justify-content: center;
  }
  &__text {
    flex: 1 0 min(25rem, 100%);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: clamp(1rem, 2vw, 1.5rem);
    z-index: 1;
  }
  &__demo {
    z-index: 2;
  }

  &__span {
    width: 100%;
    height: 3px;
    background-color: var(--color-aqua);

    display: flex;
    align-items: flex-end;
    margin-top: 1.5rem;

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
    font-size: clamp(1.5rem, 2.5vw, 2rem);
  }
  &__description {
    font-size: clamp(1rem, 1.5vw, 1.25rem);
    line-height: 1.5;
  }
  &__button {
    &-list {
      display: flex;
      gap: clamp(1rem, 1.5vw, 1.25rem);
    }

    $size: clamp(1.25rem, 2vw, 1.5rem);
    $line-height: 1.3;

    color: var(--color-background);

    &_git {
      height: calc($size * $line-height);
      background-color: var(--color-aqua);
      box-sizing: content-box;
      padding: 1rem;
    }

    &_demo {
      padding: 1rem 1.5rem;
      font-size: $size;
      font-weight: 500;
      line-height: $line-height;

      z-index: 1;
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
}
</style>
