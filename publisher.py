import time
import paho.mqtt.client as paho
broker="broker.mqttdashboard.com"

def on_message(client, userdata, message):
    print(client)
    time.sleep(1)
    print("mensagem recebida =",str(message.payload.decode("utf-8")))

client= paho.Client("client-003")
client.on_message=on_message
print("conectando ao broker..... ",broker)
client.connect(broker)
client.loop_start()
print("se inscrevendo no topico....")
client.subscribe("house/bulb1")
time.sleep(2)
print("publicando mensagem..... ")
client.publish("house/bulb1","Mensagem para ser concatenada com JS no fim. ")
time.sleep(50)
client.disconnect()
client.loop_stop()