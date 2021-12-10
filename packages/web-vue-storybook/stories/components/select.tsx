import { ref } from 'vue';
import { Select } from '@web-vue/components';

export default {
  setup() {
    const data = ref([111, 222, 3]);

    return () => (
      // @ts-ignore
      <Select placeholder="test">
        {data.value.map((item) => (
          // @ts-ignore
          <Select.Option value={item}>{item}</Select.Option>
        ))}
      </Select>
    );
  },
};
