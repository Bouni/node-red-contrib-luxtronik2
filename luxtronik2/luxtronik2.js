
module.exports = function(RED) {
    "use strict";
    var net = require('net');
    var parser = require(__dirname + '/parser.js');
    
    function Luxtronik2parse(data) {
        result = []
        // skipping the first 10 datapoint because its unclear what they mean
        for(var i = 10; i<data.length; i++) {
            result.push({
                "index":i,
                "id":parser.structure[i].id,
                "description":parser.structure[i].description,
                "value":iparser[parser.structure[i].convert](data[i])
            });
        }

        return result;
    }
    
    function Luxtronik2query(node, msg, callback) {

        var socket = net.connect({host:node.config.host, port:node.config.port});
        
        socket.on("error", function(error) {
            node.error("Luxtronik2 socket error", msg);
            node.status({fill:"red",shape:"dot",text:"socket error"});
        });

        socket.on("timeout", function() {
            node.warning("Luxtronik2 socket timeout", msg);
            node.status({fill:"orange",shape:"dot",text:"socket timeout"});
        });

        socket.on("connect", function(){
            var buffer = new Buffer(8);
            buffer.writeUInt32BE(3004,0);
            buffer.writeUInt32BE(0,4);
            socket.write(buffer);
        });
        
        socket.on("data", function(response){
            var buffer = new Buffer(response.length);
            
            var command = buffer.readUInt32BE(0);
            var state = buffer.readUInt32BE(4);
            var length = buffer.readUInt32BE(8);
            
            var data = [];
            for(var i=12; i<length*4; i += 4){
                data.push(buffer.readUInt32BE(i));
            }

            msg.payload = Luxtronik2parse(data);
            
        });
        
        node.status({fill:"green",shape:"dot",text:"OK"});

        callback();
    }
    
    function Luxtronik2Node(config) {
        RED.nodes.createNode(this,config);
        this.config = config;
        this.status({fill:"green",shape:"dot",text:"OK"});
        var node = this;
        this.on('input', function(msg) {
            Luxtronik2query(node, msg, function() {
                node.send(msg);
            });
        });
    }

    RED.nodes.registerType("luxtronik2",Luxtronik2Node);
}
