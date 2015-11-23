'use strict';

/**
 * @ngdoc service
 * @name webunleashedExampleApp.sphereFactory
 * @description
 * # sphereFactory
 * Factory in the webunleashedExampleApp.
 */
angular.module('webunleashedExampleApp')
	.factory('unitFactory', function () {
		// Service logic
		// ...

		var map, bumpMap;
		var mapUrl = "../images/earthmap4k.jpg";
		var bumpMapUrl = "../images/earthbump4k.jpg"

		var createGable = function(xIn,yIn){

			var x, y, z;
		    x = xIn;
		    y = yIn;
		    z = 0;

		    var lineMaterial = new THREE.LineBasicMaterial({
		    	color: 0xffffff,
		    	linewidth:1000
	    	});

		    var complexTwoDWireFrameGeometry = new THREE.Geometry();
		    complexTwoDWireFrameGeometry.vertices.push(new THREE.Vector3(x - 20, y - 10, z));
		    complexTwoDWireFrameGeometry.vertices.push(new THREE.Vector3(x -20, y, z));
		    complexTwoDWireFrameGeometry.vertices.push(new THREE.Vector3(x, y, z));
		    complexTwoDWireFrameGeometry.vertices.push(new THREE.Vector3(x, y - 10, z));
		    complexTwoDWireFrameGeometry.vertices.push(new THREE.Vector3(x-20, y - 10, z));
		    complexTwoDWireFrameGeometry.faces.push(new THREE.Face3(0,1,2));
		    var complexTwoDWireFrameLine = new THREE.Line(complexTwoDWireFrameGeometry, lineMaterial);

	/*	    scene.add(complexTwoDWireFrameLine);
		    objects.push(complexTwoDWireFrameLine);*/

		    var widthGableGeometry = new THREE.Geometry();
		    widthGableGeometry.vertices.push(new THREE.Vector3(x, y + 5, z));
		    widthGableGeometry.vertices.push(new THREE.Vector3(x -20, y + 5, z));
		    widthGableGeometry.faces.push(new THREE.Face3(0,1,2));
		    var widthGableFrameLine = new THREE.Line(widthGableGeometry, lineMaterial);
	/*	    scene.add(widthGableFrameLine);
		    objects.push(widthGableFrameLine);*/

		    var heighthGableGeometry = new THREE.Geometry();
		    heighthGableGeometry.vertices.push(new THREE.Vector3(x-25, y - 10, z));
		    heighthGableGeometry.vertices.push(new THREE.Vector3(x-25, y , z));
		    var heighthGableLine = new THREE.Line(heighthGableGeometry, lineMaterial);
	/*	    scene.add(heighthGableGeometry);
		    objects.push(heighthGableGeometry);*/
			
			var gableObject3d = new THREE.Object3D();
			gableObject3d.add(complexTwoDWireFrameLine);
			gableObject3d.add(widthGableFrameLine);
			gableObject3d.add(heighthGableLine);

			    return gableObject3d;

		}

		var createCube = function(color){
			var color = color || 0x00ff00;

			//Cube geometry
				var geometry = new THREE.BoxGeometry( 1, 1, 1 );

				//Basic material
				var material = new THREE.MeshBasicMaterial( { color: color } );

				//Mesh
				var cube = new THREE.Mesh( geometry, material );

				return cube;

		}

		var createSphere = function(radius) {
			var radius = radius || 1;

			// widthSegments — number of horizontal segments. Minimum value is 3, and the default is 8.
			// heightSegments — number of vertical segments. Minimum value is 2, and the default is 6.
			var globeGeometry = new THREE.SphereGeometry(radius, 32, 16);

			//Create the texture map
			map = THREE.ImageUtils.loadTexture(mapUrl);
			bumpMap = THREE.ImageUtils.loadTexture(bumpMapUrl);
			var globeMaterial = new THREE.MeshPhongMaterial({ map: map, bumpMap: bumpMap, bumpScale: 2});

			var globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
			console.log('m',globeMaterial);
			return globeMesh;
		}

		var createCloud = function(radius) {
			//Geo
			var cloudGeometry = new THREE.SphereGeometry(radius, 32, 32);

			//Material
			var cloudMaterial = new THREE.MeshPhongMaterial({
				map: THREE.ImageUtils.loadTexture('../images/earthclouds4k.png'),
				opacity: 0.8,
				transparent: true,
				depthWrite: false
			});

			//Mesh
			var cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);

			return cloudMesh;
		}

		// Public API here
		return {
			createSphere: createSphere,
			createCube: createCube,
			createCloud: createCloud,
			createGable : createGable
		};
	});
