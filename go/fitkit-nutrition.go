package voxgigfitkitnutritionsdk

import (
	"github.com/voxgig-sdk/fitkit-nutrition-sdk/go/core"
	"github.com/voxgig-sdk/fitkit-nutrition-sdk/go/entity"
	"github.com/voxgig-sdk/fitkit-nutrition-sdk/go/feature"
	_ "github.com/voxgig-sdk/fitkit-nutrition-sdk/go/utility"
)

// Type aliases preserve external API.
type FitkitNutritionSDK = core.FitkitNutritionSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type FitkitNutritionEntity = core.FitkitNutritionEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type FitkitNutritionError = core.FitkitNutritionError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewHealthzEntityFunc = func(client *core.FitkitNutritionSDK, entopts map[string]any) core.FitkitNutritionEntity {
		return entity.NewHealthzEntity(client, entopts)
	}
	core.NewHomeGetEntityFunc = func(client *core.FitkitNutritionSDK, entopts map[string]any) core.FitkitNutritionEntity {
		return entity.NewHomeGetEntity(client, entopts)
	}
	core.NewRobotEntityFunc = func(client *core.FitkitNutritionSDK, entopts map[string]any) core.FitkitNutritionEntity {
		return entity.NewRobotEntity(client, entopts)
	}
	core.NewSitemapEntityFunc = func(client *core.FitkitNutritionSDK, entopts map[string]any) core.FitkitNutritionEntity {
		return entity.NewSitemapEntity(client, entopts)
	}
	core.NewSitewebmanifestEntityFunc = func(client *core.FitkitNutritionSDK, entopts map[string]any) core.FitkitNutritionEntity {
		return entity.NewSitewebmanifestEntity(client, entopts)
	}
	core.NewStaticAssetAssetGetEntityFunc = func(client *core.FitkitNutritionSDK, entopts map[string]any) core.FitkitNutritionEntity {
		return entity.NewStaticAssetAssetGetEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewFitkitNutritionSDK = core.NewFitkitNutritionSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewFitkitNutritionSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *FitkitNutritionSDK  { return NewFitkitNutritionSDK(nil) }
func Test() *FitkitNutritionSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
