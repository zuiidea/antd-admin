import React from 'react';
import {Pagination, Select} from 'antd';

/**
 * 内部分页器组件
 */
class InnerPagination extends React.Component {

  render() {
    // 有些状态要传到父组件中去处理
    return (
      <div className="db-pagination">
        <Pagination
          showQuickJumper
          selectComponentClass={Select}
          total={this.props.total}
          showTotal={(total) => `每页${this.props.pageSize}条, 共 ${total} 条`}
          pageSize={this.props.pageSize} defaultCurrent={1}
          current={this.props.currentPage}
          onChange={this.props.parentHandlePageChange}
        />
      </div>
    );
  }

}

export default InnerPagination;
