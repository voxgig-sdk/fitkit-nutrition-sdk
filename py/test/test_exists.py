# FitkitNutrition SDK exists test

import pytest
from fitkitnutrition_sdk import FitkitNutritionSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = FitkitNutritionSDK.test(None, None)
        assert testsdk is not None
