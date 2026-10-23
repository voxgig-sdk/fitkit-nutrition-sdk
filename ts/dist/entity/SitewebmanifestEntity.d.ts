import { FitkitNutritionEntityBase } from '../FitkitNutritionEntityBase';
import type { FitkitNutritionSDK } from '../FitkitNutritionSDK';
import type { Control } from '../types';
import type { Sitewebmanifest, SitewebmanifestLoadMatch } from '../FitkitNutritionTypes';
declare class SitewebmanifestEntity extends FitkitNutritionEntityBase<Sitewebmanifest> {
    constructor(client: FitkitNutritionSDK, entopts: any);
    make(this: SitewebmanifestEntity): SitewebmanifestEntity;
    load(this: any, reqmatch?: SitewebmanifestLoadMatch, ctrl?: Control): Promise<SitewebmanifestEntity>;
}
export { SitewebmanifestEntity };
