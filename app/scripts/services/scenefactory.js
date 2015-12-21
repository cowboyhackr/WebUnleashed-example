"use strict";

angular.module('coreapp')
    .factory('scenefactory', function($http, $log, $rootScope, worldframework) {


        var camera, controls, scene, renderer;
        var originLength = 1000;
        angular.zoomLevel = -1;
        var scale = 1; //1:1'

        var rendererStats = new THREEx.RendererStats();
        rendererStats.domElement.style.position = 'absolute'
        rendererStats.domElement.style.left = '0px'
        rendererStats.domElement.style.bottom = '0px'
            //document.body.appendChild( rendererStats.domElement );

        /**
         * Initialize the 3D scene.
         * @param  {Object} params {}
         */
        function init(params) {

            scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0xcccccc, 0.00025);

            renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(scene.fog.color);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);

            document.body.appendChild(renderer.domElement);

            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
            //camera.position.set( 500, 0, 0 );

            controls = new THREE.OrbitControls(camera, renderer.domElement);

            //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
            controls.enableDamping = true;
            controls.dampingFactor = 0.75;
            controls.enableZoom = true;

            camera.position.set(1000, 1000, 1000);
            //camera.up = new THREE.Vector3(1,1,1);
            camera.lookAt(new THREE.Vector3(0, 0, 0));

            // world

            var origin = worldframework.drawOriginPoint(originLength);
            scene.add(origin);

            var grid = worldframework.drawGridToZoomLevel(camera.position.y, scale, originLength);
            grid.name = "grid";
            scene.add(grid);

            // lights

            var light = new THREE.DirectionalLight(0xffffff);
            light.position.set(1, 1, 1);
            scene.add(light);

            light = new THREE.DirectionalLight(0x002288);
            light.position.set(-1, -1, -1);
            scene.add(light);

            light = new THREE.AmbientLight(0x222222);
            scene.add(light);

            // Reference shape

            var geometry = new THREE.BoxGeometry(10 * scale, 10 * scale, 10 * scale);
            var material = new THREE.MeshLambertMaterial({
                color: 0xFF0000
            });
            var mesh = new THREE.Mesh(geometry, material);
            var cube = new THREE.Object3D();
            cube.add(mesh);
            var position = (10 * scale) / 2
            cube.position.y = position;
            cube.position.x = position;
            cube.position.z = position;
            scene.add(cube);

            //

            window.addEventListener('resize', onWindowResize, false);

            animate();

        }

        function animate() {
            requestAnimationFrame(animate);

            controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true

            render();
        }

        ///////////////////////////////////////////////////////////////////
        ///
        ///  EXTERNAL API CALLS
        ///    Try and keep as much logic as possible within this call
        ///    Minimize additiona functions in the scene classes.
        ///    If you need to do something complex, do it in DEMO.UTIL and
        ///    call that function from within the following API function references
        ///
        ///////////////////////////////////////////////////////////////////

        /**
         * Renders the THREE.js scene graph.
         * @return {screen} Rendered frame buffer of scene.
         */
        function render() {

            //console.log(camera.position.y);
            var grid = worldframework.drawGridToZoomLevel(camera.position.y, scale, originLength);
            if (grid !== undefined) {

            	removeGrid();
                scene.add(grid);

            }

            renderer.render(scene, camera);
            rendererStats.update(renderer);
        }

        function removeGrid(){
               
                var gridObject =scene.getObjectByName("grid")
                scene.remove(gridObject);
                if(gridObject.geometry !== undefined){
                	gridObject.geometry.dispose();
            	}
        }

        /**
         * Make a
         * @param  {[type]} mouse [description]
         * @return {[type]}       [description]
         */
        function makeSelection(mouse) {
            console.info('selection: ', mouse);

            $.event.trigger({
                type: "userClick",
                message: mouse
            });

        }

        /**
         * Single toggle interface to interact with three.js environment.
         * @param  {string} toggleType What kind of toggle needs to be executed.
         * @return {[type]}            [description]
         */
        function toggle(toggleType) {
            switch (toggleType) {
                case "showgrid":
	 				var currentGrid = scene.getObjectByName("grid");
	                if (currentGrid !== undefined) {
	                    removeGrid();
	                }else{
	                	angular.zoomLevel = -1; // refactor this hack
	                	var grid = worldframework.drawGridToZoomLevel(camera.position.y, scale, originLength);
	                	scene.add(grid);
	                    
	                }
	                break;
/*                case "rotate":
                    rotateCamera = (rotateCamera) ? false : true;
                    break;
                case "wireframes":
                    Demo.Util.toggleWireframes(demo.collisions);
                    break;*/
                default:
                    $log.error('Undefined Toggle: no toggle param set');
                    break;
            }

        }


        //-------------------------------------------------------
        //  EVENT LISTENERS
        //-------------------------------------------------------

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        //-------------------------------------------------------
        //  UPDATES
        //-------------------------------------------------------


        //-------------------------------------------------------
        //  EVENT WATCHERS
        //-------------------------------------------------------

        var scene = {
            init: init,
            toggle: toggle,
            // update: update,
            // destroy: destroy,
            // renderNow: renderNow,
            makeSelection: makeSelection,
        };

        return scene;

    });
