previsão1="";
previsão2="";

Webcam.set({
    width:350,
    height:300,
    imageFormat:"png",
    pngQuality:90,
})

camera=document.getElementById("camera");

Webcam.attach("#camera");

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="' + data_uri + '"/>'
    })
}

console.log("ml5:",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/DHxvgGVeq/model.json",modelLoaded)

function modelLoaded(){
    console.log("modelo carregado")
}

function speak(){
    const synth=window.speechSynthesis;
    speakData1="a primeira previsão é " + previsão1;
    speakData2="a segunda previsão é " + previsão2;
    const utterThis=new SpeechSynthesisUtterance(speakData1+speakData2);
    synth.speak(utterThis);
}

function check() {
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
if(error){
    console.error(error)
} else{
    console.log(results);
    document.getElementById("resultEmotionName").innerHTML=results[0].label;
    document.getElementById("resultEmotionName2").innerHTML=results[1].label;

    previsão1=results[0].label;
    previsão2=results[1].label;

    speak();

    if(results[0].label=="TRANQUILO"){
        document.getElementById("updateEmoji").innerHTML="&#129305;";
    }
    if(results[0].label=="OK"){
        document.getElementById("updateEmoji").innerHTML="&#128076;";
    }
    if(results[0].label="RUIM"){
        document.getElementById("updateEmoji").innerHTML="&#128078;";
    }

    if(results[1].label=="TRANQUILO"){
        document.getElementById("updateEmoji2").innerHTML="&#129305;";
    }
    if(results[1].label=="OK"){
        document.getElementById("updateEmoji2").innerHTML="&#128076;";
    }
    if(results[1].label=="RUIM"){
        document.getElementById("updateEmoji2").innerHTML="&#128078;";
    }
}
}