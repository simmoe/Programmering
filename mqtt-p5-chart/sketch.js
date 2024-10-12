let buttonDiv

let chartObject = [{
  x: ['X pos', 'Y pos'],
  y: [0, 0],
  type: 'bar'
}]

let layout = {
  yaxis: { range: [-180, 180] } // Fast range for Y-aksen
}

function setup() {
  buttonDiv = select('#button')

  Plotly.newPlot('chart', chartObject, layout);

  client = mqtt.connect('wss://mqtt.nextservices.dk');
  client.subscribe('programmering');

  client.on('message', (topic, message) => {
    let data = JSON.parse(message)

    //handle button
    if(data.button){
      buttonDiv.addClass('on')
      buttonDiv.html('on')
    }else{
      buttonDiv.removeClass('on')
      buttonDiv.html('off')
    }
    //redraw diagram
    Plotly.restyle('chart', 'y', [[data.X, data.Y]]);
  })
}