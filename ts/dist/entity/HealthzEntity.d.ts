import { FitkitNutritionEntityBase } from '../FitkitNutritionEntityBase';
import type { FitkitNutritionSDK } from '../FitkitNutritionSDK';
import type { Control } from '../types';
import type { Healthz, HealthzLoadMatch } from '../FitkitNutritionTypes';
declare class HealthzEntity extends FitkitNutritionEntityBase<Healthz> {
    constructor(client: FitkitNutritionSDK, entopts: any);
    make(this: HealthzEntity): HealthzEntity;
    load(this: any, reqmatch?: HealthzLoadMatch, ctrl?: Control): Promise<HealthzEntity>;
}
export { HealthzEntity };
