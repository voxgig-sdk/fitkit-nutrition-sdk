import { HealthzEntity } from './entity/HealthzEntity';
import { HomeGetEntity } from './entity/HomeGetEntity';
import { RobotEntity } from './entity/RobotEntity';
import { SitemapEntity } from './entity/SitemapEntity';
import { SitewebmanifestEntity } from './entity/SitewebmanifestEntity';
import { StaticAssetAssetGetEntity } from './entity/StaticAssetAssetGetEntity';
export type * from './FitkitNutritionTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { FitkitNutritionEntityBase } from './FitkitNutritionEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class FitkitNutritionSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Healthz(entopts?: Record<string, any>): HealthzEntity;
    HomeGet(entopts?: Record<string, any>): HomeGetEntity;
    Robot(entopts?: Record<string, any>): RobotEntity;
    Sitemap(entopts?: Record<string, any>): SitemapEntity;
    Sitewebmanifest(entopts?: Record<string, any>): SitewebmanifestEntity;
    StaticAssetAssetGet(entopts?: Record<string, any>): StaticAssetAssetGetEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): FitkitNutritionSDK;
    tester(testopts?: any, sdkopts?: any): FitkitNutritionSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof FitkitNutritionSDK;
export { stdutil, config, BaseFeature, FitkitNutritionEntityBase, FitkitNutritionSDK, SDK, };
export type { DirectResult };
