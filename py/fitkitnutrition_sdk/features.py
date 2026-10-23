# FitkitNutrition SDK feature factory

from fitkitnutrition_sdk.feature.base_feature import FitkitNutritionBaseFeature
from fitkitnutrition_sdk.feature.ratelimit_feature import FitkitNutritionRatelimitFeature
from fitkitnutrition_sdk.feature.retry_feature import FitkitNutritionRetryFeature
from fitkitnutrition_sdk.feature.test_feature import FitkitNutritionTestFeature
from fitkitnutrition_sdk.feature.timeout_feature import FitkitNutritionTimeoutFeature


_FEATURES = {
    "base": lambda: FitkitNutritionBaseFeature(),
    "ratelimit": lambda: FitkitNutritionRatelimitFeature(),
    "retry": lambda: FitkitNutritionRetryFeature(),
    "test": lambda: FitkitNutritionTestFeature(),
    "timeout": lambda: FitkitNutritionTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
