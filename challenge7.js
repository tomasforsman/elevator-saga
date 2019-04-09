{
  init: function(elevators, floors) {
    // This is a function that is done on all elevators in the array.
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

      elevator.on("passing_floor", function(floorNum, direction) {
        // Pick up passengers on the floor if there is room
        if (elevator.loadFactor() <= 0.7) {
            if (direction == "up" && floors[floorNum].requestedUp) { elevator.goToFloor(floorNum, true); }
            if (direction == "down" && floors[floorNum].requestedDown) { elevator.goToFloor(floorNum, true); }
        }

        // Let's check if the floor we are passing is in the destinationQueue
        if (elevator.destinationQueue.indexOf(floorNum) != -1) { 
          elevator.destinationQueue.splice(elevator.destinationQueue.indexOf(floorNum), 1);
          elevator.goToFloor(floorNum, true); 
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
