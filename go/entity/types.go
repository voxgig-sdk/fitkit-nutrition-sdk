// Typed models for the FitkitNutrition SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/fitkit-nutrition-sdk/go/core"
)

// Healthz is the typed data model for the healthz entity.
type Healthz struct {
}

// HealthzLoadMatch is the typed request payload for Healthz.LoadTyped.
type HealthzLoadMatch struct {
}

// HomeGet is the typed data model for the home_get entity.
type HomeGet struct {
}

// HomeGetLoadMatch is the typed request payload for HomeGet.LoadTyped.
type HomeGetLoadMatch struct {
}

// Robot is the typed data model for the robot entity.
type Robot struct {
}

// RobotLoadMatch is the typed request payload for Robot.LoadTyped.
type RobotLoadMatch struct {
}

// Sitemap is the typed data model for the sitemap entity.
type Sitemap struct {
}

// SitemapLoadMatch is the typed request payload for Sitemap.LoadTyped.
type SitemapLoadMatch struct {
}

// Sitewebmanifest is the typed data model for the sitewebmanifest entity.
type Sitewebmanifest struct {
}

// SitewebmanifestLoadMatch is the typed request payload for Sitewebmanifest.LoadTyped.
type SitewebmanifestLoadMatch struct {
}

// StaticAssetAssetGet is the typed data model for the static_asset_asset_get entity.
type StaticAssetAssetGet struct {
}

// StaticAssetAssetGetLoadMatch is the typed request payload for StaticAssetAssetGet.LoadTyped.
type StaticAssetAssetGetLoadMatch struct {
	Id string `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
