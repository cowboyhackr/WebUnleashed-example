'use strict';

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
				var originLength = 1000;
				angular.zoomLevel = -1;
				var scale = 1; //1:1'

									var rendererStats  = new THREEx.RendererStats();
						rendererStats.domElement.style.position   = 'absolute'
						rendererStats.domElement.style.left  = '0px'
						rendererStats.domElement.style.bottom    = '0px'
						document.body.appendChild( rendererStats.domElement );

				init();
				animate();

				function init() {

					scene = new THREE.Scene();
					scene.fog = new THREE.Fog( 0xcccccc, 0.00025, 1000 );
			

					renderer = new THREE.WebGLRenderer();
					renderer.setClearColor( scene.fog.color );
					renderer.setPixelRatio( window.devicePixelRatio );
					renderer.setSize( window.innerWidth, window.innerHeight );




					document.body.appendChild(renderer.domElement);

					camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
					//camera.position.set( 500, 0, 0 );


					controls = new THREE.OrbitControls( camera, renderer.domElement );
					controls.minDistance = -100;
					controls.minZoom = -100;
					//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
					controls.enableDamping = true;
					controls.dampingFactor = 0.75;
					controls.enableZoom = true;

					camera.position.set(1000,1000,1000);
					//camera.up = new THREE.Vector3(1,1,1);
					camera.lookAt(new THREE.Vector3(0,0,0));

					// world
					
					var origin = worldframework.drawOriginPoint(originLength);
					scene.add(origin);

					var grid = worldframework.drawGridToZoomLevel(camera.position.y, scale, originLength);
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

					// Reference shape

					var geometry = new THREE.BoxGeometry( 10*scale, 10*scale,10*scale );
				    var material = new THREE.MeshLambertMaterial( { color: 0xFF0000 } );
				    var mesh = new THREE.Mesh( geometry, material );
					var cube = new THREE.Object3D();
					cube.add(mesh);
					var position = (10*scale)/2
					cube.position.y = position;
					cube.position.x = position;
					cube.position.z = position;
				    scene.add( cube );

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

					render();

				}

				function render() {

					//console.log(camera.position.y);
					var grid = worldframework.drawGridToZoomLevel(camera.position.y, scale, originLength);
					if(grid !== undefined){
						var gridObject = scene.getObjectByName("grid");
						scene.remove(gridObject);
						gridObject.geometry.dispose();
						scene.add(grid);
					}

					renderer.render( scene, camera );
					rendererStats.update(renderer);
				}
			}
		};
	}]);
