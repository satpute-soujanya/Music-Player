const musicArtImage = document.querySelector('img')
const musicTitle = document.getElementById('song_title')
const musicArtist = document.getElementById('song_artist')
const musicAudio = document.querySelector('audio')
const progressContainer = document.getElementById('progress_container')
const progress = document.getElementById('progress')
const CurrentTime = document.getElementById('current_time')
const totalDuration = document.getElementById('duration')
const previouseButton = document.getElementById('previous')
const playButton = document.getElementById('play')
const nextButton = document.getElementById('next')

const Song = [
  {
    name: '01_Blank_space',
    displayName: 'Blank Spaces',
    artistName: 'Taylor Swift',
  },
  {
    name: '02_Me',
    displayName: 'Me',
    artistName: 'Taylor Swift',
  },
  {
    name: '03_All_To_Well',
    displayName: 'All to Well',
    artistName: 'Taylor Swift',
  },
  {
    name: '04_Shake_It_Of',
    displayName: 'Shake it of',
    artistName: 'Taylor Swift',
  },
]

// Check if playing
let isPlaying = false

// Play
function playSong() {
  isPlaying = true
  playButton.classList.replace('fa-play', 'fa-pause')
  playButton.setAttribute('title', 'Pause')
  musicAudio.play()
}
// Pause
function pauseSong() {
  isPlaying = false
  playButton.classList.replace('fa-pause', 'fa-play')
  playButton.setAttribute('title', 'Play')
  musicAudio.pause()
}

// Update song art,name, artistname, audio
function loadsong(song) {
  musicTitle.textContent = song.displayName
  musicArtist.textContent = song.artistName
  musicAudio.src = `songs/${song.name}.mp3`
  musicArtImage.src = `images/${song.name}.jpeg`
}
// Current Song dynamic adding

let currentSongIndex = 0

function previousSong() {
  currentSongIndex--
  if (currentSongIndex < 0) {
    currentSongIndex = Song.length - 1
  }
  loadsong(Song[currentSongIndex])
  playSong()
}
function nextSong() {
  currentSongIndex++
  if (currentSongIndex > Song.length - 1) {
    currentSongIndex = 0
  }
  loadsong(Song[currentSongIndex])
  playSong()
}

loadsong(Song[currentSongIndex])

// Update Progressbar
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement
    const processPercentage = (currentTime / duration) * 100
    progress.style.width = `${processPercentage}%`
    // Displaying total Duration
    const durationMinutes = Math.floor(duration / 60)
    let durationSeconds = Math.floor(duration % 60)
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`
    }
    // Delaying switching duration to avoid displaying NaN
    if (durationSeconds) {
      totalDuration.textContent = `${durationMinutes}:${durationSeconds}`
    }
    // displaying current time
    const currentMinutes = Math.floor(currentTime / 60)
    let currentSeconds = Math.floor(currentTime % 60)
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`
    }
    // Delaying switching current to avoid displaying NaN
    if (currentSeconds) {
      CurrentTime.textContent = `${currentMinutes}:${currentSeconds}`
    }
  }
}
// Setting progress bar over clicking and dragging
function setProgrssBar(e) {
  //   console.log(e)
  const width = e.srcElement.clientWidth
  const clickX = e.offsetX
  const { duration } = musicAudio

  musicAudio.currentTime = (clickX / width) * duration
}

// Play and pause event listener
playButton.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong()
})
previouseButton.addEventListener('click', previousSong)
nextButton.addEventListener('click', nextSong)
musicAudio.addEventListener('timeupdate', updateProgressBar)
musicAudio.addEventListener('ended', nextSong)
progressContainer.addEventListener('click', setProgrssBar)
