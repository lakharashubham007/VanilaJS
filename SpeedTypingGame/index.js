const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')


//spelling checker and work real typing test app code
//chechk all char 
quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
  
    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
      const character = arrayValue[index]
      if (character == null) {
        characterSpan.classList.remove('correct')
        characterSpan.classList.remove('incorrect')
        correct = false
      } else if (character === characterSpan.innerText) {
        characterSpan.classList.add('correct')
        characterSpan.classList.remove('incorrect')
      } else {
        characterSpan.classList.remove('correct')
        characterSpan.classList.add('incorrect')
        correct = false
      }
    })
  
    if (correct) renderNewQuote()
  })

 //fetch quote promise method
function getRandomQuote(){
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
    //fetch quote on window
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    //split all the character in single character given quoteor sentence.
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText= character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null  
    startTimer()
}

//Timer code

let startTime
function startTimer(){
  timerElement.innerText = 0.
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000);
}

function getTimerTime(){

return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()