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
		    xlineGeometry.vertices.push(new THREE.Vector3(- originLength, 0, 0));
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
		    zlineGeometry.vertices.push(new THREE.Vector3(0, 0, - originLength));
		    zlineGeometry.vertices.push(new THREE.Vector3(0, 0, originLength));
		    var zLine = new THREE.Line(zlineGeometry, zlineMaterial);

		    var originObject3d = new THREE.Object3D();
			originObject3d.add(xLine);
			originObject3d.add(yLine);
			originObject3d.add(zLine);

			return originObject3d;

		}

		var drawGridToZoomLevel = function(height, scale, originLength){
/*1 3js unit equals ?
			STEP    Grid Ratio     inches   meters   camera.position.y @50 @1024   3js (x5) units    (x.5)
			10  	10' x 10'       120   	  3			   > 50          1024       600               60
			5   	5' x 5'			 60   	  1.5			> 25          512       300               30
			2   	2' x 2'          24   	  .75			> 12.5        256       120               15
			1   	1' x 1'			 12   	  			> 6.25        128            60                5
			.5  	6" x 6"           6   					> 3.125       64         30                
			.25 	3" x 3"			  3	  					> 1.56        32         15
			.083 	1" x 1"           1	  					> .78         16          5
			.041  	1/2" x 1/2"      .5   					> .39         8           2.5
			.02  	1/4" x 1/4"      .25    				> .195        4           1.25
			.01  	1/8" x 1/8"      .125  					> .098        2           .625
			.005 	1/16" x 1/16"    .0625  				>  .049       1           .3125
*/
			var beginZoomLevel = angular.zoomLevel;

			var step;
			if(height >= 120*scale && angular.zoomLevel !== 10){
				step = 120*scale;
				angular.zoomLevel = 10;
			}else if(height <= 120*scale && height > 60*scale && angular.zoomLevel !== 9){
				step = 60*scale;
				angular.zoomLevel  = 9;
			}else if(height <= 60*scale && height > 24*scale && angular.zoomLevel !== 8){
				step = 24*scale;
				angular.zoomLevel  = 8;
			}else if(height <= 24*scale && height > 12*scale && angular.zoomLevel !== 7){
				step = 12*scale;
				angular.zoomLevel = 7;
			}else if(height <= 12*scale && height > 6*scale && angular.zoomLevel !== 6){
				step = 6*scale;
				angular.zoomLevel = 6;
			}else if(height <= 6*scale && height > 3*scale && angular.zoomLevel !== 5){
				step = 3*scale;
				angular.zoomLevel = 5;
			}else if(height <= 3*scale && height > 1*scale && angular.zoomLevel !== 4){
				step = 1*scale;
				angular.zoomLevel = 4;
			}else if(height <= 1*scale && height > .5*scale && angular.zoomLevel !== 3){
				step = .5*scale;
				angular.zoomLevel = 3;
			}else if(height <= .5*scale && height > .25*scale && angular.zoomLevel !== 2){
				step = .25*scale;
				angular.zoomLevel = 2;
			}else if(height <= .25*scale && height > .125*scale && angular.zoomLevel !== 1){
				step = .125*scale;
				angular.zoomLevel = 1;
			}else if(height <= .125*scale && height > .0625*scale && angular.zoomLevel !== 0){
				step = .0625*scale;
				angular.zoomLevel = 0;
			}

			if(beginZoomLevel != angular.zoomLevel){
				var grid = this.drawGrid(1000, step, originLength);
				grid.name = "grid";
				console.log(angular.zoomLevel)
				console.log("height: " + height);
				console.log("step " + step);
				return grid;
			}else{
				return undefined;
			}
		}

		var drawGrid = function ( size, step, originLength ) {

			var geometry = new THREE.Geometry();
			var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );
			var y = 0;
			this.color1 = new THREE.Color( 0x888888 );
			this.color2 = new THREE.Color( 0x888888 );
			this.color3 = new THREE.Color( 0xB3B3B3);

			var count = 0;
			var j = 0;
			//for ( var i = - size; i <= size; i += step ) {
			for ( var i = 0; i <= size; i += step ) {
				

				var onAxis = i === 0 || size ===0;

				if(!onAxis) {
					
					geometry.vertices.push(
						new THREE.Vector3( - size, y, i ), 
						new THREE.Vector3( size, y, i ),
						new THREE.Vector3( i, y, - size ), 
						new THREE.Vector3( i, y, size )
					);

					var color = i === 0 ? this.color1 : this.color2;

					geometry.colors.push( color, color, color, color );

					geometry.vertices.push(
						new THREE.Vector3( - size, y, j ), 
						new THREE.Vector3( size, y, j ),
						new THREE.Vector3( j, y, - size ), 
						new THREE.Vector3( j, y, size )
					);

					var color = j === 0 ? this.color1 : this.color2;

					geometry.colors.push( color, color, color, color );

				}else{

/*					geometry.vertices.push(
						new THREE.Vector3( - size, y, 0 ), 
						new THREE.Vector3( 0, y, 0),
						new THREE.Vector3( originLength, y, 0 ), 
						new THREE.Vector3( size, y, 0 )
					);

					var color = i === 0 ? this.color1 : this.color2;

					geometry.colors.push( color, color, color, color );

					geometry.vertices.push(
						new THREE.Vector3( 0, y, - size ), 
						new THREE.Vector3( 0, y, 0),
						new THREE.Vector3( 0, y, originLength ), 
						new THREE.Vector3( 0, y, size )
					);

					var color = i === 0 ? this.color1 : this.color2;

					geometry.colors.push( color, color, color, color );*/
				}

				j -= step;
			}

			 var lineSegments = new THREE.LineSegments(geometry, material );
			 return lineSegments;

		}

		var drawGridOrig = function ( size, step, originLength ) {

			var geometry = new THREE.Geometry();
			var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );
			var y = 0;
			this.color1 = new THREE.Color( 0x888888 );
			this.color2 = new THREE.Color( 0x888888 );
			this.color3 = new THREE.Color( 0xB3B3B3);

			var count = 0;
			for ( var i = - size; i <= size; i += step ) {
				//console.log(i);
				var onAxis = i === 0 || size ===0;

				if(!onAxis) {
					
					geometry.vertices.push(
						new THREE.Vector3( - size, y, i ), 
						new THREE.Vector3( size, y, i ),
						new THREE.Vector3( i, y, - size ), 
						new THREE.Vector3( i, y, size )
					);

					var color = i === 0 ? this.color1 : this.color2;
/*					count++;
					if(count % 3 === 0){
						color = this.color3;
					}*/
					geometry.colors.push( color, color, color, color );

				}else{

					geometry.vertices.push(
						new THREE.Vector3( - size, y, 0 ), 
						new THREE.Vector3( 0, y, 0),
						new THREE.Vector3( originLength, y, 0 ), 
						new THREE.Vector3( size, y, 0 )
					);

					var color = i === 0 ? this.color1 : this.color2;

					geometry.colors.push( color, color, color, color );

					geometry.vertices.push(
						new THREE.Vector3( 0, y, - size ), 
						new THREE.Vector3( 0, y, 0),
						new THREE.Vector3( 0, y, originLength ), 
						new THREE.Vector3( 0, y, size )
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
