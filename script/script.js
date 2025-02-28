// Shut it All Down

let debug = false;
let restart = false;
let isJumping = false;
let lastTime = 0;

// Defining the Tile Map Grid Structure

const GAME_WIDTH = 3200;
const GAME_HEIGHT = 1600;
const GAME_TILE = 100;
const ROWS = GAME_HEIGHT / GAME_TILE;
const COLUMNS = GAME_WIDTH / GAME_TILE;
const LEVEL_WIDTH = 32 * GAME_TILE;
const LEVEL_HEIGHT = 16 * GAME_TILE;

const LEVEL1 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
    33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64,
    65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96,
    97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128,
    129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160,
    161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192,
    193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224,
    225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256,
    257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288,
    289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320,
    321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352,
    353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384,
    385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416,
    417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448,
    449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480,
    481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512,];

const COLLISIONS_LEFT = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];

const COLLISIONS_RIGHT = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,];

const COLLISIONS_VERTICAL = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,];

const jumpStrength = 35;
const gravity = 2;    

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
    const IMAGE_TILE = 100;
    const IMAGE_COLS = TILE_IMAGE.width / IMAGE_TILE;


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
                GAME_TILE, GAME_TILE);

            if (debug) {
                ctx.strokeRect(col * GAME_TILE, row * GAME_TILE, GAME_TILE, GAME_TILE);}}}}

// Defining the Player Character

const player = {
    positionX: 12 * GAME_TILE,
    positionY: 0,
    speed: 7,
    width: 4 * GAME_TILE,
    height: 4 * GAME_TILE,
    currentFrame: 0,
    frames: [],
    state: 'idle',
    direction: 'left',
    frameTimer: 0,
    frameDelay: 35,
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


// keys that do stuff later

const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,};

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

// Losing Animation 

let hasLost = false;    
    
function checkLoser() {
    lost();}

const loseVideo = document.createElement("video");
loseVideo.src = "media/door/doorA.mp4";
    
const loseImage = new Image();
loseImage.src = 'media/lose.png';

function drawLosingVideoFrame(ctx) {
    if (!loseVideo.ended) {
        ctx.drawImage(loseVideo, 20 * GAME_TILE, 0 * GAME_TILE, 2 * GAME_TILE, 4 * GAME_TILE);
        requestAnimationFrame(() => drawLosingVideoFrame(ctx));
        drawPlayer(ctx);}}

loseVideo.addEventListener("loadeddata", () => {
    loseVideo.play();
    drawLosingVideoFrame(ctx);});

function triggerLoser() {
    hasLost = true;}  

function lost() {
    if (doorA()) {
        triggerLoser();
        loseVideo.play();
        ctx.drawImage();}}

const doorA = () => {
    return keys.ArrowDown && player.onGround && !keys.ArrowLeft && !keys.ArrowRight
        && player.positionX > 18 * GAME_TILE && player.positionX < 21 * GAME_TILE
        && player.positionY < 5 * GAME_TILE;};

loseVideo.addEventListener("ended", () => {
    hasLost = false;});

// Winning Animation 
    
function won() {
    if (doorB()) {
        triggerWinner();
        winVideo.play();
        ctx.drawImage();}}    

function checkWinner() {
    won();}    
    
const winVideo = document.createElement("video");
winVideo.src = "media/door/doorB.mp4";

function drawWinningVideoFrame(ctx) {
    if (!winVideo.ended) {
        ctx.drawImage(winVideo, 2 * GAME_TILE, 6 * GAME_TILE, 2 * GAME_TILE, 4 * GAME_TILE);
        requestAnimationFrame(() => drawWinningVideoFrame(ctx));
        drawPlayer(ctx);}}

winVideo.addEventListener("loadeddata", () => {
    winVideo.play();
    drawWinningVideoFrame(ctx);});    
    
const winImage = new Image();
winImage.src = 'media/win.png';
    
let hasWon = false;
    
function triggerWinner() {
    hasWon = true;}

const doorB = () => {
    return keys.ArrowDown && player.onGround && !keys.ArrowLeft && !keys.ArrowRight
        && player.positionX > .5 * GAME_TILE && player.positionX < 3 * GAME_TILE;};
    
winVideo.addEventListener("ended", () => {
    hasWon = false;});    
    
// THE GAME LOOP
    
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

if (keys.ArrowLeft && hasWon === false && hasLost === false) {
    player.state = 'running';
    player.direction = 'left';
    const nextX = player.positionX - moveSpeed;
    if (!isCollidingWithWall(nextX, player.positionY, 'left')) {
        player.positionX = nextX;}}

    if (keys.ArrowRight && hasLost === false && hasWon === false) {
        player.state = 'running';
        player.direction = 'right';
        const nextX = player.positionX + moveSpeed;
        if (!isCollidingWithWall(nextX, player.positionY, 'right')) {
            player.positionX = nextX;}}

    if (!keys.ArrowLeft && !keys.ArrowRight) {
        player.state = 'idle';}

    if (keys.ArrowUp && hasWon === false && player.onGround && player.positionY > 0) {
        player.velocityY = -jumpStrength;
        player.onGround = false;}
    
    player.positionX = Math.max(0, Math.min(player.positionX, LEVEL_WIDTH - player.width));
    player.positionY = Math.max(0, Math.min(player.positionY, LEVEL_HEIGHT - player.height));

    drawPlayer(ctx);

    checkWinner();
    checkLoser();

    requestAnimationFrame(gameLoop);}
        
// THE OFF-CANVAS BUTTONS

const debugButton = document.getElementById('debugButton');
debugButton.addEventListener('click', function() {
    debug = !debug;
    drawLevel();});

const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', function() {
    location.reload();});
});    
    
