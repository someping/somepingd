
## Somepingd - decentralized chat protocol
My goal is to create a fully encrypted and decentralized message protocol. A message sent from one user to another must be fully anonymous and sent without the need of any parties knowing each others identity or destination. To solve this, all sent messages can be encrypted with the recepients public key and broadcasted to all users over the network. Only the user whom owns the matching private key will be able to read the message - all other nodes will help by forwarding the message to their network. To reduce the problem with spam and flood, nodes will only broadcast messages that has an id generated with proof of work.

I have some other ideas that could make this work to. But I'll add them here later.

#### v1.0.0-alpha (current - not stable)
- Host a node and listen for peers
- Broadcast messages to peers (clients)
- Connect to other nodes

#### v1.0.1 todo
- CLI: List connected peers
- CLI: Connect to new node
- Save all available nodes in a list.
- CLI: List connected nodes
- Broadcast messages to all nodes.

#### v1.0.2 todo
- Encrypt messages with recepients public key before broadcasting them.
- Decode base64, check if recepient matches with owned public key and decrypt message with private key.

#### v1.0.3 todo
- Sign each relaying nodes identifier in a blockchain to track number of relays.
- Stop broadcasting message when blockchain have X relayblocks.
- Split message into 3 chunks and send via different nodes.

### Installation
#### Install latest stable (cooming soon)
```sh
$ npm install -g someping
```

#### Install development version (master branch)
```sh
$ git clone git@github.com:kjellberg/someping.git
$ cd someping && npm install
$ npm link # link binaries
```

### Start server daemon
```sh
$ somepingd [--port 44545] [--host 127.0.0.1]
```

### API console
Open the api console by browsing to http://217.0.0.1:44555


#### Connect to a node
```sh
#! http://217.0.0.1:45555
# Command: CONNECT <host[:port]>

$ connect 51.15.78.19
03:40:10 Connected to node: 51.15.78.19:44545
```

#### Generate a public key for receiving messages
```sh
#! http://217.0.0.1:45555
# Command: GENERATEPUBKEY

$ generatepubkey
03:40:14 Generating a new public key:
03:40:14 LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZ3d0RRWUpLb1pJaHZjTkFR
RUJCUUFEU3dBd1NBSkJBS3pvOUt3WDFPbThNcjE2bWkyTnpHc0xMOTZIRFlJawpYTR0ST
BHSGcxTFJsNEI5VHNXSGxsMVFaa3dBRUg1dGZWK1AvRU5QUHhVajdpdlZnZW12aGRzQ0F
3RUFBUT09Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==
03:40:14 Give your public key the users you want to receive messages from.
```

#### Send an encrypted message to a public key
```sh
#! http://217.0.0.1:45555
# Command: SENDMSG <pubkey> message...

$ sendmsg LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZ3d0RRWUpLb1pJaHZjTkFRRUJCUUFEU3dBd1NBSkJBTmxkbnAxa285V0NmYVNMWlpWby9qRktFbnhQYUtuLwpZandLNjlBeUhScmhxYUNZRFNHMHN1VXFYbEtkdjhHYnF4cFZ1SG43T0RSTlJYZ0ZLNkNaRTU4Q0F3RUFBUT09Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ== Hello, my friend!
```


#### List peers
```sh
#! http://217.0.0.1:45555
# Command: PEERS

$ peers
03:46:25 Total number of connected peers: 1
03:46:25 [{"address":"82.243.23.231","port":null,"public":false}]
```

#### List nodes
```sh
#! http://217.0.0.1:45555
# Command: NODES

$ nodes
03:40:25 Total number of connected nodes: 1
03:40:25 [{"address":"51.15.78.19","port":44545}]
```
