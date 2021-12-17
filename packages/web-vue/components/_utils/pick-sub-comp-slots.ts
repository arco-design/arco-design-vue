import { Slots, Slot } from 'vue';

export default function pickSubCompSlots(slots: Slots, subCompName: string) {
  const prefix = `${subCompName}-slot-`;
  const subSlots = Object.keys(slots).reduce(
    (cur: Record<string, Slot>, s: string) => {
      if (s.startsWith(prefix)) {
        const subSlotName = s.slice(prefix.length);
        if (subSlotName) {
          cur[subSlotName] = slots[s] as Slot;
        }
      }
      return cur;
    },
    {}
  );

  return subSlots;
}
