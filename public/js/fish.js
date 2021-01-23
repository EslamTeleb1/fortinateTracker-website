(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    // shim for using process in browser
    var process = module.exports = {};
    
    // cached from whatever global is present so that test runners that stub it
    // don't break things.  But we need to wrap it in a try catch in case it is
    // wrapped in strict mode code which doesn't define any globals.  It's inside a
    // function because try/catches deoptimize in certain engines.
    
    var cachedSetTimeout;
    var cachedClearTimeout;
    
    function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
    }
    function defaultClearTimeout () {
        throw new Error('clearTimeout has not been defined');
    }
    (function () {
        try {
            if (typeof setTimeout === 'function') {
                cachedSetTimeout = setTimeout;
            } else {
                cachedSetTimeout = defaultSetTimout;
            }
        } catch (e) {
            cachedSetTimeout = defaultSetTimout;
        }
        try {
            if (typeof clearTimeout === 'function') {
                cachedClearTimeout = clearTimeout;
            } else {
                cachedClearTimeout = defaultClearTimeout;
            }
        } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
        }
    } ())
    function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
            //normal enviroments in sane situations
            return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedSetTimeout(fun, 0);
        } catch(e){
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                return cachedSetTimeout.call(null, fun, 0);
            } catch(e){
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                return cachedSetTimeout.call(this, fun, 0);
            }
        }
    
    
    }
    function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
            //normal enviroments in sane situations
            return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedClearTimeout(marker);
        } catch (e){
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                return cachedClearTimeout.call(null, marker);
            } catch (e){
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                return cachedClearTimeout.call(this, marker);
            }
        }
    
    
    
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    
    function cleanUpNextTick() {
        if (!draining || !currentQueue) {
            return;
        }
        draining = false;
        if (currentQueue.length) {
            queue = currentQueue.concat(queue);
        } else {
            queueIndex = -1;
        }
        if (queue.length) {
            drainQueue();
        }
    }
    
    function drainQueue() {
        if (draining) {
            return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
    
        var len = queue.length;
        while(len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
                if (currentQueue) {
                    currentQueue[queueIndex].run();
                }
            }
            queueIndex = -1;
            len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
    }
    
    process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
            }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
        }
    };
    
    // v8 likes predictible objects
    function Item(fun, array) {
        this.fun = fun;
        this.array = array;
    }
    Item.prototype.run = function () {
        this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues
    process.versions = {};
    
    function noop() {}
    
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;
    
    process.listeners = function (name) { return [] }
    
    process.binding = function (name) {
        throw new Error('process.binding is not supported');
    };
    
    process.cwd = function () { return '/' };
    process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
    };
    process.umask = function() { return 0; };
    
    },{}],2:[function(require,module,exports){
    /**
     * fortnite-api-io
     * Module to make API calls to fortniteapi.io
     *
     * @author Ben Hawley
     * @license MIT
     */
    
    "use strict";
    
    /**
     * index.js
     * Export the API Class
     */
    const FortniteAPI = require("./lib/fortnite-api");
    module.exports = FortniteAPI;
    
    },{"./lib/fortnite-api":4}],3:[function(require,module,exports){
    /**
     * fortnite-api-io
     * Module to make API calls to fortniteapi.io
     *
     * @author Ben Hawley
     * @author Théo Bontemps (maintainer)
     * @license MIT
     */
    
    "use strict";
    
    /**
     * endpoints.js
     * Exports and builds fortniteapi.io API endpoints
     */
    
    const endpoint = "https://fortniteapi.io/v1";
    module.exports = {
        listChallenges: (season, lang) => `${endpoint}/challenges?season=${season}&lang=${lang}`,
        listItems: lang => `${endpoint}/items/list?lang=${lang}`,
        listUpcomingItems: lang => `${endpoint}/items/upcoming?lang=${lang}`,
        getItemDetails: (id, lang) => `${endpoint}/items/get?id=${id}&lang=${lang}`,
        getDailyShop: lang => `${endpoint}/shop?lang=${lang}`,
        getShopVotingOptions: _ => `${endpoint}/shop/voting`,
        searchAccountId: (username, platform, strict = true) => {
            let uri = `${endpoint}/lookup?username=${username}`;
            if (platform) {
                uri += `&platform=${platform}`;
            }
            if (strict === false) {
                uri += `&strict=false`;
            }
            return uri;
        },
        getGlobalPlayerStats: account => `${endpoint}/stats?account=${account}`,
        getPlayerRecentMatches: account => `${endpoint}/matches?account=${account}`,
        getNews: (mode, lang) => `${endpoint}/news?lang=${lang}&type=${mode}`,
        getBattlePassRewards: (season, lang) => `${endpoint}/battlepass?lang=${lang}&season=${season}`,
        getAchievements: lang => `${endpoint}/achievements?lang=${lang}`,
        getTournaments: lang => `${endpoint}/events/list?lang=${lang}`,
        getTournamentSessionDetails: (windowId, page) => `${endpoint}/events/window?windowId=${windowId}&page=${page}`,
        listWeapons: _ => `${endpoint}/weapons/list`,
        listPreviousMaps: _ => `${endpoint}/maps/list`,
        listPreviousSeasons: _ => `${endpoint}/seasons/list`,
        listCurrentPOI: lang => `${endpoint}/game/poi?lang=${lang}`,
        getStatus: _ => `${endpoint}/status`,
        listCurrentGameModes: lang => `${endpoint}/game/modes?lang=${lang}`,
        listUsersById: (ids = []) => `${endpoint}/lookupUsername?id=${ids.join()}`,
        getBundles: lang => `${endpoint}/bundles?lang=${lang}`,
        listLoot: lang => `${endpoint}/loot/list?lang=${lang}`,
        getLootDetails: (id, lang) => `${endpoint}/loot/get?id=${id}&lang=${lang}`,
        listSets: lang => `${endpoint}/items/sets?lang=${lang}`,
        getReplayDownloadLink: id => `${endpoint}/events/replay?session=${id}`,
        getWeaponDetails: (id, lang) => `${endpoint}/loot/get?id=${id}&lang=${lang}`,
        listWeaponSpawnChances: mode => `${endpoint}/loot/chances?mode=${mode}`,
        getGameModeExtendedData: mode => `${endpoint}/game/modes/data?playlist=${mode}`,
        listFeaturedCreativeIslands: _ => `${endpoint}/creative/featured`,
        searchIsland: code => `${endpoint}/creative/island?code=${code}`,
        listFish: lang => `${endpoint}/loot/fish?lang=${lang}`,
        getPlayerFishStats: id => `${endpoint}/stats/fish?accountId=${id}`,
        getMapsItems: _ => `${endpoint}/maps/items/list`
    };
    
    },{}],4:[function(require,module,exports){
    (function (process){(function (){
    /**
     * fortnite-api-io
     * Module to make API calls to fortniteapi.io
     *
     * @author Ben Hawley
     * @author Théo Bontemps (maintainer)
     * @license MIT
     */
    
    "use strict";
    
    /**
     * fortnite-api.js
     * Class to make requests to API
     */
    
    // External Modules
    const fetch = require("node-fetch");
    
    // Internal Libaries
    const endpoints = require("./endpoints");
    const { supportsLanguage } = require("./util");
    
    /**
     * Fortnite API Class
     */
    class FortniteAPI {
        /**
         * constructor()
         *
         * @param {String} credentials
         * @param {Object} [config]
         * @param {String} [config.defaultLanguage]
         */
        constructor(credentials, config = {}) {
            if (!credentials) {
                throw new Error("Invalid Credentials Supplied.");
            }
    
            this.defaultLang = config.defaultLanguage || "en";
            if (!supportsLanguage(this.defaultLang)) {
                throw new Error(
                    `Supplied default language ${this.defaultLang} is not supported`
                );
            }
    
            this.credentials = credentials;
        }
    
        /**
         * request()
         * Use node-fetch to query API
         *
         * @param {String} uri
         * @param {Object} [options]
         * @param {String} [options.method]
         * @returns {Promise}
         */
        async request(uri, options = { method: "GET" }) {
            // In test mode, return the URI we are about to fetch
            if (process.env.testMode) {
                return uri;
            }
            const response = await fetch(uri, {
                method: options.method,
                headers: {
                    Authorization: `${this.credentials}`,
                },
            });
    
            const data = await response.json();
            return data;
        }
    
        /**
         * listItems()
         * List all cosmetic items: skins, backpacks, emotes, pickaxes, sprays, etc.
         *
         * @param {Object} [options]
         * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr, zh-CN, zh-Hant
         * @returns {Promise}
         */
        listItems(options = {}) {
            const lang = options.lang || this.defaultLang;
            const uri = endpoints.listItems(lang);
            return this.request(uri);
        }
    
        /**
         * listChallenges()
         * List all challenges as well as rewards (xp, stars, cosmetics).
         * Weekly challenges/missions are available for each season under .weekly
         * Limited time missions are available under .limited_time
         *
         * @param {String} [season=current]
         * @param {Object} [options]
         * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr, zh-CN, zh-Hant
         * @returns {Promise}
         */
        listChallenges(season = "current", options = {}) {
            const lang = options.lang || this.defaultLang;
            const uri = endpoints.listChallenges(season, lang);
            return this.request(uri);
        }
    
        /**
         * listUpcomingItems()
         * List upcoming cosmetic items: skins, backpacks, emotes, pickaxes.
         *
         * @param {Object} [options]
         * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr, zh-CN, zh-Hant
         * @returns {Promise}
         */
        listUpcomingItems(options = {}) {
            const lang = options.lang || this.defaultLang;
            const uri = endpoints.listUpcomingItems(lang);
            return this.request(uri);
        }
    
        /**
         * getItemDetails()
         * Get all available details about an item.
         * The ID can be found from the full list of items.
         *
         * @param {String} itemId
         * @param {Object} [options]
         * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr, zh-CN, zh-Hant
         * @returns {Promise}
         */
        getItemDetails(itemId, options = {}) {
            const lang = options.lang || this.defaultLang;
            const uri = endpoints.getItemDetails(itemId, lang);
            return this.request(uri);
        }
    
        /**
         * getDailyShop()
         * List all items currently in the shop
         *
         * @param {Object} [options]
         * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr, zh-CN, zh-Hant
         * @returns {Promise}
         */
        getDailyShop(options = {}) {
            const lang = options.lang || this.defaultLang;
            const uri = endpoints.getDailyShop(lang);
            return this.request(uri);
        }
    
        /**
         * getShopVotingOptions()
         * Get options to vote for the next community shop item
         * @returns {Promise}
         */
        getShopVotingOptions() {
            const uri = endpoints.getShopVotingOptions();
            return this.request(uri);
        }
    
        /**
         * searchAccountId()
         * Search an account ID using a player name
         *
         * @deprecated since v1.3.0 please use getUserById
         * @param {String} username
         * @param {Object} [options]
         * @param {Boolean} [options.strict=true] When false will return other results for similar names
         * @param {String} [options.platform=""] Search for accounts not linked to an epic account: xbl or psn
         * @returns {Promise}
         */
        searchAccountId(username, options = { strict: true, platform: "" }) {
            const uri = endpoints.searchAccountId(
                username,
                options.platform,
                options.strict
            );
            return this.request(uri);
        }
    
        /**
         * getGlobalPlayerStats()
         * Get player stats, with a breakdown per platform used (mouse & keyboard, gamepad, touch)
         *
         * @param {String} accountId
         * @returns {Promise}
         */
        getGlobalPlayerStats(accountId) {
            const uri = endpoints.getGlobalPlayerStats(accountId);
            return this.request(uri);
        }
    
        /**
         * getPlayerRecentMatches()
         * List the last 25 games for a player. Some games can be grouped.
         * If it's the first time you search this user, the matches list will be empty.
         *
         * @param {String} accountId
         * @returns {Promise}
         */
        getPlayerRecentMatches(accountId) {
            const uri = endpoints.getPlayerRecentMatches(accountId);
            return this.request(uri);
        }
    
        /**
         * getNews()
         * Lists the current news in Fortnite Battle Royale or Save The World
         *
         * @param {String} [mode=br] game mode "br" or "stw"
         * @param {Object} [options]
         * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
         * @returns {Promise}
         */
        getNews(mode = "br", options = {}) {
            const lang = options.lang || this.defaultLang;
            const uri = endpoints.getNews(mode, lang);
            return this.request(uri);
        }
    
        /**
         * getBattlepassRewards()
         * Get the list of rewards given in the Battle Pass for each season
         *
         * @param {String} [season=current]
         * @param {Object} [options]
         * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
         * @returns {Promise}
         */
        getBattlepassRewards(season = "current", options = {}) {
            const lang = options.lang || this.defaultLang;
            const uri = endpoints.getBattlePassRewards(season, lang);
            return this.request(uri);
        }
    
        /**
         * getAchievements()
         * Get the list of achievements
         *
         * @param {Object} [options]
         * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
         * @returns {Promise}
         */   
        getAchievements(options = {}) {
            const lang = options.lang || this.defaultLang;
            const uri = endpoints.getAchievements(lang);
            return this.request(uri);
        }
    
        /**
         * getTournaments
         * Get the list of tournaments
         *
         * @param {Object} [options]
         * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
         * @returns {Promise}
         */
        getTournaments(options = {}) {
            const lang = options.lang || this.defaultLang;
            const uri = endpoints.getTournaments(lang);
            return this.request(uri);
        }
    
        /**
         * getTournamentSessionDetails()
         * Get a tournament session details: rules, payout, results
         *
         * @param {String} windowId
         * @param {Integer} [page=0]
         * @returns {Promise}
         */
        getTournamentSessionDetails(windowId, page = 0) {
            const uri = endpoints.getTournamentSessionDetails(windowId, page);
            return this.request(uri);
        }
    
        /**
         * listPreviousMaps()
         * Get the list of links to the different maps
         *
         * @returns {Promise}
         */
        listPreviousMaps() {
            const uri = endpoints.listPreviousMaps();
            return this.request(uri);
        }
    
        /**
         * listPreviousSeasons()
         * List all the season dates and patch versions associated.
         * 
         * @returns {Promise}
         */
        listPreviousSeasons() {
            const uri = endpoints.listPreviousSeasons();
            return this.request(uri);
        }
    
        /**
         * listCurrentPOI()
         * Get the current games points of interest
         * 
         * @param {Object} [options]
         * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
         * @returns {Promise}
         */
        listCurrentPOI(options = {}) {
            const lang = options.lang || this.defaultLang;
            const uri = endpoints.listCurrentPOI(lang);
            return this.request(uri);
        }
    
        /**
         * getStatus()
         * Get the Fortnite server status
         *
         * @returns {Promise}
         */
        getStatus() {
            const uri = endpoints.getStatus();
            return this.request(uri);
        }
    
        /**
         * listCurrentGameModes()
         * List the current game modes
         * 
         * @param {Object} [options]
         * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
         * @returns {Promise}
         */
        listCurrentGameModes(options = {}) {
            const lang = options.lang || this.defaultLang;
            const uri = endpoints.listCurrentGameModes(lang);
            return this.request(uri);
        }
    
        /**
         * getAccountIdByUsername()
         * Get an account ID using a player name
         *
         * @param {String} username
         * @param {Object} [options]
         * @param {Boolean} [options.strict=true] When false will return other results for similar names
         * @param {String} [options.platform=""] Search for accounts not linked to an epic account: xbl or psn
         * @returns {Promise}
         */
        getAccountIdByUsername(username, options = { strict: true, platform: "" }) {
            const uri = endpoints.searchAccountId(
                username,
                options.platform,
                options.strict
            );
            return this.request(uri);
        }
    
        /**
         * getUserById()
         * Get a user account name by their Fortnite ID
         *
         * @param {String} id
         * @returns {Promise}
         */
        getUserById(id) {
            const uri = endpoints.listUsersById([id]);
            return this.request(uri);
        }
    
        /**
         * listUsersById()
         * List user accounts by a list of ids
         *
         * @param {Array<String>} [ids=[]]
         * @returns {Promise}
         */
        listUsersById(ids = []) {
            const uri = endpoints.listUsersById(ids);
            return this.request(uri);
        }
    
        /**
         * getBundles()
         * List recent bundles
         * 
         * @premium
         * @param {Object} [options]
         * @param {String} [options.lang] en, de, es, fr, it, ja
         * @returns {Promise}
         */
        getBundles(options = {}) {
            const lang = options.lang || this.defaultLang;
            const uri = endpoints.getBundles(lang);
            return this.request(uri);
        }
    
        /**
         * listLoot()
         * List all loot/weapons in the game with their basic stats
         *
         * @param {Object} [options]
         * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
         * @returns {Promise}
         */
        listLoot(options = {}) {
            const lang = options.lang || this.defaultLang;
            const uri = endpoints.listLoot(lang);
            return this.request(uri);
        }
    
        /**
         * getLootDetails()
         * Get all stats for a specific loot/weapon item
         * 
         * @premium
         * @param {String} id of loot item
         * @param {Object} [options]
         * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
         * @returns {Promise}
         */
        getLootDetails(id, options = {}) {
            const lang = options.lang || this.defaultLang;
            const uri = endpoints.getLootDetails(id, lang);
            return this.request(uri);
        }
    
        /**
         * listSets()
         * List all the sets used by cosmetics.
         *
         * @param {Object} [options]
         * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
         * @returns {Promise}
         */
        listSets(options = {}) {
            const lang = options.lang || this.defaultLang;
            const uri = endpoints.listSets(lang);
            return this.request(uri);
        }
    
        /**
         * getReplayDownloadLink()
         * Get creative map informations
         *
         * @premium
         * @param {String} id of session
         * @returns {Promise}
         */
        getReplayDownloadLink(id) {
            const uri = endpoints.getReplayDownloadLink(id);
            return this.request(uri);
        }
    
        /**
         * getWeaponDetails()
         * Get all stats for a specific loot/weapon item
         * 
         * @premium
         * @param {String} id of weapon
         * @param {Object} [options]
         * @param {String} [options.lang] en, ar, de, es, es-419, fr, it, ja, ko, pl, pt-BR, ru, tr
         * @returns {Promise}
         */
        getWeaponDetails(id, options = {}) {
            const lang = options.lang || this.defaultLang;
            const uri = endpoints.getWeaponDetails(id, lang);
            return this.request(uri);
        }
    
        /**
         * listWeaponsSpawnChance()
         * List the spawn chances for each type for a given game mode.
         *
         * @premium
         * @param {String} mode
         * @returns {Promise}
         */
        listWeaponSpawnChances(mode) {
            const uri = endpoints.listWeaponSpawnChances(mode);
            return this.request(uri);
        }
    
        /**
         * getGameModeExtendedData()
         * A lot of different values, ranging from spawn % for rare chests, to number of llamas per game.
         *
         * @premium
         * @param {String} mode
         * @returns {Promise}
         */
        getGameModeExtendedData(mode) {
            const uri = endpoints.getGameModeExtendedData(mode);
            return this.request(uri);
        }
    
        /**
         * listFeaturedCreativeIslands()
         * List the current featured islands in creative mode
         *
         * @returns {Promise}
         */
        listFeaturedCreativeIslands() {
            const uri = endpoints.listFeaturedCreativeIslands();
            return this.request(uri);
        }
    
        /**
         * searchIsland()
         * Get all details related to a creative island
         *
         * @param {String} code of map
         * @returns {Promise}
         */
        searchIsland(code) {
            const uri = endpoints.searchIsland(code);
            return this.request(uri);
        }
    
        /**
         * listFish()
         * Get the list of fish (name, description, image) as well as their minimum and maximum length
         *
         * @param {Object} [options]
         * @param {String} [options.lang] unknown supported languages
         * @returns {Promise}
         */
        listFish(options = {}) {
            const lang = options.lang || this.defaultLang;
            const uri = endpoints.listFish(lang);
            return this.request(uri);
        }
    
        /**
         * getPlayerFishStats()
         * Get the stats for a specific player: each fish caught is returned with the best length for that player
         *
         * @param {String} accountId
         * @returns {Promise}
         */
        getPlayerFishStats(accountId) {
            const uri = endpoints.getPlayerFishStats(accountId);
            return this.request(uri);
        }
        
        /**
         * getMapsItems()
         * Get items positions [NOT STABLE]
         *
         * @returns {Promise}
         */
        getMapsItems() {
            const uri = endpoints.getMapsItems();
            return this.request(uri);
        }
    }
    
    module.exports = FortniteAPI;
    
    }).call(this)}).call(this,require('_process'))
    },{"./endpoints":3,"./util":5,"_process":1,"node-fetch":6}],5:[function(require,module,exports){
    /**
     * fortnite-api-io
     * Module to make API calls to fortniteapi.io
     *
     * @author Ben Hawley
     * @license MIT
     */
    
    "use strict";
    
    /**
     * util.js
     * General utility functions
     */
    
    /**
     * supportsLanguage()
     * Checks if supplied language is supported by the API
     *
     * @param {String} lang
     * @returns {Boolean}
     */
    function supportsLanguage(lang) {
        const supportedLanguages = [
            "en",
            "ar",
            "de",
            "es",
            "es-419",
            "fr",
            "it",
            "ja",
            "ko",
            "pl",
            "pt-BR",
            "ru",
            "tr",
            "zh-CN",
            "zh-Hant"
        ];
        return supportedLanguages.includes(lang);
    }
    
    module.exports = {
        supportsLanguage
    };
    
    },{}],6:[function(require,module,exports){
    (function (global){(function (){
    "use strict";
    
    // ref: https://github.com/tc39/proposal-global
    var getGlobal = function () {
        // the only reliable means to get the global object is
        // `Function('return this')()`
        // However, this causes CSP violations in Chrome apps.
        if (typeof self !== 'undefined') { return self; }
        if (typeof window !== 'undefined') { return window; }
        if (typeof global !== 'undefined') { return global; }
        throw new Error('unable to locate global object');
    }
    
    var global = getGlobal();
    
    module.exports = exports = global.fetch;
    
    // Needed for TypeScript and Webpack.
    if (global.fetch) {
        exports.default = global.fetch.bind(global);
    }
    
    exports.Headers = global.Headers;
    exports.Request = global.Request;
    exports.Response = global.Response;
    }).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{}],7:[function(require,module,exports){
    const FortniteAPI = require("fortnite-api-io");
    
    // Instantiate with API Credentials
    
    const API_Key='361618b4-f348534e-6616046c-7e87897f'
    
    const fortniteAPI = new FortniteAPI(API_Key);
    
    const fish=async()=>{
        // Get getDailyShop
        const fish = await fortniteAPI.listFish();
    
        return fish
    }
    
    fish().then((result)=>{
    
        console.log(result);
    
        let html1=`<span class="trn-card__header-subline">%upcoming% &nbsp;Fish Now </span>`
    
        nwHtml1=html1.replace('%upcoming%', result.fish.length);
    
    document.querySelector('.trn-card__header').insertAdjacentHTML('beforeend', nwHtml1);
    
    
        for(let i=0;i<=result.fish.length-1;i++)
        {
           var border=result.fish[i].rarity==='uncommon'?'handmade':result.fish[i].rarity;
    
     var html=`<a herf=" " title="%title%"class="fortnite-db-item fortnite-db-item--large-text fortnite-db-item--%rarity% myDIV" style="grid-column: span 1;"  id="%id%"><img loading="lazy" class="fortnite-db-item__image " src="%img%" alt="fortnite shop item" /><div class="fortnite-db-item__details"><div class="fortnite-db-item__name" >%name%</div><div class="fortnite-db-item__price"> <span>%price%</span></div></div><div class="fortnite-db-item__rating"><span>%heal%</span></div></a>`;
    
      nwHtml=html.replace('%id%', result.fish[i].id);
      nwHtml=html.replace('%title%', result.fish[i].location);
      // src of the image
      nwHtml=nwHtml.replace('%img%',result.fish[i].image);
      //change border style
         nwHtml=nwHtml.replace('%rarity%',border)
      nwHtml=nwHtml.replace('%name%',result.fish[i].name)
      nwHtml=nwHtml.replace('%heal%',"Heal : "+result.fish[i].heal)
      nwHtml=nwHtml.replace('%title%',result.fish[i].name)
      nwHtml=nwHtml.replace('%price%',result.fish[i].description+' =>'+result.fish[i].details)
     // nwHtml=nwHtml.replace('%star%',result.fish[i].interest.toFixed(2))
    
      document.querySelector('.fish-items').insertAdjacentHTML('beforeend', nwHtml);
    
        }
    
    
    
    }).catch((e)=>{
    
        console.log(e);
    })
    },{"fortnite-api-io":2}]},{},[7]);
    