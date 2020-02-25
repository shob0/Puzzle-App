(function() {
    var pieces = [],
      piecePosition = [],
      c = 16,
      gridX = 4,
      gridY = 4,
      gameFinished = false,
      boxdiv = document.createElement("div");
    boxdiv.className = "box-div";
    (boxdiv.id = "main"), (movesCounter = 0);
  
    
  /**
   * Base function to build tile dom elements 
   */
    var Tile = function() {
      this.tile = document.getElementsByClassName("tile")[0];
      this.tileImg = document.getElementById("tileimg");
  
      this.w = this.tileImg.width;
      this.h = this.tileImg.height;
      this.imgsrc = this.tileImg.src;
      this.count = 1;
  
      this.create = function() {
        this.tile.outerHTML = "";
  
        //x and y represnt the axis on whicj the grid operates
        for (x = 0; x < gridX; x++) {
          for (y = 0; y < gridY; y++) {
            var width = ((this.w / gridX) * 100) / this.w + "%",
              height = ((this.h / gridY) * 100) / this.h + "%",
              bgPosX = -((this.w / gridX) * x) + "px",
              bgPosY = -((this.h / gridY) * y) + "px",
              top = ((this.h / gridY) * y * 100) / this.h + "%",
              left = ((this.w / gridX) * x * 100) / this.w + "%";
  
            var ele = document.createElement("div");
            ele.style.width = width;
            ele.style.top = top;
            ele.style.left = left;
            ele.style.height = height;
            ele.style.border = "0.5px solid white";
            ele.style.backgroundImage = `url(${this.imgsrc})`;
            ele.style.display = "inline-block";
            // for test only
            //   ele.innerHTML = `<span style="float:right">${this.count}</span>`;
            //   ele.pos = "tile" + this.count;
            ele.count = this.count;
            ele.position = this.count;
            ele.className = "img-div";
            ele.style.position = "absolute";
            ele.id = "split-image" + this.count++;
            //Keeping one tile empty
            if (!(x === 3 && y === 3)) {
              pieces.push(ele);
              piecePosition.push(`${bgPosX} ${bgPosY}`);
            }
          }
        }
      };
    };
  
    /**
     * Initializing the game
     */
    function init() {
      //   creatig the tile
      var tile = new Tile();
      tile.create();
    //   scambbledPieces = scrammbleArray(pieces);
        scambbledPieces = pieces;
  
      // adding background-position to elements
      for (var i = 0; i < scambbledPieces.length; i++) {
        scambbledPieces[i].style.backgroundPosition = piecePosition[i];
      }
      renderPuzzle(scambbledPieces);
      // Implement click functionality only after puzzle is rendered.
      observeClick(scambbledPieces);
      renderclickcounter();
    }
  
    /**
     * comparing current tile position with the supoosed position
     */
    function checkWinner() {
      var r = pieces.every(v => {
        /**
         * v.count  represents the current position of the tile whereas
         * pieces.indexOf(v)+1 represents the actual position of the tile on the grid
         * when all tile are at their supposed position on the grid, user wins the game.
         */
        if (v.count === pieces.indexOf(v) + 1) return true;
        return false;
      });
      if (r) {
        gameFinished = true;
        var box = document.getElementById("main");
        box.removeEventListener("click", clickHandler);
  
        setTimeout(() => {
          // alert("Great!! You have won the game!");
          document.getElementById(
            "counter-div"
          ).innerHTML = `<span><b> You Won!!!!</span>`;
        }, 900);
      }
    }
  
    /**
     * Splitting image into tiles
     * @param {Array} arr
     */
    function renderPuzzle(arr) {
      arr.forEach(element => {
        boxdiv.appendChild(element);
      });
  
      var md = document.createElement("div");
      md.className = "div";
      md.id = "box";
      md.appendChild(boxdiv);
      document.body.append(md);
    }
  
    /**
     *
     * @param {Array} arr
     */
    function scrammbleArray(arr) {
      for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      return arr;
    }
  
    /**
     * Adding click handler event to the click on the main div
     */
    function observeClick() {
      var box = document.getElementById("main");
      if (!gameFinished) {
        box.addEventListener("click", clickHandler);
      }
    }
  
    function clickHandler(event) {
      // only start if the cliked event is a tile
      if (event.target.position) {
        var dir = movePiece(event);
        checkWinner();
      }
    }
  
    function movePiece(event) {
      //dr - direction
      var dr = decideMovement(event);
      var XPosition = event.target.style.left.slice(0, -1);
      var YPosition = event.target.style.top.slice(0, -1);
      event.target.classList.add("translate");
      movingXPixel = 100/gridX;
      movingYPixel = 100/gridY;

      if (dr === "up") {
        YPosition = parseInt(YPosition) - movingYPixel;
        event.target.style.top = YPosition + "%";
        return event.target.position - 1;
      }
      if (dr === "down") {
        YPosition = parseInt(YPosition) + movingYPixel;
        event.target.style.top = YPosition + "%";
        return event.target.position + 1;
      }
      if (dr === "left") {
        XPosition = parseInt(XPosition) - movingXPixel;
        event.target.style.left = XPosition + "%";
        return event.target.position - gridX;
      }
      if (dr === "right") {
        XPosition = parseInt(XPosition) + movingXPixel;
        event.target.style.left = XPosition + "%";
        return event.target.position + gridY;
      }
    }
  
    /**
     * decides which are the possible moving direction for the cliked tile
     * @param {DomElement click event} event
     */
    function decideMovement(event) {
      var ti = event.target.count;
      var left = ti - gridX;
      var right = ti + gridY;
      var up = ti - 1;
      var down = ti + 1;
      var e =
        up === c
          ? "up"
          : down === c
          ? "down"
          : left === c
          ? "left"
          : right === c
          ? "right"
          : "NA";
      if (e !== "NA") {
        var t = event.target.count;
        event.target.count = c;
        c = t;
        document.getElementById(
          "counter-div"
        ).innerHTML = `<span><b> Moves: </b>${++movesCounter}</span>`;
      }
      return e;
    }
  
    window.onload = function() {
      init();
    };
  
    function renderclickcounter() {
      var mainBox = document.getElementById("main");
      var countdiv = document.createElement("div");
      countdiv.innerHTML = `<span><b> Moves: </b>${movesCounter}</span>`;
      countdiv.id = "counter-div";
      countdiv.style.width = "140px";
      countdiv.style.float = "right";
      countdiv.style.top = "-2px";
      countdiv.style.display = "inline-block";
      countdiv.style.position = "absolute";
      countdiv.style.right = "-143px";
      mainBox.prepend(countdiv);
    }
  })();
  