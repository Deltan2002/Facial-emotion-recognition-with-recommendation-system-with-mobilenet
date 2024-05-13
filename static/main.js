let previous = document.querySelector("#pre");
let play = document.querySelector("#play");
let next = document.querySelector("#next");
let title = document.querySelector("#title");
let recent_volume = document.querySelector("#volume");
let volume_show = document.querySelector("#volume_show");
let slider = document.querySelector("#duration_slider");
let show_duration = document.querySelector("#show_duration");
let track_image = document.querySelector("#track_image");
let auto_play = document.querySelector("#auto");
let present = document.querySelector("#present");
let total = document.querySelector("#total");
let artist = document.querySelector("#artist");

let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create an audio Element
let track = document.createElement("audio");

//All songs list
let All_song = [
  {
    name: "Waterfall",
    path: `../static/sad/1.mp3`,
    img: `../static/sad/bg1.png`,
    singer: "Pixabay",
  },
  {
    name: "second song",
    path: `../static/sad/2.mp3`,
    img: `../static/sad/bg2.png`,
    singer: "2",
  },
  {
    name: "third song",
    path: `../static/sad/3.mp3`,
    img: `../static/sad/bg3.png`,
    singer: "3",
  },
  {
    name: "fourth song",
    path: `../static/sad/4.mp3`,
    img: `../static/sad/bg7.png`,
    singer: "4",
  },
  {
    name: "fifth song",
    path: `../static/sad/5.mp3`,
    img: `../static/sad/bg5.png`,
    singer: "5",
  },
  {
    name: "fifth song",
    path: `../static/happy/5.mp3`,
    img: `../static/happy/bg5.png`,
    singer: "5",
  },
  {
    name: "fifth song",
    path: `../static/happy/5.mp3`,
    img: `../static/happy/bg5.png`,
    singer: "5",
  },
  {
    name: "fifth song",
    path: `../static/happy/5.mp3`,
    img: `../static/happy/bg5.png`,
    singer: "5",
  },
  {
    name: "fifth song",
    path: `../static/happy/5.mp3`,
    img: `../static/happy/bg5.png`,
    singer: "5",
  },
  {
    name: "fifth song",
    path: `../static/happy/5.mp3`,
    img: `../static/happy/bg5.png`,
    singer: "5",
  },
  {
    name: "fifth song",
    path: `../static/neutral/5.mp3`,
    img: `../static/neutral/bg5.png`,
    singer: "5",
  },
  {
    name: "fifth song",
    path: `../static/neutral/5.mp3`,
    img: `../static/neutral/bg5.png`,
    singer: "5",
  },
  {
    name: "fifth song",
    path: `../static/neutral/5.mp3`,
    img: `../static/neutral/bg5.png`,
    singer: "5",
  },
  {
    name: "fifth song",
    path: `../static/neutral/5.mp3`,
    img: `../static/neutral/bg5.png`,
    singer: "5",
  },
  {
    name: "fifth song",
    path: `../static/neutral/5.mp3`,
    img: `../static/neutral/bg5.png`,
    singer: "5",
  },
];


// Randomly select 5 songs from the All_song list
// Shuffle the All_song array to get unique songs
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
	  const j = Math.floor(Math.random() * (i + 1));
	  [array[i], array[j]] = [array[j], array[i]];
	}
	return array;
  }
  
  // Shuffle the All_song array and select the first five unique songs
let shuffledSongs = shuffle([...All_song]);
let selectedSongs = shuffledSongs.slice(0, 5);
  


/// All functions
// Function to load the track
function load_track(index_no) {
	clearInterval(timer);
	reset_slider();
  
	track.src = selectedSongs[index_no].path;
	title.innerHTML = selectedSongs[index_no].name;
	track_image.src = selectedSongs[index_no].img;
	artist.innerHTML = selectedSongs[index_no].singer;
	track.load();
  
	timer = setInterval(range_slider, 1000);
	total.innerHTML = selectedSongs.length;
	present.innerHTML = index_no + 1;
  }
  
  load_track(index_no);
  
  // Mute sound function
  function mute_sound() {
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
  }
  
  // Checking if the song is playing or not
  function justplay() {
	if (Playing_song == false) {
	  playsong();
	} else {
	  pausesong();
	}
  }
  
  // Reset song slider
  function reset_slider() {
	slider.value = 0;
  }
  
  // Play song
  function playsong() {
	track.play();
	Playing_song = true;
	play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
  }
  
  // Pause song
  function pausesong() {
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
  }
  
  // Next song
  function next_song() {
	if (index_no < selectedSongs.length - 1) {
	  index_no += 1;
	  load_track(index_no);
	  playsong();
	} else {
	  index_no = 0;
	  load_track(index_no);
	  playsong();
	}
  }
  
  // Previous song
  function previous_song() {
	if (index_no > 0) {
	  index_no -= 1;
	  load_track(index_no);
	  playsong();
	} else {
	  index_no = selectedSongs.length - 1;
	  load_track(index_no);
	  playsong();
	}
  }
  
  // Change volume
  function volume_change() {
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
  }
  
  // Change slider position
  function change_duration() {
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
  }
  
  // Autoplay function
  function autoplay_switch() {
	if (autoplay == 1) {
	  autoplay = 0;
	  auto_play.style.background = "rgba(255,255,255,0.2)";
	} else {
	  autoplay = 1;
	  auto_play.style.background = "#148F77";
	}
  }
  
  function range_slider() {
	let position = 0;
  
	// Update slider position
	if (!isNaN(track.duration)) {
	  position = track.currentTime * (100 / track.duration);
	  slider.value = position;
	}
  
	// Function will run when the song is over
	if (track.ended) {
	  play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
	  if (autoplay == 1) {
		index_no += 1;
		load_track(index_no);
		playsong();
	  }
	}
  }