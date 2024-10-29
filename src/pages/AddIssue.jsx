import { useState, useEffect, useRef } from 'react'
import styles from "../css/AddIssue.module.css"
import { Form, Input, Select, Button } from 'antd'
import { typeOptionCreator } from '../utils/tool'
import { useNavigate } from 'react-router-dom'
import { getTypeList } from '../redux/typeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addIssue } from '../api/issue'
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import "@toast-ui/editor/dist/i18n/zh-cn";
export default function AddIssue() {
    let [issueInfo, setIssueInfo] = useState({
        issueTitle: '',
        typeId: '',
        userId: '',
        issueContent: '',
    })
    let { typeList } = useSelector(state => state.type)
    let { userInfo } = useSelector(state => state.user)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let formRef = useRef()
    let editorRef = useRef()
    let updateInfo = (value, key) => {
        let newObj = { ...issueInfo }
        if (typeof value === 'string') {
            newObj[key] = value.trim()
        } else {
            newObj[key] = value
        }
        setIssueInfo(newObj)
    }
    let addHandle = () => {
        let content = editorRef.current.getInstance().getHTML();
        addIssue({
            issueTitle: issueInfo.issueTitle, // 问题标题
            issueContent: content, // 问题描述
            userId: userInfo._id, // 用户 id
            typeId: issueInfo.typeId,
        }).then((res) => {
            navigate('/Issues')
        })
    }
    let handleChange = (value) => {
        updateInfo(value, 'typeId')
    }
    useEffect(() => {
        if (!typeList.length) {
            dispatch(getTypeList())
        }
    }, [])
    return (
        <div className={styles.container}>
            <Form
                name="basic"
                initialValues={issueInfo}
                autoComplete="off"
                ref={formRef}
                onFinish={addHandle}
            >
                {/* 问答标题 */}
                <Form.Item
                    label="标题"
                    name="issueTitle"
                    rules={[{ required: true, message: '请输入标题' }]}
                >
                    <Input
                        placeholder="请输入标题"
                        size="large"
                        value={issueInfo.issueTitle}
                        onChange={(e) => updateInfo(e.target.value, 'issueTitle')}
                    />
                </Form.Item>

                {/* 问题类型 */}
                <Form.Item
                    label="问题分类"
                    name="typeId"
                    rules={[{ required: true, message: '请选择问题所属分类' }]}
                >
                    <Select
                        style={{ width: 200 }}
                        onChange={handleChange}>
                        {typeOptionCreator(Select, typeList)}
                    </Select>
                </Form.Item>


                {/* 问答内容 */}
                <Form.Item
                    label="问题描述"
                    name="issueContent"
                    rules={[{ required: true, message: '请输入问题描述' }]}
                >
                    <Editor
                        initialValue=""
                        previewStyle="vertical"
                        height="600px"
                        initialEditType="wysiwyg"
                        useCommandShortcut={true}
                        language='zh-CN'
                        ref={editorRef}
                    />

                </Form.Item>


                {/* 确认修改按钮 */}
                <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        确认新增
                    </Button>

                    <Button type="link" htmlType="submit" className="resetBtn">
                        重置
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
