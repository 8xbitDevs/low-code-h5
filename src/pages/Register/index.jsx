import { useEffect, useState } from "react";
import EditorNav from "../../components/EditorNav/EditorNav";
import WorkManager from "../workmanager/WorkManager";
import {getToken} from "../Login"
import axios from "axios"
import "./index.scss"
import useDialog from "../../components/Dialog";

function Register(props) {

    const [username, setUsername] = useState({
        text: "",
        error: false
    });

    const [rePassword, setRePassword] = useState({
        text: "",
        error: false
    });

    const [password, setPassword] = useState({
        text: "",
        error: false
    });

    const [Dialog, openDialog] = useDialog();

    useEffect(() => {
        if (getToken() != null) {
            window.location.href = "/";
        }
    }, []);

    const handleUsernameOnFocus = () => {
        if (username.error) {
            setUsername({
                text: "",
                error: false
            })
        }
    }

    const handlePasswordOnFocus = () => {
        if (password.error) {
            setPassword({
                text: "",
                error: false
            })
        }
    }

    const handleRePasswordOnFocus = () => {
        if (password.error) {
            setRePassword({
                text: "",
                error: false
            })
        }
    }

    const handleUsernameChange = (e) => {
        const text = e.target.value;
        setUsername({
            text: text
        });
    }

    const handlePasswordChange = (e) => {
        const text = e.target.value;
        setPassword({
            text: text
        });
    }
    
    const handleRePasswordChange = (e) => {
        const text = e.target.value;
        setRePassword({
            text: text
        });
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmitClick();
        }
    }

    const handleSubmitClick = async () => {
        let flag = false;
        if (username.text == "") {
            setUsername({
                text: "用户名不能为空",
                error: true
            });
            flag = true;
        }
        if (password.text == "") {
            setPassword({
                text: "密码不能为空",
                error: true
            });
            flag = true;
        }
        if (rePassword.text != password.text) {
            setRePassword({
                text: "两次密码不同",
                error: true
            });
            flag = true;
        }
        if (flag) return;
        const postData = {
            username: username.text,
            password: password.text
        };
        const res = await axios.post(`http://${props.domain}/api/register`, postData);
        const resData = res.data;
        const localStorage = window.localStorage;
        if (resData.state == 0) {
            // TODO
            // 弹窗提示
            openDialog(resData.msg, () => {
                localStorage.removeItem("token");
            });
        }
        if (resData.state == 1) {
            // TODO
            // 弹窗提示
            openDialog("注册成功，点击确定跳转回首页", () => {
                console.log("回调");
                localStorage.setItem("token", JSON.stringify({
                    value: resData.token,
                    expiredTime: Date.now() + 1000 * 60 * 60 * 24 * 3
                }));
                window.location.href = "/";
            });
        }
    }

    return (
        <div className="container">
            <EditorNav></EditorNav>
            <div id="registerBox">
                <div id="registerTitle">
                    <h2>注册新账户</h2>
                </div>
                <a id="tologin" href="/login">已有账户？去登录</a>
                <div id="username">
                    <label>用户名：</label>
                    <input
                        type="text"
                        className={"typeBox " + (username.error ? "errorType" : "")}
                        placeholder="在此键入你的用户名"
                        value={username.text}
                        onChange={handleUsernameChange}
                        onFocus={handleUsernameOnFocus}
                        onKeyDown={handleKeyDown}
                    ></input>
                </div>
                <div id="password">
                    <label>密码：</label>
                    <input
                        type={password.error ? "text" : "password"}
                        className={"typeBox " + (password.error ? "errorType" : "")}
                        placeholder="在此键入你的密码"
                        value={password.text}
                        onChange={handlePasswordChange}
                        onFocus={handlePasswordOnFocus}
                        onKeyDown={handleKeyDown}
                    ></input>
                </div>
                <div id="repassword">
                    <label>重复密码：</label>
                    <input
                        type={rePassword.error ? "text" : "password"}
                        className={"typeBox " + (rePassword.error ? "errorType" : "")}
                        placeholder="在此键入你的密码"
                        value={rePassword.text}
                        onChange={handleRePasswordChange}
                        onFocus={handleRePasswordOnFocus}
                        onKeyDown={handleKeyDown}
                    ></input>
                </div>
                <button id="submitBtn" onClick={handleSubmitClick}>注册</button>
                <Dialog />
            </div>
        </div>
    );
}

export default Register;