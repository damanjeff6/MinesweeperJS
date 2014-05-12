(function (root) {
  var Minesweeper = root.Minesweeper = (root.Minesweeper || {});

  var Board = Minesweeper.Board = function (grid_size, num_bombs){
      this.grid_size = grid_size;
      this.num_bombs = num_bombs;
      this.grid = [];
      
      this.generate_board();
  };

  Board.prototype.generate_board = function (){
    for(var i = 0; i < this.grid_size; i++) {
      var innerArray = [];
      for(var j = 0; j < this.grid_size; j++) {
        innerArray.push(new Minesweeper.Tile(this, [i,j]));
      }
      this.grid.push(innerArray);
    }
    
    this.plant_bombs();
  };

  Board.prototype.plant_bombs = function() {
    var total_bombs = 0;
    while (total_bombs < this.num_bombs){
      var rand_x = Math.floor(Math.random()*this.grid_size);
      var rand_y = Math.floor(Math.random()*this.grid_size);
      var tile = this.grid[x][y];
      
      if (tile.bombed) {
        next;
      }
      
      tile.plant_bomb();
      total_bombs += 1;
    }
  };

  Board.prototype.lost = function() {
    var tile = {};
    for(var i = 0; i < this.grid_size; i++) {
      for(var j = 0; j < this.grid_size; j++) {
        tile = this.grid[i][j];
        if (tile.bombed && tile.explored){
          return true;
        }
      }
    }
    return false;
  };
  
  Board.prototype.won = function() {
    var tile = {};
    for(var i = 0; i < this.grid_size; i++) {
      for(var j = 0; j < this.grid_size; j++) {
        tile = this.grid[i][j];
        if (!tile.bombed && !tile.explored){
          return false;
        }
      }
    }
    return true;
  };
  
  Board.prototype.render = function() {
    
  };
  
  Board.prototype.reveal = function() {
    
  };

})(this);