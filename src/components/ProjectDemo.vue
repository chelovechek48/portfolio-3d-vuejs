<!-- eslint-disable no-param-reassign -->
<script setup>
import { ref, onMounted } from 'vue';
import {
  Scene, PerspectiveCamera, WebGLRenderer,
  TextureLoader,
  AmbientLight, DirectionalLight,
  Color, SRGBColorSpace,
} from 'three';
import { DRACOLoader, GLTFLoader } from 'three-stdlib';
import { gsap } from 'gsap';
import devices from '@js/deviceList.js';

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
});

const canvasRef = ref(null);
const canvasOpacity = ref(0);

const currentDevice = devices.find((device) => device.name === props.model);
const addModel = () => {
  const scene = new Scene();
  const renderer = new WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true,
    powerPreference: 'high-performance',
    failIfMajorPerformanceCaveat: true,
  });

  const canvasSizes = {
    width: canvasRef.value.offsetWidth,
    height: canvasRef.value.offsetHeight,
  };
  const camera = new PerspectiveCamera(36, canvasSizes.width / canvasSizes.height, 0.1, 100);
  const updatedCamera = () => {
    renderer.setSize(canvasSizes.width, canvasSizes.height);
    camera.updateProjectionMatrix();
  };
  updatedCamera();

  window.addEventListener('resize', () => {
    canvasSizes.width = canvasRef.value.offsetWidth;
    canvasSizes.height = canvasRef.value.offsetHeight;
    updatedCamera();
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const isReadyToLoad = entry.isIntersecting;
      if (isReadyToLoad) {
        (async function loadModel() {
          const setModel = async () => {
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');

            const gltfLoader = new GLTFLoader();
            gltfLoader.setDRACOLoader(dracoLoader);

            const modelObject = await gltfLoader.loadAsync(currentDevice.model);
            return modelObject.scene;
          };
          const model = await setModel();

          const setTexture = () => {
            model.traverse(async (node) => {
              if (node.material) {
                node.material.color = new Color(0x1f2025);
              }

              if (node.name === 'Screen') {
                node.material.opacity = 1;
                (async function loadTexture() {
                  const textureLoader = new TextureLoader();
                  const texture = await textureLoader.loadAsync(props.image);
                  texture.colorSpace = SRGBColorSpace;
                  texture.flipY = false;
                  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
                  texture.generateMipmaps = false;

                  await renderer.initTexture(texture);

                  node.material.color = new Color('white');
                  node.material.transparent = true;
                  node.material.map = texture;

                  observer.unobserve(canvasRef.value);
                }());
              }
            });
          };

          const setLayout = () => {
            const layout = {
              position: currentDevice.position,
              rotation: currentDevice.rotation,
            };
            const layoutArray = Object.entries(layout);
            layoutArray.forEach((el) => {
              const layoutName = el[0];
              const layoutValue = el[1] || [0, 0, 0];
              model[layoutName].set(...layoutValue);
            });
          };

          const setAnimation = () => {
            const hasShowAnimation = currentDevice.animation;
            if (hasShowAnimation) {
              currentDevice.animation(model, canvasRef.value);
            }

            const canvasPosition = canvasRef.value.getBoundingClientRect();
            const canvasCenterX = canvasPosition.left + canvasPosition.width / 2;
            let clientX = window.innerWidth / 2;
            window.addEventListener('mousemove', (event) => {
              clientX = event.clientX;
            });

            const { rotationSensitivityRatio } = currentDevice;
            const animation = () => {
              gsap.to(model.rotation, {
                duration: 0.5,
                ease: 'power2.out',
                y: ((clientX * 0.5) / canvasCenterX - 0.5) / rotationSensitivityRatio,
              });

              renderer.render(scene, camera);
            };
            renderer.setAnimationLoop(animation);
          };

          const setLight = () => {
            const ambientLight = new AmbientLight(0xffffff, 1.2);
            const keyLight = new DirectionalLight(0xffffff, 1.1);
            const fillLight = new DirectionalLight(0xffffff, 0.8);

            fillLight.position.set(-6, 2, 2);
            keyLight.position.set(0.5, 0, 0.866);
            const lights = [ambientLight, keyLight, fillLight];
            lights.forEach((light) => scene.add(light));
          };

          setTexture();
          setLayout();
          setAnimation();
          setLight();

          canvasOpacity.value = 1;
          scene.add(model);
          observer.unobserve(canvasRef.value);
        }());
      }
    });
  });

  observer.observe(canvasRef.value);
};

onMounted(() => {
  addModel();
});
</script>

<template>
  <canvas
    class="canvas" ref="canvasRef"
    :style="`
      --aspect-ratio: ${currentDevice.ratio};
      --margin: ${currentDevice.margin};
      --opacity: ${canvasOpacity};
    `"
  />
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;

.canvas {
  @media (min-width: $mobile) {
    $width: calc(var(--height) * var(--aspect-ratio));
    width: $width !important;
    height: var(--height) !important;
    margin-inline: calc($width * var(--margin));
  }
  @media (max-width: $mobile) {
    $visible-width: calc(100vw - $container-padding * 2);

    $margin-inline: calc(100 * var(--margin));
    $ratio: calc(100 / (100 + $margin-inline * 2));
    $width: calc($visible-width * $ratio);

    width: $width !important;
    height: calc($width / var(--aspect-ratio)) !important;
  }
  pointer-events: none;

  opacity: var(--opacity);
  transition: opacity 250ms ease;
  background-color: rgba(red, 0.25);
}
</style>
