const GAME_WIDTH = 160;
const GAME_HEIGHT = 160;
const GAME_TILE = 32;
const ROWS = GAME_HEIGHT / GAME_TILE;
const COLUMNS = GAME_WIDTH / GAME_TILE;

const LEVEL1 = [
    9, 9, 9, 9, 9,
    9, 9, 9, 9, 9,
    9, 9, 9, 9, 9,
    9, 9, 9, 17, 9,
    9, 9, 9, 9, 9,
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
    const IMAGE_TILE = 32;
    const IMAGE_COLS = TILE_IMAGE.width / IMAGE_TILE;
    
let debug = false;

function drawLevel(){
   for (let row = 0; row < ROWS; row++){
    for (let col = 0; col < COLUMNS; col++){
        const tile = getTile(LEVEL1, col, row);
        ctx.drawImage(
        /* image used */
        TILE_IMAGE,
        /* x,y position of crop */
        ((tile-1) * IMAGE_TILE) % TILE_IMAGE.width, Math.floor(tile / IMAGE_COLS) * IMAGE_TILE,
        /* x,y size of crop */
        IMAGE_TILE, IMAGE_TILE,
        /* x,y position */
        col * GAME_TILE, row * GAME_TILE,
        /* x,y size */
        GAME_TILE, GAME_TILE);
        
        if (debug){
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