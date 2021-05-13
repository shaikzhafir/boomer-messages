
//key value pair for randomImages to get a suitable colour for text?

let randomImages = [
    'https://cdnb.artstation.com/p/assets/images/images/006/710/803/large/nirmala-handapangoda-nyh-wallpaper.jpg?1500658706',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Random_scenery_%28553758001%29.jpg/1200px-Random_scenery_%28553758001%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/0e/Terragen_render.jpg',
    'https://i.pinimg.com/originals/c7/82/17/c78217c3fcbe7c20e6dd3194be5aa7f9.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVv3FGfF1kcXjQOKt-LBmt9uDQD2XVJMkH7A&usqp=CAU'

]


let randomTexts = [
    'today we wake up\nwe thank god we are alive\nthank you god',
    'Don\'t eat maggi mee\nlater will go bald\nlike your father',
    'Have a good day\nlook at the sun',
]


function draw(e) {
  
  var canvas = document.getElementById("tutorial");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    let randomImage = randomImages[Math.floor(Math.random()*5)]
    let randomText = randomTexts[Math.floor(Math.random()*3)]
    let lines = randomText.split('\n')
    let space = 60
    
    ctx.font = "50px serif";
    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0,500,500);
      ctx.fillStyle = "white"
      ctx.fillText("Good Morning", 50, 200);
      
      ctx.font = "40px serif";
      lines.forEach((line,index) => {
        ctx.fillStyle = "white"
        ctx.fillText(line, 50,300 + index*space,500)    
      });
      
    };
    img.src = randomImage
    
  }
}


