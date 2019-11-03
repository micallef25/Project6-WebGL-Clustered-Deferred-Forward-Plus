import { makeRenderLoop, camera, cameraControls, gui, gl } from './init';
import ForwardRenderer from './renderers/forward';
import ForwardPlusRenderer from './renderers/forwardPlus';
import ClusteredRenderer from './renderers/clustered';
import Scene from './scene';

import { NUM_LIGHTS } from './scene';
import { MAX_LIGHTS_PER_CLUSTER } from './scene';

const FORWARD = 'Forward';
const FORWARD_PLUS = 'Forward+';
const DEFFERED = 'Deferred';

const Lambertian = 'Lambertian';
const BlinnPhong = 'BlinnPhong';

var shadertype = 0;

const params = {
  renderer: FORWARD_PLUS,
  numLights:NUM_LIGHTS,
  maxLightsPerCluster: MAX_LIGHTS_PER_CLUSTER,
  ShadingModel: Lambertian,
  _renderer: null,
};

setRenderer(params.renderer);

function setRenderer(renderer) {
  if(params.ShadingModel == 'Lambertian')
  {
    shadertype = 0;
  }
  else if(params.ShadingModel == 'BlinnPhong')
  {
    shadertype = 1;
  }

  switch(renderer) {
    case FORWARD:
      params._renderer = new ForwardRenderer();
      break;
    case FORWARD_PLUS:
      params._renderer = new ForwardPlusRenderer(15, 15, 15, camera,Math.floor(params.maxLightsPerCluster),shadertype);
      break;
    case DEFFERED:
      params._renderer = new ClusteredRenderer(15, 15, 15, camera,Math.floor(params.maxLightsPerCluster),shadertype);
      break;
  }
}

gui.add(params, 'renderer', [FORWARD, FORWARD_PLUS, DEFFERED]).onChange(setRenderer);

gui.add(params, 'ShadingModel', [Lambertian, BlinnPhong]).onChange(function(newVal) {
  setRenderer(params.renderer);
});

const scene = new Scene();
scene.loadGLTF('models/sponza/sponza.gltf');

camera.position.set(-10, 8, 0);
cameraControls.target.set(0, 2, 0);
gl.enable(gl.DEPTH_TEST);

function render() {
  scene.update();
  params._renderer.render(camera, scene);
}

makeRenderLoop(render)();