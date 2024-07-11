/* eslint-disable no-param-reassign */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import macBookModel from '@/assets/models/macbook.glb';
import iPhoneModel from '@/assets/models/iphone.glb';
import iPadModel from '@/assets/models/ipad.glb';

const degUnit = 0.017453292519943295; // equal three.js MathUtils.degToRad(1)
const toDeg = (value) => degUnit * value;

gsap.registerPlugin(ScrollTrigger);
const getTimeline = (element) => gsap.timeline({
  scrollTrigger: {
    trigger: element,
    start: 'bottom bottom', // начало анимации, когда низ элемента достигает низа окна
  },
});

export default [
  {
    name: 'laptop',
    model: macBookModel,
    ratio: 7 / 4,
    position: [0, -0.2, -6],
    rotation: {
      coordinates: null,
      sensitivity: 1,
    },
    margin: {
      inline: -0.25,
      block: -0.1,
    },
    animation(model, target) {
      const gsapTimeline = getTimeline(target);

      const laptopScreen = model.children.find((part) => part.name === 'Frame');
      laptopScreen.rotation.x = toDeg(90);
      gsapTimeline.to(laptopScreen.rotation, {
        duration: 1,
        delay: 0,
        x: 0,
        ease: 'power2.inOut',
      });
    },
  },
  {
    name: 'phone',
    model: iPhoneModel,
    ratio: 1 / 2,
    position: [0, 0, -7.2],
    rotation: {
      coordinates: null,
      sensitivity: 1,
    },
    margin: {
      inline: 0,
      block: -0.045,
    },
  },
  {
    name: 'tablet',
    model: iPadModel,
    ratio: 1,
    position: [0, 0, -0.66],
    rotation: {
      coordinates: [toDeg(30), 0, 0],
      sensitivity: 1.5,
    },
    margin: {
      inline: -0.165,
      block: -0.19,
    },
  },
];
