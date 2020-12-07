// Setup
var clock = new THREE.Clock();;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
// Lighting
const ambientLight = new THREE.AmbientLight( 0x404040, 20);
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
let light;
let spotLight1;
let spotLight2;
let spotLight3;
// Movement Controls
const controls = new THREE.OrbitControls( camera, renderer.domElement );
const controls_movement = new THREE.MapControls( camera, renderer.domElement );
controls_movement.enableDamping = true; // an animation loop is 

// Model Loader and models
const loader = new THREE.GLTFLoader();
var car1 = new THREE.Object3D();
const car1position = new THREE.Vector3(-10, 59, 0);
var car2 = new THREE.Object3D();
const car2position = THREE.Vector3(300, 22, 0);
var car3 = new THREE.Object3D();
const car3position = THREE.Vector3(600, 21, 0);
var currentCar = new THREE.Object3D();
var showroom = new THREE.Object3D();
// Var for slider Values
var guiValues;

// Misc
var light1_offsetx = -10;
var light2_offsetx = 293;
var light3_offsetx = 594;
var freeRotate = false;


function main() {
	document.body.appendChild(renderer.domElement);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.addEventListener('keydown', keyPressed);

	// Sets the initial camera position
	camera.position.x = 0;
	camera.position.y = 20;
	camera.position.z = 200;

	//initializes movement controls
	controls_movement.dampingFactor = 0.05;
	controls_movement.screenSpacePanning = false;
	controls_movement.minDistance = 5;
	controls_movement.maxDistance = 300;
	controls_movement.maxPolarAngle = Math.PI / 2;

	// Adds a directional light
	const light1_x = 0.0;
    const light1_y = 0.0;
    const light1_z = 0.0;
    const light1_color = new THREE.Color(1, 1, 1);
    const light1_intensity = 10;
    light = new THREE.DirectionalLight(light1_color, light1_intensity);
    light.position.set(light1_x, light1_y, light1_z);

	// Adds the lights to the scene
	scene.add(ambientLight);
    scene.add(directionalLight);
    scene.add(light);

    // Initialise models and buttons
    init_gltf();
	init_buttons();
	init_spotLights();

	// Animation loop
	animate();
}

function animate(){
	requestAnimationFrame(animate);
	controls_movement.update();
	//directionalLight.position.copy(camera.position)
	if (guiValues.animate_spotLights == true){
		const time = clock.getElapsedTime();
		spotLight1.position.x = light1_offsetx + 20*Math.sin(time );
		spotLight1.position.z = 20*Math.cos(time );
		spotLight1.color.setRGB(Math.abs(Math.sin(time/2)*4), Math.abs(Math.sin(time)*4), Math.abs(Math.cos(time/2)*4));

		spotLight2.position.x = light2_offsetx - 20*Math.sin(time );
		spotLight2.position.z = -20*Math.cos(time );
		spotLight2.color.setRGB(Math.abs(Math.sin(time/3)*4), Math.abs(Math.sin(time/4)*4), Math.abs(Math.cos(time/2)*4));
		
		spotLight3.position.x = light3_offsetx + 20*Math.sin(time );
		spotLight3.position.z = -20*Math.cos(time );
		spotLight3.color.setRGB(Math.abs(Math.sin(time/5)*4), Math.abs(Math.sin(time)*4), Math.abs(Math.cos(time/5)*4));

	}
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
        car1.name = 'car1';
       
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
        car2.name = 'car2';
       
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
        car3.name = 'car3';
        
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
		if(freeRotate == false){
			if(scene.getObjectByName('car1')){
				scene.remove(car1);
			}else{
				scene.add(car1);
			}
		}else{
			scene.remove(car1)
			scene.remove(car2)
			scene.remove(car3)
			scene.add(car1)
		}
		
	});

	var backgroundButton = document.getElementById('scene2');
	backgroundButton.addEventListener('click', function(){
		if(freeRotate == false){
			if(scene.getObjectByName('car2')){
				scene.remove(car2);
			}else{
				scene.add(car2);
			}
		}else{
			scene.remove(car1)
			scene.remove(car2)
			scene.remove(car3)
			scene.add(car2)
		}
	});

	var backgroundButton = document.getElementById('scene3');
	backgroundButton.addEventListener('click', function(){
		if(freeRotate == false){
			if(scene.getObjectByName('car3')){
				scene.remove(car3);
			}else{
				scene.add(car3);
			}
		}else{
			scene.remove(car1)
			scene.remove(car2)
			scene.remove(car3)
			scene.add(car3)
		}
	});

	var backgroundButton = document.getElementById('moveAround');
	backgroundButton.addEventListener('click', function(){
		if(controls.enabled == true){
			controls.enabled = false;
			controls_movement.enabled = true;
		}else{
			controls.enabled = true;
			controls_movement.enabled = false;
		}
		
	});

	var backgroundButton = document.getElementById('freeRotate');
	backgroundButton.addEventListener('click', function(){
		if (freeRotate == false){
			freeRotate = true;
			scene.remove(showroom);
			scene.remove(car2);
			scene.remove(car3);
			scene.remove(car1); 
			car2.position.x = car1position.x
			car2.position.y = car1position.y
			car2.position.z = car1position.z
			car3.position.x = car1position.x
			car3.position.y = car1position.y
			car3.position.z = car1position.z
			scene.add(car1);
		}else{
			freeRotate = false;
			scene.remove(car2);
			scene.remove(car3);
			scene.remove(car1); 
			init_gltf();
			
		}

		camera.position.x = 0;
		camera.position.y = 20;
		camera.position.z = 200;
		
	});
}

function init_spotLights(){
    // Sets spotlight 1 attributes
	spotLight1 = new THREE.SpotLight( 0xffffff );
	spotLight1.position.set(light1_offsetx+guiValues.light1_x, guiValues.light1_y, guiValues.light1_z );
	spotLight1.target.position.set(light1_offsetx+guiValues.light1_x, 0, guiValues.light1_z );
	spotLight1.color.setRGB(guiValues.light1_R, guiValues.light1_G, guiValues.light1_B);
	spotLight1.castShadow = true;
	spotLight1.shadow.mapSize.width = 1024;
	spotLight1.shadow.mapSize.height = 1024;
	spotLight1.shadow.camera.near = 500;
	spotLight1.shadow.camera.far = 4000;
	spotLight1.shadow.camera.fov = 30;
    scene.add(spotLight1);
    scene.add(spotLight1.target);

    // Sets spotlight 1 attributes
	spotLight2 = new THREE.SpotLight( 0xffffff );
	spotLight2.position.set(light2_offsetx+guiValues.light2_x, guiValues.light2_y, guiValues.light2_z );
	spotLight2.target.position.set(light2_offsetx+guiValues.light2_x, 0, guiValues.light2_z );
	spotLight2.color.setRGB(guiValues.light2_R, guiValues.light2_G, guiValues.light2_B);
	spotLight2.castShadow = true;
	spotLight2.shadow.mapSize.width = 1024;
	spotLight2.shadow.mapSize.height = 1024;
	spotLight2.shadow.camera.near = 500;
	spotLight2.shadow.camera.far = 4000;
	spotLight2.shadow.camera.fov = 30;
    scene.add(spotLight2);
    scene.add(spotLight2.target);

    // Sets spotlight 1 attributes
	spotLight3 = new THREE.SpotLight( 0xffffff );
	spotLight3.position.set(light3_offsetx+guiValues.light3_x, guiValues.light3_y, guiValues.light3_z );
	spotLight3.target.position.set(light3_offsetx+guiValues.light3_x, 0, guiValues.light3_z );
	spotLight3.color.setRGB(guiValues.light3_R, guiValues.light3_G, guiValues.light3_B);
	spotLight3.castShadow = true;
	spotLight3.shadow.mapSize.width = 1024;
	spotLight3.shadow.mapSize.height = 1024;
	spotLight3.shadow.camera.near = 500;
	spotLight3.shadow.camera.far = 4000;
	spotLight3.shadow.camera.fov = 30;
    scene.add(spotLight3);
    scene.add(spotLight3.target);
}

function keyPressed(e){

  switch(e.key) {
    case 'ArrowUp':
    	if(freeRotate == true){
    		car1.rotateX(-0.05);
        	car2.rotateX(-0.05);
        	car3.rotateX(-0.05);
    	}
        
        break;
    case 'ArrowDown':
        if(freeRotate == true){
    		car1.rotateX(0.05);
        	car2.rotateX(0.05);
        	car3.rotateX(0.05);
    	}
        break;
    case 'ArrowLeft':
        if(freeRotate == true){
    		car1.rotateY(-0.05);
        	car2.rotateY(-0.05);
        	car3.rotateY(-0.05);
    	}
        break;
    case 'ArrowRight':
        if(freeRotate == true){
    		car1.rotateY(0.05);
        	car2.rotateY(0.05);
        	car3.rotateY(0.05);
    	}
        break;
  }
  e.preventDefault();
  //render();
}


var FizzyText = function() {
  // Sets up inital values for the sliders
 this.light1 = true;
 this.light1_R = 3.0;
 this.light1_G = 3.0;
 this.light1_B = 3.0;
 this.light1_angle = Math.PI/3.0;
 this.light1_x = 0.0;
 this.light1_y = 70.0;
 this.light1_z = 0.0;
 this.light2 = true;
 this.light2_R = 3.0;
 this.light2_G = 3.0;
 this.light2_B = 3.0;
 this.light2_angle = Math.PI/3.0;
 this.light2_x = 0.0;
 this.light2_y = 70.0;
 this.light2_z = 0.0;
 this.light3 = true;
 this.light3_R = 3.0;
 this.light3_G = 3.0;
 this.light3_B = 3.0;
 this.light3_angle = Math.PI/3.0;
 this.light3_x = 0.0;
 this.light3_y = 70.0;
 this.light3_z = 0.0;
 this.animate_spotLights = false;
}

window.onload = function() {
  	guiValues = new FizzyText();
  	var gui = new dat.GUI();
  	var light1 = gui.add(guiValues, 'light1', true, false);
  	var light1_R = gui.add(guiValues, 'light1_R', 0.0, 10.0);
  	var light1_G = gui.add(guiValues, 'light1_G', 0.0, 10.0);
  	var light1_B = gui.add(guiValues, 'light1_B', 0.0, 10.0);
  	var light1_angle = gui.add(guiValues, 'light1_angle', 0.0, Math.PI/2);
  	var light1_x = gui.add(guiValues, 'light1_x', -75, 75);
  	var light1_y = gui.add(guiValues, 'light1_y', 0, 70);
  	var light1_z = gui.add(guiValues, 'light1_z', -75, 75);
  	var light2 = gui.add(guiValues, 'light2', true, false);
  	var light2_R = gui.add(guiValues, 'light2_R', 0.0, 10.0);
  	var light2_G = gui.add(guiValues, 'light2_G', 0.0, 10.0);
  	var light2_B = gui.add(guiValues, 'light2_B', 0.0, 10.0);
  	var light2_angle = gui.add(guiValues, 'light2_angle', 0.0, Math.PI/2);
  	var light2_x = gui.add(guiValues, 'light2_x', -75, 75);
  	var light2_y = gui.add(guiValues, 'light2_y', 0, 70);
  	var light2_z = gui.add(guiValues, 'light2_z', -75, 75);
  	var light3 = gui.add(guiValues, 'light3', true, false);
  	var light3_R = gui.add(guiValues, 'light3_R', 0.0, 10.0);
  	var light3_G = gui.add(guiValues, 'light3_G', 0.0, 10.0);
  	var light3_B = gui.add(guiValues, 'light3_B', 0.0, 10.0);
  	var light3_angle = gui.add(guiValues, 'light3_angle', 0.0, Math.PI/2);
  	var light3_x = gui.add(guiValues, 'light3_x', -75, 75);
  	var light3_y = gui.add(guiValues, 'light3_y', 0, 70);
  	var light3_z = gui.add(guiValues, 'light3_z', -75, 75);
  	var animate_spotLights = gui.add(guiValues, 'animate_spotLights', true, false);
  	
  	light1.onChange(function(value) {
		if (value == true){
			spotLight1.intensity = 1;
		} else {
			spotLight1.intensity = 0;
		}
	});
  	
  	light1_R.onChange(function(value) {
		spotLight1.color.setRGB(guiValues.light1_R, guiValues.light1_G, guiValues.light1_B);
	});

  	light1_G.onChange(function(value) {
		spotLight1.color.setRGB(guiValues.light1_R, guiValues.light1_G, guiValues.light1_B);
	});

  	light1_B.onChange(function(value) {
		spotLight1.color.setRGB(guiValues.light1_R, guiValues.light1_G, guiValues.light1_B);
	});

  	light1_angle.onChange(function(value) {
		spotLight1.angle = value;
	});

	light1_x.onChange(function(value) {
		spotLight1.position.set(light1_offsetx+guiValues.light1_x, guiValues.light1_y, guiValues.light1_z);
		spotLight1.target.position.set(light1_offsetx+guiValues.light1_x, 0, guiValues.light1_z);
	});

	light1_y.onChange(function(value) {
		spotLight1.position.set(light1_offsetx+guiValues.light1_x, guiValues.light1_y, guiValues.light1_z);
		spotLight1.target.position.set(light1_offsetx+guiValues.light1_x, 0, guiValues.light1_z);
	});

	light1_z.onChange(function(value) {
		spotLight1.position.set(light1_offsetx+guiValues.light1_x, guiValues.light1_y, guiValues.light1_z);
		spotLight1.target.position.set(light1_offsetx+guiValues.light1_x, 0, guiValues.light1_z);
	});
  	
  	light2.onChange(function(value) {
		if (value == true){
			spotLight2.intensity = 1;
		} else {
			spotLight2.intensity = 0;
		}
	});
  	
  	light2_R.onChange(function(value) {
		spotLight2.color.setRGB(guiValues.light2_R, guiValues.light2_G, guiValues.light2_B);
	});

  	light2_G.onChange(function(value) {
		spotLight2.color.setRGB(guiValues.light2_R, guiValues.light2_G, guiValues.light2_B);
	});

  	light2_B.onChange(function(value) {
		spotLight2.color.setRGB(guiValues.light2_R, guiValues.light2_G, guiValues.light2_B);
	});

  	light2_angle.onChange(function(value) {
		spotLight2.angle = value;
	});

	light2_x.onChange(function(value) {
		spotLight2.position.set(light2_offsetx+guiValues.light2_x, guiValues.light2_y, guiValues.light2_z);
		spotLight2.target.position.set(light2_offsetx+guiValues.light2_x, 0, guiValues.light2_z);
	});

	light2_y.onChange(function(value) {
		spotLight2.position.set(light2_offsetx+guiValues.light2_x, guiValues.light2_y, guiValues.light2_z);
		spotLight2.target.position.set(light2_offsetx+guiValues.light2_x, 0, guiValues.light2_z);
	});

	light2_z.onChange(function(value) {
		spotLight2.position.set(light2_offsetx+guiValues.light2_x, guiValues.light2_y, guiValues.light2_z);
		spotLight2.target.position.set(light2_offsetx+guiValues.light2_x, 0, guiValues.light2_z);
	});
  	
  	light3.onChange(function(value) {
		if (value == true){
			spotLight3.intensity = 1;
		} else {
			spotLight3.intensity = 0;
		}
	});
  	
  	light3_R.onChange(function(value) {
		spotLight3.color.setRGB(guiValues.light3_R, guiValues.light3_G, guiValues.light3_B);
	});

  	light3_G.onChange(function(value) {
		spotLight3.color.setRGB(guiValues.light3_R, guiValues.light3_G, guiValues.light3_B);
	});

  	light3_B.onChange(function(value) {
		spotLight3.color.setRGB(guiValues.light3_R, guiValues.light3_G, guiValues.light3_B);
	});

  	light3_angle.onChange(function(value) {
		spotLight3.angle = value;
	});

	light3_x.onChange(function(value) {
		spotLight3.position.set(light3_offsetx+guiValues.light3_x, guiValues.light3_y, guiValues.light3_z);
		spotLight3.target.position.set(light3_offsetx+guiValues.light3_x, 0, guiValues.light3_z);
	});

	light3_y.onChange(function(value) {
		spotLight3.position.set(light3_offsetx+guiValues.light3_x, guiValues.light3_y, guiValues.light3_z);
		spotLight3.target.position.set(light3_offsetx+guiValues.light3_x, 0, guiValues.light3_z);
	});

	light3_z.onChange(function(value) {
		spotLight3.position.set(light3_offsetx+guiValues.light3_x, guiValues.light3_y, guiValues.light3_z);
		spotLight3.target.position.set(light3_offsetx+guiValues.light3_x, 0, guiValues.light3_z);
	});

	animate_spotLights.onChange(function(value) {
		if (guiValues.animate_spotLights == false){
			spotLight1.position.set(light1_offsetx+guiValues.light1_x, guiValues.light1_y, guiValues.light1_z);
			spotLight1.color.setRGB(guiValues.light1_R, guiValues.light1_G, guiValues.light1_B);
			spotLight2.position.set(light2_offsetx+guiValues.light2_x, guiValues.light2_y, guiValues.light2_z);
			spotLight2.color.setRGB(guiValues.light2_R, guiValues.light2_G, guiValues.light2_B);
			spotLight3.position.set(light3_offsetx+guiValues.light3_x, guiValues.light3_y, guiValues.light3_z);
			spotLight3.color.setRGB(guiValues.light3_R, guiValues.light3_G, guiValues.light3_B);
		}
	});
	main();
};