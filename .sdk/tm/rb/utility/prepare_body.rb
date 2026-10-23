# FitkitNutrition SDK utility: prepare_body
require_relative 'media'
module FitkitNutritionUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return FitkitNutritionUtilities.raw_body(ctx.reqdata) if FitkitNutritionUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
