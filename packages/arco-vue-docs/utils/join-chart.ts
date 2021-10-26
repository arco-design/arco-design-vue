import axios from 'axios';
import { Message } from '@web-vue/components/index';

export default function joinChat() {
  if (!window.user) {
    Message.error({ content: '请先登陆' });
    return;
  }
  axios
    .get(`/api/oncall/joinChat?email=${window.user?.email}`)
    .then((res) => {
      if (res.data.status === 'success') {
        const aLink = document.createElement('a');
        aLink.href = ''; // lark link
        aLink.click();
      }
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line
      Message.error({ content: '未知错误，请重试！' });
    });
}
