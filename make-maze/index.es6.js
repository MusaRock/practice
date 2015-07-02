const UDLR = [[0,-1], [0,1], [-1,0],[1,0]];
const width = 55, height = 55;

window.addEventListener('load', e => {
  let maze = makeMaze();
  drawMaze(maze);
});

function makeMaze() {
  let maze = [];
  for (let y = 0; y < height; y++) {
    maze[y] = [];
    for (let x = 0; x < width; x++) {
      let w = (x === 0 || x === width-1 ||
        y === 0 || y === height-1);
        maze[y][x] = w ? 1 : 0;
    }
  }

  for (let y = 2; y < height-2; y+=2) {
    for (let x = 2; x < width-2; x+=2) {
      let r = UDLR[rnd(4)];
      let x2 = x + r[1];
      let y2 = y + r[0];
      maze[y][x] = 1;
      maze[y2][x2] = 1;
    }
  }
  return maze;
}

function drawMaze(maze) {
  let $cvMain = document.getElementById('cvMain');
  let $ctx = $cvMain.getContext('2d');
  $ctx.fillStyle = 'black';
  let bw = $cvMain.width / width;
  for (let y = 0; y<maze.length; y++) {
    for (let x = 0; x < maze[0].length; x++) {
      if (maze[y][x]) {
        $ctx.fillRect(x*bw, y*bw, bw, bw);
      }
    }
  }
}

function rnd(n) {
  return Math.floor(Math.random() * n);
}
