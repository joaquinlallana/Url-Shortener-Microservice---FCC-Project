const dns = require('dns');
const { promisify } = require('util');

const dnsLookup = promisify(dns.lookup);

const isValidUrl = (string) => {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (err) {
    return false;
  }
};

const validateDomain = async (hostname) => {
  try {
    await dnsLookup(hostname);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  isValidUrl,
  validateDomain
};
