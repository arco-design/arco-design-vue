<template>
  <div>
    <sd-steps :current="2">
      <sd-step>Succeeded</sd-step>
      <sd-step>Processing</sd-step>
      <sd-step>Pending</sd-step>
    </sd-steps>
    <sd-divider />
    <div class="sd:text-[#c9cdd4] sd:leading-35 sd:text-center"> Step 2 Content </div>
  </div>
</template>
