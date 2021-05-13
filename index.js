// first we need to create a stage
let textboxContainer = document.getElementById('textboxContainer')
var stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: 500,
    height: 500
  });

let count = 0;


  
  // then create layer
  var layer = new Konva.Layer();
  
  function addText() {
    count++;
    var simpleText = new Konva.Text({
        x: 0,
        y: 0,
        text: 'Simple Text',
        fontSize: 30,
        fontStyle : 'bold',
        fontFamily: 'Calibri',
        fill: 'black',
        name : 'text',
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
        //the draggy things
        enabledAnchors: ['top-left', 'top-right', 'bottom-right','bottom-left'],
        // set minimum width of text
        boundBoxFunc: function (oldBox, newBox) {
          newBox.width = Math.max(30, newBox.width);
          return newBox;
        },
        
      });

      textGroup.nodes([simpleText])
      layer.add(textGroup);
      layer.draw()
  



      //add textbox to html and text 1 or 2
      let label = document.createElement('span')
      label.textContent = "text" + count + " "
      textboxContainer.appendChild(label)
      let textbox = document.createElement('input')
      textbox.type = "text"
      textboxContainer.appendChild(textbox)
      textbox.oninput = function (e) {
        simpleText.text(e.target.value)
        layer.draw()
      }

      //add delete function
      let deleteButton = document.createElement('button')
      deleteButton.textContent = 'X'
      deleteButton.onclick = function deleteText(e) {
          simpleText.destroy()
          textGroup.destroy()
          layer.draw()
          label.remove()
          textbox.remove()
          deleteButton.remove()
          lineBreak.remove()
      }
      textboxContainer.appendChild(deleteButton)
      const lineBreak = document.createElement('br');
      textboxContainer.appendChild(lineBreak)
      // add the layer to the stage
      stage.add(layer);

      

      stage.on('click tap', function (e) {
      
        // if click on empty area - remove all selections
        if (e.target === stage) {
          textGroup.nodes([]);
          layer.draw();
          return;
        }

        // do nothing if clicked NOT on our text
        if (!e.target.hasName('text')) {
          return;
        }


        const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
        const isSelected = textGroup.nodes().indexOf(e.target) >= 0;

        if (!metaPressed && !isSelected) {
          // if no key pressed and the node is not selected
          // select just one
          textGroup.nodes([e.target]);
        } else if (metaPressed && isSelected) {
          // if we pressed keys and node was selected
          // we need to remove it from selection:
          const nodes = textGroup.nodes().slice(); // use slice to have new copy of array
          // remove node from array
          nodes.splice(nodes.indexOf(e.target), 1);
          textGroup.nodes(nodes);
        } else if (metaPressed && !isSelected) {
          // add the node into selection
          const nodes = textGroup.nodes().concat([e.target]);
          textGroup.nodes(nodes);
        }
    });
    
    
    
    
    
      
    
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