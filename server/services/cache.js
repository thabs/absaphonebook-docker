const mongoose = require("mongoose");
const redis = require("redis");
const { promisify } = require("util");

// Redis Client Setup
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

//const redisClient = redis.createClient();

redisClient.hget = promisify(redisClient.hget);
redisClient.get = promisify(redisClient.get);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  const { key, searchKey } = options;

  if (key) {
    this.useCache = true;
    this.hashKey = key;
    return this;
  }

  if (searchKey) {
    this.useCache = true;
    this.hashKey = searchKey;
    this.searchKey = true;
  }

  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  // See if we have a value for 'key' in redis
  const cacheValue = await redisClient.hget(this.hashKey, key);

  // If we do, return that
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    return doc;
  }

  // Otherwise, issue the query and store the result in redis
  const result = await exec.apply(this, arguments);
  redisClient.hset(this.hashKey, key, JSON.stringify(result));

  //! This is for scenarios where object is searched by field
  //! Example, searching client by 'email'.
  //! The field email + value will be saved. When we update by _id, we will clear the hashkey of 'idValue'
  //! 'getHash' will be used to get that Value
  if (this.searchKey) {
    if (result) {
      const searchHash = `search:${this.mongooseCollection.name}:${result._id}`;
      redisClient.set(searchHash, this.hashKey);
    }
  }

  return result;
};

module.exports.clearHash = async (hashKey) => {
  const searchKey = `search:${hashKey}`;
  redisClient
    .get(searchKey)
    .then((key) => {
      console.log(key);
      redisClient.del(key);
    })
    .catch((e) => {
      console.log(e.message);
    });
  redisClient.del(searchKey);
  redisClient.del(hashKey);
};
