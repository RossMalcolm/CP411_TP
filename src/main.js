
const geometry = new THREE.BoxGeometry( 2, 2, 2 );
const material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
var currentScene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
const light = new THREE.AmbientLight( 0x404040 );
const controls = new THREE.OrbitControls(camera, renderer.domElement);
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
const loader = new THREE.GLTFLoader();
var scene = new THREE.Scene();
var scene2 = new THREE.Scene();
var scene3 = new THREE.Scene();





function main() {

	document.body.appendChild(renderer.domElement);
	renderer.setSize(window.innerWidth, window.innerHeight);

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

    scene.add(light1);
    scene.add(directionalLight);
    scene.add(light);
	loader.load( '../models/buster/scene.gltf', function ( gltf ) {
		gltf.scene.scale.multiplyScalar(1.2); // adjust scalar factor to match your scene scale
        gltf.scene.position.x = 1; // once rescaled, position the model where needed
        gltf.scene.position.z = -35;
        gltf.scene.position.y = 35;

		scene.add( gltf.scene );

	}, undefined, function ( error ) {

	console.error( error );

	} );
    

	scene2.add(light2);
	scene2.add(directionalLight);
	scene2.add(light);
	loader.load( '../models/headphones/scene.gltf', function(gltf){
		gltf.scene.scale.multiplyScalar(3/4); // adjust scalar factor to match your scene scale
        gltf.scene.position.x = 1; // once rescaled, position the model where needed
        gltf.scene.position.z = -35;
        gltf.scene.position.y = -25;

		scene2.add(gltf.scene);
	}, undefined, function (error) {
		console.error(error);
	});

	

	scene3.add(light3);
	scene3.add(directionalLight);
	scene3.add(light);
	loader.load( '../models/gun/scene.gltf', function(gltf){
		gltf.scene.scale.multiplyScalar(45); // adjust scalar factor to match your scene scale
        gltf.scene.position.x = 1; // once rescaled, position the model where needed
        gltf.scene.position.z = -35;
        gltf.scene.position.y = 0;

		scene3.add(gltf.scene);
	}, undefined, function (error) {
		console.error(error);
	});





	var backgroundButton = document.getElementById('scene');
	backgroundButton.addEventListener('click', function(){
		currentScene = scene;
   		
	});

	var backgroundButton = document.getElementById('scene2');
	backgroundButton.addEventListener('click', function(){
		currentScene = scene2;
   		
	});

	var backgroundButton = document.getElementById('scene3');
	backgroundButton.addEventListener('click', function(){
		currentScene = scene3;
   		
	});


// Alternatively, to parse a previously loaded JSON structure
	currentScene = scene;
	animate();
}


function animate(){
	requestAnimationFrame(animate);
	//directionalLight.position.copy(camera.position)
	renderer.render(currentScene, camera);
}


