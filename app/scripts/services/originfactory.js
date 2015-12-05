'use strict';


angular.module('webunleashedExampleApp')
	.factory('originFactory', function () {


		var drawOriginPoint = function(originLength){

			var green = 0x00FF00;
			var blue = 0x0000FF;
			var red = 0xFF0000;
	    	var xlineMaterial = new THREE.LineBasicMaterial({
		    	color: red,
		    	linewidth:5000
	    	});

	    	var xlineGeometry = new THREE.Geometry();
		    xlineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
		    xlineGeometry.vertices.push(new THREE.Vector3(originLength, 0, 0));
		    var xLine = new THREE.Line(xlineGeometry, xlineMaterial);


	    	var ylineMaterial = new THREE.LineBasicMaterial({
		    	color:  blue,
		    	linewidth:5000
	    	});

	    	var ylineGeometry = new THREE.Geometry();
		    ylineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
		    ylineGeometry.vertices.push(new THREE.Vector3(0, originLength, 0));
		    var yLine = new THREE.Line(ylineGeometry, ylineMaterial);
		    

	    	var zlineMaterial = new THREE.LineBasicMaterial({
		    	color: green,
		    	linewidth:5000
	    	});

	    	var zlineGeometry = new THREE.Geometry();
		    zlineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
		    zlineGeometry.vertices.push(new THREE.Vector3(0, 0, originLength));
		    var zLine = new THREE.Line(zlineGeometry, zlineMaterial);

		    var originObject3d = new THREE.Object3D();
			originObject3d.add(xLine);
			originObject3d.add(yLine);
			originObject3d.add(zLine);

			return originObject3d;

		}

		var drawGrid = function ( size, step, originLength ) {

			var geometry = new THREE.Geometry();
			var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );

			this.color1 = new THREE.Color( 0x888888 );
			this.color2 = new THREE.Color( 0x888888 );

			for ( var i = - size; i <= size; i += step ) {


				var onAxis = i === 0 || size ===0;

				/*if(i !== 0 && size !==0){*/
				if(!onAxis) {
					geometry.vertices.push(
						new THREE.Vector3( - size, 0, i ), 
						new THREE.Vector3( size, 0, i ),
						new THREE.Vector3( i, 0, - size ), 
						new THREE.Vector3( i, 0, size )
					);

					var color = i === 0 ? this.color1 : this.color2;

					geometry.colors.push( color, color, color, color );

				}else{
					geometry.vertices.push(
						new THREE.Vector3( - size, 0, 0 ), 
						new THREE.Vector3( 0, 0, 0),
						new THREE.Vector3( originLength, 0, 0 ), 
						new THREE.Vector3( size, 0, 0 )
					);

					var color = i === 0 ? this.color1 : this.color2;

					geometry.colors.push( color, color, color, color );

					geometry.vertices.push(
						new THREE.Vector3( 0, 0, - size ), 
						new THREE.Vector3( 0, 0, 0),
						new THREE.Vector3( 0, 0, originLength ), 
						new THREE.Vector3( 0, 0, size )
					);

					var color = i === 0 ? this.color1 : this.color2;

					geometry.colors.push( color, color, color, color );
				}
			}

			 var lineSegments = new THREE.LineSegments(geometry, material );
			 return lineSegments;

		}


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
			createGable : createGable,
			drawOriginPoint : drawOriginPoint,
			drawGrid : drawGrid
		};
	});
