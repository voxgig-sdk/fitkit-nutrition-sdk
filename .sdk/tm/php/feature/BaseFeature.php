<?php
declare(strict_types=1);

// FitkitNutrition SDK base feature

class FitkitNutritionBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(FitkitNutritionContext $ctx, array $options): void {}
    public function PostConstruct(FitkitNutritionContext $ctx): void {}
    public function PostConstructEntity(FitkitNutritionContext $ctx): void {}
    public function SetData(FitkitNutritionContext $ctx): void {}
    public function GetData(FitkitNutritionContext $ctx): void {}
    public function GetMatch(FitkitNutritionContext $ctx): void {}
    public function SetMatch(FitkitNutritionContext $ctx): void {}
    public function PrePoint(FitkitNutritionContext $ctx): void {}
    public function PreSpec(FitkitNutritionContext $ctx): void {}
    public function PreRequest(FitkitNutritionContext $ctx): void {}
    public function PreResponse(FitkitNutritionContext $ctx): void {}
    public function PreResult(FitkitNutritionContext $ctx): void {}
    public function PreDone(FitkitNutritionContext $ctx): void {}
    public function PreUnexpected(FitkitNutritionContext $ctx): void {}
}
