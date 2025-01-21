const GAME_WIDTH = 3200;
const GAME_HEIGHT = 1200;
const GAME_TILE = 400;
const ROWS = GAME_HEIGHT / GAME_TILE;
const COLUMNS = GAME_WIDTH / GAME_TILE;

const LEVEL1 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
]

function getTile(map, col, row){
    return map [row * COLUMNS + col];
}

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    console.log(ctx)
    const TILE_IMAGE = document.getElementById('tilemap');
    const IMAGE_TILE = 400;
    const IMAGE_COLS = TILE_IMAGE.width / IMAGE_TILE;
    
let debug = false;

function drawLevel() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            const tile = getTile(LEVEL1, col, row);
            
            // Calculate the position of the tile in the tilemap image
            const tileIndex = tile - 1;
            const imageCol = tileIndex % IMAGE_COLS;
            const imageRow = Math.floor(tileIndex / IMAGE_COLS);

            // Draw the tile
            ctx.drawImage(
                TILE_IMAGE,
                imageCol * IMAGE_TILE, imageRow * IMAGE_TILE, // Position to crop from the tilemap image
                IMAGE_TILE, IMAGE_TILE, // Size of the tile image to crop
                col * GAME_TILE, row * GAME_TILE, // Position to draw on the canvas
                GAME_TILE, GAME_TILE // Size to draw the tile on the canvas
            );
            
            if (debug) {
                ctx.strokeRect(col * GAME_TILE, row * GAME_TILE, GAME_TILE, GAME_TILE);
            }
        }
    }
}
 

drawLevel();

    
// controls
        
    const debugButton = document.getElementById('debugButton');
        
        debugButton.addEventListener('click', function(){
            debug = !debug;
            drawLevel();
        })
    
})