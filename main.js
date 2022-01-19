var gesture_meaning = "";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
})

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"></img>';
    })
}

console.log("ml5 version :", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/PBhYZmWE1/model.json", modelLoaded);

function modelLoaded(){
    console.log("modelLoaded");
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function speak(){
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(gesture_meaning);
    synth.speak(utterThis);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;

        if(results[0].label == "Amazing"){
            document.getElementById("update_emoji").innerHTML = "&#128076;";
            gesture_meaning = "This is looking amazing";
            speak()
        }
        if(results[0].label == "Victory"){
            document.getElementById("update_emoji").innerHTML = "&#9996;";
            gesture_meaning = "That was a marvelous victory";
            speak();
        }
        if(results[0].label == "Best"){
            document.getElementById("update_emoji").innerHTML = "&#128077;";
            gesture_meaning = "All the best";
            speak();
        }
    }
}