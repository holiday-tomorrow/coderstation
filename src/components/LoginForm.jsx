import { useState, useRef, useEffect } from 'react'
import { Modal, Radio, Form, Button, Input, Row, Col, Checkbox, message } from 'antd'
import styles from '../css/LoginForm.module.css'
import { getCaptcha, userIsExist, addUser, userLogin, getUserById } from '../api/user'
import { initUserInfo, loginStateChange } from '../redux/userSlice'
import { useDispatch } from 'react-redux'
export default function LoginForm(props) {
    const [radioValue, setRadioValue] = useState(1)
    const [loginInfo, setLoginInfo] = useState({
        loginId: "",
        loginPwd: "",
        captcha: "",
        remember: false
    })
    const [registerInfo, setRegisterInfo] = useState({
        loginId: "",
        nickname: "",
        captcha: "",
    })
    const [captcha, setCaptcha] = useState(null);
    const loginFormRef = useRef();
    const registerFormRef = useRef();
    const dispatch = useDispatch();
    // 弹窗关闭
    let handleOk = () => {

    }
    // 选择登录还是注册
    let radioChange = (e) => {
        setRadioValue(e.target.value)
        // 切换登录和注册时，重新获取验证码
        captchaClickHandle();
    }
    // 登录相关
    let loginHandle = () => {
        userLogin(loginInfo).then(res => {
            let data = res.data
            console.log(data, 'data');
            if (data) {
                if (!data.data) {
                    message.error("账号或密码不正确")
                    captchaClickHandle();
                } else if (!data.data.enabled) {
                    message.error("该账号已被禁用")
                    captchaClickHandle();
                } else {
                    localStorage.setItem("userToken", data.token)
                    getUserById(data.data._id).then(res => {
                        if (res.data) {
                            message.success("登录成功");
                            dispatch(initUserInfo(res.data))
                            dispatch(loginStateChange(true))
                            handleCancel()
                        }
                    })
                }
            } else {
                message.warn(res.msg)
                captchaClickHandle();
            }
        })
    }
    let updateInfo = (obj, value, key, setValue) => {
        let newObj = { ...obj }
        if (typeof value === 'string') {
            newObj[key] = value.trim()
        } else {
            newObj[key] = value
        }
        setValue(newObj)
    }
    let captchaClickHandle = () => {
        getCaptcha().then(res => {
            setCaptcha(res)
        })
    }
    // 注册相关
    let registerHandle = () => {
        addUser(registerInfo).then(res => {
            console.log(res);
            if (res.data) {
                message.success("用户注册成功，新用户默认密码123456");
                dispatch(initUserInfo(res.data))
                dispatch(loginStateChange(true))
                handleCancel()
            } else {
                captchaClickHandle()
                message.warn(res.msg)
            }
        })
    }
    // 验证用户是否已经存在
    let checkLoginIdIsExist = async () => {
        if (!registerInfo.loginId) return
        let { data } = await userIsExist(registerInfo.loginId)
        if (data) {
            return Promise.reject('登录账号已存在')
        }
        return Promise.resolve()
    }
    // 弹窗关闭
    let handleCancel = () => {
        setLoginInfo({
            loginId: "",
            loginPwd: "",
            captcha: "",
            remember: false
        })
        setRegisterInfo({
            loginId: "",
            nickname: "",
            captcha: "",
        })
        props.handleCancel()
    }
    useEffect(() => {
        captchaClickHandle()
    }, [props.isShow])
    return (
        <Modal
            title="登录/注册"
            open={props.isShow}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
            <Radio.Group
                value={radioValue}
                buttonStyle="solid"
                onChange={radioChange}
                className={styles.radioGroup}
            >
                <Radio.Button value={1} className={styles.radioButton}>登录</Radio.Button>
                <Radio.Button value={2} className={styles.radioButton}>注册</Radio.Button>
                {/* 表单内容 */}
                {
                    radioValue === 1 ? <div className={styles.container}>
                        <Form
                            name="basic1"
                            autoComplete="off"
                            onFinish={loginHandle}
                            ref={loginFormRef}
                        >
                            <Form.Item
                                label="登录账号"
                                name="loginId"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入账号",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="请输入你的登录账号"
                                    value={loginInfo.loginId}
                                    onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginId', setLoginInfo)}
                                />
                            </Form.Item>

                            <Form.Item
                                label="登录密码"
                                name="loginPwd"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入密码",
                                    },
                                ]}
                            >
                                <Input.Password
                                    placeholder="请输入你的登录密码，新用户默认为123456"
                                    value={loginInfo.loginPwd}
                                    onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginPwd', setLoginInfo)}
                                />
                            </Form.Item>

                            {/* 验证码 */}
                            <Form.Item
                                name="logincaptcha"
                                label="验证码"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入验证码',
                                    },
                                ]}
                            >
                                <Row align="middle">
                                    <Col span={16}>
                                        <Input
                                            placeholder="请输入验证码"
                                            value={loginInfo.captcha}
                                            onChange={(e) => updateInfo(loginInfo, e.target.value, 'captcha', setLoginInfo)}
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <div
                                            className={styles.captchaImg}
                                            onClick={captchaClickHandle}
                                            dangerouslySetInnerHTML={{ __html: captcha }}
                                        ></div>
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item
                                name="remember"
                                wrapperCol={{
                                    offset: 5,
                                    span: 16,
                                }}
                            >
                                <Checkbox
                                    onChange={(e) => updateInfo(loginInfo, e.target.checked, 'remember', setLoginInfo)}
                                    checked={loginInfo.remember}
                                >记住我</Checkbox>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 5,
                                    span: 16,
                                }}
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ marginRight: 20 }}
                                >
                                    登录
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    重置
                                </Button>
                            </Form.Item>
                        </Form>
                    </div> : <div className={styles.container}>
                        <Form
                            name="basic2"
                            autoComplete="off"
                            ref={registerFormRef}
                            onFinish={registerHandle}
                        >
                            <Form.Item
                                label="登录账号"
                                name="loginId"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入账号，仅此项为必填项",
                                    },
                                    // 验证用户是否已经存在
                                    { validator: checkLoginIdIsExist },
                                ]}
                                validateTrigger='onBlur'
                            >
                                <Input
                                    placeholder="请输入账号"
                                    value={registerInfo.loginId}
                                    onChange={(e) => updateInfo(registerInfo, e.target.value, 'loginId', setRegisterInfo)}
                                />
                            </Form.Item>

                            <Form.Item
                                label="用户昵称"
                                name="nickname"
                            >
                                <Input
                                    placeholder="请输入昵称，不填写默认为新用户xxx"
                                    value={registerInfo.nickname}
                                    onChange={(e) => updateInfo(registerInfo, e.target.value, 'nickname', setRegisterInfo)}
                                />
                            </Form.Item>

                            <Form.Item
                                name="registercaptcha"
                                label="验证码"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入验证码',
                                    },
                                ]}
                            >
                                <Row align="middle">
                                    <Col span={16}>
                                        <Input
                                            placeholder="请输入验证码"
                                            value={registerInfo.captcha}
                                            onChange={(e) => updateInfo(registerInfo, e.target.value, 'captcha', setRegisterInfo)}
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <div
                                            className={styles.captchaImg}
                                            onClick={captchaClickHandle}
                                            dangerouslySetInnerHTML={{ __html: captcha }}
                                        ></div>
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 5,
                                    span: 16,
                                }}
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ marginRight: 20 }}
                                >
                                    注册
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    重置
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                }
            </Radio.Group>
        </Modal>
    )
}
