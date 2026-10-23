# StaticAssetAssetGet entity test

require "minitest/autorun"
require "json"
require_relative "../FitkitNutrition_sdk"
require_relative "runner"

class StaticAssetAssetGetEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = FitkitNutritionSDK.test(nil, nil)
    ent = testsdk.StaticAssetAssetGet(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = FitkitNutritionConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = FitkitNutritionSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.StaticAssetAssetGet(nil).load({ "id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = static_asset_asset_get_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "static_asset_asset_get." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      Runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow loads a static_asset_asset_get record it has no list to find")
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    static_asset_asset_get_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.static_asset_asset_get")))
    static_asset_asset_get_ref01_data = nil
    if static_asset_asset_get_ref01_data_raw.length > 0
      static_asset_asset_get_ref01_data = Helpers.to_map(static_asset_asset_get_ref01_data_raw[0][1])
    end

    # LOAD
    static_asset_asset_get_ref01_ent = client.StaticAssetAssetGet(nil)
    static_asset_asset_get_ref01_match_dt0 = {
      "id" => static_asset_asset_get_ref01_data["id"],
    }
    static_asset_asset_get_ref01_data_dt0_loaded = static_asset_asset_get_ref01_ent.load(static_asset_asset_get_ref01_match_dt0, nil)
    static_asset_asset_get_ref01_data_dt0_load_result = Helpers.to_map(static_asset_asset_get_ref01_data_dt0_loaded.respond_to?(:data_get) ? static_asset_asset_get_ref01_data_dt0_loaded.data_get : static_asset_asset_get_ref01_data_dt0_loaded)
    assert !static_asset_asset_get_ref01_data_dt0_load_result.nil?
    assert_equal static_asset_asset_get_ref01_data_dt0_load_result["id"], static_asset_asset_get_ref01_data["id"]

  end
end

def static_asset_asset_get_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "static_asset_asset_get", "StaticAssetAssetGetTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = FitkitNutritionSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["static_asset_asset_get01", "static_asset_asset_get02", "static_asset_asset_get03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["FITKIT_NUTRITION_TEST_STATIC_ASSET_ASSET_GET_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "FITKIT_NUTRITION_TEST_STATIC_ASSET_ASSET_GET_ENTID" => idmap,
    "FITKIT_NUTRITION_TEST_LIVE" => "FALSE",
    "FITKIT_NUTRITION_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["FITKIT_NUTRITION_TEST_STATIC_ASSET_ASSET_GET_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["FITKIT_NUTRITION_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = FitkitNutritionSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["FITKIT_NUTRITION_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["FITKIT_NUTRITION_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
