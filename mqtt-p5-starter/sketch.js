let buttonDiv, header

function setup() {
  buttonDiv = select('#button')
  header = select('#header')

  client = mqtt.connect('wss://mqtt.nextservices.dk');
  client.subscribe('programmering');

  client.on('message', function (topic, message) {
    let data = JSON.parse(message)

    //set header 
    header.html(data.name)

    //handle button
    if(data.button){
      buttonDiv.addClass('on')
      buttonDiv.html('on')
    }else{
      buttonDiv.removeClass('on')
      buttonDiv.html('off')
    }
  })
}