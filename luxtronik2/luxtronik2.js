
module.exports = function(RED) {
    "use strict";
    var helper = require(__dirname + 'helper.js');
    var parser = require(__dirname + 'parser.js');

    
    function Luxtronik2Node(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            msg.payload = {value: "Luxtronik2 test"};
            node.send(msg);
        });
    }
    RED.nodes.registerType("luxtronik2",Luxtronik2Node);
}
