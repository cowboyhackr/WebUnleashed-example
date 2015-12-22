"use strict";

angular.module('coreapp')
  .controller('dynamicgridc', function ($scope, scenefactory) {

     var params = {
              paramTest: 'scenedata'
            };

    scenefactory.init(params);


  //////////////////////////////////////////////////////////
  ///
  /// Access the THREE.js scene through the following API functions.
  ///
  /// You may also want to use this approach for the following types of 3D scene interactions:
  ///    - mouse interaction.
  ///    - toggle environment settings (rotation)
  ///    - CRUD operations relating to ng-scoped variables.
  ///
  //////////////////////////////////////////////////////////
  ///  Not sure if creating the following as directives would have been
  ///  a better option.  Needs more research.
  //////////////////////////////////////////////////////////

  $scope.toggleShowGrid = function () {
    scenefactory.toggle("showgrid");
  };

  $scope.toggleWireframes = function () {
    scenefactory.toggle("wireframes");
  };

  $scope.toggleArrows = function () {
    scenefactory.toggle("arrows");
  };

  $scope.toggleRotate = function () {
    scenefactory.toggle("rotate");
  };


});