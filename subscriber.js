function startConnect() {
    clientID = "clientID-" + parseInt(Math.random() * 100);

    host = document.getElementById("host").value;
    port = document.getElementById("port").value;

    document.getElementById("messages").innerHTML += '<span>Connecting to: ' + host + ' on port: ' + port + '</span><br/>';
    document.getElementById("messages").innerHTML += '<span>Using the following client value: ' + clientID + '</span><br/>';

    client = new Paho.MQTT.Client(host, Number(port), clientID);

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({ 
        onSuccess: onConnect,
    });
}

function onConnect() {
    topic = document.getElementById("topic").value;

    document.getElementById("messages").innerHTML += '<span>Se inscrevendo em: ' + topic + '</span><br/>';

    client.subscribe(topic);
}

function onConnectionLost(responseObject) {
    document.getElementById("messages").innerHTML += '<span>ERROR: Conexão perdida</span><br/>';
    if (responseObject.errorCode !== 0) {
        document.getElementById("messages").innerHTML += '<span>ERROR: ' + + responseObject.errorMessage + '</span><br/>';
    }
}

function onMessageArrived(message) {
    console.log("onMessageArrived: " + message.payloadString);
    document.getElementById("messages").innerHTML += '<span>Mensagem recebida: ' + message.payloadString + '</span><br/>';

    // this.response(message);
}

// function response(message) {
//     client.subscribe("testtopic/1");
//     message = new Paho.MQTT.Message(parseInt(message.payloadString) + 2);
//     message.destinationName = "testtopic/1";
//     client.send(message);
// }

function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
}