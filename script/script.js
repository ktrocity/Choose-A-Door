// Defining the Tile Map Grid Structure

const GAME_WIDTH = 3200;
const GAME_HEIGHT = 1200;
const GAME_TILE = 400;
const ROWS = GAME_HEIGHT / GAME_TILE;
const COLUMNS = GAME_WIDTH / GAME_TILE;

const LEVEL1 = [
    1, 2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23, 24,];

function getTile(map, col, row){
    return map[row * COLUMNS + col];}

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
                }}}}

// Defining the Player Character

const player = {
    positionX: 4.75 * GAME_TILE, 
    positionY: 0,            
    speed: 10,                
    width: GAME_TILE,         
    height: GAME_TILE,        
    currentFrame: 0,  
    frames: [],              
    state: 'idle',           
    direction: 'right',
    frameTimer: 0,
    frameDelay: 5};

const playerSpriteSheet = new Image();
    playerSpriteSheet.src = 'media/character-movement/PlayerSprite.png';

const frameWidth = 400;
const frameHeight = 400;
const totalRunningFrames = 8;

playerSpriteSheet.onload = function() {
    for (let i = 0; i < totalRunningFrames; i++) {
        player.frames.push({
            x: i * frameWidth,
            y: 0
            });}
        gameLoop();};

// Rendering the Player Character & Defining the Mirror Imaging

function drawPlayer(ctx) {
    const frame = player.frames[player.currentFrame];

    if (player.direction === 'left') {
        ctx.save();
        ctx.scale(-1, 1);

        ctx.drawImage(
            playerSpriteSheet,
            frame.x, frame.y, frameWidth, frameHeight,
            -player.positionX - player.width, player.positionY, player.width, player.height);

        ctx.restore(); 
        } else {
            ctx.drawImage(
                playerSpriteSheet,
                frame.x, frame.y, frameWidth, frameHeight,
                player.positionX, player.positionY, player.width, player.height);}

        if (player.state === 'running') {
            player.frameTimer++;}

        if (player.frameTimer >= player.frameDelay) {
            player.frameTimer = 0;  
            player.currentFrame = (player.currentFrame + 1) % totalRunningFrames;}}

// Left & Right Movement

    let moveLeft = false;
    let moveRight = false;

    window.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            moveLeft = true;
            player.state = 'running';
            player.direction = 'left';
        } else if (event.key === 'ArrowRight') {
            moveRight = true;
            player.state = 'running';
            player.direction = 'right';
        }
    });

    window.addEventListener('keyup', function(event) {
        if (event.key === 'ArrowLeft') {
            moveLeft = false;
            if (!moveRight) player.state = 'idle';
        } else if (event.key === 'ArrowRight') {
            moveRight = false;
            if (!moveLeft) player.state = 'idle';
        }
    });

// Tile Collisions

    const tileCollisions = {
        6: { top: false, right: true, bottom: false, left: false }};

    function checkCollisions() {
        const playerTileX = Math.floor(player.positionX / GAME_TILE);
        const playerTileY = Math.floor(player.positionY / GAME_TILE);
        const playerTile = getTile(LEVEL1, playerTileX, playerTileY);
        const tileData = tileCollisions[playerTile];

        if (tileData) {
            if (tileData.top && player.positionY + player.height > playerTileY * GAME_TILE) {
                player.positionY = playerTileY * GAME_TILE - player.height;}
            if (tileData.right && player.positionX + player.width > (playerTileX + 1) * GAME_TILE) {
                player.positionX = (playerTileX + 1) * GAME_TILE - player.width;}
            if (tileData.bottom && player.positionY < (playerTileY + 1) * GAME_TILE) {
                player.positionY = (playerTileY + 1) * GAME_TILE;}
            if (tileData.left && player.positionX + player.width > playerTileX * GAME_TILE) {
                player.positionX = playerTileX * GAME_TILE - player.width;
            }}}

// Main game loop

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLevel();

    if (moveLeft) {
        player.positionX -= player.speed;}
    if (moveRight) {
        player.positionX += player.speed;}

    checkCollisions();
    drawPlayer(ctx);
    requestAnimationFrame(gameLoop);}

// Grid On/Off
    
const debugButton = document.getElementById('debugButton');
debugButton.addEventListener('click', function() {
    debug = !debug;
    drawLevel();
    });
});
