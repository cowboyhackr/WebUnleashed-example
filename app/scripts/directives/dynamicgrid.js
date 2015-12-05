'use strict';

/**
 * @ngdoc directive
 * @name webunleashedExampleApp.directive:globe
 * @description
 * # globe
 */
angular.module('webunleashedExampleApp')
	.directive('dynamicgrid', ['originFactory',function (originFactory) {
		return {
			restrict: 'E',
			scope: {
				width:"=width", // bindings
				height:  '@height', // static value
				color: '&color'    // expression
			},
			link: function postLink(scope, element, attrs) {
				
			var camera, controls, scene, renderer;

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
				camera.position.set( 500, 0, 0 );


				controls = new THREE.OrbitControls( camera, renderer.domElement );
				//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
				controls.enableDamping = true;
				controls.dampingFactor = 0.25;
				controls.enableZoom = true;

				camera.position.set(500,100,100);
				//camera.up = new THREE.Vector3(1,1,1);
				camera.lookAt(new THREE.Vector3(0,0,0));

				// world
				var origin = originFactory.drawOriginPoint();
				scene.add(origin);

				var grid = originFactory.drawGrid(1000, 10);
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

				renderer.render( scene, camera );
/*				if(camera.position.x < 1){
				    console.log("zooming...");
					var grid = new THREE.GridHelper(1000, 1);
					scene.add(grid);
				}*/
				//console.log(camera.position.x);
			}



			}
		};
	}]);
