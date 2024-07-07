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
import devices from '@/scripts/deviceList.js';

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

const currentDevice = devices.find((device) => device.name === props.model);
const createDemo = async () => {
  const renderer = new WebGLRenderer({
    alpha: true,
    powerPreference: 'high-performance',
    failIfMajorPerformanceCaveat: true,
  });

  const camera = new PerspectiveCamera(36, window.clientWidth / window.clientHeight, 0.1, 100);
  const updatedCamera = () => {
    const width = canvasRef.value.offsetWidth;
    const height = canvasRef.value.offsetHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  updatedCamera();

  const scene = new Scene();

  const textureLoader = new TextureLoader();

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');

  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  const [placeholder, gltf] = await Promise.all([
    await textureLoader.loadAsync(props.image),
    await gltfLoader.loadAsync(currentDevice.model),
  ]);

  const applyScreenTexture = async (texture, node) => {
    texture.colorSpace = SRGBColorSpace;
    texture.flipY = false;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.generateMipmaps = false;

    await renderer.initTexture(texture);

    node.material.color = new Color(0xffffff);
    node.material.transparent = true;
    node.material.map = texture;
  };
  const model = gltf.scene;
  model.position.set(...currentDevice.position);
  scene.add(model);

  model.traverse(async (node) => {
    if (node.material) {
      node.material.color = new Color(0x1f2025);
    }

    if (node.name === 'Screen') {
      const placeholderScreen = node.clone();
      node.parent.add(placeholderScreen);
      placeholderScreen.material = node.material.clone();
      placeholderScreen.material.opacity = 1;
      applyScreenTexture(placeholder, placeholderScreen);
    }

    const hasAnimation = currentDevice.animation;
    if (hasAnimation) {
      currentDevice.animation(model);
    }
  });

  const ambientLight = new AmbientLight(0xffffff, 1.2);
  const keyLight = new DirectionalLight(0xffffff, 1.1);
  const fillLight = new DirectionalLight(0xffffff, 0.8);

  fillLight.position.set(-6, 2, 2);
  keyLight.position.set(0.5, 0, 0.866);
  const lights = [ambientLight, keyLight, fillLight];
  lights.forEach((light) => scene.add(light));
  const animation = () => {
    renderer.render(scene, camera);
    updatedCamera();
  };
  renderer.setAnimationLoop(animation);
  canvasRef.value.appendChild(renderer.domElement);
};

onMounted(() => {
  createDemo();
});
</script>

<template>
  <div
    class="canvas" ref="canvasRef"
    :style="`
      aspect-ratio: ${currentDevice.ratio};
      --margin: ${currentDevice.margin};
    `"
  />
</template>

<style lang="scss" scoped>
.canvas {
  z-index: 2;

  $height: 45rem;
  margin-left: calc(0px + $height * var(--margin));
  margin-right: calc(0px + $height * var(--margin));
  height: $height;
  pointer-events: none;
  // background-color: red;
}
</style>
