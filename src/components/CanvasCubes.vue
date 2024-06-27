<!-- eslint-disable max-len -->
<!-- eslint-disable import/no-extraneous-dependencies -->
<script setup>
import { ref, onMounted } from 'vue';

import * as THREE from 'three';

const canvasRef = ref(null);
const canvasWrapper = ref(null);

let camera;
let scene;
let renderer;

const radius = 5;
let theta = 0;
function animate() {
  theta += 0.3;

  camera.position.x = radius * Math.sin(THREE.MathUtils.degToRad(theta));
  camera.position.y = radius * Math.sin(THREE.MathUtils.degToRad(theta));
  camera.position.z = radius * Math.cos(THREE.MathUtils.degToRad(theta));
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

function init() {
  camera = new THREE.PerspectiveCamera(70, canvasWrapper.value.offsetWidth / canvasWrapper.value.offsetHeight, 0.1, 100);

  scene = new THREE.Scene();
  scene.background = new THREE.Color('#111111');

  const light = new THREE.PointLight(0xffffff, 3, 0, 0);

  scene.add(camera);
  camera.add(light);

  const colors = ['gray', 'gray'];
  const geometry = new THREE.BoxGeometry();

  for (let i = 0; i < 300; i += 1) {
    const layer = (i % colors.length);

    const object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: colors[layer] }));

    object.position.x = Math.random() * 40 - 20;
    object.position.y = Math.random() * 40 - 20;
    object.position.z = Math.random() * 40 - 20;

    object.rotation.x = Math.random() * 2 * Math.PI;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;

    object.scale.x = Math.random() + 0.5;
    object.scale.y = Math.random() + 0.5;
    object.scale.z = Math.random() + 0.5;

    scene.add(object);
  }

  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.value });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvasWrapper.value.offsetWidth, canvasWrapper.value.offsetHeight);
  renderer.setAnimationLoop(animate);

  window.addEventListener('resize', () => {
    camera.aspect = canvasWrapper.value.offsetWidth / canvasWrapper.value.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(canvasWrapper.value.offsetWidth, canvasWrapper.value.offsetHeight);
  });
}

onMounted(() => {
  init();
});
</script>
<template>
  <div ref="canvasWrapper">
    <canvas ref="canvasRef" />
  </div>
</template>
