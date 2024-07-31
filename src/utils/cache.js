const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 3600 }); // TTL padrão de 1 hora

module.exports = myCache;
