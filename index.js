const resultsArea = document.querySelector('#results-area')
const microphone = document.querySelector('#microphone')

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = new window.SpeechRecognition()

const onMicClick = () => {
    if (!microphone.classList.contains('mic-on')) {
        microphone.classList.add('mic-on')
        recognition.start()
        recognition.addEventListener('end', recognition.start)
    } else {
        microphone.classList.remove('mic-on')
        recognition.removeEventListener('end', recognition.start)
        recognition.stop()
    }
}

microphone.addEventListener('click', onMicClick)
recognition.addEventListener('result', e => {
    const notes = Array.from(e.results)
        .map(result => {
            return `<p>${result[0].transcript + ' '}</p>`
        }).join('')

    resultsArea.innerHTML += notes
})