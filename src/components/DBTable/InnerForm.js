import React from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  DatePicker,
  Select,
  Icon,
  Radio,
  InputNumber,
  Checkbox,
  message,
  Upload,
  notification
} from 'antd';
import globalConfig from 'config.js';
import Logger from '../../utils/Logger';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

const logger = Logger.getLogger('InnerForm');

/**
 * 内部表单组件
 */
class InnerForm extends React.Component {

  // 本来想在初始化时解析schema, 结果发现不行
  // 解析schema的过程还是改到render里了

  /**
   * 辅助函数, 将一个input元素包装下
   *
   * @param formItem
   * @param field
   * @returns {XML}
   */
  colWrapper = (formItem, field) => {
    //const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
    return (
      <Col key={field.key} sm={8}>
        <FormItem key={field.key} label={field.title} labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
          {formItem}
        </FormItem>
      </Col>
    );
  }

  /**
   * 将schema中的一列转换为下拉框
   *
   * @param field
   */
  transformSelect = (field) => {
    // TODO: 这里是否要做schema校验
    const options = [];
    const {getFieldProps} = this.props.form;

    logger.debug('transform field %o to Select component', field);
    field.options.forEach((option) => {
      options.push(<Option key={option.key} value={option.key}>{option.value}</Option>);
    });

    return this.colWrapper((
      <Select placeholder={field.placeholder || '请选择'} size="default" {...getFieldProps(field.key)}>
        {options}
      </Select>
    ), field);
  }

  /**
   * 将schema中的一列转换为单选框
   *
   * @param field
   */
  transformRadio = (field) => {
    const options = [];
    const {getFieldProps} = this.props.form;

    logger.debug('transform field %o to Radio component', field);
    field.options.forEach((option) => {
      options.push(<Radio key={option.key} value={option.key}>{option.value}</Radio>);
    });

    return this.colWrapper((
      <RadioGroup {...getFieldProps(field.key)}>
        {options}
      </RadioGroup>
    ), field);
  }

  /**
   * 将schema中的一列转换为checkbox
   *
   * @param field
   */
  transformCheckbox = (field) => {
    const options = [];
    const {getFieldProps} = this.props.form;

    logger.debug('transform field %o to Checkbox component', field);
    field.options.forEach((option) => {
      options.push({label: option.value, value: option.key});
    });

    return this.colWrapper((
      <CheckboxGroup options={options} {...getFieldProps(field.key)}/>
    ), field);
  }

  /**
   * 转换为下拉多选框
   *
   * @param field
   * @returns {XML}
   */
  transformMultiSelect = (field) => {
    const options = [];
    const {getFieldProps} = this.props.form;

    logger.debug('transform field %o to MultipleSelect component', field);
    field.options.forEach((option) => {
      options.push(<Option key={option.key} value={option.key}>{option.value}</Option>);
    });

    return this.colWrapper((
      <Select multiple placeholder={field.placeholder || '请选择'} size="default" {...getFieldProps(field.key)}>
        {options}
      </Select>
    ), field);
  }

  /**
   * 将schema中的一列转换为普通输入框
   *
   * @param field
   * @returns {XML}
   */
  transformNormal = (field) => {
    const {getFieldProps} = this.props.form;
    switch (field.dataType) {
      case 'int':
        logger.debug('transform field %o to integer input component', field);
        return this.colWrapper((
          <InputNumber size="default" {...getFieldProps(field.key)}/>
        ), field);
      case 'float':
        logger.debug('transform field %o to float input component', field);
        return this.colWrapper((
          <InputNumber step={0.01} size="default" {...getFieldProps(field.key)}/>
        ), field);
      case 'datetime':
        logger.debug('transform field %o to datetime input component', field);
        return this.colWrapper((
          <DatePicker showTime format="yyyy-MM-dd HH:mm:ss"
                      placeholder={field.placeholder || '请选择日期'} {...getFieldProps(field.key)}/>
        ), field);
      default:  // 默认就是普通的输入框
        logger.debug('transform field %o to varchar input component', field);
        return this.colWrapper((
          <Input placeholder={field.placeholder} size="default" {...getFieldProps(field.key)}/>
        ), field);
    }
  }

  /**
   * 也是个辅助函数, 由于是范围查询, 输入的formItem是两个, 一个用于begin一个用于end
   *
   * @param beginFormItem
   * @param endFormItem
   * @param field
   * @returns {XML}
   */
  betweenColWrapper = (beginFormItem, endFormItem, field) => {
    // 布局真是个麻烦事
    // col内部又用了一个row做布局
    // const {getFieldProps} = this.props.form;
    return (
      <Col key={`${field.key}Begin`} sm={8}>
        <Row>
          <Col span={16}>
            <FormItem key={`${field.key}Begin`} label={field.title} labelCol={{ span: 15 }} wrapperCol={{ span: 9 }}>
              {beginFormItem}
            </FormItem>
          </Col>
          <Col span={7} offset={1}>
            <FormItem key={`${field.key}End`} labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
              {endFormItem}
            </FormItem>
          </Col>
        </Row>
      </Col>
    );
  }

  /**
   * between类型比较特殊, 普通元素每个宽度是8, int和float的between元素宽度也是8, 但datetime类型的between元素宽度是16
   * 否则排版出来不能对齐, 太丑了, 逼死强迫症
   * 而且普通的transform函数返回是一个object, 而这个函数返回是一个array, 就是因为datetime的between要占用两列
   *
   * @param field
   */
  transformBetween = (field) => {
    const cols = [];
    let beginFormItem;
    let endFormItem;
    const {getFieldProps} = this.props.form;

    switch (field.dataType) {
      case 'int':
        logger.debug('transform field %o to integer BETWEEN component', field);
        beginFormItem = (<InputNumber size="default"
                                      placeholder={field.placeholderBegin || '最小值'} {...getFieldProps(`${field.key}Begin`)}/>);
        endFormItem = (<InputNumber size="default"
                                    placeholder={field.placeholderEnd || '最大值'} {...getFieldProps(`${field.key}End`)}/>);
        cols.push(this.betweenColWrapper(beginFormItem, endFormItem, field));
        break;
      case 'float':
        logger.debug('transform field %o to float BETWEEN component', field);
        beginFormItem = (<InputNumber step={0.01} size="default"
                                      placeholder={field.placeholderBegin || '最小值'} {...getFieldProps(`${field.key}Begin`)}/>);
        endFormItem = (<InputNumber step={0.01} size="default"
                                    placeholder={field.placeholderEnd || '最大值'} {...getFieldProps(`${field.key}End`)}/>);
        cols.push(this.betweenColWrapper(beginFormItem, endFormItem, field));
        break;
      // datetime类型的between要占用两个Col
      // 不写辅助函数了, 直接这里写jsx吧...
      case 'datetime':
        logger.debug('transform field %o to datetime BETWEEN component', field);
        cols.push(
          <Col key={`${field.key}Begin`} sm={8}>
            <FormItem key={`${field.key}Begin`} label={field.title} labelCol={{ span: 10 }} wrapperCol={{ span:14 }}>
              <DatePicker showTime format="yyyy-MM-dd HH:mm:ss"
                          placeholder={field.placeholderBegin || '开始日期'} {...getFieldProps(`${field.key}Begin`)}/>
            </FormItem>
          </Col>
        );
        cols.push(<Col key={`${field.key}End`} sm={8}>
          <FormItem key={`${field.key}End`} labelCol={{ span: 10 }} wrapperCol={{ span:14 }}>
            <DatePicker showTime format="yyyy-MM-dd HH:mm:ss"
                        placeholder={field.placeholderEnd || '结束日期'} {...getFieldProps(`${field.key}End`)}/>
          </FormItem>
        </Col>);
        break;
      default:
        // 理论上来说不会出现这种情况
        logger.error('unknown dataType: %s', field.dataType);
    }
    return cols;
  }

  /**
   * 表单的查询条件不能直接传给后端, 要处理一下
   *
   * @param oldObj
   * @returns {{}}
   */
  filterQueryObj(oldObj) {
    // 将提交的值中undefined的去掉
    const newObj = {};
    for (const key in oldObj) {
      if (oldObj[key]) {
        // 对于js的日期类型, 要转换成字符串再传给后端
        if (oldObj[key] instanceof Date) {
          newObj[key] = oldObj[key].format('yyyy-MM-dd HH:mm:ss');
        } else {
          newObj[key] = oldObj[key];
        }
      }
    }
    logger.debug('old queryObj: %o, new queryObj %o', oldObj, newObj);
    return newObj;
  }

  /**
   * 处理表单提交
   *
   * @param e
   */
  handleSubmit = (e) => {
    e.preventDefault();

    const oldObj = this.props.form.getFieldsValue();
    const newObj = this.filterQueryObj(oldObj);

    // 还是要交给上层组件处理, 因为要触发table组件的状态变化...
    this.props.parentHandleSubmit(newObj);
  }

  handleReset = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
  }

  /**
   * 处理数据导入
   */
  handleImport = (info) => {
    logger.debug('upload status: %s', info.file.status);
    // 正在导入时显示一个提示信息
    if (info.file.status === 'uploading') {
      if (!this.hideLoading) {
        let hide = message.loading('正在导入...');
        this.hideLoading = hide;
      }
    }
    // 导入完成, 无论成功或失败, 必须给出提示, 并且要用户手动关闭
    else if (info.file.status === 'error') {
      this.hideLoading();
      this.hideLoading = undefined;
      notification.error({
        message: '导入失败',
        description: '文件上传失败, 请联系管理员',
        duration: 0,
      });
    }
    // done的情况下还要判断返回值
    else if (info.file.status === 'done') {
      this.hideLoading();
      this.hideLoading = undefined;
      logger.debug('upload result %o', info.file.response);
      if (!info.file.response.success) {
        notification.error({
          message: '导入失败',
          description: `请联系管理员, 错误信息: ${info.file.response.message}`,
          duration: 0,
        });
      } else {
        notification.success({
          message: '导入成功',
          description: info.file.response.data,
          duration: 0,
        });
      }
    }
  }

  /**
   * 处理数据导出
   * 本质上也是提交表单, 跟handleSubmit有点类似
   * 但不用再提交给上层组件处理了, 因为不需要改变表格组件的状态
   */
  handleExport = (e) => {
    e.preventDefault();

    const oldObj = this.props.form.getFieldsValue();
    const newObj = this.filterQueryObj(oldObj);

    // 导出前必须选定了一些查询条件, 不允许导出全表
    // 防止误操作
    if (Object.keys(newObj).length === 0) {
      message.warning('导出时查询条件不能为空', 4.5);
      return;
    }

    // ajax是不能处理下载请求的, 必须交给浏览器自己去处理
    // 坏处是我就不知道用户的下载是否成功了
    const url = `${globalConfig.getAPIPath()}/${this.props.tableName}/export`;
    window.open(`${url}?q=${encodeURIComponent(JSON.stringify(newObj))}`);  // 注意url编码
  }

  render() {
    const rows = [];
    let cols = [];

    // 参见antd的布局, 每行被分为24个格子
    // 普通的字段每个占用8格, between类型的字段每个占用16格
    let spaceLeft = 24;
    this.props.schema.forEach((field)=> {
      // 当前列需要占用几个格子? 普通的都是8, 只有datetime between是16
      let spaceNeed = 8;
      if (field.showType === 'between' && field.dataType === 'datetime') {
        spaceNeed = 16;
      }

      // 如果当前行空间不足, 就换行
      if (spaceLeft < spaceNeed) {
        rows.push(<Row key={rows.length} gutter={16}>{cols}</Row>);
        cols = [];  // 不知array有没有clear之类的方法
        spaceLeft = 24;  // 剩余空间重置
      }

      // 开始push各种FormItem
      switch (field.showType) {
        case 'select':
          cols.push(this.transformSelect(field));
          break;
        case 'radio':
          cols.push(this.transformRadio(field));
          break;
        case 'checkbox':
          cols.push(this.transformCheckbox(field));
          break;
        case 'multiSelect':
          cols.push(this.transformMultiSelect(field));
          break;
        case 'between':
          for (const col of this.transformBetween(field)) {  // between类型比较特殊, 返回的是一个数组
            cols.push(col)
          }
          break;
        default:
          cols.push(this.transformNormal(field));
      }

      spaceLeft -= spaceNeed;
    });

    // 别忘了最后一行
    if (cols.length > 0) {
      rows.push(<Row key={rows.length} gutter={16}>{cols}</Row>);
    }

    // 上传相关配置
    const uploadProps = {
      name: 'file',
      action: `${globalConfig.getAPIPath()}/${this.props.tableName}/import`,
      showUploadList: false,
      onChange: this.handleImport,
    };

    // 表单的前面是一堆输入框, 最后一行是按钮
    return (
      <Form horizontal className="ant-advanced-search-form">
        {rows}
        <Row>
          <Col span={12} offset={12} style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={this.handleSubmit}><Icon type="search"/>查询</Button>
            <Button onClick={this.handleReset}><Icon type="cross"/>清除条件</Button>
            {this.props.tableConfig.showExport ?
              <Button onClick={this.handleExport}><Icon type="export"/>导出</Button> : ''}
            {this.props.tableConfig.showImport ?
              <Upload {...uploadProps}><Button><Icon type="upload"/>导入</Button></Upload> : ''}
          </Col>
        </Row>
      </Form>
    );
  }

}

InnerForm = Form.create()(InnerForm);  // antd中的表单组件还要这么包装一层

export default InnerForm;
