"use strict";

angular.module('coreapp')
  .controller('dynamicgridc', function ($scope, scenefactory) {


  var canvasId = "factory-canvas";

  $scope.startGame = function() {

    var height = $('#ray-intersection').height(),
      width = $('#ray-intersection').width();

    $('#what').fadeOut();
    $('#factory-canvas').height(height);
    $('#factory-canvas').width(width);
    $('#ray-intersection').fadeIn();


    // notice the use of 'this'.  this refers to the controller $scope when this function is called
    // in normal JS callbacks you'd reference the values with 'var me = this'.  then reference 'me' in the callback function.
    var params = {
            canvasId: canvasId
          };

    scenefactory.init(params);

    $.event.trigger({
      type: "nextTurn",
    });

  };

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