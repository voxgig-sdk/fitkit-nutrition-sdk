# FitkitNutrition SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

FitkitNutritionUtility.registrar = ->(u) {
  u.clean = FitkitNutritionUtilities::Clean
  u.clean_add = FitkitNutritionUtilities::CleanAdd
  u.clean_explain = FitkitNutritionUtilities::CleanExplain
  u.done = FitkitNutritionUtilities::Done
  u.make_error = FitkitNutritionUtilities::MakeError
  u.feature_add = FitkitNutritionUtilities::FeatureAdd
  u.feature_hook = FitkitNutritionUtilities::FeatureHook
  u.feature_init = FitkitNutritionUtilities::FeatureInit
  u.fetcher = FitkitNutritionUtilities::Fetcher
  u.make_fetch_def = FitkitNutritionUtilities::MakeFetchDef
  u.make_context = FitkitNutritionUtilities::MakeContext
  u.make_options = FitkitNutritionUtilities::MakeOptions
  u.make_request = FitkitNutritionUtilities::MakeRequest
  u.make_response = FitkitNutritionUtilities::MakeResponse
  u.make_result = FitkitNutritionUtilities::MakeResult
  u.make_point = FitkitNutritionUtilities::MakePoint
  u.make_spec = FitkitNutritionUtilities::MakeSpec
  u.make_url = FitkitNutritionUtilities::MakeUrl
  u.param = FitkitNutritionUtilities::Param
  u.prepare_auth = FitkitNutritionUtilities::PrepareAuth
  u.prepare_body = FitkitNutritionUtilities::PrepareBody
  u.prepare_headers = FitkitNutritionUtilities::PrepareHeaders
  u.prepare_method = FitkitNutritionUtilities::PrepareMethod
  u.prepare_params = FitkitNutritionUtilities::PrepareParams
  u.prepare_path = FitkitNutritionUtilities::PreparePath
  u.prepare_query = FitkitNutritionUtilities::PrepareQuery
  u.graphql_body = FitkitNutritionUtilities::GraphqlBody
  u.graphql_errors = FitkitNutritionUtilities::GraphqlErrors
  u.result_basic = FitkitNutritionUtilities::ResultBasic
  u.result_body = FitkitNutritionUtilities::ResultBody
  u.result_headers = FitkitNutritionUtilities::ResultHeaders
  u.transform_request = FitkitNutritionUtilities::TransformRequest
  u.transform_response = FitkitNutritionUtilities::TransformResponse
}
