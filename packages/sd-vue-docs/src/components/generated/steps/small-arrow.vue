<template>
  <div>
    <sd-steps type="arrow" :current="2" small class="sd:mb-5">
      <sd-step description="This is a description">Succeeded</sd-step>
      <sd-step description="This is a description">Processing</sd-step>
      <sd-step description="This is a description">Pending</sd-step>
    </sd-steps>
    <sd-steps type="arrow" :current="2" small status="error">
      <sd-step description="This is a description">Succeeded</sd-step>
      <sd-step description="This is a description">Processing</sd-step>
      <sd-step description="This is a description">Pending</sd-step>
    </sd-steps>
  </div>
</template>
