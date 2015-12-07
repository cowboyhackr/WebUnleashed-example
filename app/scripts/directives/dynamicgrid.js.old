'use strict';

/**
 * @ngdoc directive
 * @name webunleashedExampleApp.directive:globe
 * @description
 * # globe
 */
angular.module('webunleashedExampleApp')
	.directive('dynamicgrid', ['worldframework',function (worldframework) {
		return {
			restrict: 'E',
			scope: {
				width:"=width", // bindings
				height:  '@height', // static value
				color: '&color'    // expression
			},
			link: function postLink(scope, element, attrs) {
				
			var camera, controls, scene, renderer;
			var originLength = 33;
			var zoomLevel = 10;

/*			STEP    Grid Ratio         camera.position.y
			10  	10' x 10'          > 50
			5   	5' x 5'			   > 25
			2   	2' x 2'            > 12.5
			1   	1' x 1'			   > 6.25
			.5  	6" x 6"            > 3.125
			.25 	3" x 3"			   > 1.56
			.083 	1" x 1"            > .78
			.041  	1/2" x 1/2"        > .39
			.02  	1/4" x 1/4"        > .195
			.01  	1/8" x 1/8"        > .098
			.005 	1/16" x 1/16"      >  .049    
			*/ 

			init();
			animate();

			function init() {

				scene = new THREE.Scene();
				scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

				renderer = new THREE.WebGLRenderer();
				renderer.setClearColor( scene.fog.color );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );

				document.body.appendChild(renderer.domElement);

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
				//camera.position.set( 500, 0, 0 );


				controls = new THREE.OrbitControls( camera, renderer.domElement );
				//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
				controls.enableDamping = true;
				controls.dampingFactor = 0.25;
				controls.enableZoom = true;

				camera.position.set(55,55,55);
				//camera.up = new THREE.Vector3(1,1,1);
				camera.lookAt(new THREE.Vector3(0,0,0));

				// world
				
				var origin = worldframework.drawOriginPoint(originLength);
				scene.add(origin);

				var grid = worldframework.drawGrid(1000, 10, originLength);
				grid.name = "grid";
				scene.add(grid);

				// lights

				var light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 1, 1, 1 );
				scene.add( light );

				light = new THREE.DirectionalLight( 0x002288 );
				light.position.set( -1, -1, -1 );
				scene.add( light );

				light = new THREE.AmbientLight( 0x222222 );
				scene.add( light );

				//



				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );

				controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true

//console.log(controls.getZoomScale());


				render();

			}

			function render() {

				
				console.log(camera.position.y);

				if(camera.position.y < 50 ){

					var gridObject = scene.getObjectByName("grid");

					scene.remove(gridObject);

	
					var grid = worldframework.drawGrid(1000, 5, originLength);
					grid.name = "grid";
					scene.add(grid);
				}

				renderer.render( scene, camera );
			}



			}
		};
	}]);
