'use strict';

/**
 * @ngdoc directive
 * @name webunleashedExampleApp.directive:globe
 * @description
 * # globe
 */
angular.module('webunleashedExampleApp')
	.directive('globe', ['unitFactory',function (unitFactory) {
		return {
			restrict: 'E',
			scope: {
				width:"=width", // bindings
				height:  '@height', // static value
				color: '&color'    // expression
			},
			link: function postLink(scope, element, attrs) {
				//Three.js code goes here...

				//Set the width and height from the parent element width
		var plane = null;
		var selection = null;
		var offset = new THREE.Vector3()
		var objects = [];
   
		var scene = new THREE.Scene();

		//THREEx.WindowResize(this.renderer, this.camera);
		//document.addEventListener('mousedown', this.onDocumentMouseDown, false);
		//document.addEventListener('mousemove', this.onDocumentMouseMove, false);
		//document.addEventListener('mouseup', this.onDocumentMouseUp, false);

		var controls;
	    // Prepare webgl renderer
	    var renderer = new THREE.WebGLRenderer({ antialias:true });
	    renderer.setSize(window.innerWidth, window.innerHeight);
	    renderer.setClearColor(new THREE.FogExp2("#373b3c" , 0.0003).color);
		document.body.appendChild(renderer.domElement);


		var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.set(0,0,100);
		camera.lookAt(scene.position);
/*		controls = new THREE.OrbitControls(camera);
		controls.target = new THREE.Vector3(0, 0, 0);
		controls.maxDistance = 150;*/

	    // Plane, that helps to determinate an intersection position
	    plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(500, 500, 8, 8), new THREE.MeshBasicMaterial({color: 0xffffff}));
	    plane.visible = false;
	    scene.add(plane);

/*	    controls.enabled = false;
	    controls.addEventListener('change', render);*/



		var gable = unitFactory.createGable();
		scene.add(gable);
	    
	    var box = new THREE.BoxGeometry( 30, 30, 2 );
	    var material = new THREE.MeshBasicMaterial( { color: 0xff0000, vertexColors: THREE.FaceColors } );

	    var mesh = new THREE.Mesh( box, material );
	    mesh.position.x = 20;
	    mesh.position.y = 20;
	    mesh.position.z = 10;
	    objects.push(mesh);
	    scene.add( mesh );

	        // Add lights
	    scene.add( new THREE.AmbientLight(0x444444));

	    var dirLight = new THREE.DirectionalLight(0xffffff);
	    dirLight.position.set(200, 200, 1000).normalize();
	    camera.add(dirLight);
	    camera.add(dirLight.target);

		var gridXY = new THREE.GridHelper(1000, 10);
		gridXY.position.set( 100,100,-100);
		gridXY.rotation.x = Math.PI/2;
		gridXY.setColors( new THREE.Color("#545454"), new THREE.Color("#545454"));
		scene.add(gridXY);

		var raycaster = new THREE.Raycaster();
		
		render();
		animate();


		function render(){
			renderer.render(scene, camera);
		}

/*		function onDocumentMouseDown (event) {
			  // Get mouse position

			  var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
			  var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;


			  // Get 3D vector from 3D mouse position using 'unproject' function
			  var vector = new THREE.Vector3(mouseX, mouseY, 1);
			  vector.unproject(camera);

			  // Set the raycaster position
			  raycaster.set( camera.position, vector.sub( camera.position ).normalize() );

			  // Find all intersected objects
			  var intersects = raycaster.intersectObjects(objects);

			  if (intersects.length > 0) {
			    // Disable the controls
			    controls.enabled = false;

			    // Set the selection - first intersected object
			    selection = intersects[0].object;

			    // Calculate the offset
			    var intersects = raycaster.intersectObject(plane);

			    if(intersects.length > 0){
			    	offset.copy(intersects[0].point).sub(plane.position);
			    }
			}
		}*/

/*		function onDocumentMouseMove (event) {
			event.preventDefault();
			console.log("mouse move");

			  // Get mouse position
			  var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
			  var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
			  console.log(mouseX + ',' + mouseY);

			  // Get 3D vector from 3D mouse position using 'unproject' function
			  var vector = new THREE.Vector3(mouseX, mouseY, 1);
			  vector.unproject(camera);

			  // Set the raycaster position
			  raycaster.set(camera.position, vector.sub( camera.position ).normalize() );

			  if (selection) {
			  	console.log(selection);
			    // Check the position where the plane is intersected
			    var intersects = raycaster.intersectObject(plane);

			    // Reposition the object based on the intersection point with the plane
			    selection.position.copy(intersects[0].point.sub(offset));
			} else {
			    // Update position of the plane if need
			    var intersects = raycaster.intersectObjects(objects);
			    if (intersects.length > 0) {
			    	plane.position.copy(intersects[0].object.position);
			    	plane.lookAt(camera.position);
			    }
			}
		}*/

/*		function onDocumentMouseUp(event) {
// Enable the controls
			  controls.enabled = false;
			  console.log("mouse up");
			  selection = null;
			}*/

		function animate() {
		  requestAnimationFrame(animate);
		  render();
		  //update();
		}

			}
		};
	}]);
