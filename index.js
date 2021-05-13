// first we need to create a stage
let textboxContainer = document.getElementById('textboxContainer')
var stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: 500,
    height: 500
  });


  
  // then create layer
  var layer = new Konva.Layer();
  
  function addText() {

    

    var simpleText = new Konva.Text({
        x: 0,
        y: 0,
        text: 'Simple Text',
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'green',
        draggable: true,
        dragBoundFunc: function (pos) {
          var newX = checkBounds(pos.x,0,400)
          var newY = checkBounds(pos.y,0,400);
          return {
            x: newX,
            y: newY,
          };
        },
      });

      layer.add(simpleText)

      var textGroup = new Konva.Transformer({
        node: simpleText,
        enabledAnchors: ['middle-left', 'middle-right'],
        // set minimum width of text
        boundBoxFunc: function (oldBox, newBox) {
          newBox.width = Math.max(30, newBox.width);
          return newBox;
        },
        
      });

      simpleText.on('transform', function () {
        // reset scale, so only with is changing by transformer
        simpleText.setAttrs({
          width: simpleText.width() * simpleText.scaleX(),
          scaleX: 1,
        });
      });
    
      layer.add(textGroup);

      layer.draw()
      // to align text in the middle of the screen, we can set the
      // shape offset to the center of the text shape after instantiating it
      //impleText.offsetX(simpleText.width() / 2);
    
      // since this text is inside of a defined area, we can center it using
      // align: 'center'
      



      //add textbox to html 
      let textbox = document.createElement('input')
      textbox.type = "text"
      textboxContainer.appendChild(textbox)
      const lineBreak = document.createElement('br');
      textboxContainer.appendChild(lineBreak)
      textbox.oninput = function (e) {
        simpleText.text(e.target.value)
        layer.draw()
      }

      // add the layer to the stage
      stage.add(layer);
    
    
    
    
      
    
  }


  function checkBounds(pos,start,end) {
      if (pos < start){
          return start
      }
      else if (pos > end){
          return end
      }
      else {
          return pos
      }
  }