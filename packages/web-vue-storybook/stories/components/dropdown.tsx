import { ref } from 'vue';
import { Dropdown, Dgroup, Doption, Button } from '@web-vue/components';

export default {
  setup() {
    const data = ref([111, 222, 3, 4]);

    return () => (
      // @ts-ignore
      <Dropdown
        v-slots={{
          content: () => (
            <Dgroup title="123">
              {data.value.map((item) => {
                if (item === 3) {
                  return null;
                }
                return <Doption value={item}>{item}</Doption>;
              })}
            </Dgroup>
          ),
        }}
        placeholder="test"
      >
        <Button>123</Button>
      </Dropdown>
    );
  },
};
