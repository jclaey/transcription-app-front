const audioPage = ({ template, newRecording }) => {
    return `
    <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="./index.css">
                <title>Transcription App</title>
            </head>
            <body>
                <header>
                    <nav>
                        <a href="#">Home</a>
                    </nav>
                </header>
                <div class="mb-6 container">
                    ${template}
                </div>
                <div>
                    <button id="transcribe">Transcribe</button>
                </div>
                <footer class="page-footer">
                </footer>
            </body>
        </html>
    `
}

export default audioPage