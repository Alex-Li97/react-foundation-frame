import './index.scss';
import { useState, useEffect } from 'react';

import { GenTable } from './cpn/gen-table';

import { Input, Button } from 'antd';

const { TextArea } = Input;

import { Property } from '@/interface/common';
import { parseProperties } from '@/utils';

export default function GenPage() {
  const placeholder = `/** 业务类型 */
bigType:? string;
/** 姓名 */
name: string;
/** 年龄 */
age: number;
/** 身高 */
height?: number`;

  const [value, setValue] = useState('');
  const [valueLabel, setValueLabel] = useState<Property[]>([] as Property[]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (!value) {
      setValueLabel([] as Property[]);
    }
  }, [value]);

  return (
    <div>
      <div className="gen-table">
        <h1>表格生成器</h1>
        <div style={{ marginBottom: '20px' }}>
          <Button type="primary">查看代码</Button>
        </div>
        <div className="gen-main">
          <div style={{ marginRight: '30px' }} className="gen-input">
            <TextArea
              showCount
              style={{ height: 500, width: 240, resize: 'none' }}
              onChange={onChange}
              value={value}
              placeholder={placeholder}
            />
            <div className="btn-ctl" style={{ marginTop: '20px' }}>
              <Button type="primary">收起</Button>
              <Button
                type="primary"
                style={{ marginLeft: '20px' }}
                onClick={() => setValue('')}
              >
                清空
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: '20px' }}
                onClick={() => setValueLabel(parseProperties(value))}
              >
                生成
              </Button>
            </div>
          </div>
          <GenTable valueLabel={valueLabel} />
        </div>
      </div>
    </div>
  );
}
