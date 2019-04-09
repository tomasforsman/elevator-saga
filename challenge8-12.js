{
  init: function(elevators, floors) {
    // This is a function that is done on all elevators in the array.
    elevators.forEach(function(elevator, index) {
      // What should the elevator do when it's bored?
      elevator.on("idle", function() {
        // We create an array of floors with request buttons lit
        var requestedFloors = floors.filter(function(f) { return f.requestedUp || f.requestedDown; });
        // We map the array with distances from our current floor
        var distances = requestedFloors.map(function(f) { return Math.abs(f.floorNum() - elevator.currentFloor()); });
        // We get the position of the smallest distance in the array
        var floorIndex = Math.min.apply(null, distances);
        
        // If there is a floor with a request
        if (requestedFloors[floorIndex]) {
            // The floor number with the smallest distance
            var floorNum = requestedFloors[floorIndex].floorNum();

            // Let's turn the requests off
            floors[floorNum].requestedUp = false;
            floors[floorNum].requestedDown = false;
            elevator.goToFloor(floorNum);
        } else {
            elevator.goToFloor(0);
        }
      })

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
          // Removes the floor from destinationQueue and go to it.
          elevator.destinationQueue.splice(elevator.destinationQueue.indexOf(floorNum), 1);
          elevator.goToFloor(floorNum, true); 
        }
      });

      // Let's make sure we don't close both up and down button
      elevator.on("stopped_at_floor", function(floorNum) {
        if (elevator.destinationDirection() == "up") {
            floors[floorNum].requestedUp = false;
        } else {
            floors[floorNum].requestedDown = false;
        }
      });
    });

    // We check if there are requests on each floor
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
