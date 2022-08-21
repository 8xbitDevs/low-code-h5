// 按需引入，用下载包后
import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
//import './index.css';

function useDialog() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dialog, setDialog] = useState("")
    const [callback, setCallback] = useState({
        func: () => {},
    });

    const open = (dialog, func) => {
        setDialog(dialog);
        setIsModalVisible(true);
        setCallback({
            func: func,
        });
    }

    function Dialog() {

        const handleOk = () => {
            setIsModalVisible(false);
            callback.func();
        };

        const handleCancel = () => {
            setIsModalVisible(false);
            callback.func();
        };

        return (
            <div>
                {/* isisModalVisible:出现弹窗  onOK:表示确定 onCancel:取消按钮*/}
                <Modal title="错误" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>{dialog}</p>
                </Modal>
            </div>
        )
    }

    return [
        Dialog,
        open
    ];

}

export default useDialog;