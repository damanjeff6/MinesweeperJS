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
      var tile = this.grid[rand_x][rand_y];
      
      if (!tile.bombed) {
        tile.plant_bomb();
        total_bombs += 1;
      }
    }
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
  
  Board.prototype.render = function(reveal) {
    var tile = {};
    var display = " ";
    var color = " ";
    var html = '<table><thead><tr></tr></thead><tbody>';
    for(var i = 0; i < this.grid_size; i++) {
      html += '<tr>';
      for(var j = 0; j < this.grid_size; j++) {
        tile = this.grid[i][j];
        color = "";
        
        if (tile.bombed && reveal){
          display = "*";
          color = "bombed"
        }
        else if (tile.flagged){
          display = "F";
        }
        else if (!tile.explored){
          display = " ";
        }
        else {
          display = tile.adjacent_bomb_count();
          if (display === 0){
            display = " ";
          }
          color = "explored"
        }
        html += '<td class=\"' + color + ' ' + Minesweeper.Tile.COLOR[display] +'\"'; 
        html += 'data-x=\"' + i + '\" data-y=\"' + j + '\" >' + display + '</td>';
      }
      html += "</tr>";
    }
    html += '</tbody><tfoot><tr></tr></tfoot></table>';
    $(html).appendTo('.board');
  };
  
  Board.prototype.setTileHandlers = function () {
    var that = this;
    $('td').on('mousedown', function(event){
      var x = $(this).attr('data-x');
      var y = $(this).attr('data-y');
      var tile = that.grid[x][y];
      
      if (event.which == 3){
        tile.toggle_flag();
        tile.render();
      }
      else if (event.which == 1 && tile.flagged){}
      else {
        tile.explore();
        
        if(tile.bombed){
          $('figure').addClass('lose');
          $('.board').empty();
          that.reveal();
        }
      }
      
      if(that.won()){
        $('figure').addClass('win');
        $('.board').empty();
        that.render(false);
      }
    });
  };
  
  Board.prototype.reveal = function() {
    this.render(true);
  };

})(this);