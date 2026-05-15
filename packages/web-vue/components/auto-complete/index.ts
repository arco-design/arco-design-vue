import type { App } from 'vue';

import type { SDOptions } from '../_utils/types';
import type { FilterOption, SelectOptionData, SelectOptionGroup } from '../select/interface';

import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _AutoComplete from './auto-complete';

export type AutoCompleteData = Array<string | number | SelectOptionData | SelectOptionGroup>;
export type AutoCompleteFilterOption = FilterOption;
export type AutoCompleteChangeHandler = (value: string) => void;
export type AutoCompleteSearchHandler = (value: string) => void;
export type AutoCompleteSelectHandler = (value: string) => void;
export type AutoCompleteClearHandler = (event: Event) => void;
export type AutoCompleteDropdownScrollHandler = (event: Event) => void;
export type AutoCompleteDropdownReachBottomHandler = (event: Event) => void;

const AutoComplete = Object.assign(_AutoComplete, {
  install: (app: App, options?: SDOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _AutoComplete.name, _AutoComplete);
  },
});

export type AutoCompleteInstance = InstanceType<typeof _AutoComplete>;

export default AutoComplete;
