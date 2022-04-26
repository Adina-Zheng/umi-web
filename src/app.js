//dva运行时配置，这里可以看到一些接口异常

import { message } from 'antd';

export const dva = {
    config: {
        onError(e) {
            message.error(e.message, 3);
        },
    },
};