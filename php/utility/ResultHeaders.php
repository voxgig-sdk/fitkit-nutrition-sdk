<?php
declare(strict_types=1);

// FitkitNutrition SDK utility: result_headers

class FitkitNutritionResultHeaders
{
    public static function call(FitkitNutritionContext $ctx): ?FitkitNutritionResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
