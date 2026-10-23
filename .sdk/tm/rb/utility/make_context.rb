# FitkitNutrition SDK utility: make_context
require_relative '../core/context'
module FitkitNutritionUtilities
  MakeContext = ->(ctxmap, basectx) {
    FitkitNutritionContext.new(ctxmap, basectx)
  }
end
