const LOADER = document.getElementById('js-loader');

const TRAY = document.getElementById('js-tray-slide');

const DRAG_NOTICE = document.getElementById('js-drag-notice');

var theModel;
// 
// const MODEL_PATH = "chair.glb";
const MODEL_PATH = "hondas800.glb";

var activeOption = 'body';
var loaded = false;

const colors = [
{
  texture: 'img/wood_.jpg',
  size: [2, 2, 2],
  shininess: 60 },

{
  texture: 'img/fabric_.jpg',
  size: [4, 4, 4],
  shininess: 0 },

{
  texture: 'img/pattern_.jpg',
  size: [8, 8, 8],
  shininess: 10 },

{
  texture: 'img/denim_.jpg',
  size: [3, 3, 3],
  shininess: 0 },

{
  texture: 'img/quilt_.jpg',
  size: [6, 6, 6],
  shininess: 0 },

{
  color: '131417' },

{
  color: '374047' },

{
  color: '5f6e78' },

{
  color: '7f8a93' },

{
  color: '97a1a7' },

{
  color: 'acb4b9' },

{
  color: 'DF9998' },

{
  color: '7C6862' },

{
  color: 'A3AB84' },

{
  color: 'D6CCB1' },

{
  color: 'F8D5C4' },

{
  color: 'A3AE99' },

{
  color: 'EFF2F2' },

{
  color: 'B0C5C1' },

{
  color: '8B8C8C' },

{
  color: '565F59' },

{
  color: 'CB304A' },

{
  color: 'FED7C8' },

{
  color: 'C7BDBD' },

{
  color: '3DCBBE' },

{
  color: '264B4F' },

{
  color: '389389' },

{
  color: '85BEAE' },

{
  color: 'F2DABA' },

{
  color: 'F2A97F' },

{
  color: 'D85F52' },

{
  color: 'D92E37' },

{
  color: 'FC9736' },

{
  color: 'F7BD69' },

{
  color: 'A4D09C' },

{
  color: '4C8A67' },

{
  color: '25608A' },

{
  color: '75C8C6' },

{
  color: 'F5E4B7' },

{
  color: 'E69041' },

{
  color: 'E56013' },

{
  color: '11101D' },

{
  color: '630609' },

{
  color: 'C9240E' },

{
  color: 'EC4B17' },

{
  color: '281A1C' },

{
  color: '4F556F' },

{
  color: '64739B' },

{
  color: 'CDBAC7' },

{
  color: '946F43' },

{
  color: '66533C' },

{
  color: '173A2F' },

{
  color: '153944' },

{
  color: '27548D' },

{
  color: '438AAC' }];




const BACKGROUND_COLOR = 0xf1f1f1;
// Init the scene
const scene = new THREE.Scene();
// Set background
scene.background = new THREE.Color(BACKGROUND_COLOR);
scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

const canvas = document.querySelector('#c');

// Init the renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);

var cameraFar = 5;

document.body.appendChild(renderer.domElement);

// Add a camerra
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = cameraFar;
camera.position.x = 0;

// Initial material
const exhaust = new THREE.TextureLoader().load('textures/exhausts_stock_38.png');
const ext_mtl = new THREE.MeshPhongMaterial({map: exhaust});

const speedometer = new THREE.TextureLoader().load('textures/speedo-speedo.dds_12.png');
const speed_mtl = new THREE.MeshPhongMaterial({map:speedometer});

const windscreen = new THREE.TextureLoader().load('textures/INT_windscreen_36.png');
const  windscreen_mtl = new THREE.MeshPhongMaterial({map: windscreen});

const headlight = new THREE.TextureLoader().load('textures/headlights_lights_albedo_39.png');
const headlight_mtl = new THREE.MeshPhongMaterial({map: headlight});

const INITIAL_MTL = new THREE.MeshPhongMaterial({ color: 0xf0f0f0, shininess: 10 });



const INITIAL_MAP = [
{ childID: "tyre", objID:"Object203.002_0", mtl: INITIAL_MTL },
{ childID: "macwheel", objID:"Object203.002_1",  mtl: INITIAL_MTL },
{ childID: "front_mac", objID:"Object203.002_2",  mtl: INITIAL_MTL },
{ childID: "bodyy", objID:"Object203.002_3",  mtl: INITIAL_MTL },
{ childID: "mclogo", objID:"Object203.002_4",  mtl: INITIAL_MTL },
{ childID: "metal", objID:"Object203.002_5",  mtl: INITIAL_MTL },
{ childID: "pedal", objID:"Object203.002_6",  mtl: INITIAL_MTL },
{ childID: "handle", objID:"Object203.002_7",  mtl: INITIAL_MTL },
{ childID: "slogo ", objID:"Object203.002_8",  mtl: INITIAL_MTL },
{ childID: "stcover", objID:"Object203.002_9",  mtl: INITIAL_MTL },

{ childID: "music", objID:"Object203.002_10",  mtl: INITIAL_MTL },
{ childID: "key", objID:"Object203.002_11",  mtl: INITIAL_MTL },
{ childID: "keychain", objID:"Object203.002_12",  mtl: INITIAL_MTL },
{ childID: "fled", objID:"Object203.002_13",  mtl: INITIAL_MTL },
{ childID: "mudguard", objID:"Object203.002_14",  mtl: INITIAL_MTL },
{ childID: "grill", objID:"Object203.002_15",  mtl: INITIAL_MTL },
{ childID: "carpet", objID:"Object203.002_16",  mtl: INITIAL_MTL },
{ childID: "carpet_border", objID:"Object203.002_17",  mtl: INITIAL_MTL },
{ childID: "interior ", objID:"Object203.002_18",  mtl: INITIAL_MTL },
{ childID: "dashboard", objID:"Object203.002_19",  mtl: INITIAL_MTL },
{ childID: "cluster", objID:"Object203.002_20",  mtl: INITIAL_MTL },
{ childID: "body_frame", objID:"Object203.002_21",  mtl: INITIAL_MTL },
{ childID: "mirrors", objID:"Object203.002_22",  mtl: INITIAL_MTL },
{ childID: "guage", objID:"Object203.002_23",  mtl: INITIAL_MTL },
{ childID: "keychain", objID:"Object203.002_24",  mtl: INITIAL_MTL },
{ childID: "controls", objID:"Object203.002_25",  mtl: INITIAL_MTL },
{ childID: "26", objID:"Object203.002_26",  mtl: INITIAL_MTL },
{ childID: "sidebrand", objID:"Object203.002_27",  mtl: INITIAL_MTL },
{ childID: "28 ", objID:"Object203.002_28",  mtl: INITIAL_MTL },
{ childID: "deck", objID:"Object203.002_29",  mtl: INITIAL_MTL },
{ childID: "30", objID:"Object203.002_30",  mtl: INITIAL_MTL },
{ childID: "windsheild", objID:"Object203.002_31",  mtl: INITIAL_MTL },
{ childID: "exterior_design", objID:"Object203.002_32",  mtl: INITIAL_MTL },
{ childID: "exhaust", objID:"Object203.002_33",  mtl: ext_mtl },
{ childID: "light", objID:"Object203.002_34",  mtl: INITIAL_MTL },
{ childID: "sidelogo", objID:"Object203.002_35",  mtl: INITIAL_MTL },
{ childID: "body", objID:"Object203.002_36",  mtl: INITIAL_MTL },
{ childID: "37", objID:"Object203.002_37",  mtl: INITIAL_MTL }]




// Init the object loader
var loader = new THREE.GLTFLoader();

loader.load(MODEL_PATH, function (gltf) {
  theModel = gltf.scene;

  theModel.traverse(o => {
   
    if (o.isMesh) {

      console.log(o);
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });

  // Set the models initial scale   
  theModel.scale.set(2, 2, 2);
  theModel.rotation.y = Math.PI;

  // Offset the y position a bit
  theModel.position.y = -1;

  // Set initial textures
  for (let object of INITIAL_MAP) {
    initColor(theModel, object.childID, object.objID, object.mtl);
   
  }

  // CLICK TO ADD / REMOVE OBJECT
  const rmbtn = document.getElementById("remove");
  rmbtn.addEventListener('click', removeObj);

  const addbtn = document.getElementById("show");
  addbtn.addEventListener('click',addObj);



  // Add the model to the scene
  scene.add(theModel);

  // Remove the loader
  LOADER.remove();

}, undefined, function (error) {
  console.error(error);
});

// Function - Add the textures to the models
function initColor(parent, type, object, mtl) {
  
  parent.traverse(o => { 
   

    if (o.isMesh) {
       
      // if (o.name.includes('Object203.002_0')) { 
         
      //   o.material = mtl;
      //   o.nameID = 'tyre'; // Set a new property to identify this object

      // }
       
        if (o.name.includes('Object203.002_0')) { 
         
          o.material = mtl;
          o.nameID = 'tyre'; // Set a new property to identify this object

        }
         if(o.name.includes('Object203.002_1'))
        {
          o.material = mtl;
          o.nameID = 'macwheel'; // Set a new property to identify this object
        }
         if(o.name.includes('Object203.002_2'))
        {
          
          o.material = mtl;
          o.nameID = 'front_mac'; // Set a new property to identify this object
        }
         if(o.name.includes('Object203.002_3'))
        {
          o.material = mtl;
          o.nameID = 'bodyy'; // Set a new property to identify this object
        }
         if(o.name.includes('Object203.002_4'))
        {
          o.material = mtl;
          o.nameID = 'mclogo'; // Set a new property to identify this object
        }
         if(o.name.includes('Object203.002_5'))
        {
         
          o.material = mtl;
          o.nameID = 'metal'; // Set a new property to identify this object
        }
         if(o.name.includes('Object203.002_6'))
        {
          
          o.material = mtl;
          o.nameID = 'pedal'; // Set a new property to identify this object
        }
         if(o.name.includes('Object203.002_7'))
        {
          
          o.material = mtl;
          o.nameID = 'handle'; // Set a new property to identify this object
        }
         if(o.name.includes('Object203.002_8'))
        {
          
          o.material = mtl;
          o.nameID = 'slogo'; // Set a new property to identify this object
        }
         if(o.name.includes('Object203.002_9'))
        {
         
          o.material = mtl;
          o.nameID = 'stcover'; // Set a new property to identify this object
        }
         if(o.name.includes('Object203.002_10'))
        {
         
        
          o.material = mtl;
          o.nameID = 'music'; // Set a new property to identify this object
        }
         if(o.name.includes('Object203.002_11'))
        {
         
        
          o.material = mtl;
          o.nameID = 'key'; // Set a new property to identify this object
        }
         if(o.name.includes('Object203.002_12'))
        {
         
        
          o.material = mtl;
          o.nameID = 'keychain'; // Set a new property to identify this object
        }
         if(o.name.includes('Object203.002_13'))
        {
         
        
          o.material = mtl;
          o.nameID = 'fled'; // Set a new property to identify this object
        }
         if(o.name.includes('Object203.002_14'))
        {
         
        
          o.material = mtl;
          o.nameID = 'mudguard'; // Set a new property to identify this object
        }
         if(o.name.includes('Object203.002_15'))
        {
         
        
          o.material = mtl;
          o.nameID = 'grill'; // Set a new property to identify this object
        }
         if(o.name.includes('Object203.002_16'))
        {
         
        
          o.material = mtl;
          o.nameID = 'carpet'; // Set a new property to identify this object
        }
         if(o.name.includes('Object203.002_17'))
        {
         
        
          o.material = mtl;
          o.nameID = 'carpet_border'; // Set a new property to identify this object
        }
         if(o.name.includes('Object203.002_18'))
        {
         
            console.log(type);
          o.material = mtl;
          o.nameID = 'interior'; // Set a new property to identify this object
        }
         if(o.name.includes('Object203.002_19'))
        {
         
        
          o.material = mtl;
          o.nameID = 'dashboard'; // Set a new property to identify this object
        }
         if(o.name.includes('Object203.002_20'))
        {
          
        
          // o.material = mtl;
          o.material = speed_mtl;
          o.nameID = 'cluster'; // Set a new property to identify this object
        }
        if(o.name.includes('Object203.002_21'))
        {
          
        
          o.material = mtl;
          o.nameID = 'body_frame'; // Set a new property to identify this object
        }
        // 
        if(o.name.includes('Object203.002_22'))
        {
          
        
          o.material = mtl;
          o.nameID = 'mirrors'; // Set a new property to identify this object
        }
        if(o.name.includes('Object203.002_23'))
        {
          
        
          o.material = mtl;
          o.nameID = 'guage'; // Set a new property to identify this object
        }
        if(o.name.includes('Object203.002_24'))
        {
          
        
          o.material = mtl;
          o.nameID = 'keychain'; // Set a new property to identify this object
        }
        if(o.name.includes('Object203.002_25'))
        {
          
        
          o.material = mtl;
          o.nameID = 'controls'; // Set a new property to identify this object
        }
        if(o.name.includes('Object203.002_26'))
        {
          
        
          o.material = mtl;
          o.nameID = '26'; // Set a new property to identify this object
        }
        if(o.name.includes('Object203.002_27'))
        {
          console.log(o.name);
        
          o.material = mtl;
          o.nameID = 'sidebrand'; // Set a new property to identify this object
        }
        if(o.name.includes('Object203.002_28'))
        {
          
        
          o.material = mtl;
          o.nameID = '28'; // Set a new property to identify this object
        }
        if(o.name.includes('Object203.002_29'))
        {
          
        
          o.material = mtl;
          o.nameID = 'deck'; // Set a new property to identify this object
        }
        if(o.name.includes('Object203.002_30'))
        {
          
        
          o.material = mtl;
          o.nameID = '30'; // Set a new property to identify this object
        }
        if(o.name.includes('Object203.002_31'))
        {
          
        
          // o.material = mtl;
          o.material =windscreen_mtl;
          o.nameID = 'windsheild'; // Set a new property to identify this object
        }
        if(o.name.includes('Object203.002_32'))
        {
          
        
          o.material = mtl;
          
          o.nameID = 'exterior_design'; // Set a new property to identify this object
        }
        if(o.name.includes('Object203.002_33'))
        {
          
        
          // o.material = mtl;
          o.material =ext_mtl
          o.nameID = 'exhaust'; // Set a new property to identify this object
        }
        if(o.name.includes('Object203.002_34'))
        {
          
        
          // o.material = mtl;
          o.material = headlight_mtl
          o.nameID = 'light'; // Set a new property to identify this object
        }
        if(o.name.includes('Object203.002_35'))
        {
          
        
          o.material = mtl;
          o.nameID = 'sidelogo'; // Set a new property to identify this object
        }
        if(o.name.includes('Object203.002_36'))
        {
          
        
          o.material = mtl;
          o.nameID = 'body'; // Set a new property to identify this object
        }
        if(o.name.includes('Object203.002_37'))
        {
          
        
          o.material = mtl;
          o.nameID = '37'; // Set a new property to identify this object
        }

    }
  }); 
}

// ADD / REMOVE OBJECTS
function removeObj()
{
  
  theModel.traverse(o => { 
    if(o.nameID == activeOption)
    {
       
      if(o.visible )
      {
        o.visible = false;
      }
      else{
        console.log('object is already remved.');
      }
    }
  });
}
function addObj()
{
  
  theModel.traverse(o => { 
    if(o.nameID == activeOption)
    {
   
    if(!o.visible )
    {
      o.visible = true;
    }
    else{
      console.log('object is already added.');
    }

    // o.removeFromParent()
    }
  });
}

// Add lights
var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemiLight.position.set(0, 50, 0);
// Add hemisphere light to scene   
scene.add(hemiLight);

var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
dirLight.position.set(-8, 12, 8);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
// Add directional Light to scene    
scene.add(dirLight);

// Floor
var floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
var floorMaterial = new THREE.MeshPhongMaterial({
  color: 0xeeeeee,
  shininess: 0 });


var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -0.5 * Math.PI;
floor.receiveShadow = true;
floor.position.y = -1;
scene.add(floor);

// Add controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 3;
controls.enableDamping = true;
controls.enablePan = false;
controls.dampingFactor = 0.1;
controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
controls.autoRotateSpeed = 0.2; // 30

function animate() {

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  if (theModel != null && loaded == false) {
    initialRotation();
    DRAG_NOTICE.classList.add('start');
  }
}

animate();

// Function - New resizing method
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var canvasPixelWidth = canvas.width / window.devicePixelRatio;
  var canvasPixelHeight = canvas.height / window.devicePixelRatio;

  const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
  if (needResize) {

    renderer.setSize(width, height, false);
  }
  return needResize;
}

// Function - Build Colors

function buildColors(colors) {
  for (let [i, color] of colors.entries()) {
    let swatch = document.createElement('div');
    swatch.classList.add('tray__swatch');

    if (color.texture)
    {
      swatch.style.backgroundImage = "url(" + color.texture + ")";
    } else
    {
      swatch.style.background = "#" + color.color;
    }

    swatch.setAttribute('data-key', i);
    TRAY.append(swatch);
  }
}

buildColors(colors);

// Select Option
const options = document.querySelectorAll(".option");

for (const option of options) {
  option.addEventListener('click', selectOption);
}

function selectOption(e) {

  let option = e.target;
  activeOption = e.target.dataset.option;
  for (const otherOption of options) {
    otherOption.classList.remove('--is-active');
  }
  option.classList.add('--is-active');
}

// Swatches
const swatches = document.querySelectorAll(".tray__swatch");

for (const swatch of swatches) {
  swatch.addEventListener('click', selectSwatch);
}

function selectSwatch(e) {

 
  let color = colors[parseInt(e.target.dataset.key)];

  let new_mtl;
 
  if (color.texture) {

    let txt = new THREE.TextureLoader().load(color.texture);

    txt.repeat.set(color.size[0], color.size[1], color.size[2]);
    txt.wrapS = THREE.RepeatWrapping;
    txt.wrapT = THREE.RepeatWrapping;

    new_mtl = new THREE.MeshPhongMaterial({
      map: txt,
      shininess: color.shininess ? color.shininess : 10 });

  } else

  {
    new_mtl = new THREE.MeshPhongMaterial({
      color: parseInt('0x' + color.color),
      shininess: color.shininess ? color.shininess : 10 });


  }


  setMaterial(theModel, activeOption, new_mtl);
}

function setMaterial(parent, type, mtl) {

  parent.traverse(o => { 

    if (o.isMesh && o.nameID != null) {
     
      if (o.nameID == type) {
       
        o.material = mtl;
      }
    }
  });
}

// Function - Opening rotate
let initRotate = 0;

function initialRotation() {
  initRotate++;
  if (initRotate <= 120) {
    theModel.rotation.y += Math.PI / 60;
  } else {
    loaded = true;
  }
}

var slider = document.getElementById('js-tray'),sliderItems = document.getElementById('js-tray-slide'),difference;

function slide(wrapper, items) {
  var posX1 = 0,
  posX2 = 0,
  posInitial,
  threshold = 20,
  posFinal,
  slides = items.getElementsByClassName('tray__swatch');

  // Mouse events
  items.onmousedown = dragStart;

  // Touch events
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);


  function dragStart(e) {
    e = e || window.event;
    posInitial = items.offsetLeft;
    difference = sliderItems.offsetWidth - slider.offsetWidth;
    difference = difference * -1;

    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction(e) {
    e = e || window.event;

    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }

    if (items.offsetLeft - posX2 <= 0 && items.offsetLeft - posX2 >= difference) {
      items.style.left = items.offsetLeft - posX2 + "px";
    }
  }

  function dragEnd(e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {

    } else if (posFinal - posInitial > threshold) {

    } else {
      items.style.left = posInitial + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

}

slide(slider, sliderItems);