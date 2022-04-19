```yaml
title:
  zh-CN: 幽灵节点
  en-US: Pending
```

## zh-CN

当任务状态正在发生，还在记录过程中，可用幽灵节点来表示当前的时间节点，通过`slot#pending-dot`定制其轴点。

---

## en-US

When the task state is happening and the recording is still in progress, ghost nodes can be used to represent the current time node, and its pivot point can be customized through `slot#pending-dot`.

---

```vue

<template>
  <a-row align="center" :style="{ marginBottom: '24px' }">
    <a-checkbox
      :checked="!!pendingProps.direction"
      @change="(v) => onChange({ direction: v ? 'horizontal' : '' })"
    >
      horizontal &nbsp; &nbsp;
    </a-checkbox>
    <a-checkbox
      :checked="!!pendingProps.reverse"
      @change="(v) => onChange({ reverse: v })"
    >
      reverse &nbsp; &nbsp;
    </a-checkbox>
    <a-checkbox
      :checked="!!pendingProps.pending"
      @change="
        (v) => onChange({ pending: v ? 'This is a pending dot' : false })
      "
    >
      pending &nbsp; &nbsp;
    </a-checkbox>

    <a-checkbox
      :checked="!!pendingProps.hasPendingDot"
      @change="(v) => onChange({ hasPendingDot: v })"
    >
      custom pendingDot
    </a-checkbox>
  </a-row>
  <a-timeline v-bind="pendingProps">
    <template v-if="pendingProps.hasPendingDot" #dot>
      <IconFire :style="{ color: '#e70a0a' }" />
    </template>
    <a-timeline-item label="2017-03-10" dotColor="#52C419">
      The first milestone
    </a-timeline-item>
    <a-timeline-item label="2018-05-12" dotColor="#F5222D">
      The second milestone
    </a-timeline-item>
    <a-timeline-item label="2020-09-30">The third milestone</a-timeline-item>
  </a-timeline>
</template>

<script>
import { ref } from 'vue';
import { IconFire } from '@arco-design/web-vue/es/icon';

export default {
  components: {
    IconFire,
  },
  setup() {
    const pendingProps = ref({});

    const onChange = (newProps) => {
      pendingProps.value = {
        ...pendingProps.value,
        ...newProps,
      };
    };

    return {
      pendingProps,
      onChange
    }
  },
};
</script>
```
