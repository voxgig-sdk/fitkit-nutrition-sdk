# StaticAssetAssetGet entity test

import json
import os
import time

import pytest

from fitkitnutrition_sdk.utility.voxgig_struct import voxgig_struct as vs
from fitkitnutrition_sdk import FitkitNutritionSDK
from fitkitnutrition_sdk.core import helpers
from fitkitnutrition_sdk.config import shared_config
from fitkitnutrition_sdk.feature.base_feature import FitkitNutritionBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestStaticAssetAssetGetEntity:

    def test_should_create_instance(self):
        testsdk = FitkitNutritionSDK.test(None, None)
        ent = testsdk.StaticAssetAssetGet(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = FitkitNutritionSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.StaticAssetAssetGet(None).load({"id": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _static_asset_asset_get_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "static_asset_asset_get." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow loads a static_asset_asset_get record it has no list to find")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        static_asset_asset_get_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.static_asset_asset_get")))
        static_asset_asset_get_ref01_data = None
        if len(static_asset_asset_get_ref01_data_raw) > 0:
            static_asset_asset_get_ref01_data = helpers.to_map(static_asset_asset_get_ref01_data_raw[0][1])

        # LOAD
        static_asset_asset_get_ref01_ent = client.StaticAssetAssetGet(None)
        static_asset_asset_get_ref01_match_dt0 = {
            "id": static_asset_asset_get_ref01_data["id"],
        }
        static_asset_asset_get_ref01_data_dt0_loaded = static_asset_asset_get_ref01_ent.load(static_asset_asset_get_ref01_match_dt0, None)
        static_asset_asset_get_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(static_asset_asset_get_ref01_data_dt0_loaded))
        assert static_asset_asset_get_ref01_data_dt0_load_result is not None
        assert static_asset_asset_get_ref01_data_dt0_load_result["id"] == static_asset_asset_get_ref01_data["id"]



def _static_asset_asset_get_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/static_asset_asset_get/StaticAssetAssetGetTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = FitkitNutritionSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["static_asset_asset_get01", "static_asset_asset_get02", "static_asset_asset_get03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "FITKIT_NUTRITION_TEST_STATIC_ASSET_ASSET_GET_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "FITKIT_NUTRITION_TEST_STATIC_ASSET_ASSET_GET_ENTID": idmap,
        "FITKIT_NUTRITION_TEST_LIVE": "FALSE",
        "FITKIT_NUTRITION_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("FITKIT_NUTRITION_TEST_STATIC_ASSET_ASSET_GET_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("FITKIT_NUTRITION_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
            },
            extra or {},
        ])
        client = FitkitNutritionSDK(helpers.to_map(merged_opts))

    _live = env.get("FITKIT_NUTRITION_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("FITKIT_NUTRITION_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
