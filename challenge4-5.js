{
  init: function(elevators, floors) {
    elevators.forEach(function(elevator, index) {
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
    });
    floors.forEach(function(floor, index) {
      floor.requestedUp = false;
      floor.requestedDown = false;

      floor.on("up_button_pressed", function() {
          floor.requestedUp = true;
      });

      floor.on("down_button_pressed", function() {
          floor.requestedDown = true;
      });
    });    
  },
    update: function(dt, elevators, floors) {
    }
}
