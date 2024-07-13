<script setup>
import CanvasSphere from '@components/CanvasSphere.vue';
import AppSvg from '@components/AppSvg.vue';

const contacts = [
  {
    label: '+7 (900) 364 29 80',
    icon: 'call',
    href: 'tel:+79003642980',
  },
  {
    label: {
      full: 'maksim.ivanyuhin@yandex.ru',
      min: 'Почта',
    },
    icon: 'mail',
    href: 'mailto:maksim.ivanyuhin@yandex.ru',
  },
  {
    label: 'Telegram',
    icon: 'telegram',
    href: 'https://t.me/maksim_ivanyuhin',
  },
  {
    label: 'Discord',
    icon: 'discord',
    href: 'https://discordapp.com/users/ivanyukhin_maksim',
  },
  {
    label: 'Github',
    icon: 'github',
    href: 'https://github.com/chelovechek48',
  },
];
</script>

<template>
  <header class="hero">
    <div class="hero__container container">
      <h1 class="hero__title">
        Максим Иванюхин
      </h1>
      <address class="hero__contacts">
        <a
          v-for="contact in contacts" :key="contact.icon"
          :href="contact.href" target="_blank"
          class="hero__contacts-item"
          :class="contact.label.min ? 'hero__contacts-item_dynamical' : null"
          :data-label-full="contact.label.min ? contact.label.full : null"
          :data-label-min="contact.label.min ? contact.label.min : null"
        >
          <AppSvg :icon-id="contact.icon" />
          {{ !contact.label.min ? contact.label : '' }}
        </a>
      </address>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;
@use '@vars/mixins' as *;

.hero {
  padding-block: 5rem;

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  &__title {
    font-size: calc((min(100vw, $container) - $container-padding * 2) * 0.095);
    font-weight: 600;
    @include fill-text;
  }

  &__contacts {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    gap: 0.5em 0.75em;

    font-size: clamp(1.25rem, 2vw, 2rem);
    font-weight: 500;
    &-item {
      height: 1.5em;

      display: inilne-flex;
      align-items: center;
      gap: 0.25em;

      &_dynamical::after {
        @media (min-width: calc($mobile + 1px)) {
          content: attr(data-label-full);
        }
        @media (max-width: $mobile) {
          content: attr(data-label-min);
        }
      }
    }
  }
}
</style>
