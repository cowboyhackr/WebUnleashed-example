'use strict';


angular.module('webunleashedExampleApp')
	.factory('worldframework', function () {



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

		var drawGridToZoomLevel = function(height, originLength){

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
			var beginZoomLevel = angular.zoomLevel;
			//console.log(height);
			console.log(angular.zoomLevel);
			var step;
			if(height >= 50 && angular.zoomLevel !== 10){
				step = 10;
				angular.zoomLevel = 10;
			}else if(height <= 50 && height > 25 && angular.zoomLevel !== 9){
				step = 5;
				angular.zoomLevel  = 9;
			}else if(height <= 25 && height > 12.5 && angular.zoomLevel !== 8){
				step = 2;
				angular.zoomLevel  = 8;
			}else if(height <= 12.5 && height > 6.25 && angular.zoomLevel !== 7){
				step = 1;
				angular.zoomLevel = 7;
			}else if(height <= 6.25 && height > 3.125 && angular.zoomLevel !== 6){
				step = .5;
				angular.zoomLevel = 6;
			}else if(height <= 3.125 && height > 1.56 && angular.zoomLevel !== 5){
				step = .25;
				angular.zoomLevel = 5;
			}else if(height <= 1.56 && height > .78 && angular.zoomLevel !== 4){
				step = .083;
				angular.zoomLevel = 4;
			}else if(height <= .78 && height > .39 && angular.zoomLevel !== 3){
				step = .041;
				angular.zoomLevel = 3;
			}else if(height <= .39 && height > .195 && angular.zoomLevel !== 2){
				step = .02;
				angular.zoomLevel = 2;
			}else if(height <= .195 && height > .098 && angular.zoomLevel !== 1){
				step = .01;
				angular.zoomLevel = 1;
			}else if(height <= .098 && height > .049 && angular.zoomLevel !== 0){
				step = .005;
				angular.zoomLevel = 0;
			}


			console.log("step " + step);
			if(beginZoomLevel != angular.zoomLevel){
				var grid = this.drawGrid(100, step, originLength);
				grid.name = "grid";
				return grid;
			}else{
				return undefined;
			}

		}

		var drawGrid = function ( size, step, originLength ) {

			var geometry = new THREE.Geometry();
			var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );

			this.color1 = new THREE.Color( 0x888888 );
			this.color2 = new THREE.Color( 0x888888 );

			for ( var i = - size; i <= size; i += step ) {

				var onAxis = i === 0 || size ===0;

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



		// Public API here
		return {
			createGable : createGable,
			drawOriginPoint : drawOriginPoint,
			drawGrid : drawGrid,
			drawGridToZoomLevel : drawGridToZoomLevel
		};
	});
