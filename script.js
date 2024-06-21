console.log("Welcome to Spotify");

// Variable to keep track of the currently playing song index
let songIndex = 0;

// Creating a new audio element to play songs, initializing with the first song
let audioElement = new Audio("1.mp3");

// Main play/pause button element
let masterPlay = document.getElementById("masterPlay");

// Progress bar element
let myProgressBar = document.getElementById("myProgressBar");

// GIF image element
let gif = document.getElementById("gif");

// Array of play buttons for each song item
let songItems = Array.from(document.getElementsByClassName("songItemPlay"));

// Event listener for the main play/pause button
masterPlay.addEventListener("click", () => {
  // If the audio is paused or hasn't started playing, play it
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play(); // Play the audio
    masterPlay.classList.remove("fa-circle-play"); // Change play icon to pause
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1; // Show the GIF
  } else {
    audioElement.pause(); // Pause the audio
    masterPlay.classList.remove("fa-circle-pause"); // Change pause icon to play
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0; // Hide the GIF
  }
});

// Event listener to update the progress bar as the song plays
audioElement.addEventListener("timeupdate", () => {
  // Calculate progress as a percentage
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress; // Update the progress bar value
});

// Event listener to seek to different parts of the song using the progress bar
myProgressBar.addEventListener("input", () => {
  // Calculate the new current time of the audio based on the progress bar value
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// Function to reset all play buttons to the play state
const makeAllPlays = () => {
  songItems.forEach((element) => {
    element.classList.remove("fa-circle-pause"); // Change pause icons to play
    element.classList.add("fa-circle-play");
  });
};

// Function to handle play/pause for individual song items
const handleSongItemPlay = (e) => {
  makeAllPlays(); // Reset all play buttons
  songIndex = parseInt(e.target.id); // Get the index of the clicked song item
  if (
    audioElement.src.includes(`${songIndex + 1}.mp3`) &&
    !audioElement.paused
  ) {
    audioElement.pause(); // Pause the audio if the same song is playing
    e.target.classList.remove("fa-circle-pause"); // Change pause icon to play
    e.target.classList.add("fa-circle-play");
    gif.style.opacity = 0; // Hide the GIF
  } else {
    audioElement.src = `${songIndex + 1}.mp3`; // Change the audio source to the clicked song
    audioElement.currentTime = 0; // Reset the audio to the start
    audioElement.play(); // Play the new audio
    e.target.classList.remove("fa-circle-play"); // Change play icon to pause
    e.target.classList.add("fa-circle-pause");
    gif.style.opacity = 1; // Show the GIF
    masterPlay.classList.remove("fa-circle-play"); // Change main play button icon to pause
    masterPlay.classList.add("fa-circle-pause");
  }
};

// Add event listeners to individual song items
songItems.forEach((element) => {
  element.addEventListener("click", handleSongItemPlay); // Add click event listener
});

// Next song button functionality
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    // If it's the last song, loop back to the first
    songIndex = 0;
  } else {
    songIndex += 1; // Otherwise, go to the next song
  }
  audioElement.src = `${songIndex + 1}.mp3`; // Change the audio source
  audioElement.currentTime = 0; // Reset the audio to the start
  audioElement.play(); // Play the new audio
  gif.style.opacity = 1; // Show the GIF
  masterPlay.classList.remove("fa-circle-play"); // Change main play button icon to pause
  masterPlay.classList.add("fa-circle-pause");
  makeAllPlays(); // Reset all play buttons
  document.getElementById(songIndex).classList.remove("fa-circle-play"); // Change clicked song play icon to pause
  document.getElementById(songIndex).classList.add("fa-circle-pause");
});

// Previous song button functionality
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    // If it's the first song, loop to the last
    songIndex = 9;
  } else {
    songIndex -= 1; // Otherwise, go to the previous song
  }
  audioElement.src = `${songIndex + 1}.mp3`; // Change the audio source
  audioElement.currentTime = 0; // Reset the audio to the start
  audioElement.play(); // Play the new audio
  gif.style.opacity = 1; // Show the GIF
  masterPlay.classList.remove("fa-circle-play"); // Change main play button icon to pause
  masterPlay.classList.add("fa-circle-pause");
  makeAllPlays(); // Reset all play buttons
  document.getElementById(songIndex).classList.remove("fa-circle-play"); // Change clicked song play icon to pause
  document.getElementById(songIndex).classList.add("fa-circle-pause");
});
