
const geometry = new THREE.BoxGeometry( 2, 2, 2 );
const material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
const light = new THREE.AmbientLight( 0x404040 );
const controls = new THREE.OrbitControls(camera, renderer.domElement);
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
const loader = new THREE.OBJLoader();

function main() {
	document.body.appendChild(renderer.domElement);
	renderer.setSize(window.innerWidth, window.innerHeight);
	scene.add( cube );
	
	//scene.add( directionalLight );
	camera.position.z = 5;

	const light1_x = 1;
    const light1_y = 1;
    const light1_z = 1;
    const light1_color = 0xFFFFFF;
    const light1_intensity = 1;
    const light1 = new THREE.DirectionalLight(light1_color, light1_intensity);
    light1.position.set(light1_x, light1_y, light1_z);
    scene.add(light1);
    scene.add(light)
// 	loader.load(
// 	// resource URL
// 	'models/minecraft-steve.obj',
// 	// called when resource is loaded
// 	function ( object ) {

// 		scene.add( object );

// 	},
// 	// called when loading is in progresses
// 	function ( xhr ) {

// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

// 	},
// 	// called when loading has errors
// 	function ( error ) {

// 		console.log( 'An error happened' );

// 	}
// );

// 	var backgroundButton = document.getElementById('change-Lighting');
// 	backgroundButton.addEventListener('click', function(){
   		
// 	});
// // Alternatively, to parse a previously loaded JSON structure

	animate();
}


function animate(){
	requestAnimationFrame(animate);
	//directionalLight.position.copy(camera.position)
	renderer.render(scene, camera);
}


