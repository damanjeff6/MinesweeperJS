(function (root) {
  var Minesweeper = root.Minesweeper = (root.Minesweeper || {});

  var Game = Minesweeper.Game = function (size){
      var layout = Game.LAYOUTS[size];
      this.board = new Minesweeper.Board(layout.grid_size, layout.num_bombs);
      
      this.board.render(false);
      this.board.setTileHandlers();
  };
  
  Game.LAYOUTS = {
    small: { grid_size: 9, num_bombs: 10 },
    medium: { grid_size: 16, num_bombs: 40 },
    large: { grid_size: 22, num_bombs: 99 }
  };

})(this);