<!-- eslint-disable no-param-reassign -->
<script setup>
import { ref, onMounted } from 'vue';
import {
  Scene, PerspectiveCamera, SphereGeometry, Mesh, MeshStandardMaterial, WebGLRenderer,
  UniformsUtils, DirectionalLight, AmbientLight,
} from 'three';

import vertexShader from '@/assets/shaders/sphere-vertex.glsl';

const canvasRef = ref(null);
const createSphere = (SphereFill) => {
  const renderer = new WebGLRenderer({
    alpha: true,
    powerPreference: 'high-performance',
    failIfMajorPerformanceCaveat: true,
  });
  renderer.setPixelRatio(1);

  const camera = new PerspectiveCamera(54, undefined, 0.1, 100);
  const updatedCamera = () => {
    const width = canvasRef.value.offsetWidth;
    const height = canvasRef.value.offsetHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  updatedCamera();
  camera.position.z = 55;

  const scene = new Scene();

  const geometry = new SphereGeometry(32, 128, 128);
  const material = new MeshStandardMaterial({ color: SphereFill });
  let uniforms;
  material.onBeforeCompile = (shader) => {
    uniforms = UniformsUtils.merge([
      shader.uniforms,
      { time: { type: 'f', value: 0 } },
    ]);

    shader.uniforms = uniforms;
    shader.vertexShader = vertexShader;
  };

  const sphere = new Mesh(geometry, material);
  sphere.position.set(20, 16, 0);
  scene.add(sphere);

  const ambientLight = new AmbientLight(SphereFill, 0.25);
  const directionalLight = new DirectionalLight('white', 1.0);
  directionalLight.position.set(100, 100, 200);

  const lights = [directionalLight, ambientLight];
  lights.forEach((light) => scene.add(light));

  const startDate = Date.now();
  const animate = () => {
    ['x', 'y', 'z'].forEach((direction) => {
      sphere.rotation[direction] += 0.001;
    });
    renderer.render(scene, camera);

    if (uniforms !== undefined) {
      uniforms.time.value = 0.00005 * (Date.now() - startDate);
    }

    updatedCamera();
  };
  renderer.setAnimationLoop(animate);
  canvasRef.value.appendChild(renderer.domElement);
};

onMounted(() => {
  createSphere('#00eeff');
});
</script>
<template>
  <div class="canvas" ref="canvasRef" />
</template>
<style lang="scss" scoped>
.canvas {
  inset: 0 0 -400px 0;
}
</style>
