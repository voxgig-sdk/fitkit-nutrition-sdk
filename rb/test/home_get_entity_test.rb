# HomeGet entity test

require "minitest/autorun"
require "json"
require_relative "../FitkitNutrition_sdk"
require_relative "runner"

class HomeGetEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = FitkitNutritionSDK.test(nil, nil)
    ent = testsdk.HomeGet(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = home_get_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "home_get." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    home_get_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.home_get")))
    home_get_ref01_data = nil
    if home_get_ref01_data_raw.length > 0
      home_get_ref01_data = Helpers.to_map(home_get_ref01_data_raw[0][1])
    end

    # LOAD
    home_get_ref01_ent = client.HomeGet(nil)
    home_get_ref01_match_dt0 = {}
    home_get_ref01_data_dt0_loaded = home_get_ref01_ent.load(home_get_ref01_match_dt0, nil)
    assert !home_get_ref01_data_dt0_loaded.nil?

  end
end

def home_get_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "home_get", "HomeGetTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = FitkitNutritionSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["home_get01", "home_get02", "home_get03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["FITKIT_NUTRITION_TEST_HOME_GET_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "FITKIT_NUTRITION_TEST_HOME_GET_ENTID" => idmap,
    "FITKIT_NUTRITION_TEST_LIVE" => "FALSE",
    "FITKIT_NUTRITION_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["FITKIT_NUTRITION_TEST_HOME_GET_ENTID"])
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
