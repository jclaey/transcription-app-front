import repo from './recordings/repository.mjs'
import audioPage from './audioPage.mjs'

const startBtn = document.querySelector('.fa-circle')
const stopBtn = document.querySelector('.fa-stop')
const recordingsArea = document.querySelector('#recordings-area')

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true })
        .then(stream => {
            startBtn.addEventListener('click', () => {
                if (!startBtn.classList.contains('mic-on')) {
                    startBtn.classList.add('mic-on')
        
                    if (stopBtn.classList.contains('mic-on')) {
                        stopBtn.classList.remove('mic-on')
                    }

                    const mediaRecorder = new MediaRecorder(stream)
        
                    mediaRecorder.start()

                    let chunks = []

                    mediaRecorder.ondataavailable = e => {
                        chunks.push(e.data)
                    }

                    console.log(chunks)

                    stopBtn.addEventListener('click', () => {
                        if (!stopBtn.classList.contains('mic-on')) {
                            stopBtn.classList.add('mic-on')
                
                            if (startBtn.classList.contains('mic-on')) {
                                startBtn.classList.remove('mic-on')
                            }
                
                            mediaRecorder.stop()
                        }
                    })

                    mediaRecorder.onstop = e => {
                        const clipName = prompt('Enter a name for your sound clip...')
        
                        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" })
        
                        chunks = []
        
                        const audioURL = window.URL.createObjectURL(blob)
        
                        recordingsArea.innerHTML = `
                            <div id="clip-container">
                                <p>${clipName}</p>
                                <audio controls>
                                    <source src="${audioURL}" type="audio/ogg" />
                                </audio>
                                <button id="delete-btn">Delete</button>
                                <button id="more-btn">View More</button>
                            </div>
                        `
        
                        if (!localStorage.getItem('recordings')) {
                            localStorage.setItem('recordings', JSON.stringify([]))
                        }
        
                        let recordings = JSON.parse(localStorage.getItem('recordings'))
        
                        const hasLength = recordings.length > 0 ? true : false
        
                        const recording = {
                            id: hasLength ? recordings[recordings.length - 1].id + 1 : 1,
                            name: clipName,
                            stream
                        }
        
                        repo.saveRecord(recording)
        
                        recordings = JSON.parse(localStorage.getItem('recordings'))
        
                        const newRecording = recordings[recordings.length - 1]
        
                        console.log(newRecording)
        
                        document.querySelector('#more-btn').addEventListener('click', e => {
                            let newWin = window.open('')
                            newWin.document.write(audioPage({ template: `
                                <div>
                                    <h1>${recording.name}</h1>
                                    <div id="clip-container">
                                        <p>${clipName}</p>
                                        <audio controls>
                                            <source src="${audioURL}" type="audio/ogg" />
                                        </audio>
                                        <button id="delete-btn">Delete</button>
                                        <button id="more-btn">View More</button>
                                    </div>
                                </div>
                            `, newRecording }))
        
                            newWin.document.querySelector('#transcribe').addEventListener('click', e => {
                                const AudioContext = newWin.AudioContext || newWin.webkitAudioContext
        
                                const audioContext = new AudioContext()
        
                                const analyser = audioContext.createAnalyser()
        
                                const source = audioContext.createMediaStreamSource(newRecording.stream)
                                source.connect(analyser)
                                analyser.connect(distortion)
                                distortion.connect(audioContext.destination)
        
                                const bufferLength = analyser.frequencyBinCount
                                const dataArray = new Uint8Array(bufferLength)
                                console.log(bufferLength)
                            })
                        })
        
                        document.querySelector('#delete-btn').addEventListener('click', e => {
                            let evtTgt = e.target
                            evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode)
                        })
                    }

                    // End of if statement
                }
            })
        })
        .catch(err => {
            console.error(err)
        })
}

// mediaRecorder.onStop = e => {
    //     const clipName = prompt('Enter a name for your sound clip...')

    //     const clipContainer = document.createElement('div')
    //     const clipLabel = document.createElement('p')
    //     const audio = document.createElement('audio')
    //     const deleteButton = document.createElement('button')

    //     clipContainer.classList.add('clip')
    //     audio.setAttribute('controls', '')
    //     deleteButton.innerHTML = "Delete"
    //     clipLabel.innerHTML = clipName

    //     clipContainer.appendChild(audio)
    //     clipContainer.appendChild(clipLabel)
    //     clipContainer.appendChild(deleteButton)
    //     recordingsArea.appendChild(clipContainer)

    //     audio.src = stream

    //     const recording = {
    //         name: clipName,
    //         stream,
    //     }

    //     repo.saveRecord(recording)

    //     console.log(repo)

    //     deleteButton.addEventListener('click', e => {
    //         let evtTgt = e.target
    //         evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode)
    //     })
    // }

    // const startRecording = async () => {
    //     if (!startBtn.classList.contains('mic-on')) {
    //         startBtn.classList.add('mic-on')

    //         if (stopBtn.classList.contains('mic-on')) {
    //             stopBtn.classList.remove('mic-on')
    //         }

    //         mediaRecorder.start()
    //     } else {
    //         console.log('Something went wrong')
    //     }
    // }

    // const stopRecording = () => {
    //     if (!stopBtn.classList.contains('mic-on')) {
    //         stopBtn.classList.add('mic-on')

    //         if (startBtn.classList.contains('mic-on')) {
    //             startBtn.classList.remove('mic-on')
    //         }

    //         mediaRecorder.stop()
    //     }
    // }

    // startBtn.addEventListener('click', startRecording)
    // stopBtn.addEventListener('click', stopRecording)
    
//     import repo from './recordings/repository.mjs'
// import audioPage from './audioPage.mjs'

// const startBtn = document.querySelector('.fa-circle')
// const stopBtn = document.querySelector('.fa-stop')
// const recordingsArea = document.querySelector('#recordings-area')

// if (navigator.mediaDevices.getUserMedia) {
//     navigator.mediaDevices.getUserMedia({ video: false, audio: true })
//         .then(stream => {
//             const mediaRecorder = new MediaRecorder(stream)

//             startBtn.addEventListener('click', () => {
//                 if (!startBtn.classList.contains('mic-on')) {
//                     startBtn.classList.add('mic-on')
        
//                     if (stopBtn.classList.contains('mic-on')) {
//                         stopBtn.classList.remove('mic-on')
//                     }
        
//                     mediaRecorder.start()
//                 }
//             })

//             let chunks = []

//             mediaRecorder.ondataavailable = e => {
//                 chunks.push(e.data)
//             }

//             console.log(chunks)

//             stopBtn.addEventListener('click', () => {
//                 if (!stopBtn.classList.contains('mic-on')) {
//                     stopBtn.classList.add('mic-on')
        
//                     if (startBtn.classList.contains('mic-on')) {
//                         startBtn.classList.remove('mic-on')
//                     }
        
//                     mediaRecorder.stop()
//                 }
//             })

//             mediaRecorder.onstop = e => {
//                 const clipName = prompt('Enter a name for your sound clip...')

//                 const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" })

//                 chunks = []

//                 const audioURL = window.URL.createObjectURL(blob)

//                 recordingsArea.innerHTML = `
//                     <div id="clip-container">
//                         <p>${clipName}</p>
//                         <audio controls>
//                             <source src="${audioURL}" type="audio/ogg" />
//                         </audio>
//                         <button id="delete-btn">Delete</button>
//                         <button id="more-btn">View More</button>
//                     </div>
//                 `

//                 if (!localStorage.getItem('recordings')) {
//                     localStorage.setItem('recordings', JSON.stringify([]))
//                 }

//                 let recordings = JSON.parse(localStorage.getItem('recordings'))

//                 const hasLength = recordings.length > 0 ? true : false

//                 const recording = {
//                     id: hasLength ? recordings[recordings.length - 1].id + 1 : 1,
//                     name: clipName,
//                     stream
//                 }

//                 repo.saveRecord(recording)

//                 recordings = JSON.parse(localStorage.getItem('recordings'))

//                 const newRecording = recordings[recordings.length - 1]

//                 console.log(newRecording)

//                 document.querySelector('#more-btn').addEventListener('click', e => {
//                     let newWin = window.open('')
//                     newWin.document.write(audioPage({ template: `
//                         <div>
//                             <h1>${recording.name}</h1>
//                             <div id="clip-container">
//                                 <p>${clipName}</p>
//                                 <audio controls>
//                                     <source src="${audioURL}" type="audio/ogg" />
//                                 </audio>
//                                 <button id="delete-btn">Delete</button>
//                                 <button id="more-btn">View More</button>
//                             </div>
//                         </div>
//                     `, newRecording }))

//                     newWin.document.querySelector('#transcribe').addEventListener('click', e => {
//                         const AudioContext = newWin.AudioContext || newWin.webkitAudioContext

//                         const audioContext = new AudioContext()

//                         const analyser = audioContext.createAnalyser()

//                         const source = audioContext.createMediaStreamSource(newRecording.stream)
//                         source.connect(analyser)
//                         analyser.connect(distortion)
//                         distortion.connect(audioContext.destination)

//                         const bufferLength = analyser.frequencyBinCount
//                         const dataArray = new Uint8Array(bufferLength)
//                         console.log(bufferLength)
//                     })
//                 })

//                 document.querySelector('#delete-btn').addEventListener('click', e => {
//                     let evtTgt = e.target
//                     evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode)
//                 })
//             }
//         })
//         .catch(err => {
//             console.error(err)
//         })
// }