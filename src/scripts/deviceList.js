/* eslint-disable no-param-reassign */
import { gsap } from 'gsap';

import iPhoneModel from '@/assets/models/iphone.glb';
import macBookModel from '@/assets/models/macbook.glb';
import iPadModel from '@/assets/models/ipad.glb';

const rightAngle = 1.5707963267948966; // equal MathUtils.degToRad(90)

export default [
  {
    name: 'laptop',
    model: macBookModel,
    position: [0, -0.3, -6],
    ratio: 3 / 2,
    margin: -0.3,
    animation(model) {
      const laptopScreen = model.children.find((part) => part.name === 'Frame');
      laptopScreen.rotation.x = rightAngle;
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
    animation: false,
  },
  {
    name: 'tablet',
    model: iPadModel,
    position: [0, 0, -0.65],
    ratio: 1,
    margin: -0.15,
    animation(model) {
      model.rotation.y = -(rightAngle * 2);
      gsap.to(model.rotation, {
        duration: 1,
        delay: 1.5,
        y: 0,
        ease: 'power2.inOut',
      });
    },
  },
];
