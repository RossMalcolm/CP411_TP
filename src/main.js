// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
// Lighting
const ambientLight = new THREE.AmbientLight( 0x404040, 10);
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
let light;
let spotLight
// Movement Controls
const controls = new THREE.OrbitControls( camera, renderer.domElement );
const controls_movement = new THREE.MapControls( camera, renderer.domElement );
controls_movement.enableDamping = true; // an animation loop is 
controls_movement.dampingFactor = 0.05;
controls_movement.screenSpacePanning = false;
controls_movement.minDistance = 5;
controls_movement.maxDistance = 300;
controls_movement.maxPolarAngle = Math.PI / 2;
// Model Loader and models
const loader = new THREE.GLTFLoader();
var car1 = new THREE.Object3D();
var car2 = new THREE.Object3D();
var car3 = new THREE.Object3D();
var currentCar = new THREE.Object3D;
var showroom = new THREE.Object3D();
// Var for slider Values
var guiValues;

function main() {
	document.body.appendChild(renderer.domElement);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.addEventListener('keydown', keyPressed);

	// Sets the initial camera position
	camera.position.x = 0;
	camera.position.y = 20;
	camera.position.z = 200;

	// Adds a directional light
	const light1_x = 0.0;
    const light1_y = 0.0;
    const light1_z = 0.0;
    const light1_color = new THREE.Color(1, 1, 1);
    const light1_intensity = 10;
    light = new THREE.DirectionalLight(light1_color, light1_intensity);
    light.position.set(light1_x, light1_y, light1_z);

    // Sets the spotlight attributes
	spotLight = new THREE.SpotLight( 0xffffff );
	//spotLight.position.set(guiValues.sl_x, guiValues.sl_y, guiValues.sl_z );
	spotLight.position.set(-10,70,0);
	spotLight.target.position.set(-10, 0, 0);
	spotLight.color.setRGB(guiValues.light1_R, guiValues.light1_G, guiValues.light1_B);
	spotLight.castShadow = true;
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	spotLight.shadow.camera.near = 500;
	spotLight.shadow.camera.far = 4000;
	spotLight.shadow.camera.fov = 30;
	//spotLight.target = car1;

	// Adds the lights to the scene
	scene.add(ambientLight);
    scene.add(spotLight);
    scene.add(spotLight.target);
    scene.add(directionalLight);
    scene.add(light);

    // Initialise models and buttons
    init_gltf();
	init_buttons();

	// Animation loop
	animate();
}

function animate(){
	requestAnimationFrame(animate);
	controls_movement.update();
	//directionalLight.position.copy(camera.position)
	renderer.render(scene, camera);
}
/*
      \  ^ Y
       \ |
        \|
     ----+----> X
         |\
         | \
         | \/ Z
*/
function init_gltf(){
	// Loads the first car (Green car)
	loader.load( '../models/car1/scene.gltf', function ( gltf ) {
		car1 = gltf.scene;
		car1.scale.multiplyScalar(1.2); // adjust scalar factor to match your scene scale
        car1.position.x = -10; // once rescaled, position the model where needed
        car1.position.y = 59;
        car1.position.z = 0;
        //car1.visible = false;
        currentCar = car1;
		scene.add(car1);
	}, undefined, function ( error ) {
		console.error( error );
	} );
    
	// Loads the second car (Black car)
	loader.load( '../models/car2/scene.gltf', function(gltf){
		car2 = gltf.scene;
		car2.scale.multiplyScalar(50); // adjust scalar factor to match your scene scale
        car2.position.x = 300; // once rescaled, position the model where needed
        car2.position.y = 22;
        car2.position.z = 0;
        //car2.visibile = false;
		scene.add(car2);
	}, undefined, function (error) {
		console.error(error);
	});

	// Loads the Third car (Futuristic car)
	loader.load( '../models/car3/scene.gltf', function(gltf){
		car3 = gltf.scene;
		car3.scale.multiplyScalar(45); // adjust scalar factor to match your scene scale
        car3.position.x = 600; // once rescaled, position the model where needed
        car3.position.y = 21;
        car3.position.z = 0;
        //car3.visibile = false;
		scene.add(car3);
	}, undefined, function (error) {
		console.error(error);
	});

	// Loads the Showroom 
	loader.load( '../models/warehouse/scene.gltf', function(gltf){
		showroom = gltf.scene;
		showroom.scale.multiplyScalar(40); // adjust scalar factor to match your scene scale
        showroom.position.x = -450; // once rescaled, position the model where needed
        showroom.position.z = 0;
        showroom.position.y = -10;
        //showroom.visibile = false;
		scene.add(showroom);
	}, undefined, function (error) {
		console.error(error);
	});
}

function init_buttons(){
	var backgroundButton = document.getElementById('scene');
	backgroundButton.addEventListener('click', function(){
		scene.remove(currentCar);
		currentCar = car1
		scene.add(currentCar);
		controls.enabled = true;
		controls_movement.enabled = false;
	});

	var backgroundButton = document.getElementById('scene2');
	backgroundButton.addEventListener('click', function(){
		scene.remove(currentCar);
		currentCar = car2
		scene.add(currentCar);
		controls.enabled = true;
		controls_movement.enabled = false;
	});

	var backgroundButton = document.getElementById('scene3');
	backgroundButton.addEventListener('click', function(){
		scene.remove(currentCar);
		currentCar = car3
		scene.add(currentCar);
		controls.enabled = true;
		controls_movement.enabled = false;
	});

	var backgroundButton = document.getElementById('moveAround');
	backgroundButton.addEventListener('click', function(){
		controls.enabled = false;
		controls_movement.enabled = true;
	});
}

function keyPressed(e){
  switch(e.key) {
    case 'ArrowUp':
        currentScene.rotateX(-0.05);
        break;
    case 'ArrowDown':
        currentScene.rotateX(0.05);
        break;
    case 'ArrowLeft':
        currentScene.rotateY(-0.05);
        break;
    case 'ArrowRight':
        currentScene.rotateY(0.05);
        break;
  }
  e.preventDefault();
  render();
}


var FizzyText = function() {
  // Sets up inital values for the sliders
 this.light1_R = 3.0;
 this.light1_G = 3.0;
 this.light1_B = 3.0;
 this.sl_angle = Math.PI/3;
 this.sl_distance = 0.0;
 this.sl_x = 0.0;
 this.sl_y = 70.0;
 this.sl_z = 0.0;
}

window.onload = function() {
  	guiValues = new FizzyText();
  	var gui = new dat.GUI();
  	var light_1_R = gui.add(guiValues, 'light1_R', 0.0, 10.0);
  	var light_1_G = gui.add(guiValues, 'light1_G', 0.0, 10.0);
  	var light_1_B = gui.add(guiValues, 'light1_B', 0.0, 10.0);
  	var sl_angle = gui.add(guiValues, 'sl_angle', 0.0, Math.PI/2);
  	var sl_distance = gui.add(guiValues, 'sl_distance', 0.0, 500);
  	var sl_x = gui.add(guiValues, 'sl_x', -250, 1000);
  	var sl_y = gui.add(guiValues, 'sl_y', -250, 1000);
  	var sl_z = gui.add(guiValues, 'sl_z', -250, 1000);
  	
  	light_1_R.onChange(function(value) {
		spotLight.color.setRGB(guiValues.light1_R, guiValues.light1_G, guiValues.light1_B);
	});

  	light_1_G.onChange(function(value) {
		spotLight.color.setRGB(guiValues.light1_R, guiValues.light1_G, guiValues.light1_B);
	});

  	light_1_B.onChange(function(value) {
		spotLight.color.setRGB(guiValues.light1_R, guiValues.light1_G, guiValues.light1_B);
	});

  	sl_angle.onChange(function(value) {
		spotLight.angle = value;
	});

  	sl_distance.onChange(function(value) {
		spotLight.distance = value;
	});

	sl_x.onChange(function(value) {
		spotLight.position.set(guiValues.sl_x, guiValues.sl_y, guiValues.sl_z);
		spotLight.target.position.set(guiValues.sl_x, 0, guiValues.sl_z);
	});

	sl_y.onChange(function(value) {
		spotLight.position.set(guiValues.sl_x, guiValues.sl_y, guiValues.sl_z);
		spotLight.target.position.set(guiValues.sl_x, 0, guiValues.sl_z);
	});

	sl_z.onChange(function(value) {
		spotLight.position.set(guiValues.sl_x, guiValues.sl_y, guiValues.sl_z);
		spotLight.target.position.set(guiValues.sl_x, 0, guiValues.sl_z);
	});
	main();
};