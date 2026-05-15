<template>
  <sd-time-picker
    class="sd:w-48.5 sd:mr-6 sd:mb-6"
    :disabledHours="() => [1, 2, 4, 14]"
    :disabledMinutes="() => [1, 2, 3, 4, 14, 15, 16, 20, 50]"
    :disabledSeconds="() => [1, 2, 3, 4, 5, 6, 7, 10, 14, 60]"
  />
  <sd-time-picker
    type="time-range"
    class="sd:w-63 sd:mr-6 sd:mb-6"
    :disabledHours="() => [1, 2, 4, 14]"
    :disabledMinutes="() => [1, 2, 3, 4, 14, 15, 16, 20, 50]"
    :disabledSeconds="() => [1, 2, 3, 4, 5, 6, 7, 10, 14, 60]"
  />
</template>
