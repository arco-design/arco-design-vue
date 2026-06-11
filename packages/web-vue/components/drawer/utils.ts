export const DRAWER_PLACEMENTS = ['top', 'right', 'bottom', 'left'] as const;
export type DrawerPlacements = (typeof DRAWER_PLACEMENTS)[number];
