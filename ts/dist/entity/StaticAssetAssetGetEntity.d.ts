import { FitkitNutritionEntityBase } from '../FitkitNutritionEntityBase';
import type { FitkitNutritionSDK } from '../FitkitNutritionSDK';
import type { Control } from '../types';
import type { StaticAssetAssetGet, StaticAssetAssetGetLoadMatch } from '../FitkitNutritionTypes';
declare class StaticAssetAssetGetEntity extends FitkitNutritionEntityBase<StaticAssetAssetGet> {
    constructor(client: FitkitNutritionSDK, entopts: any);
    make(this: StaticAssetAssetGetEntity): StaticAssetAssetGetEntity;
    load(this: any, reqmatch?: StaticAssetAssetGetLoadMatch, ctrl?: Control): Promise<StaticAssetAssetGetEntity>;
}
export { StaticAssetAssetGetEntity };
