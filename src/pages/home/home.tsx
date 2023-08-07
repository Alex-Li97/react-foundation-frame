import reactLogo from '@/assets/react.svg';

import './home.scss';

import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'antd';

export default function HomePage() {
  const navigate = useNavigate();

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address'
    }
  ];
  return (
    <div className="home-main">
      <a className="home-main-a" target="_blank" rel="noreferrer">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <div className="btn-ctl">
        <Button type="primary" onClick={() => navigate('/genPage')}>
          页面生成器
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
}
