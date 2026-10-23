# frozen_string_literal: true

# Typed models for the FitkitNutrition SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Healthz entity data model.
class Healthz
end

# Request payload for Healthz#load.
class HealthzLoadMatch
end

# HomeGet entity data model.
class HomeGet
end

# Request payload for HomeGet#load.
class HomeGetLoadMatch
end

# Robot entity data model.
class Robot
end

# Request payload for Robot#load.
class RobotLoadMatch
end

# Sitemap entity data model.
class Sitemap
end

# Request payload for Sitemap#load.
class SitemapLoadMatch
end

# Sitewebmanifest entity data model.
class Sitewebmanifest
end

# Request payload for Sitewebmanifest#load.
class SitewebmanifestLoadMatch
end

# StaticAssetAssetGet entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
StaticAssetAssetGet = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for StaticAssetAssetGet#load.
#
# @!attribute [rw] id
#   @return [String]
StaticAssetAssetGetLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

