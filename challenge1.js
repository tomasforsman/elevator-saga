{
  init: function(elevators, floors) {
      var elevator = elevators[0]; 


      elevator.on("idle", function() {

          elevator.goToFloor(0);
          elevator.goToFloor(1);
          elevator.goToFloor(2); // Add the third floor
      });
  },
  update: function(dt, elevators, floors) {
  }
}
