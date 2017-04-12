/**
* 
* This node red node reads the data from a Luxtronik2 heat pump controller and parses the data.
* 
* Copyright 2017 Bouni
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
**/

module.exports = function(RED) {
    "use strict";
    var net = require('net');
    var parser = require(__dirname + '/parser.js');
    
    function Luxtronik2parse(data) {
        var result = {}
        // Skip the first 10 values, their meaning is unknown            
        for(var i = 10; i<data.length; i++) {
            var value = parser[parser.structure[i].convert](data[i]);
            result[i] = {
                "id":parser.structure[i].id,
                "description": parser.structure[i].description,
                "value":value.value,
                "type":value.type
            };
        }

        return result;
    }
    
    function Luxtronik2query(node, msg, callback) {

        msg.payload = [];

        var socket = net.connect({host:node.config.host, port:node.config.port});
        socket.setNoDelay(true);
        socket.setEncoding('binary');
        
        socket.on("error", function(error) {
            node.error("Luxtronik2 socket error", msg);
            msg.payload = {error:error}
            node.send(msg);
            node.status({fill:"red",shape:"dot",text:"socket error"});
        });

        socket.on("timeout", function() {
            node.warning("Luxtronik2 socket timeout", msg);
            node.status({fill:"orange",shape:"dot",text:"socket timeout"});
        });

        socket.on("connect", function(){
            // send the 3004 comamnd to the Luxtronik2
            var buffer = new Buffer(8);
            buffer.writeUInt32BE(3004,0);
            buffer.writeUInt32BE(0,4);
            socket.write(buffer.toString("binary"), "binary");
        });
        
        socket.on("data", function(response){
            // receive the answer
            var buffer = new Buffer(response.length);
            buffer.write(response, "binary");
            // parse the first 3 x 4 bytes, they are kind of a header
            var command = buffer.readUInt32BE(0);
            var state = buffer.readUInt32BE(4);
            var length = buffer.readUInt32BE(8);

            var data = [];
            // convert all bytes in pairs of 4 into 32bit integers
            for(var i=12; i<response.length; i+=4){
                var val = buffer.readUInt32BE(i);
                data.push(val);
            }
            // parse the data
            msg.payload = Luxtronik2parse(data);
        
            node.status({fill:"green",shape:"dot",text:"OK"});

            callback();

        });
        
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
