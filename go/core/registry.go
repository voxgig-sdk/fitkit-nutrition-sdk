package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewHealthzEntityFunc func(client *FitkitNutritionSDK, entopts map[string]any) FitkitNutritionEntity

var NewHomeGetEntityFunc func(client *FitkitNutritionSDK, entopts map[string]any) FitkitNutritionEntity

var NewRobotEntityFunc func(client *FitkitNutritionSDK, entopts map[string]any) FitkitNutritionEntity

var NewSitemapEntityFunc func(client *FitkitNutritionSDK, entopts map[string]any) FitkitNutritionEntity

var NewSitewebmanifestEntityFunc func(client *FitkitNutritionSDK, entopts map[string]any) FitkitNutritionEntity

var NewStaticAssetAssetGetEntityFunc func(client *FitkitNutritionSDK, entopts map[string]any) FitkitNutritionEntity

