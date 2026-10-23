<?php
declare(strict_types=1);

// Typed models for the FitkitNutrition SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Healthz entity data model. */
class Healthz
{
}

/** Request payload for Healthz#load. */
class HealthzLoadMatch
{
}

/** HomeGet entity data model. */
class HomeGet
{
}

/** Request payload for HomeGet#load. */
class HomeGetLoadMatch
{
}

/** Robot entity data model. */
class Robot
{
}

/** Request payload for Robot#load. */
class RobotLoadMatch
{
}

/** Sitemap entity data model. */
class Sitemap
{
}

/** Request payload for Sitemap#load. */
class SitemapLoadMatch
{
}

/** Sitewebmanifest entity data model. */
class Sitewebmanifest
{
}

/** Request payload for Sitewebmanifest#load. */
class SitewebmanifestLoadMatch
{
}

/** StaticAssetAssetGet entity data model. */
class StaticAssetAssetGet
{
    public ?string $id = null;
}

/** Request payload for StaticAssetAssetGet#load. */
class StaticAssetAssetGetLoadMatch
{
    public string $id;
}

