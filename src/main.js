
const geometry = new THREE.BoxGeometry( 2, 2, 2 );
const material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
var currentScene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
const light = new THREE.AmbientLight( 0x404040, 25);
const controls = new THREE.OrbitControls(camera, renderer.domElement);
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
const loader = new THREE.GLTFLoader();
var car1 = new THREE.Object3D();
var car2 = new THREE.Object3D();
var car3 = new THREE.Object3D();
var currentCar = new THREE.Object3D
var scene = new THREE.Scene();

function main() {

	document.body.appendChild(renderer.domElement);
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.addEventListener('keydown', keyPressed);

	camera.position.z = 250;

	const light1_x = 1;
    const light1_y = 1;
    const light1_z = 1;
    const light1_color = 0xFFFFFF;
    const light1_intensity = 1;
    const light1 = new THREE.DirectionalLight(light1_color, light1_intensity);
    light1.position.set(light1_x, light1_y, light1_z);
    const light2 = new THREE.DirectionalLight(light1_color, light1_intensity);
    light2.position.set(light1_x, light1_y, light1_z);
    const light3 = new THREE.DirectionalLight(light1_color, light1_intensity);
    light3.position.set(light1_x, light1_y, light1_z);


    const spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( 100, 1000, 100 );

	spotLight.castShadow = true;

	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;

	spotLight.shadow.camera.near = 500;
	spotLight.shadow.camera.far = 4000;
	spotLight.shadow.camera.fov = 30;


    scene.add(light1);
    scene.add(spotLight);
    scene.add(directionalLight);
    scene.add(light);

	loader.load( '../models/car1/scene.gltf', function ( gltf ) {
		car1 = gltf.scene;
		car1.scale.multiplyScalar(1.2); // adjust scalar factor to match your scene scale
        car1.position.x = 1; // once rescaled, position the model where needed
        car1.position.z = -35;
        car1.position.y = 35;
        //car1.visible = false;
        currentCar = car1;
		scene.add(car1);

	}, undefined, function ( error ) {

	console.error( error );

	} );
    
	loader.load( '../models/car2/scene.gltf', function(gltf){
		car2 = gltf.scene;
		car2.scale.multiplyScalar(30); // adjust scalar factor to match your scene scale
        car2.position.x = 1; // once rescaled, position the model where needed
        car2.position.z = -35;
        car2.position.y = -25;
        //car2.visibile = false;

		//scene.add(car2);

	}, undefined, function (error) {
		console.error(error);
	});

	
	loader.load( '../models/car3/scene.gltf', function(gltf){
		car3 = gltf.scene;
		car3.scale.multiplyScalar(45); // adjust scalar factor to match your scene scale
        car3.position.x = 1; // once rescaled, position the model where needed
        car3.position.z = -35;
        car3.position.y = 0;
        //car3.visibile = false;

		//scene.add(car3);

	}, undefined, function (error) {
		console.error(error);
	});

	init_buttons();
	
// Alternatively, to parse a previously loaded JSON structure
	animate();
}

function init_buttons(){
	var backgroundButton = document.getElementById('scene');
	backgroundButton.addEventListener('click', function(){
		scene.remove(currentCar);
		scene.add(car1);
   		
	});

	var backgroundButton = document.getElementById('scene2');
	backgroundButton.addEventListener('click', function(){
		scene.remove(currentCar);
		scene.add(car2);
   		
	});

	var backgroundButton = document.getElementById('scene3');
	backgroundButton.addEventListener('click', function(){
		scene.remove(currentCar);
		scene.add(car3);
   		
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

function animate(){
	requestAnimationFrame(animate);
	//directionalLight.position.copy(camera.position)
	renderer.render(scene, camera);
}


