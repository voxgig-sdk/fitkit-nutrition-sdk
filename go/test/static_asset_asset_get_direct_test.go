package sdktest

import (
	"encoding/json"
	"os"
	"strings"
	"testing"

	sdk "github.com/voxgig-sdk/fitkit-nutrition-sdk/go"
	"github.com/voxgig-sdk/fitkit-nutrition-sdk/go/core"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const static_asset_asset_getDirectLiveStrict = true

func TestStaticAssetAssetGetDirect(t *testing.T) {
	t.Run("direct-load-static_asset_asset_get", func(t *testing.T) {
		setup := static_asset_asset_getDirectSetup(map[string]any{"id": "direct01"})
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		if _shouldSkip, _reason := isControlSkipped("direct", "direct-load-static_asset_asset_get", _mode); _shouldSkip {
			if _reason == "" {
				_reason = "skipped via sdk-test-control.json"
			}
			t.Skip(_reason)
			return
		}
		if setup.live {
			for _, _liveKey := range []string{"static_asset_asset_get01"} {
				if v := setup.idmap[_liveKey]; v == nil {
					liveMiss(t, static_asset_asset_getDirectLiveStrict, "Live test blocked: needs %s via FITKIT_NUTRITION_TEST_STATIC_ASSET_ASSET_GET_ENTID", _liveKey)
					return
				}
			}
		}
		client := setup.client

		params := map[string]any{}
		query := map[string]any{}
		if setup.live {
			params["id"] = setup.idmap["static_asset_asset_get01"]
		} else {
			params["id"] = "direct01"
		}

		result, err := client.Direct(map[string]any{
			"path":   "{id}",
			"method": "GET",
			"params": params,
			"query":  query,
		})
		if setup.live {
			if err != nil {
				liveMiss(t, static_asset_asset_getDirectLiveStrict, "Live load failed: %v", err)
			}
			if status := core.ToInt(result["status"]); result["ok"] != true || status < 200 || status >= 300 {
				liveMiss(t, static_asset_asset_getDirectLiveStrict, "Live load failed: %s", liveDescribe(result))
			}
			if result["data"] == nil {
				liveMiss(t, static_asset_asset_getDirectLiveStrict, "Live load returned no data: %s", liveDescribe(result))
			}
		} else {
			if err != nil {
				t.Fatalf("direct failed: %v", err)
			}
			if result["ok"] != true {
				t.Fatalf("expected ok to be true, got %v", result["ok"])
			}
			if core.ToInt(result["status"]) != 200 {
				t.Fatalf("expected status 200, got %v", result["status"])
			}
			if result["data"] == nil {
				t.Fatal("expected data to be non-nil")
			}
		}

		if !setup.live {
			if dataMap, ok := result["data"].(map[string]any); ok {
				if dataMap["id"] != "direct01" {
					t.Fatalf("expected data.id to be direct01, got %v", dataMap["id"])
				}
			}

			if len(*setup.calls) != 1 {
				t.Fatalf("expected 1 call, got %d", len(*setup.calls))
			}
			call := (*setup.calls)[0]
			if initMap, ok := call["init"].(map[string]any); ok {
				if initMap["method"] != "GET" {
					t.Fatalf("expected method GET, got %v", initMap["method"])
				}
			}
			if url, ok := call["url"].(string); ok {
				if !strings.Contains(url, "direct01") {
					t.Fatalf("expected url to contain direct01, got %v", url)
				}
			}
		}
	})

}

type static_asset_asset_getDirectSetupResult struct {
	client *sdk.FitkitNutritionSDK
	calls  *[]map[string]any
	live   bool
	idmap  map[string]any
}

func static_asset_asset_getDirectSetup(mockres any) *static_asset_asset_getDirectSetupResult {
	loadEnvLocal()

	calls := &[]map[string]any{}

	env := envOverride(map[string]any{
		"FITKIT_NUTRITION_TEST_STATIC_ASSET_ASSET_GET_ENTID": map[string]any{},
		"FITKIT_NUTRITION_TEST_LIVE":    "FALSE",
	})

	live := env["FITKIT_NUTRITION_TEST_LIVE"] == "TRUE"

	if live {
		// sdk-test-control.json's test.client.options seeds the live
		// client; the generated fields below overwrite anything they name.
		mergedOpts := map[string]any{}
		for k, v := range liveClientOptions() {
			mergedOpts[k] = v
		}
		for k, v := range map[string]any{
		} {
			mergedOpts[k] = v
		}
		client := sdk.NewFitkitNutritionSDK(mergedOpts)

		idmap := map[string]any{}
		if entidRaw, ok := env["FITKIT_NUTRITION_TEST_STATIC_ASSET_ASSET_GET_ENTID"]; ok {
			if entidStr, ok := entidRaw.(string); ok && strings.HasPrefix(entidStr, "{") {
				json.Unmarshal([]byte(entidStr), &idmap)
			} else if entidMap, ok := entidRaw.(map[string]any); ok {
				idmap = entidMap
			}
		}

		return &static_asset_asset_getDirectSetupResult{client: client, calls: calls, live: true, idmap: idmap}
	}

	mockFetch := func(url string, init map[string]any) (map[string]any, error) {
		*calls = append(*calls, map[string]any{"url": url, "init": init})
		return map[string]any{
			"status":     200,
			"statusText": "OK",
			"headers":    map[string]any{},
			"json": (func() any)(func() any {
				if mockres != nil {
					return mockres
				}
				return map[string]any{"id": "direct01"}
			}),
		}, nil
	}

	client := sdk.NewFitkitNutritionSDK(map[string]any{
		"base": "http://localhost:8080",
		"system": map[string]any{
			"fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
		},
	})

	return &static_asset_asset_getDirectSetupResult{client: client, calls: calls, live: false, idmap: map[string]any{}}
}

var _ = os.Getenv
var _ = json.Unmarshal
