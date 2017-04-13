node-red-contrib-luxtronik2
========================

[Node-RED][1] contribution package for [Luxtronik2][2] heat pump controllers

**Attention**: unfortunately I dicovered just after I buzilt and published this repo that there is already a node called *node-red-contrib-luxtronik2*. You can find it here: [coolchip/node-red-contrib-luxtronik2](https://github.com/coolchip/node-red-contrib-luxtronik2)

Anyway, as far as I can tell my node works fine and I'll stickto it.

# Install

TBD

# How to use

1. Place the node within your flow
2. Configure the IP of your Luxtronik and the port (8888 for SW versions < 1.76, 8889 for SW versions >= 1.76)
3. Trigger the node via the input, it doesn't matter what type the input is
4. The node querys the heat pump for the data, parses the response and outputs the parsed result

# Data format

The result is an object of objects:

```
{
    10: {
        id: "ID_WEB_Temperatur_TVL"
        description: "Vorlauftemperatur Heizkreis"
        value: 42.3
        type: "celcius"
        }
    11: {
        ...
        }
    ...
}
```

- The `key` is the index as received from the heatpump
- `id` is the identifier as used by [AIT][3] within their java code
- `description` is mostly the description text out of the java code
- `value` is the parsed and converted value
- `type` describes what kind of data the datapoint is 

# Authors

The module was developed by Bouni inspired by a post seen on the [loxforum][4].
The detailed information comes mostly from reverse engeneering the java applet sent by the heat pump when one loads the web interface.


[1]:https://nodered.org
[2]:http://www.alpha-innotec.ch/fileadmin/content/downloads/Lux_Fachhandwerker_de.pdf
[3]:http://www.alpha-innotec.ch
[4]:http://loxforum.com
