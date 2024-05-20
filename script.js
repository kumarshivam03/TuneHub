console.log("Welcome to Spotify")
let songIndex=0;
let audioElement=new Audio('1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
// let songItems=Array.from(document.getElementById('songItem'));

// let songs=[
//     {songName:"Army",filePath:"songs/1.mp3",coverPath:"cover/1.jpg"},
//     {songName:"Parindey",filePath:"songs/2.mp3",coverPath:"cover/2.jpg"},
//     {songName:"Yaar",filePath:"songs/3.mp3",coverPath:"cover/3.jpg"},
//     {songName:"Maan Meri Jaan",filePath:"songs/4.mp3",coverPath:"cover/4.jpg"},
//     {songName:"Shambhu",filePath:"songs/5.mp3",coverPath:"cover/5.jpg"},
//     {songName:"Daku",filePath:"songs/6.mp3",coverPath:"cover/6.jpg"},
//     {songName:"Hanuman Chalisa",filePath:"songs/7.mp3",coverPath:"cover/7.jpg"},
//     {songName:"Yadav Brand",filePath:"songs/8.mp3",coverPath:"cover/8.jpg"}
// ]
// songItems.forEach((element,i)=>{
//     console.log(element,i)
//     element.getElementsByTagName("img")[0].src=songs[i].coverPath;
//     element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
// })
//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})
//listen to events
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*(audioElement.duration/100);
})
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        // console.log(e.target)
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play')
        e.target.classList.add('fa-circle-pause')
        audioElement.src=`${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=9;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
