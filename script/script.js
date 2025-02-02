// Defining the Tile Map Grid Structure

const GAME_WIDTH = 3200;
const GAME_HEIGHT = 1600;
const GAME_TILE = 200;
const ROWS = GAME_HEIGHT / GAME_TILE;
const COLUMNS = GAME_WIDTH / GAME_TILE;
const LEVEL_WIDTH = 16 * GAME_TILE;
const LEVEL_HEIGHT = 8 * GAME_TILE;

const LEVEL1 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
    33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
    49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64,
    65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96,
    97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112,
    113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128,];

const COLLISIONS_LEFT = [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,];

const COLLISIONS_RIGHT = [
    0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,];

const COLLISIONS_VERTICAL = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
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

// Rendering the Tile Map?
    
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
        positionX: 5.5 * GAME_TILE,
        positionY: 0,
        speed: 15,
        width: 2 * GAME_TILE,
        height: 2 * GAME_TILE,
        currentFrame: 0,
        frames: [],
        state: 'idle',
        direction: 'left',
        frameTimer: 0,
        frameDelay: 6,
        velocityY: 30,
        onGround: false};

const playerSpriteSheet = new Image();
    playerSpriteSheet.src = 'media/character-movement/PlayerSprite.png';

const frameWidth = 400;
const frameHeight = 400;
const totalRunningFrames = 8;
const totalIdleFrames = 8;

    
playerSpriteSheet.onload = function() {
    for (let i = 0; i < totalRunningFrames; i++) {
        player.frames.push({
            x: i * frameWidth,
            y: 400});}
    
player.idleFrames = [];
    for (let i = 0; i < totalIdleFrames; i++) {
        player.idleFrames.push({
            x: i * frameWidth,
            y: 0 });}

gameLoop();};

// Rendering the Player Character

function drawPlayer(ctx) {
    let frame;
    
    if (player.state === 'idle') {
        frame = player.idleFrames[player.currentFrame % totalIdleFrames];}
    else {
        frame = player.frames[player.currentFrame % totalRunningFrames];}

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

    player.frameTimer++;
    if (player.frameTimer >= player.frameDelay) {
        player.frameTimer = 0;
        player.currentFrame++;

        if (player.state === 'idle') {
            player.currentFrame %= totalIdleFrames;}else {
            player.currentFrame %= totalRunningFrames;}}}    


// keyup, keydown

const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false};

window.addEventListener('keydown', function(event) {
    if (event.key in keys) {
        keys[event.key] = true;}});

window.addEventListener('keyup', function(event) {
    if (event.key in keys) {
        keys[event.key] = false;}});


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

let lastTime = 0;

function gameLoop(timestamp) {
    const deltaTime = (timestamp - lastTime) / 1000; // Convert to seconds
    lastTime = timestamp;

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

    let moveSpeed = player.speed * deltaTime * 60;

    if (keys.ArrowLeft) {
        player.state = 'running';
        player.direction = 'left';
        const nextX = player.positionX - moveSpeed;
        if (!isCollidingWithWall(nextX, player.positionY, 'left')) {
            player.positionX = nextX;}}

    if (keys.ArrowRight) {
        player.state = 'running';
        player.direction = 'right';
        const nextX = player.positionX + moveSpeed;
        if (!isCollidingWithWall(nextX, player.positionY, 'right')) {
            player.positionX = nextX;}}

    if (!keys.ArrowLeft && !keys.ArrowRight) {
        player.state = 'idle';}

    if (keys.ArrowUp && player.onGround) {
        player.velocityY = -jumpStrength; 
        player.onGround = false;}

    player.positionX = Math.max(0, Math.min(player.positionX, LEVEL_WIDTH - player.width));
    player.positionY = Math.max(0, Math.min(player.positionY, LEVEL_HEIGHT - player.height));

    drawPlayer(ctx);
    requestAnimationFrame(gameLoop);}
    
// END GAME LOOP  
    
// Grid On/Off

const debugButton = document.getElementById('debugButton');
debugButton.addEventListener('click', function() {
    debug = !debug;
    drawLevel();});});

