import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';

import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _StepsStep from './step.vue';
import _Steps from './steps.vue';

export type { StepData, StepStatus, StepsType } from './interface';

export type StepsChangeHandler = (step: number, event: Event) => void;

const Steps = Object.assign(_Steps, {
  Step: _StepsStep,
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _Steps.name, _Steps);
    app.component(componentPrefix + _StepsStep.name, _StepsStep);
  },
});

export type StepsInstance = InstanceType<typeof _Steps>;
export type StepsStepInstance = InstanceType<typeof _StepsStep>;

export { _StepsStep as Step };

export default Steps;
