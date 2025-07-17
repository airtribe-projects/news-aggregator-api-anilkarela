const config = require('../config/config');

class CacheService {
    constructor() {
        this.cache = new Map();
    }

    generateKey(category, preferences = null) {
        if (preferences) {
            return `news:preferences:${preferences.sort().join(',')}`;
        }
        return `news:category:${category}`;
    }

    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            return null;
        }

        console.log(`Cache HIT for key: ${key}`);
        return item.data;
    }

    set(key, data, ttl = config.news.cacheDuration) {
        console.log(`Cache SET for key: ${key}, TTL: ${ttl}ms`);
        this.cache.set(key, {
            data,
            expiry: Date.now() + ttl
        });
    }

    clear() {
        this.cache.clear();
        console.log('Cache cleared');
    }
}

module.exports = new CacheService();