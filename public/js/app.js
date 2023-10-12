console.log('Client side javascript file is loaded')




const weatherForm = document.querySelector('form')
const search = document.querySelectorAll('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


console.log(search[0])
console.log(search[1])
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const city = search[0].value
    const state = search[1].value
    fetch('http://localhost:3000/weather?city='+ encodeURIComponent(city) + '&state=' + encodeURIComponent(state)).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = "Error: " + data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }

    })
})
})