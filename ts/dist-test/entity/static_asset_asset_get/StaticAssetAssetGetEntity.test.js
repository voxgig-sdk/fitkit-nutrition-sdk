"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('StaticAssetAssetGetEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FITKIT_NUTRITION_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FITKIT_NUTRITION_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FitkitNutritionSDK.test();
        const ent = testsdk.StaticAssetAssetGet();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.FitkitNutritionSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.StaticAssetAssetGet().load({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FITKIT_NUTRITION_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'static_asset_asset_get.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 } }, "id": { "field": "id", "name": "id" }, "name": "static_asset_asset_get", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /{asset}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "asset", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/{asset}", "q": { "exist": ["id"] }, "r": { "param": { "asset": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "static_asset_asset_get", "name__orig": "static_asset_asset_get", "Name": "StaticAssetAssetGet", "name_": "static_asset_asset_get", "name-": "static-asset-asset-get", "NAME": "STATIC_ASSET_ASSET_GET", "index$": 5 }, { "active": true, "entity": "static_asset_asset_get", "key$": "BasicStaticAssetAssetGetFlow", "kind": "basic", "name": "BasicStaticAssetAssetGetFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "static_asset_asset_get_ref01", "srcdatavar": "static_asset_asset_get_ref01_data", "suffix": "_dt0" }, "m": { "id": "static_asset_asset_get01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-static_asset_asset_get_ref01" } }], "index$": 0 }] }, 'StaticAssetAssetGet', { "GET /{asset}": { "protocol": "http", "parameters": [{ "name": "asset", "in": "path", "required": true, "schema": { "type": "string", "title": "Asset" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let static_asset_asset_get_ref01_data = Object.values(setup.data.existing.static_asset_asset_get)[0];
        // LOAD
        const static_asset_asset_get_ref01_ent = client.StaticAssetAssetGet();
        const static_asset_asset_get_ref01_match_dt0 = {};
        static_asset_asset_get_ref01_match_dt0.id = static_asset_asset_get_ref01_data.id;
        const static_asset_asset_get_ref01_data_dt0 = (await static_asset_asset_get_ref01_ent.load(static_asset_asset_get_ref01_match_dt0)).data();
        (0, node_assert_1.default)(static_asset_asset_get_ref01_data_dt0.id === static_asset_asset_get_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/static_asset_asset_get/StaticAssetAssetGetTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FitkitNutritionSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['static_asset_asset_get01', 'static_asset_asset_get02', 'static_asset_asset_get03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FITKIT_NUTRITION_TEST_STATIC_ASSET_ASSET_GET_ENTID': idmap,
        'FITKIT_NUTRITION_TEST_LIVE': 'FALSE',
        'FITKIT_NUTRITION_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['FITKIT_NUTRITION_TEST_STATIC_ASSET_ASSET_GET_ENTID'];
    const live = 'TRUE' === env.FITKIT_NUTRITION_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FITKIT_NUTRITION_TEST_STATIC_ASSET_ASSET_GET_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.FitkitNutritionSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.FITKIT_NUTRITION_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=StaticAssetAssetGetEntity.test.js.map