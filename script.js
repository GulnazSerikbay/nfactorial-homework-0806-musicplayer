const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const audio2 = document.querySelector('#audio2')
const progress = document.querySelector('#progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

const iconContainer = document.querySelector('.icons_container')




//songs 
const songs = ['5k', 'hey', 'reforget', 'ukulele', 'riptide']

//default
let songIndex = 2

loadSong(songs[songIndex])


function loadSong(song) {
    title.innerText = song
    audio.src = `audios/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

function loadSong2(song) {
    title.innerText = song
    audio2.src = `audios/${song}.mp3`

}

//eventListeners:
document.querySelectorAll('ul.option li').forEach((item) => {
    item.addEventListener('click', (e) => {
        const song = e.target.innerText
        console.log(song)
        loadSong(song)
        playSong(song)

    })
});

const icons = document.querySelectorAll('#sound').forEach((item) => {
    item.addEventListener('click', (e) => {
        const song = item.innerText
        console.log(item.innerText)
        const isPlaying = iconContainer.classList.contains('play')
        if (isPlaying) { pauseSound() }
        else { 
            loadSong2(song) 
            playSound() }
    })
});

function pauseSound(){
    iconContainer.classList.remove('play')
    audio2.pause()
}

function playSound(){
    iconContainer.classList.add('play')
    audio2.play()
}


playBtn.addEventListener('click', ()=>{
    const isPlaying = musicContainer.classList.contains('play')
    if (isPlaying) { pauseSong() }
    else { playSong() }
})

function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    audio.pause()
}

function playSong(){
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

function toPrev(){
    songIndex--
    if (songIndex < 0){
        songIndex = songs.length - 1 
    }
    loadSong(songs[songIndex])
    playSong()
}

function toNext(){
    songIndex++
    if (songIndex > songs.length-1){
        songIndex = 0 
    }
    loadSong(songs[songIndex])
    playSong() 
}

function setProgress (e) {
    const {duration, currentTime} = e.srcElement // gets the current timing
    const percent = (currentTime/duration)*100
    console.log(e.srcElement.duration)
    progress.style.width = `${percent}%`
}

function goProgress (e) {
    const width = this.clientWidth //the point we're clicking
    const clickX = e.offsetX
    const duration = audio.duration
   
    audio.currentTime = (clickX/width)*duration
}

prevBtn.addEventListener('click', toPrev)
nextBtn.addEventListener('click', toNext)
audio.addEventListener('timeupdate', setProgress)
progressContainer.addEventListener('click', goProgress)
audio.addEventListener('ended', toNext)