import { FitkitNutritionEntityBase } from '../FitkitNutritionEntityBase';
import type { FitkitNutritionSDK } from '../FitkitNutritionSDK';
import type { Control } from '../types';
import type { Robot, RobotLoadMatch } from '../FitkitNutritionTypes';
declare class RobotEntity extends FitkitNutritionEntityBase<Robot> {
    constructor(client: FitkitNutritionSDK, entopts: any);
    make(this: RobotEntity): RobotEntity;
    load(this: any, reqmatch?: RobotLoadMatch, ctrl?: Control): Promise<RobotEntity>;
}
export { RobotEntity };
