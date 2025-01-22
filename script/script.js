
// Defining the Tile Map Grid Structure

const GAME_WIDTH = 3200;
const GAME_HEIGHT = 1200;
const GAME_TILE = 400;
const ROWS = GAME_HEIGHT / GAME_TILE;
const COLUMNS = GAME_WIDTH / GAME_TILE;

const LEVEL1 = [
    1, 2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23, 24,
];

function getTile(map, col, row){
    return map[row * COLUMNS + col];
}

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    const TILE_IMAGE = document.getElementById('tilemap');
    const IMAGE_TILE = 400;
    const IMAGE_COLS = TILE_IMAGE.width / IMAGE_TILE;

    let debug = false;
    
// Rendering the Tile Map
    
    function drawLevel() {
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLUMNS; col++) {
                const tile = getTile(LEVEL1, col, row);

                const tileIndex = tile - 1;
                const imageCol = tileIndex % IMAGE_COLS;
                const imageRow = Math.floor(tileIndex / IMAGE_COLS);

                ctx.drawImage(
                    TILE_IMAGE,
                    imageCol * IMAGE_TILE, imageRow * IMAGE_TILE,
                    IMAGE_TILE, IMAGE_TILE,
                    col * GAME_TILE, row * GAME_TILE,
                    GAME_TILE, GAME_TILE
                );

                if (debug) {
                    ctx.strokeRect(col * GAME_TILE, row * GAME_TILE, GAME_TILE, GAME_TILE);
                }
            }
        }
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawLevel();
        drawPlayer(ctx); 
        requestAnimationFrame(gameLoop);
    }

// Defining the Player Character
    
    const player = {
        positionX: 4.75 * GAME_TILE, 
        positionY: 0,            
        speed: 4,                
        width: GAME_TILE,         
        height: GAME_TILE,        
        currentFrame: 0,  
        frames: [],              
        state: 'idle',           
        direction: 'right',
        frameTimer: 0,
        frameDelay: 5,
    };

    const playerSpriteSheet = new Image();
    playerSpriteSheet.src = 'media/character-movement/PlayerSprite.png';

    const frameWidth = 400;
    const frameHeight = 400;

    const totalRunningFrames = 8;

    playerSpriteSheet.onload = function() {
        for (let i = 0; i < totalRunningFrames; i++) {
            player.frames.push({
                x: i * frameWidth,
                y: 0,
            });
        }

// Start the Game Loop After (Everything Loads? I think that's important, but maybe it is not?)
        gameLoop(); 
    };

// This part is defining the mirroring so that I didn't have to include 2x images in my sprite sheet
    
    function drawPlayer(ctx) {
        const frame = player.frames[player.currentFrame];

        if (player.direction === 'left') {
            ctx.save();
            ctx.scale(-1, 1);

            ctx.drawImage(
                playerSpriteSheet,
                frame.x, frame.y, frameWidth, frameHeight,
                -player.positionX - player.width, player.positionY, player.width, player.height
            );

            ctx.restore(); 
        } else {
            ctx.drawImage(
                playerSpriteSheet,
                frame.x, frame.y, frameWidth, frameHeight,
                player.positionX, player.positionY, player.width, player.height
            );
        }

        if (player.state === 'running') {
            player.frameTimer++;
        }
        
        if (player.frameTimer >= player.frameDelay) {
            player.frameTimer = 0;  
            player.currentFrame = (player.currentFrame + 1) % totalRunningFrames;
        }        
    }

    window.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            player.state = 'running';
            player.direction = 'left'; 
            player.positionX -= player.speed;  
        } else if (event.key === 'ArrowRight') {
            player.state = 'running';
            player.direction = 'right';  
            player.positionX += player.speed;
        }
    });

    window.addEventListener('keyup', function(event) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            player.state = 'idle'; 
            player.currentFrame = 0;
        }
    });

// Grid On/Off
    
    const debugButton = document.getElementById('debugButton');
    debugButton.addEventListener('click', function() {
        debug = !debug;
        drawLevel();
    });
});
