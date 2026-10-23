# FitkitNutrition SDK exists test

require "minitest/autorun"
require_relative "../FitkitNutrition_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = FitkitNutritionSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
