
import patterns from './patterns.json';
import { controls, game } from '../state/state';

const WCELL = 5;
const FPS = 60;
const MAX_GRID_LINES = 150;
const MAX_GRID_COLUMNS = 150;

// Function to add point to grid
let addPoint = null;

export default function initGame() {
  const screen = document.getElementById('Screen');
  const ctx = screen.getContext('2d');

  const cellGrid = [];
  const auxGrid = [];

  addPoint = (i, j, s = true) => {
    if(i > 0 && i < MAX_GRID_COLUMNS && 
       j > 0 && MAX_GRID_LINES)
      cellGrid[i][j] = s;
  }

  initGrid(cellGrid);
  initGrid(auxGrid);

  // Initial position
  game.position.x = -WCELL * MAX_GRID_COLUMNS / 2;
  game.position.y = -WCELL * MAX_GRID_LINES / 2;

  document.addEventListener('keypress', handleKeyboard);
  screen.addEventListener('mousedown', handleMouse);
  screen.addEventListener('mouseup', handleMouse);
  screen.addEventListener('mousemove', handleMouse);
  screen.addEventListener('click', handleClick);
  
  setInterval(() => update(cellGrid, auxGrid), 100);
  setInterval(() => render(cellGrid, ctx), 1000 / FPS);
}

function render(grid, ctx) {
  clearScreen(ctx);
  renderCells(game, controls, grid, ctx);
}

function update(grid, aux) {

  if(game.clear) {
    game.clear = false;
    clearGrid(grid);
  }

  if(controls.getState().play)
    updateGrid(grid, aux);
}

/*
 *  Input functions
 *
 */

function handleKeyboard(event) {
  switch(event.code) {
    case 'NumpadAdd': 
      game.scale += 1;
      if(game.scale > 10) game.scale = 10;
      break;
    case 'NumpadSubtract':
      game.scale -= 1;
      if(game.scale < 1) game.scale = 1;
      break;
  }
}

function handleClick(event) {
  if(controls.getState().tool === 'BRUSH')
    addPoint(game.mouse.position.i, game.mouse.position.j);

  if(controls.getState().tool === 'PATTERN' && 
     controls.getState().pattern.item >= 0) {
      let {page, item} = controls.getState().pattern;
      addPattern(patterns[page][item], 
        game.mouse.position.i, 
        game.mouse.position.j);
  }
}

function handleMouse(event) {
  switch(event.type) {
    case 'mousedown':
      game.mouse.down = true;
      break;
    case 'mouseup':
      game.mouse.down = false;
      break;
    case 'mousemove':
      onMouseMove(event);
      break;
  }
}

function onMouseMove(event) {
  let mouseX = event.layerX - event.target.width/2;
  let mouseY = event.layerY - event.target.height/2;
  [game.mouse.position.i, 
   game.mouse.position.j] = screenToGrid(mouseX, mouseY);

  // Draw lines with points
  if(game.mouse.down && controls.getState().tool === 'BRUSH')
    addPoint(game.mouse.position.i, game.mouse.position.j);

  // Move screen if mouse down
  if(game.mouse.down && controls.getState().tool === 'MOVE')
    moveScreen(event.movementX / game.scale, event.movementY / game.scale);
}

/*
 *  Game util functions
 *
 */

// Convert grid indices to context coords
function gridToContext(i, j, ctx) { 
  let x = (i * WCELL + game.position.x) * game.scale + ctx.canvas.width/2;
  let y = (j * WCELL + game.position.y) * game.scale + ctx.canvas.height/2;
  return [x, y]
}

// Convert screen coords to grid indices
function screenToGrid(x, y) {
  let i = Math.floor((x / game.scale - game.position.x) / WCELL);
  let j = Math.floor((y / game.scale - game.position.y) / WCELL); 
  return [i, j];
}

function moveScreen(dx, dy) {
  game.position.x += dx;
  game.position.y += dy;
}

function addPattern(pattern, i0, j0) {
  // Calc middle point of pattern
  const di = Math.floor(pattern.width / 2);
  const dj = Math.floor(pattern.height / 2);

  // Interprete pattern on pattern.raw and insert it on grid
  for(let i = 0; i < pattern.width; i++) {
    for(let j = 0; j < pattern.height; j++) {
      if(pattern.raw[i + j * pattern.width] === 'O')
        addPoint(i0 + i - di, j0 + j - dj)
    }
  }
}

/*
 *  Render functions
 *
 */

function clearScreen(ctx) {
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.closePath();
}

function renderCells(game, controls, grid, ctx) {

  // Draw live cells
  drawLiveCells(grid, ctx);

  // Draw quad shadow
  if(controls.getState().tool === 'BRUSH')
    drawQuadShadow(ctx);

  // Draw pattern shadow
  if(controls.getState().tool === 'PATTERN')
    drawPatternShadow(ctx);
}

function drawLiveCells(grid, ctx) {
  for(let i = 0; i < MAX_GRID_COLUMNS; i++) {
    for(let j = 0; j < MAX_GRID_LINES; j++) {

      let [cellX, cellY] = gridToContext(i, j, ctx);

      if(grid[i][j])
        drawQuad(cellX, cellY, game.scale, ctx);

      if(i === 0 || i === MAX_GRID_COLUMNS-1 || j === 0 || j === MAX_GRID_LINES-1)
        drawQuad(cellX, cellY, game.scale, ctx, '#f333');
    }
  }
}

function drawQuadShadow(ctx) {
  const scale = game.scale;
  let i = game.mouse.position.i;
  let j = game.mouse.position.j;
  let [cellX, cellY] = gridToContext(i, j, ctx);
  drawQuad(cellX, cellY, scale, ctx, '#3333');  
}

function drawPatternShadow(ctx) {
  const {page, item} = controls.getState().pattern;
  if(item >= 0) {
    const pattern = patterns[page][item];
    const di = Math.floor(pattern.width / 2);
    const dj = Math.floor(pattern.height / 2);

    for(let i = 0; i < pattern.width; i++) {
      for(let j = 0; j < pattern.height; j++) {
        if(pattern.raw[i + j * pattern.width] === 'O') {
          let gridI = game.mouse.position.i + i - di;
          let gridJ = game.mouse.position.j + j - dj;
          let [cellX, cellY] = gridToContext(gridI, gridJ, ctx);
          drawQuad(cellX, cellY, game.scale, ctx, '#3333');
        }
      }
    }  
  }
}

function drawQuad(x, y, scale, ctx, color = '#333e') {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(
    x + scale * WCELL * 0.05, 
    y + scale * WCELL * 0.05, 
    scale * WCELL * 0.9, 
    scale * WCELL * 0.9);
  ctx.closePath();
}

/*
 *  Grid functions
 *
 */

function initGrid(grid) {
  for(let i = 0; i < MAX_GRID_COLUMNS; i++) {
    grid.push([]);
    for(let j = 0; j < MAX_GRID_LINES; j++) {
      grid[i].push(false);
    }
  }
}

function clearGrid(grid) {
  for(let i = 0; i < MAX_GRID_COLUMNS; i++) {
    for(let j = 0; j < MAX_GRID_LINES; j++) {
      grid[i][j] = false;
    }
  }
}

function copyGrid(grid, aux) {
  for(let i = 0; i < MAX_GRID_COLUMNS; i++) {
    for(let j = 0; j < MAX_GRID_LINES; j++) {
      aux[i][j] = grid[i][j];
    }
  }
}

function countAdjacentCells(grid, i, j) {
  let count = 0;
  count += grid[i-1][j-1];
  count += grid[i-1][j];
  count += grid[i-1][j+1];
  count += grid[i][j+1];
  count += grid[i+1][j+1];
  count += grid[i+1][j];
  count += grid[i+1][j-1];
  count += grid[i][j-1];
  return count;
}

function updateGrid(grid, aux) {
  copyGrid(grid, aux);

  for(let i = 1; i < MAX_GRID_COLUMNS-1; i++) {
    for(let j = 1; j < MAX_GRID_LINES-1; j++) {
      let cells = countAdjacentCells(aux, i, j);
      if(cells === 3) grid[i][j] = true;
      if(cells < 2 || cells > 3) grid[i][j] = false;
    }
  }
}
