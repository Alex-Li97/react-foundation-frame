import { Button, Table } from 'antd';
import { useState } from 'react';

import { Property } from '@/interface/common';

export function GenTable({
  valueLabel: valueLabel
}: {
  valueLabel: Property[];
}) {
  // 解析valueLabel
  const columns = [
    {
      title: '属性名',
      dataIndex: 'label',
      key: 'label'
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value'
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (_: undefined, column: Property & { key: string }) => (
        <span>
          <Button type="primary">编辑</Button>
          <Button
            type="primary"
            style={{ marginLeft: '20px' }}
            onClick={() => orderClomun(column.key)}
          >
            排序
          </Button>
          <Button type="primary" style={{ marginLeft: '20px' }}>
            删除
          </Button>
        </span>
      )
    }
  ];
  const [dataSource, setDataSource] = useState(
    valueLabel.map((item, index) => {
      return {
        key: item.value + index,
        label: item.label,
        value: item.value
      };
    })
  );

  /**
   * 排序
   */
  const orderClomun = (key: string) => {
    console.log(key);
    setDataSource([] as any);
  };
  // 生成table

  return (
    <Table style={{ width: 500 }} dataSource={dataSource} columns={columns} />
  );
}
