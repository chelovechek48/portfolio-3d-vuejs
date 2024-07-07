/* eslint-disable no-param-reassign */
import { gsap } from 'gsap';

import macBookModel from '@/assets/models/macbook.glb';
import iPhoneModel from '@/assets/models/iphone.glb';
import iPadModel from '@/assets/models/ipad.glb';

const degUnit = 0.017453292519943295; // equal three.js MathUtils.degToRad(1)
const toDeg = (value) => degUnit * value;

export default [
  {
    name: 'laptop',
    model: macBookModel,
    position: [0, -0.3, -6],
    ratio: 3 / 2,
    margin: -0.3,
    animation(model) {
      const laptopScreen = model.children.find((part) => part.name === 'Frame');
      laptopScreen.rotation.x = toDeg(90);
      gsap.to(laptopScreen.rotation, {
        duration: 1,
        delay: 0.75,
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
    rotation: [toDeg(30), toDeg(-35), 0],
    ratio: 1,
    margin: -0.15,
  },
];
