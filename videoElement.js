


const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

//move image
function moveCursor(coordinates){
    console.log(coordinates)
    let cursor = document.getElementById("cursor"); 
}

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      console.log(landmarks[7].y * 1000, " index")
      console.log(landmarks[11].y * 1000, " middle")
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                     {color: '#00FF00', lineWidth: 5});
      drawConnectors(canvasCtx, [landmarks[8],landmarks[12]], HAND_CONNECTIONS,
            {color: '#ff00ff', lineWidth: 5});
      drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
      //moveCursor(landmarks);
      document.getElementById("cursor").style.top = `${landmarks[8].y * 1000}px`;
      document.getElementById("cursor").style.left = `${landmarks[8].x * 1000}px`;
      if(landmarks[12].y*1000 > (landmarks[8].y*1000)-10 && landmarks[12].y*1000 < (landmarks[8].y*1000)+10){
        document.getElementById("clickCheck").click()
        console.log("click")
      }else{
        console.log(
            "nothing yet"
        )
      }
     //document.getElementById("cursor").style.transform = "scale(5)";
    }
  }
  canvasCtx.restore();
}

const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
hands.onResults(onResults);
console.log(onResults)



const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 1280,
  height: 720
});
camera.start();
function changeColor(){
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    document.getElementById("clickCheck").style.backgroundColor = `#${randomColor}`;
    console.log(randomColor)
}