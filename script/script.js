// Get the image element
    const stickFigure = document.getElementById('stickFigure');

    // Initial position of the stick figure
    let positionX = 0;
    let positionY = 0;
    const speed = 5; 
    const figureWidth = 200; 

    // Track the current direction
    let movingLeft = false;
    let movingRight = false;
    let lastDirection = 'none';

    // Function to change the image based on the direction (only when direction changes)
    function changeImage(direction) {
      if (direction === 'left' && stickFigure.src !== 'media/left.gif') {
        stickFigure.src = 'media/left.gif'; 
      } else if (direction === 'right' && stickFigure.src !== 'media/right.gif') {
        stickFigure.src = 'media/right.gif'; 
      }
    }

    // Move the figure based on arrow key presses
    document.addEventListener('keydown', function(event) {
      if (event.key === 'ArrowRight' && !movingRight) {
        movingRight = true;
        changeImage('right');
        lastDirection = 'right'; 
      } else if (event.key === 'ArrowLeft' && !movingLeft) {
        movingLeft = true;
        changeImage('left');
        lastDirection = 'left'; 
      }
    });

    document.addEventListener('keyup', function(event) {
      if (event.key === 'ArrowRight') {
        movingRight = false;
      } else if (event.key === 'ArrowLeft') {
        movingLeft = false;
      }

      // When no keys are pressed, switch to the correct still image based on the last direction
      if (!movingLeft && !movingRight) {
        if (lastDirection === 'left') {
          stickFigure.src = 'media/left.png';
        } else if (lastDirection === 'right') {
          stickFigure.src = 'media/right.png';
        }
        lastDirection = 'none';
      }
    });

    function updatePosition() {
      if (movingRight) {
        positionX += speed;
      } else if (movingLeft) {
        positionX -= speed;
      }

      // Prevent the figure from moving off-screen
      if (positionX < 0) {
        positionX = 0;
      } else if (positionX > window.innerWidth - figureWidth) {
        positionX = window.innerWidth - figureWidth;
      }

      // Update the position of the stick figure
      stickFigure.style.left = positionX + 'px';

      // Call this function again for the next frame
      requestAnimationFrame(updatePosition);
    }

    // Start the movement loop
    updatePosition();