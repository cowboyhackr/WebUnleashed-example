'use strict';


angular.module('coreapp')
    .factory('worldframework', function(worldSettings) {

        var drawOriginPoint = function() {

            var green = 0x00FF00;
            var blue = 0x0000FF;
            var red = 0xFF0000;
            var xlineMaterial = new THREE.LineBasicMaterial({
                color: red,
                linewidth: 5000
            });

            var xlineGeometry = new THREE.Geometry();
            xlineGeometry.vertices.push(new THREE.Vector3(-worldSettings.originLength, 0, 0));
            xlineGeometry.vertices.push(new THREE.Vector3(worldSettings.originLength, 0, 0));
            var xLine = new THREE.Line(xlineGeometry, xlineMaterial);


            var ylineMaterial = new THREE.LineBasicMaterial({
                color: blue,
                linewidth: 5000
            });

            var ylineGeometry = new THREE.Geometry();
            ylineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
            ylineGeometry.vertices.push(new THREE.Vector3(0, worldSettings.originLength, 0));
            var yLine = new THREE.Line(ylineGeometry, ylineMaterial);


            var zlineMaterial = new THREE.LineBasicMaterial({
                color: green,
                linewidth: 5000
            });

            var zlineGeometry = new THREE.Geometry();
            zlineGeometry.vertices.push(new THREE.Vector3(0, 0, -worldSettings.originLength));
            zlineGeometry.vertices.push(new THREE.Vector3(0, 0, worldSettings.originLength));
            var zLine = new THREE.Line(zlineGeometry, zlineMaterial);

            var originObject3d = new THREE.Object3D();
            originObject3d.add(xLine);
            originObject3d.add(yLine);
            originObject3d.add(zLine);

            return originObject3d;

        }

        var drawGridToZoomLevel = function(height) {

            var beginZoomLevel = worldSettings.zoomLevel;

            var step;
            if (height >= 120 * worldSettings.scale && worldSettings.zoomLevel !== 10) {
                step = 120 * worldSettings.scale;
                worldSettings.zoomLevel = 10;
            } else if (height <= 120 * worldSettings.scale && height > 60 * worldSettings.scale && worldSettings.zoomLevel !== 9) {
                step = 60 * worldSettings.scale;
                worldSettings.zoomLevel = 9;
            } else if (height <= 60 * worldSettings.scale && height > 24 * worldSettings.scale && worldSettings.zoomLevel !== 8) {
                step = 24 * worldSettings.scale;
                worldSettings.zoomLevel = 8;
            } else if (height <= 24 * worldSettings.scale && height > 12 * worldSettings.scale && worldSettings.zoomLevel !== 7) {
                step = 12 * worldSettings.scale;
                worldSettings.zoomLevel = 7;
            } else if (height <= 12 * worldSettings.scale && height > 6 * worldSettings.scale && worldSettings.zoomLevel !== 6) {
                step = 6 * worldSettings.scale;
                worldSettings.zoomLevel = 6;
            } else if (height <= 6 * worldSettings.scale && height > 3 * worldSettings.scale && worldSettings.zoomLevel !== 5) {
                step = 3 * worldSettings.scale;
                worldSettings.zoomLevel = 5;
            } else if (height <= 3 * worldSettings.scale && height > 1 * worldSettings.scale && worldSettings.zoomLevel !== 4) {
                step = 1 * worldSettings.scale;
                worldSettings.zoomLevel = 4;
            } else if (height <= 1 * worldSettings.scale && height > .5 * worldSettings.scale && worldSettings.zoomLevel !== 3) {
                step = .5 * worldSettings.scale;
                worldSettings.zoomLevel = 3;
            } else if (height <= .5 * worldSettings.scale && height > .25 * worldSettings.scale && worldSettings.zoomLevel !== 2) {
                step = .25 * worldSettings.scale;
                worldSettings.zoomLevel = 2;
            } else if (height <= .25 * worldSettings.scale && height > .125 * worldSettings.scale && worldSettings.zoomLevel !== 1) {
                step = .125 * worldSettings.scale;
                worldSettings.zoomLevel = 1;
            } else if (height <= .125 * worldSettings.scale && height > .0625 * worldSettings.scale && worldSettings.zoomLevel !== 0) {
                step = .0625 * worldSettings.scale;
                worldSettings.zoomLevel = 0;
            } else if (height <= 0 && height > -.0625 * worldSettings.scale && worldSettings.zoomLevel !== -1) {
                step = .0625  * worldSettings.scale;
                worldSettings.zoomLevel = -1;
            } else if (height <= -.0625  && height > -.125 * worldSettings.scale && worldSettings.zoomLevel !== -2) {
                step = .125   * worldSettings.scale;
                worldSettings.zoomLevel = -2;
            } else if (height <= -.25 * worldSettings.scale && height > -.5 * worldSettings.scale && worldSettings.zoomLevel !== -3) {
                step = .25 * worldSettings.scale;
                worldSettings.zoomLevel = -3;
            } else if (height <= -.5 * worldSettings.scale && height > -.1 * worldSettings.scale && worldSettings.zoomLevel !== -4) {
                step = .5 * worldSettings.scale;
                worldSettings.zoomLevel = -4;
            } else if (height <= -1 * worldSettings.scale && height > -3 * worldSettings.scale && worldSettings.zoomLevel !== -5) {
                step = 1 * worldSettings.scale;
                worldSettings.zoomLevel = -5;
            } else if (height <= -3 * worldSettings.scale && height > -6 * worldSettings.scale && worldSettings.zoomLevel !== -6) {
                step = 3 * worldSettings.scale;
                worldSettings.zoomLevel = -6;
            } else if (height <= -6 * worldSettings.scale && height > -12 * worldSettings.scale && worldSettings.zoomLevel !== -7) {
                step = 6 * worldSettings.scale;
                worldSettings.zoomLevel = -7;
            } else if (height <= -12 * worldSettings.scale && height > -24 * worldSettings.scale && worldSettings.zoomLevel !== -8) {
                step = 12* worldSettings.scale;
                worldSettings.zoomLevel = -8;
            } else if (height <= -24 * worldSettings.scale && height > -60 * worldSettings.scale && worldSettings.zoomLevel !== -9) {
                step = 24 * worldSettings.scale;
                worldSettings.zoomLevel = -9;
            } else if (height <= -60 * worldSettings.scale && height > -120 * worldSettings.scale && worldSettings.zoomLevel !== -10) {
                step = 60 * worldSettings.scale;
                worldSettings.zoomLevel = -10;
            } else if (height < -120 * worldSettings.scale && worldSettings.zoomLevel !== -11) {
            	step = 120 * worldSettings.scale;
                worldSettings.zoomLevel = -11;
            }

            if (beginZoomLevel != worldSettings.zoomLevel) {
                var grid = this.drawGrid(step * 100, step);
                grid.name = "grid";
                console.log(step * 10);
                				console.log("zoom Level " + worldSettings.zoomLevel)
                				console.log("height: " + height);
                				console.log("step " + step);
                return grid;
            } else {
                return undefined;
            }
        }

        var drawGrid = function(size, step) {

            var geometry = new THREE.Geometry();
            var material = new THREE.LineBasicMaterial({
                vertexColors: THREE.VertexColors
            });
            var innerStep = step / 5;
            var y = 0;

            var count = 0;
            var j = 0;
            for (var i = 0; i <= size; i += step) {

                var onAxis = i === 0 || size === 0;

                if (!onAxis) {
                    addGridVertices(geometry, undefined, size, y, i);
                }

                if ((i + step) < size) {
                    var firstInnerStep = i + innerStep;
                    var lastInnerStep = (i + step) - innerStep;

                    for (var ii = firstInnerStep; ii < i + step; ii += innerStep) {
                        addGridVertices(geometry, new THREE.Color(0xB3B3B3), size, y, ii);
                    }
                }

                if (!onAxis) {
                    addGridVertices(geometry, undefined, size, y, j);
                }

                if (-(j - step) < size) {

                    var jfirstInnerStep = j - innerStep;
                    var jlastInnerStep = (j - step) + innerStep;

                    var endCondition = j - step;

                    for (var jj = jfirstInnerStep; jj > j - step; jj -= innerStep) {
                        addGridVertices(geometry, new THREE.Color(0xB3B3B3), size, y, jj);
                    }
                }

                j -= step;
            }

            var lineSegments = new THREE.LineSegments(geometry, material);
            return lineSegments;
        }

        var addGridVertices = function(geometry, customcolor, size, y, iterator) {

            var color1 = new THREE.Color(0x888888);
            var color2 = new THREE.Color(0x888888);
            var color3 = new THREE.Color(0xB3B3B3);

            geometry.vertices.push(
                new THREE.Vector3(-size, y, iterator),
                new THREE.Vector3(size, y, iterator),
                new THREE.Vector3(iterator, y, -size),
                new THREE.Vector3(iterator, y, size));

            var color = iterator === 0 ? color1 : color2;

            if (customcolor === undefined) {
                geometry.colors.push(color, color, color, color);
            } else {
                geometry.colors.push(customcolor, customcolor, customcolor, customcolor);
            }
        }

        // Public API here
        return {
            drawOriginPoint: drawOriginPoint,
            drawGrid: drawGrid,
            drawGridToZoomLevel: drawGridToZoomLevel
        };


    });
