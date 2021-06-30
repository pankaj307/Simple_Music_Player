const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById("play");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let progress = document.getElementById("progress");
let total_duration = document.getElementById("duration");
let current_time = document.getElementById("current_time");
const progress_div = document.getElementById("progress_div");

const songs = [
    {
        name: "1_te_amo",
        title: "Te Amo",
        artise: "Ash King & Sunidhi Chauhan",
    },
    {
        name: "2_raabta",
        title: "Raabta",
        artise: "Arijit Singh",
    },
    {
        name: "3_aabaad_barbaad",
        title: "Aabaad Barbaad",
        artise: "Arijit Singh",
    },
    {
        name: "4_jaane_kyun",
        title: "Jaane Kyun",
        artise: "Vishal & Shekhar",
    },
    {
        name: "5_hey_ya",
        title: "Hey Ya",
        artise: "Shankar Mahadevan",
    },
    {
        name: "6_saibo",
        title: "Saibo",
        artise: "Shankar Mahadevan",
    },
    {
        name: "7_abhi_kuch_dino_se",
        title: "Abhi Kuch Dino Se",
        artise: "Mohit Chauhan",
    },
    {
        name: "8_soch_na_sake",
        title: "Soch Na Sake",
        artise: "Arijit Singh",
    },
    {
        name: "9_enna_sona",
        title: "Enna Sona",
        artise: "Arijit Singh",
    },
    {
        name: "10_aye_khuda",
        title: "Aye Khuda",
        artise: "Sunil Merchant",
    },
    {
        name: "11_bheegi_si_bhaagi_si",
        title: "Bheegi-Si Bhaagi-Si",
        artise: "Mohot Chauhan",
    },
    {
        name: "12_jaise_mera_tu",
        title: "Jaise Mera TU",
        artise: "Arijit Singh",
    },
    {
        name: "13_kinna_sona",
        title: "Kinna Sona",
        artise: "Sunil Kamath",
    },
    {
        name: "14_dil_mere",
        title: "Dil Mere",
        artise: "The Local Train",
    },
]

let isPlaying = false;

const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    img.classList.add("anime");
};

const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    img.classList.remove("anime");
};

play.addEventListener("click", () => {
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
});

const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artise;
    music.src = "music/" + songs.name + ".m4a";
    img.src = "images/" + songs.name + ".jpg";
};

songIndex = 0
// loadSong(songs[0])
const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

// progress js Work

music.addEventListener("timeupdate", (event) => {
    // console.log(event);
    const {currentTime, duration} = event.srcElement;
    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;

    // music duration update

    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    if(sec_duration < 10) {
        sec_duration = `0${sec_duration}`;
    }
    
    let tot_duration = `${min_duration}:${sec_duration}`;
    if(duration){
        total_duration.textContent = `${tot_duration}`;
    }

    // current duration update

    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);
    
    if(sec_currentTime < 10) {
        sec_currentTime = `0${sec_currentTime}`;
    }
    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
    current_time.textContent = `${tot_currentTime}`;
});

// progress onclick functionality

progress_div.addEventListener("click", (event) => {
    const {duration} = music;
    // let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;.
    let move_progress = (event.offsetX / 290) * duration;
    music.currentTime = move_progress;
});

// if music end call next song function
music.addEventListener("ended", nextSong);

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);