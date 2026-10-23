package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/fitkit-nutrition-sdk/go"
	"github.com/voxgig-sdk/fitkit-nutrition-sdk/go/core"

	vs "github.com/voxgig-sdk/fitkit-nutrition-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const static_asset_asset_getEntityLiveStrict = true


func TestStaticAssetAssetGetEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.StaticAssetAssetGet(nil)
		if ent == nil {
			t.Fatal("expected non-nil StaticAssetAssetGetEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.StaticAssetAssetGet(nil).Load(map[string]any{"id": 1}, nil)
		if sdkerr, ok := err.(*core.FitkitNutritionError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := static_asset_asset_getBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "static_asset_asset_get." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			liveMiss(t, static_asset_asset_getEntityLiveStrict, "Live entity test blocked: %s", "the flow loads a static_asset_asset_get record it has no list to find")
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		staticAssetAssetGetRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.static_asset_asset_get")))
		var staticAssetAssetGetRef01Data map[string]any
		if len(staticAssetAssetGetRef01DataRaw) > 0 {
			staticAssetAssetGetRef01Data = core.ToMapAny(staticAssetAssetGetRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = staticAssetAssetGetRef01Data

		// LOAD
		staticAssetAssetGetRef01Ent := client.StaticAssetAssetGet(nil)
		staticAssetAssetGetRef01MatchDt0 := map[string]any{
			"id": staticAssetAssetGetRef01Data["id"],
		}
		staticAssetAssetGetRef01DataDt0Loaded, err := staticAssetAssetGetRef01Ent.Load(staticAssetAssetGetRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		staticAssetAssetGetRef01DataDt0LoadResult := core.ToMapAny(entityData(staticAssetAssetGetRef01DataDt0Loaded))
		if staticAssetAssetGetRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if staticAssetAssetGetRef01DataDt0LoadResult["id"] != staticAssetAssetGetRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func static_asset_asset_getBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "static_asset_asset_get", "StaticAssetAssetGetTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read static_asset_asset_get test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse static_asset_asset_get test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"static_asset_asset_get01", "static_asset_asset_get02", "static_asset_asset_get03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("FITKIT_NUTRITION_TEST_STATIC_ASSET_ASSET_GET_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"FITKIT_NUTRITION_TEST_STATIC_ASSET_ASSET_GET_ENTID": idmap,
		"FITKIT_NUTRITION_TEST_LIVE":      "FALSE",
		"FITKIT_NUTRITION_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["FITKIT_NUTRITION_TEST_STATIC_ASSET_ASSET_GET_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["FITKIT_NUTRITION_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewFitkitNutritionSDK(core.ToMapAny(mergedOpts))
	}

	live := env["FITKIT_NUTRITION_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["FITKIT_NUTRITION_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
