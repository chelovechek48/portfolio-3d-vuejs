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
    position: [0, -0.2, -6],
    rotationSensitivityRatio: 1.5,
    ratio: 7 / 4,
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
    position: [0, 0, -7.2],
    rotationSensitivityRatio: 1.5,
    ratio: 1 / 2,
    margin: {
      inline: 0,
      block: -0.045,
    },
  },
  {
    name: 'tablet',
    model: iPadModel,
    position: [0, 0, -0.66],
    rotation: [toDeg(30), 0, 0],
    rotationSensitivityRatio: 0.5,
    ratio: 1,
    margin: {
      inline: -0.165,
      block: -0.19,
    },
  },
];
