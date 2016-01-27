import '../../common/lib';
import { Button ,Switch ,Icon} from 'antd';
import ReactDOM from 'react-dom';
import React from 'react';

function onChange(checked){
  console.log('switch to ' + checked);
}

ReactDOM.render(<div><Button type="ghost">用户</Button>
<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} />
<Switch defaultChecked={false} onChange={onChange} /></div>, document.getElementById('react-content'));
