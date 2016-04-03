function LifeGame(width, height, cellSize, canvas) {
	var _cellsPerRow = width / cellSize; 
	var _cellsPerColumn = height / cellSize;
 	var _totalCells = _cellsPerRow * _cellsPerColumn; 
	var _ctx = canvas.getContext('2d'); 
	var _grid = new Grid(_cellsPerRow, _cellsPerColumn);
	var _this = this;
	this.addCell = function(x,y){
		var index= x+y*_cellsPerRow;
		_grid.getCellByIndex(index).live=true;
	}
		this.addRandomCells = function (count) { 
		var deadCells = _grid.getDeadCells();
			for (var i = 0; i < count && deadCells.length > 0; ++i) { 
				var randomIndex = Math.floor( Math.random() * deadCells.length );
				deadCells[randomIndex].live = true; deadCells.splice(randomIndex, 1); 
				}
		}
		
	this.clear = function () {
		 _grid = new Grid(_cellsPerRow, _cellsPerColumn); 
		 
		 }


this.draw = function() { 
	 _ctx.clearRect(0, 0, _ctx.canvas.width, _ctx.canvas.height);
	  _ctx.lineWidth = 1;
	   _ctx.strokeStyle = "#ccc";
	   
	   for (var i = 0; i < _totalCells; ++i) {
		    var cell = _grid.getCellByIndex(i);
	if (cell.live) _ctx.fillStyle = "black"; 
	 else _ctx.fillStyle = "white";
	 _ctx.beginPath();
_ctx.rect(cell.x * cellSize, 
 cell.y * cellSize, 
  cellSize, 
   cellSize); 
    _ctx.fill();
	 _ctx.stroke();
	   }
}

this.getLiveNeighbours = function (cellIndex) { 
	var liveNeighbours = 0;
	var cell = _cells[cellIndex];
	var startX = Math.max(cell.x - 1, 0); 
	var startY = Math.max(cell.y - 1, 0); 
	var endX = Math.min(cell.x + 1, cellsPerRow - 1); 
	var endY = Math.min(cell.y + 1, cellsPerColumn - 1);
		for (var x = startX; x <= endX; ++x) { 
				for (var y = startY; y <= endY; ++y) {
						if (x == cell.x && y == cell.y) continue;
									var cellIndex = x + y * cellsPerRow; 
									if (_cells[cellIndex].live) liveNeighbours++; 
									}	
						 }
			return liveNeighbours;
			 }
			 
			 this.update = function () {
				 var nextGeneration = new Grid(_cellsPerRow, _cellsPerColumn);
				 for (var i = 0; i < _totalCells; ++i) {
					 var oldCell = _grid.getCellByIndex(i);
					 var newCell = nextGeneration.getCellByIndex(i);
					 var neighbours = _grid.getLiveNeighbours(i);
					 if (oldCell.live) { 
					  newCell.live = neighbours > 1 && neighbours < 4; } 
					  else {
						  if (neighbours == 3) newCell.live = true; } }
						  _grid = nextGeneration;
						   _this.draw(); }
}