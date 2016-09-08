import React from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Table,
  Icon,
  Radio,
  InputNumber,
  Checkbox,
  Modal,
  message,
  notification,
  Affix
} from 'antd';
import globalConfig from 'config.js';
import Logger from '../../utils/Logger';
import ajax from '../../utils/ajax';

const FormItem = Form.Item;
const ButtonGroup = Button.Group;

const logger = Logger.getLogger('InnerTable');

/**
 * 内部表格组件
 */
class InnerTable extends React.Component {

  // 很多时候都要在antd的组件上再包一层
  state = {
    modalVisible: false,  // modal是否可见
    modalTitle: '新增',  // modal标题
    modalInsert: true,  // 当前modal是用来insert还是update

    selectedRowKeys: [],  // 当前有哪些行被选中, 这里只保存key
    selectedRows: [],  // 当前有哪些行被选中, 保存完整数据
  };

  /**
   * InnerTable组件的重render有两种可能:
   * 1. 上层组件调用的render方法, 这个时候会触发componentWillReceiveProps方法
   * 2. 自身状态变化引起的重新render
   * 注意区分
   *
   * 对于第一种情况, 要将组件的状态还原到初始状态
   *
   * @param nextProps
   */
  componentWillReceiveProps = (nextProps) => {
    logger.debug('receive new props and try to render, nextProps=%o', nextProps);
    // 其实传入的props和当前的props可能是一样的, 这个方法不会判断修改才触发
    // 要自己判断props是否有变化

    // 蛋疼的是, 要区分是上层组件引起的这个方法调用还是InnerTable组件本身引起的
    // 本来自身的变化是不应该触发的, 但不知antd的form组件做了什么, 每次给表单设置值的时候就会触发, 我讨厌黑盒...
    // 利用了一个特性: 如果是上层触发的, tableLoading必定是true
    if (nextProps.tableLoading === true) {
      // 所有状态都要手动还原到初始值
      // 这个方法里setState不会触发render
      this.setState({
        modalVisible: false,
        modalTitle: '新增',
        modalInsert: true,

        selectedRowKeys: [],
        selectedRows: [],
      });
    }
  }

  /**
   * 点击新增按钮, 弹出一个内嵌表单的modal
   *
   * @param e
   */
  onClickInsert = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
    this.setState({modalVisible: true, modalTitle: '新增', modalInsert: true});
  }

  /**
   * 点击更新按钮, 弹出一个内嵌表单的modal
   * 注意区分单条更新和批量更新
   *
   * @param e
   */
  onClickUpdate = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
    const multiSelected = this.state.selectedRowKeys.length > 1;  // 是否选择了多项
    // 如果只选择了一项, 就把原来的值填到表单里
    // 否则就只把要更新的主键填到表单里
    if (!multiSelected) {
      logger.debug('update single record, and fill original values');
      this.props.form.setFieldsValue(this.state.selectedRows.pop());  // FIXME: 理论上来说不应该这样去修改state中的值
    } else {
      const tmpObj = {};
      tmpObj[this.primaryKey] = this.state.selectedRowKeys.join(', ');
      logger.debug('update multiple records, keys = %s', tmpObj[this.primaryKey]);
      this.props.form.setFieldsValue(tmpObj);
    }

    if (multiSelected) {
      this.setState({modalVisible: true, modalTitle: '批量更新', modalInsert: false});
    } else {
      this.setState({modalVisible: true, modalTitle: '更新', modalInsert: false});
    }
  }

  /**
   * 点击删除按钮, 弹出一个确认对话框
   * 注意区分单条删除和批量删除
   *
   * @param e
   */
  onClickDelete = (e) => {
    e.preventDefault();
    Modal.confirm({
      title: this.state.selectedRowKeys.length > 1 ? '确认批量删除' : '确认删除',
      content: `当前被选中的行: ${this.state.selectedRowKeys.join(', ')}`,
      // 这里注意要用箭头函数, 否则this不生效
      onOk: () => {
        this.handleDelete();
      },
    });
  }

  /**
   * 隐藏modal
   */
  hideModal = () => {
    this.setState({modalVisible: false});
  }

  /**
   * 点击modal中确认按钮的回调
   */
  handleModalOk = () => {
    // 将表单中的undefined去掉
    // 表单传过来的主键是逗号分隔的字符串, 这里转换成数组
    const newObj = {};
    const primaryKeyArray = [];
    const oldObj = this.props.form.getFieldsValue();
    for (const key in oldObj) {
      if (!oldObj[key])
        continue;

      if (key === this.primaryKey && typeof oldObj[key] === 'string') {
        for (const str of oldObj[key].split(', ')) {
          // 按schema中的约定, 主键只能是int/varchar
          if (this.primaryKeyType === 'int') {
            primaryKeyArray.push(parseInt(str));
          } else {
            primaryKeyArray.push(str);
          }
        }
      } else {
        newObj[key] = oldObj[key];
      }
    }
    if (this.primaryKey && primaryKeyArray.length > 0) {
      newObj[this.primaryKey] = primaryKeyArray;
    }
    this.hideModal();
    logger.debug('click modal OK and the form obj = %o', newObj);

    if (this.state.modalInsert) {
      this.handleInsert(newObj);
    } else {
      this.handleUpdate(newObj);
    }
  }


  /*下面开始才是真正的数据库操作*/


  /**
   * 真正去处理新增数据
   */
  handleInsert = (obj) => {
    const url = `${globalConfig.getAPIPath()}/${this.props.tableName}/insert`;
    const hide = message.loading('正在新增...', 0);
    logger.debug('handleInsert: url = %s, obj = %o', url, obj);

    ajax.post(url).send(obj).end((err, res) => {
      hide();
      logger.debug('handleInsert: return error = %o, res = %o', err, res);
      // err就是一个字符串
      // res是一个Response对象, 其中的body字段才是服务端真正返回的数据
      if (err || !res.body.success) {
        notification.error({
          message: '新增失败',
          description: err ? '请求insert接口出错, 请联系管理员' : `请联系管理员, 错误信息: ${res.body.message}`,
          duration: 0,
        });
      } else {
        notification.success({
          message: '新增成功',
          description: this.primaryKey ? `新增数据行 主键=${res.body.data[this.primaryKey]}` : '',
          duration: 0,
        });
      }
    });
  }

  /**
   * 真正去更新数据
   */
  handleUpdate = (obj) => {
    const keys = obj[this.primaryKey];
    const url = `${globalConfig.getAPIPath()}/${this.props.tableName}/update?keys=${keys instanceof Array ? keys.join(',') : keys}`;
    const hide = message.loading('正在更新...', 0);
    obj[this.primaryKey] = undefined;

    logger.debug('handleUpdate: url = %s, obj = %o', url, obj);

    ajax.post(url).send(obj).end((err, res) => {
      hide();
      logger.debug('handleUpdate: return error = %o, res = %o', err, res);

      if (err || !res.body.success) {
        notification.error({
          message: '更新失败',
          description: err ? '请求update接口出错, 请联系管理员' : `请联系管理员, 错误信息: ${res.body.message}`,
          duration: 0,
        });
      } else {
        notification.success({
          message: '更新成功',
          description: `更新${res.body.data}条数据`,
          duration: 0,
        });
        // 更新数据后, 注意刷新下整个页面
        this.props.refresh();
      }
    });
  }

  /**
   * 真正去删除数据
   */
  handleDelete = () => {
    const url = `${globalConfig.getAPIPath()}/${this.props.tableName}/delete?keys=${this.state.selectedRowKeys.join(',')}`;
    const hide = message.loading('正在删除...', 0);
    logger.debug('handleDelete: url = %s', url);

    ajax.post(url).end((err, res) => {
      hide();
      logger.debug('handleDelete: return error = %o, res = %o', err, res);
      if (err || !res.body.success) {
        notification.error({
          message: '删除失败',
          description: err ? '请求delete接口出错, 请联系管理员' : `请联系管理员, 错误信息: ${res.body.message}`,
          duration: 0,
        });
      } else {
        notification.success({
          message: '删除成功',
          description: `删除${res.body.data}条数据`,
          duration: 0,
        });
        // 更新数据后, 注意刷新下整个页面
        this.props.refresh();
      }
    });
  }

  /**
   * 辅助函数
   *
   * @param formItem
   * @param field
   * @returns {XML}
   */
  colWrapper = (formItem, field) => {
    //const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
    return (
      <FormItem key={field.key} label={field.title} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        {formItem}
      </FormItem>
    );
  }

  /**
   * 将schema中的一个字段转换为表单的一项
   *
   * @param field
   */
  transFormField = (field) => {
    const {getFieldProps} = this.props.form;

    // 对于主键, 直接返回一个不可编辑的textarea
    if (this.primaryKey === field.key) {
      logger.debug('key %o is primary, transform to text area', field);
      return this.colWrapper((
        <Input type="textarea" autosize={{ minRows: 1, maxRows: 10 }} disabled
               size="default" {...getFieldProps(field.key)}/>
      ), field);
    }

    switch (field.dataType) {
      case 'int':
        logger.debug('transform field %o to integer input', field);
        return this.colWrapper((
          <InputNumber size="default" {...getFieldProps(field.key)}/>
        ), field);
      case 'float':
        logger.debug('transform field %o to float input', field);
        return this.colWrapper((
          <InputNumber step={0.01} size="default" {...getFieldProps(field.key)}/>
        ), field);
      case 'datetime':
        logger.debug('transform field %o to datetime input', field);
        return this.colWrapper((
          <DatePicker showTime format="yyyy-MM-dd HH:mm:ss"
                      placeholder={field.placeholder || '请选择日期'} {...getFieldProps(field.key)}/>
        ), field);
      default:  // 默认就是普通的输入框
        logger.debug('transform field %o to varchar input', field);
        return this.colWrapper((
          <Input placeholder={field.placeholder} size="default" {...getFieldProps(field.key)}/>
        ), field);
    }
  }

  /**
   * 处理表格的选择事件
   *
   * @param selectedRowKeys
   * @param selectedRows
   */
  handleSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({selectedRowKeys, selectedRows});
  }

  render() {
    // 解析schema
    const newCols = [];
    this.props.schema.forEach((field) => {
      const col = {};
      col.key = field.key;
      col.dataIndex = field.key;
      col.title = field.title;
      if (field.render) {
        col.render = field.render;
      }
      newCols.push(col);
      // 当前列是否是主键?
      if (field.primary) {
        this.primaryKey = field.key;
        this.primaryKeyType = field.dataType;
      }
    });

    // 对数据也要处理一下
    // 每行数据都必须有个key属性, 如果指定了主键, 就以主键为key
    // 否则直接用个自增数字做key
    const newData = [];
    let i = 0;
    this.props.data.forEach((obj) => {
      const newObj = Object.assign({}, obj);
      if (this.primaryKey) {
        newObj.key = obj[this.primaryKey];
      } else {
        newObj.key = i;
        i++;
      }
      newData.push(newObj);
    });

    // 生成表单项
    const formItems = [];
    this.props.schema.forEach((field) => {
      formItems.push(this.transFormField(field));
    });

    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.handleSelectChange,
    };

    const hasSelected = this.state.selectedRowKeys.length > 0;  // 是否选择
    const multiSelected = this.state.selectedRowKeys.length > 1;  // 是否选择了多项

    return (
      <div>
        <div className="db-table-button">
          <Affix offsetTop={8} target={() => document.getElementById('main-content-div')}>
            <ButtonGroup>
              <Button type="primary" onClick={this.onClickInsert}>
                <Icon type="plus-circle-o"/> 新增
              </Button>
              {/* 注意这里, 如果schema中没有定义主键, 不允许update或delete */}
              <Button type="primary" disabled={!hasSelected || !this.primaryKey} onClick={this.onClickUpdate}>
                <Icon type="edit"/> {multiSelected ? '批量修改' : '修改'}
              </Button>
              <Button type="primary" disabled={!hasSelected || !this.primaryKey} onClick={this.onClickDelete}>
                <Icon type="delete"/> {multiSelected ? '批量删除' : '删除'}
              </Button>
            </ButtonGroup>
          </Affix>
          <Modal title={this.state.modalTitle} visible={this.state.modalVisible} onOk={this.handleModalOk}
                 onCancel={this.hideModal}>
            <Form horizontal>
              {formItems}
            </Form>
          </Modal>
        </div>

        <Table rowSelection={rowSelection} columns={newCols} dataSource={newData} pagination={false}
               loading={this.props.tableLoading}/>
      </div>
    );
  }

}

InnerTable = Form.create()(InnerTable);

export default InnerTable;
