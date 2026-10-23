-- StaticAssetAssetGet entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("fitkit-nutrition_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("StaticAssetAssetGetEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:StaticAssetAssetGet(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:StaticAssetAssetGet(nil):load({ ["id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = static_asset_asset_get_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "static_asset_asset_get." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live then
      runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: " .. "the flow loads a static_asset_asset_get record it has no list to find")
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local static_asset_asset_get_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.static_asset_asset_get")))
    local static_asset_asset_get_ref01_data = nil
    if #static_asset_asset_get_ref01_data_raw > 0 then
      static_asset_asset_get_ref01_data = helpers.to_map(static_asset_asset_get_ref01_data_raw[1][2])
    end

    -- LOAD
    local static_asset_asset_get_ref01_ent = client:StaticAssetAssetGet(nil)
    local static_asset_asset_get_ref01_match_dt0 = {
      id = static_asset_asset_get_ref01_data["id"],
    }
    local static_asset_asset_get_ref01_data_dt0_loaded, err = static_asset_asset_get_ref01_ent:load(static_asset_asset_get_ref01_match_dt0, nil)
    assert.is_nil(err)
    local static_asset_asset_get_ref01_data_dt0_load_result = helpers.to_map(type(static_asset_asset_get_ref01_data_dt0_loaded) == 'table' and static_asset_asset_get_ref01_data_dt0_loaded.data_get and static_asset_asset_get_ref01_data_dt0_loaded:data_get() or static_asset_asset_get_ref01_data_dt0_loaded)
    assert.is_not_nil(static_asset_asset_get_ref01_data_dt0_load_result)
    assert.are.equal(static_asset_asset_get_ref01_data_dt0_load_result["id"], static_asset_asset_get_ref01_data["id"])

  end)
end)

function static_asset_asset_get_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/static_asset_asset_get/StaticAssetAssetGetTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read static_asset_asset_get test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "static_asset_asset_get01", "static_asset_asset_get02", "static_asset_asset_get03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("FITKIT_NUTRITION_TEST_STATIC_ASSET_ASSET_GET_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["FITKIT_NUTRITION_TEST_STATIC_ASSET_ASSET_GET_ENTID"] = idmap,
    ["FITKIT_NUTRITION_TEST_LIVE"] = "FALSE",
    ["FITKIT_NUTRITION_TEST_EXPLAIN"] = "FALSE",
  })

  local idmap_resolved = helpers.to_map(
    env["FITKIT_NUTRITION_TEST_STATIC_ASSET_ASSET_GET_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["FITKIT_NUTRITION_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["FITKIT_NUTRITION_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["FITKIT_NUTRITION_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
