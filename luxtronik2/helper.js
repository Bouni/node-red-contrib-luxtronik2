
exports.int2ip = function(i) {
    var ip = ""
    ip += (i >> 24) & 0xFF + ".";
    ip += (i >> 16) & 0xFF + ".";
    ip += (i >> 8) & 0xFF + ".";
    ip += i & 0xFF;
    return ip;
}