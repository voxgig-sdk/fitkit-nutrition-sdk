

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FitkitNutritionSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('SitemapEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FITKIT_NUTRITION_TEST_LIVE=TRUE.
  afterEach(liveDelay('FITKIT_NUTRITION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FitkitNutritionSDK.test()
    const ent = testsdk.Sitemap()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FITKIT_NUTRITION_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'sitemap.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"sitemap","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /sitemap.xml","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/sitemap.xml","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"sitemap.xml"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"sitemap","name__orig":"sitemap","Name":"Sitemap","name_":"sitemap","name-":"sitemap","NAME":"SITEMAP","index$":3}, {"active":true,"entity":"sitemap","key$":"BasicSitemapFlow","kind":"basic","name":"BasicSitemapFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"sitemap_ref01","srcdatavar":"sitemap_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-sitemap_ref01"}}],"index$":0}]}, 'Sitemap', {"GET /sitemap.xml":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let sitemap_ref01_data = Object.values(setup.data.existing.sitemap)[0] as any

    // LOAD
    const sitemap_ref01_ent = client.Sitemap()
    const sitemap_ref01_match_dt0: any = {}
    const sitemap_ref01_data_dt0 = (await sitemap_ref01_ent.load(sitemap_ref01_match_dt0)).data()
    assert(null != sitemap_ref01_data_dt0)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/sitemap/SitemapTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FitkitNutritionSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['sitemap01','sitemap02','sitemap03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FITKIT_NUTRITION_TEST_SITEMAP_ENTID': idmap,
    'FITKIT_NUTRITION_TEST_LIVE': 'FALSE',
    'FITKIT_NUTRITION_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FITKIT_NUTRITION_TEST_SITEMAP_ENTID']

  const live = 'TRUE' === env.FITKIT_NUTRITION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FITKIT_NUTRITION_TEST_SITEMAP_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FitkitNutritionSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.FITKIT_NUTRITION_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
