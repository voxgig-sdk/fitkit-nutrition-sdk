# FitkitNutrition SDK utility: make_context

from fitkitnutrition_sdk.core.context import FitkitNutritionContext


def make_context_util(ctxmap, basectx):
    return FitkitNutritionContext(ctxmap, basectx)
