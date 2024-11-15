class M5Handler {
  constructor(mqttBroker, topic, div) {
    this.client = mqtt.connect(mqttBroker);
    this.topic = topic;
    this.div = div;  // Modtager en eksisterende div, der skal opdateres

    // Subscribes to the topic
    this.client.subscribe(this.topic);

    // Event listener for receiving messages
    this.client.on('message', (topic, message) => {
      this.handleMessage(message);
    });
  }

  // Håndterer modtagelsen af beskeden
  handleMessage(message) {
    let data = JSON.parse(message);

    // Opdaterer den modtagne div med navn og knapstatus
    this.div.html(`<h2>${data.name}</h2><div class="button-status">${data.button ? 'on' : 'off'}</div>`);

  }
}

function setup() {
  noCanvas();

  // Vi antager, at der allerede findes en div, som vi har lavet select på
  let div = select('#m5');

  // Initialiserer M5Handler-klassen og forbinder til MQTT-topic
  let m5Handler = new M5Handler('wss://mqtt.nextservices.dk', 'programmering', div);
}
