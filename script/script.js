// Defining the Tile Map Grid Structure

const GAME_WIDTH = 3200;
const GAME_HEIGHT = 1200;
const GAME_TILE = 400;
const ROWS = GAME_HEIGHT / GAME_TILE;
const COLUMNS = GAME_WIDTH / GAME_TILE;
const LEVEL_WIDTH = 8 * GAME_TILE;
const LEVEL_HEIGHT = 3 * GAME_TILE;

const LEVEL1 = [
    1, 2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23, 24,];

const COLLISIONS_LEFT = [
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 0, 0, 0,];

const COLLISIONS_RIGHT = [
    0, 0, 0, 0, 0, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 1, 1,];

const COLLISIONS_VERTICAL = [
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 1, 1, 0,
    1, 1, 1, 0, 1, 1, 1, 1,];

const gravity = 0.5;
const jumpStrength = -15;

    let isJumping = false;

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
    const IMAGE_TILE = 400;
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
        positionX: 4.75 * GAME_TILE,
        positionY: 0,
        speed: 5,
        width: GAME_TILE,
        height: GAME_TILE,
        currentFrame: 0,
        frames: [],
        state: 'idle',
        direction: 'right',
        frameTimer: 0,
        frameDelay: 6,
        velocityY: 0,
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
                y: 0});}
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

    window.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            moveLeft = true;
            player.state = 'running';
            player.direction = 'left';}
        else if (event.key === 'ArrowRight') {
            moveRight = true;
            player.state = 'running';
            player.direction = 'right';}});

    window.addEventListener('keyup', function(event) {
        if (event.key === 'ArrowLeft') {
            moveLeft = false;
            if (!moveRight) player.state = 'idle';}
        else if (event.key === 'ArrowRight') {
            moveRight = false;
            if (!moveLeft) player.state = 'idle';}});

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

// Apply gravity to the player's vertical velocity
if (!player.onGround) {
    player.velocityY += gravity;}
    else {
    player.velocityY = 0;}

player.positionY += player.velocityY;

// Check for collision with the ground
const nextTileY = Math.floor((player.positionY + player.height) / GAME_TILE);
const nextTileX = Math.floor(player.positionX / GAME_TILE);

if (COLLISIONS_VERTICAL[nextTileY * COLUMNS + nextTileX] === 1) {
    player.positionY = nextTileY * GAME_TILE - player.height;
    player.onGround = true;}
    else {
    player.onGround = false;}

// Clamp the player character to the level boundaries
    player.positionX = Math.max(0, Math.min(player.positionX, LEVEL_WIDTH - player.width));
    player.positionY = Math.max(0, Math.min(player.positionY, LEVEL_HEIGHT - player.height));

// Handle movement with collision detection
    if (moveLeft) {
        const nextX = player.positionX - player.speed;
        if (!isCollidingWithWall(nextX, player.positionY, 'left')) {
            player.positionX = nextX;}}
    if (moveRight) {
        const nextX = player.positionX + player.speed;
        if (!isCollidingWithWall(nextX, player.positionY, 'right')) {
            player.positionX = nextX;}}

// Draw the player after applying gravity and movement
    drawPlayer(ctx);
    requestAnimationFrame(gameLoop);}
    
// END GAME LOOP

window.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowLeft') {
        moveLeft = false;
        if (!moveRight) player.state = 'idle';}
    else if (event.key === 'ArrowRight') {
        moveRight = false;
        if (!moveLeft) player.state = 'idle';}});
    

// Grid On/Off

    const debugButton = document.getElementById('debugButton');
    debugButton.addEventListener('click', function() {
        debug = !debug;
        drawLevel();});
});

