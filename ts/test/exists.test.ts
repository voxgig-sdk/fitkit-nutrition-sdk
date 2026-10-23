
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FitkitNutritionSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = FitkitNutritionSDK.test()
    equal(testsdk instanceof FitkitNutritionSDK, true,
      'FitkitNutritionSDK.test() must return a client synchronously')
  })

})
