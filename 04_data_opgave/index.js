//dataDiv er den div i HTML siden som vi skal indsætte data i. Den har id="dataDiv"
let dataDiv

function setup(){
    //vælg html div'en
    dataDiv = select('#dataDiv')

    //Hent så data fra det API du skal bruge
    fetch('http://api.weatherstack.com/current?access_key=9193392d49f4b8aab7847eb4780fc8bf&query=Copenhagen')

    //så venter vi på kaldets promise, der kommer tilbage med .then()
    .then(
        function(response){
            //lad os tjekke om serverens response er okay
            console.log(response)
            //og hvis det er det, beder vi serveren om at give os json resultatet 
            return response.json()
        }
    )
    //og når DET så komer tilbage 
    .then(
        function (data){
            //vi har nu en random drink
            console.log(data)
            //p5 funktion der laver en ny div
            let newDiv = createElement('div')
            //så laver vi en overskrift
            let newHeader = createElement('h1', data.location.name + ' ,' + data.location.country)
            //så laver vi et p-element
            let newP = createElement('p', data.location.localtime)
            //og et billede
            let newImgDiv = createElement('div')
            newImgDiv.style('background-image', 'url(' + data.current.weather_icons[0] + ')')
            newImgDiv.addClass('weatherThumb')

            //til sidst lægger vi de nye elementer ind i den div vi oprettede
            newDiv.child(newHeader)
            newDiv.child(newP)
            newDiv.child(newImgDiv)
            //tag fat i html elementet med id = localData
            //tøm det
            dataDiv.html('')
            //og sæt data ind i det 
            dataDiv.child(newDiv)
        }
    )
}
