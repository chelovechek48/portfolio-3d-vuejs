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
    position: [0, -0.3, -6],
    ratio: 3 / 2,
    margin: -0.3,
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
    position: [0, 0, -7],
    ratio: 1 / 2,
    margin: 0,
  },
  {
    name: 'tablet',
    model: iPadModel,
    position: [0, 0, -0.65],
    rotation: [0, toDeg(-150), 0],
    ratio: 1,
    margin: -0.15,
    animation(model, target) {
      const gsapTimeline = getTimeline(target);
      gsapTimeline.to(model.rotation, {
        duration: 1,
        delay: 0,
        x: toDeg(30),
        y: toDeg(-35),
        ease: 'power2.inOut',
      });
    },
  },
];
