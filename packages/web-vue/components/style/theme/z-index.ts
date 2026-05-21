export const Z_INDEX_STEP = 1;

// Keep these values aligned with components/style/theme/index.scss.
export const Z_INDEX_POPUP = 1000;
export const Z_INDEX_DRAWER = Z_INDEX_POPUP + 1;
export const Z_INDEX_MODAL = Z_INDEX_DRAWER;
export const Z_INDEX_MESSAGE = Z_INDEX_POPUP + 3;
export const Z_INDEX_NOTIFICATION = Z_INDEX_MESSAGE;

// Popup manager allocates the next available z-index, so stack bases sit one step below
// the first runtime value when we need the first rendered layer to match the theme token.
export const POPUP_STACK_BASE_Z_INDEX = Z_INDEX_POPUP;
export const MESSAGE_STACK_BASE_Z_INDEX = Z_INDEX_MESSAGE - Z_INDEX_STEP;
