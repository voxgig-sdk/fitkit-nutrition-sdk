<?php
declare(strict_types=1);

// FitkitNutrition SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class FitkitNutritionMakeContext
{
    public static function call(array $ctxmap, ?FitkitNutritionContext $basectx): FitkitNutritionContext
    {
        return new FitkitNutritionContext($ctxmap, $basectx);
    }
}
