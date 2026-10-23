import { FitkitNutritionEntityBase } from '../FitkitNutritionEntityBase';
import type { FitkitNutritionSDK } from '../FitkitNutritionSDK';
import type { Control } from '../types';
import type { Sitemap, SitemapLoadMatch } from '../FitkitNutritionTypes';
declare class SitemapEntity extends FitkitNutritionEntityBase<Sitemap> {
    constructor(client: FitkitNutritionSDK, entopts: any);
    make(this: SitemapEntity): SitemapEntity;
    load(this: any, reqmatch?: SitemapLoadMatch, ctrl?: Control): Promise<SitemapEntity>;
}
export { SitemapEntity };
