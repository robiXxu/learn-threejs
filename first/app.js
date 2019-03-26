const fov = 75;
const browserRatio = window.innerWidth / window.innerHeight;
const nearClippingPlane = 0.1;
const farClippingPlane = 1000;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  browserRatio,
  nearClippingPlane,
  farClippingPlane
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.append(renderer.domElement);

// shape x/y/z
const geometry = new THREE.BoxGeometry(1, 1, 1);

const loader = new THREE.CubeTextureLoader();
loader.setPath('img/');
// RIGHT LEFT TOP BOTTOM FRONT BACK
const textureCube = loader.load([
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '6.jpg',
  '5.jpg'
]);

//create material ,color, texture, image
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  envMap: textureCube
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

controls = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.z = 3;

// logic
const update = () => {
  //    cube.rotation.x += 0.01;
  //    cube.rotation.y += 0.01;
  //    cube.rotation.z += 0.01;
};

// draw scene
const render = () => {
  renderer.render(scene, camera);
};

// gameloop ( update, render repeat )
const loop = () => {
  requestAnimationFrame(loop);

  update();
  render();
};

const setViewport = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};
window.addEventListener('resize', setViewport);

loop();
