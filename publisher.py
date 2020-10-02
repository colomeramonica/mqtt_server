import time
import paho.mqtt.client as paho
broker="broker.mqttdashboard.com"

def on_message(client, userdata, message):
    print(client)
    time.sleep(1)
    print("mensagem recebida =",str(message.payload.decode("utf-8")))

client= paho.Client("client-001")
client.on_message=on_message
print("conectando ao broker..... ",broker)
client.connect(broker)
client.loop_start()
# print("se inscrevendo no tópico....")
# client.subscribe("testtopic/1")
# time.sleep(2)
print("publicando mensagem..... ")
client.publish("house/bulb1","2")
time.sleep(4)
client.disconnect()
client.loop_stop()
