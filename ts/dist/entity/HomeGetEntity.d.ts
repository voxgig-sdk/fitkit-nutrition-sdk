import { FitkitNutritionEntityBase } from '../FitkitNutritionEntityBase';
import type { FitkitNutritionSDK } from '../FitkitNutritionSDK';
import type { Control } from '../types';
import type { HomeGet, HomeGetLoadMatch } from '../FitkitNutritionTypes';
declare class HomeGetEntity extends FitkitNutritionEntityBase<HomeGet> {
    constructor(client: FitkitNutritionSDK, entopts: any);
    make(this: HomeGetEntity): HomeGetEntity;
    load(this: any, reqmatch?: HomeGetLoadMatch, ctrl?: Control): Promise<HomeGetEntity>;
}
export { HomeGetEntity };
