// Defining the Tile Map Grid Structure

const GAME_WIDTH = 3200;
const GAME_HEIGHT = 1200;
const GAME_TILE = 200;
const ROWS = GAME_HEIGHT / GAME_TILE;
const COLUMNS = GAME_WIDTH / GAME_TILE;
const LEVEL_WIDTH = 16 * GAME_TILE;
const LEVEL_HEIGHT = 6 * GAME_TILE;

const LEVEL1 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
    33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
    49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64,
    65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96,];

const COLLISIONS_LEFT = [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,];

const COLLISIONS_RIGHT = [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,];

const COLLISIONS_VERTICAL = [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,];

const jumpStrength = 30;
const gravity = 1.5;    

let isJumping = false;

    function startJump() {
        if (player.onGround) {
            isJumping = true;
            velocityY = jumpStrength;}}

function getTile(map, col, row) {
    return map[row * COLUMNS + col];}

function getCollisionLeft(col, row) {
    return COLLISIONS_LEFT[row * COLUMNS + col];}

function getCollisionRight(col, row) {
    return COLLISIONS_RIGHT[row * COLUMNS + col];}

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    const TILE_IMAGE = document.getElementById('tilemap');
    const IMAGE_TILE = 200;
    const IMAGE_COLS = TILE_IMAGE.width / IMAGE_TILE;

    let debug = false;

// I think this is where we're rendering the tile map AFTER the resources are loaded, but I don't totally rememebr how it all works anymore to be honest.

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
                GAME_TILE, GAME_TILE);

            if (debug) {
                ctx.strokeRect(col * GAME_TILE, row * GAME_TILE, GAME_TILE, GAME_TILE);}}}}

// Defining the Player Character

    const player = {
        positionX: 9.5 * GAME_TILE,
        positionY: 0,
        speed: 15,
        width: 2 * GAME_TILE,
        height: 2 * GAME_TILE,
        currentFrame: 0,
        frames: [],
        state: 'idle',
        direction: 'right',
        frameTimer: 0,
        frameDelay: 6,
        velocityY: 30,
        onGround: false};

const playerSpriteSheet = new Image();
    playerSpriteSheet.src = 'media/character-movement/PlayerSprite.png';

const frameWidth = 400;
const frameHeight = 400;
const totalRunningFrames = 8;
    
playerSpriteSheet.onload = function() {
    for (let i = 0; i < totalRunningFrames; i++) {
        player.frames.push({
            x: i * frameWidth,
            y: 400});}

    gameLoop();};

// Rendering the Player Character

function drawPlayer(ctx) {
    const frame = player.frames[player.currentFrame];

    if (player.direction === 'left') {
        ctx.save();
        ctx.scale(-1, 1);

        ctx.drawImage(
            playerSpriteSheet,
            frame.x, frame.y, frameWidth, frameHeight,
            -player.positionX - player.width, player.positionY, player.width, player.height);

        ctx.restore();}
        else {
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
    let moveUp = false;


window.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        moveLeft = true;
        player.state = 'running';
        player.direction = 'left';
    } else if (event.key === 'ArrowRight') {
        moveRight = true;
        player.state = 'running';
        player.direction = 'right';
    } else if (event.key === 'ArrowUp') {
        moveUp = jumpStrength;
        player.state = 'jumping';
        player.direction = player.direction === 'left' ? 'left' : 'right';}});

window.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowLeft') {
        moveLeft = false;
        if (!moveRight) player.state = 'idle';}
    else if (event.key === 'ArrowRight') {
        moveRight = false;
        if (!moveLeft) player.state = 'idle';}
    else if (event.key === 'ArrowUp') {
        moveUp = false;
        if (!moveLeft && !moveRight) player.state = 'idle';}});

// Tile Collision Detection for Left and Right

    function isCollidingWithWall(nextX, nextY, direction) {
        const nextTileX = Math.floor(nextX / GAME_TILE);
        const nextTileY = Math.floor(nextY / GAME_TILE);

        if (direction === 'left') {
            return getCollisionLeft(nextTileX, nextTileY) === 1;}
        else if (direction === 'right') {
            return getCollisionRight(nextTileX, nextTileY) === 1;}
        return false;}
    
// START GAME LOOP

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLevel();

    if (!player.onGround) {
        player.velocityY += gravity;}
    else {
        player.velocityY = 0;}

    player.positionY += player.velocityY;

    const nextTileY = Math.floor((player.positionY + player.height) / GAME_TILE);
    const nextTileX = Math.floor(player.positionX / GAME_TILE);

    if (COLLISIONS_VERTICAL[nextTileY * COLUMNS + nextTileX] === 1) {
        player.positionY = nextTileY * GAME_TILE - player.height;
        player.onGround = true;}
    else {
        player.onGround = false;}

    player.positionX = Math.max(0, Math.min(player.positionX, LEVEL_WIDTH - player.width));
    player.positionY = Math.max(0, Math.min(player.positionY, LEVEL_HEIGHT - player.height));

    if (moveLeft) {
        const nextX = player.positionX - player.speed;
        if (!isCollidingWithWall(nextX, player.positionY, 'left')) {
            player.positionX = nextX;}}

    if (moveRight) {
        const nextX = player.positionX + player.speed;
        if (!isCollidingWithWall(nextX, player.positionY, 'right')) {
            player.positionX = nextX;}}

    if (moveUp) {
        player.positionY -= jumpStrength;}

    // Draw the player with the updated frame based on their state
    drawPlayer(ctx);
    requestAnimationFrame(gameLoop);}
    
// END GAME LOOP  
    
// Grid On/Off

const debugButton = document.getElementById('debugButton');
debugButton.addEventListener('click', function() {
    debug = !debug;
    drawLevel();});});

