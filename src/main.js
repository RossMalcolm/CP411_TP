const clock = new THREE.Clock();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
const light = new THREE.AmbientLight( 0x404040 );
//const controls = new THREE.OrbitControls( camera, renderer.domElement );
const controls_movement = new THREE.MapControls( camera, renderer.domElement );
controls_movement.enableDamping = true; // an animation loop is 
controls_movement.dampingFactor = 0.05;
controls_movement.screenSpacePanning = false;
controls_movement.minDistance = 5;
controls_movement.maxDistance = 25;
controls_movement.maxPolarAngle = Math.PI / 2;
var light1;
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
const loader = new THREE.GLTFLoader();
var guiValues;

function main() {
	document.body.appendChild(renderer.domElement);
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	//scene.add( directionalLight );
	camera.position.x = 0;
	camera.position.y = 5;
	camera.position.z = 20;

	const light1_x = 0.0;
    const light1_y = 0.0;
    const light1_z = 0.0;
    const light1_color = new THREE.Color(1, 1, 1);
    const light1_intensity = 1;
    light1 = new THREE.DirectionalLight(light1_color, light1_intensity);
    light1.position.set(light1_x, light1_y, light1_z);
    
    scene.add(light1);
    scene.add(light);
	
	loader.load( '../models/80s_warehouse/scene.gltf', function ( gltf ) {

	scene.add(gltf.scene);

	}, undefined, function (error) {

	console.error( error );

	} );

	var backgroundButton = document.getElementById('change-Lighting');
	backgroundButton.addEventListener('click', function(){
   		
	});

	animate();
}

function animate(){
	requestAnimationFrame(animate);
	controls_movement.update();
	//directionalLight.position.copy(camera.position)
	renderer.render(scene, camera);
}


var FizzyText = function() {
  // Sets up inital values for the sliders
 this.light1_R = 255.0;
 this.light1_G = 255.0;
 this.light1_B = 255.0;
 this.light2_R = 255;
 this.light2_G = 255;
 this.light2_B = 255;
 this.light3_R = 255;
 this.light3_G = 255;
 this.light3_B = 255;
}

window.onload = function() {
  	guiValues = new FizzyText();
  	var gui = new dat.GUI();
  	var light_1_R = gui.add(guiValues, 'light1_R', 0.0, 255.0);
  	var light_1_G = gui.add(guiValues, 'light1_G', 0.0, 255.0);
  	var light_1_B = gui.add(guiValues, 'light1_B', 0.0, 255.0);
  	var light_2_R = gui.add(guiValues, 'light2_R', 0, 255);
  	var light_2_G = gui.add(guiValues, 'light2_G', 0, 255);
  	var light_2_B = gui.add(guiValues, 'light2_B', 0, 255);
  	var light_3_R = gui.add(guiValues, 'light3_R', 0, 255);
  	var light_3_G = gui.add(guiValues, 'light3_G', 0, 255);
  	var light_3_B = gui.add(guiValues, 'light3_B', 0, 255);

  	light_1_R.onChange(function(value) {
		light1.color.setRGB(guiValues.light1_R, guiValues.light1_G, guiValues.light1_B);
		light1.intensity = 1;
	});

  	light_1_G.onChange(function(value) {
		light1.color.setRGB(guiValues.light1_R, guiValues.light1_G, guiValues.light1_B);
		light1.intensity = 1;
	});

  	light_1_B.onChange(function(value) {
		light1.color.setRGB(guiValues.light1_R, guiValues.light1_G, guiValues.light1_B);
		light1.intensity = 1;
	});
	main();
};

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}