# FitkitNutrition SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module FitkitNutritionFeatures
  def self.make_feature(name)
    case name
    when "base"
      FitkitNutritionBaseFeature.new
    when "ratelimit"
      FitkitNutritionRatelimitFeature.new
    when "retry"
      FitkitNutritionRetryFeature.new
    when "test"
      FitkitNutritionTestFeature.new
    when "timeout"
      FitkitNutritionTimeoutFeature.new
    else
      FitkitNutritionBaseFeature.new
    end
  end
end
