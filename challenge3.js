{
  init: function(elevators, floors) {
      var elevator = elevators[0]; 

      // What should the elevator do when it's bored?
      elevator.on("idle", function() {
          elevator.goToFloor(0);
      });
      
      // Let's check where the passangers want to go
      elevator.on("floor_button_pressed", function(floorNum) {
          // If the destinationQueue array to see if the requested floor is already there.
          if (elevator.destinationQueue.indexOf(floorNum) == -1) 
          { 
              elevator.goToFloor(floorNum); 
          }
      });
  },
  update: function(dt, elevators, floors) {
  }
}
