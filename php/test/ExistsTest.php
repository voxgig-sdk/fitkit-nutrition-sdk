<?php
declare(strict_types=1);

// FitkitNutrition SDK exists test

require_once __DIR__ . '/../fitkitnutrition_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = FitkitNutritionSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
