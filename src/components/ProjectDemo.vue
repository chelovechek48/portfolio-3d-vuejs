<!-- eslint-disable no-param-reassign -->
<script setup>
import { ref, onMounted } from 'vue';
import {
  Scene, PerspectiveCamera, WebGLRenderer,
  MathUtils,
  TextureLoader,
  AmbientLight, DirectionalLight,
  Color, SRGBColorSpace,
} from 'three';
import { DRACOLoader, GLTFLoader } from 'three-stdlib';
import { gsap } from 'gsap';

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
});

const baseUrl = 'portfolio-3d-vuejs';

const canvasRef = ref(null);

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
  camera.position.set(0, 0.3, 6);

  const scene = new Scene();

  const textureLoader = new TextureLoader();

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(`${baseUrl}/src/assets/models/draco/`);

  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  const [placeholder, gltf] = await Promise.all([
    await textureLoader.loadAsync(props.image),
    await gltfLoader.loadAsync(`${baseUrl}/src/assets/models/laptop.glb`),
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
  scene.add(gltf.scene);

  gltf.scene.traverse(async (node) => {
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

    const frameNode = gltf.scene.children.find((part) => part.name === 'Frame');
    frameNode.rotation.x = MathUtils.degToRad(90);
    gsap.to(frameNode.rotation, {
      duration: 1,
      delay: 0.75,
      x: 0,
      ease: 'power2.inOut',
    });
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
  <div class="canvas" ref="canvasRef" />
</template>

<style lang="scss" scoped>
.canvas {
  aspect-ratio: 15 / 10;
  z-index: 2;
}
</style>
