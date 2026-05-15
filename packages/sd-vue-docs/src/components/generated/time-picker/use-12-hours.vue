<template>
  <sd-time-picker
    use12Hours
    defaultValue="12:20:20 AM"
    format="hh:mm:ss A"
    class="sd:w-48.5 sd:mr-6 sd:mb-6"
  />
  <sd-time-picker
    use12Hours
    defaultValue="09:20:20 pm"
    format="hh:mm:ss a"
    class="sd:w-48.5 sd:mr-6 sd:mb-6"
  />
  <sd-time-picker
    use12Hours
    defaultValue="2:20 AM"
    format="h:mm A"
    class="sd:w-48.5 sd:mr-6 sd:mb-6"
  />
  <sd-time-picker
    type="time-range"
    use12Hours
    :defaultValue="['12:20:20 AM', '08:30:30 PM']"
    format="hh:mm:ss A"
    class="sd:w-75 sd:mr-6 sd:mb-6"
  />
</template>
