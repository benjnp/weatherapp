console.log('Client side JS file')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent = ''
    message2.textContent = ''
    const location = search.value
    message1.textContent = 'Going to ' + location + '...'
    fetch('/weather?location=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error)
                message1.textContent = data.error
            else {
                message1.textContent = data.Forecast
                message2.textContent = data.Location

            }
        })
    })
    //console.log("Submitted " + location)
})