(function (root) {
  var Minesweeper = root.Minesweeper = (root.Minesweeper || {});

  var Tile = Minesweeper.Tile = function (board,pos){
      this.board = board;
      this.pos = pos;
      this.bombed = false;
      this.explored = false;
      this.flagged = false;
  };

  Tile.DIRS = [
    [-1, -1],
    [-1,  0],
    [-1,  1],
    [ 0, -1],
    [ 0,  1],
    [ 1, -1],
    [ 1,  0],
    [ 1,  1]
  ];
  
  Tile.COLOR = {
    ' ': '',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight'
  };
  
  Tile.prototype.plant_bomb = function (){
    this.bombed = true;
  };

  Tile.prototype.adjacent_bomb_count = function (){
    var count = 0;
    var x = 0;
    var y = 0;
    for (var i = 0; i < Tile.DIRS.length; i++){
      x = this.pos[0] + Tile.DIRS[i][0];
      y = this.pos[1] + Tile.DIRS[i][1];
      if (x >= 0 && x < this.board.grid_size && y >= 0 && y < this.board.grid_size){
        if (this.board.grid[x][y].bombed){
          count += 1;
        }
      }
    }
    return count;
  };

  Tile.prototype.explore = function (){
    if (this.flagged){
      return this;
    }
    if (this.explored){
      return this;
    }
    this.explored = true;
    this.render();
    if (!this.bombed && this.adjacent_bomb_count() === 0){
      var x = 0;
      var y = 0;
      for (var i = 0; i < Tile.DIRS.length; i++){
        x = this.pos[0] + Tile.DIRS[i][0];
        y = this.pos[1] + Tile.DIRS[i][1];
        if (x >= 0 && x < this.board.grid_size && y >= 0 && y < this.board.grid_size){
          this.board.grid[x][y].explore();
        }
      }
    }
    
    return this;
  };

  Tile.prototype.render = function(){
    var x = this.pos[0];
    var y = this.pos[1];
    
    $('td[data-x=' + x + '][data-y=' + y + ']').text(' ');
    
    if (this.flagged){
      $('td[data-x=' + x + '][data-y=' + y + ']').text("F").addClass('flagged');
    }
    else if (this.explored){
      display = this.adjacent_bomb_count();
      if (display === 0){
        display = " ";
      }
      $('td[data-x=' + x + '][data-y=' + y + ']').text(display).addClass('explored').addClass(Tile.COLOR[display]);
    }
  };

  Tile.prototype.toggle_flag = function(){
    if (this.explored){
      return;
    }
    this.flagged = !this.flagged;
  };

})(this);