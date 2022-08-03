import React from 'react'
import './EssentialData.scss'
import { useState, useEffect } from 'react'
import { Space, Table } from 'antd'
import 'antd/dist/antd.css'

function EssentialData() {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Forms',
      dataIndex: 'froms',
      key: 'froms',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.id}</a>
        </Space>
      ),
    },
  ]

  // 列表数据管理
  const [datasSource, setDatasSource] = useState({
    data: [
      {
        key: '1',
        id: '1',
        title: 32,
        froms: '1',
      },

      {
        key: '1',
        id: '2',
        title: 32,
        froms: '1 ',
      },
      { key: '2', id: '3', title: 42, froms: ' 1' },
      {
        key: '3',
        id: '4',
        title: 32,
        froms: '1',
      },
    ],
  })
  // 参数管理
  const [params, setParams] = useState({
    page: 1,
    per_page: 6,
  })
  // 发送接口请求
  useEffect(() => {
    async function fetchDatasSource() {
      const res = await http.get('#', { params })
      setDatasSource({
        list: res.data,
      })
    }
    fetchDatasSource()
  }, [params])
  const pageChange = (page) => {
    // 当前页参数params 引起接口更新
    setParams({
      ...params,
      page,
    })
  }
  return (
    <Table
      columns={columns}
      dataSource={datasSource.data}
      pagination={{
        position: ['bottomRight'],
        current: params.page,
        pageSize: params.per_page,
        onChange: pageChange,
      }}
    />
  )
}
export default EssentialData
