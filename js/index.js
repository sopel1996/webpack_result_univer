let sounds = document.querySelectorAll('.sound');
let volumeRanges = document.querySelectorAll('input[type="range"]');
let audio = document.getElementById('audio')

sounds.forEach(sound=>{
    sound.addEventListener('click', e =>{
        let soundCard = e.target.closest('.sound');

        if (soundCard.classList.contains('active')){
            soundCard.classList.remove('active');
            audio.pause();
            audio.currentTime = 0;
        } else {
            sounds.forEach(el=>{
                el.classList.remove('active');
            })
            soundCard.classList.add('active')
            document.body.style.backgroundImage = `url(assets/${soundCard.dataset.bg}-bg.jpg)`
            audio.src = `assets/sounds/${soundCard.dataset.audio}.mp3`;
            audio.load();
            audio.volume = 0.5;
            soundCard.parentNode.getElementsByTagName('input')[0].value = audio.volume*100;
            audio.play()
        }
    })
})

volumeRanges.forEach(range=>{
    range.addEventListener('input', evt=>{
        audio.volume = evt.target.value/100;
    })
})