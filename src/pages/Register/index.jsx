import EditorNav from "../../components/EditorNav/EditorNav";
import WorkManager from "../workmanager/WorkManager";
import "./index.scss"

function Register(props) {

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
                    <input type="text" className="typeBox"></input>
                </div>
                <div id="password">
                    <label>密码：</label>
                    <input type="password" className="typeBox"></input>
                </div>
                <div id="repassword">
                    <label>重复密码：</label>
                    <input type="password" className="typeBox"></input>
                </div>
                <button id="submitBtn">注册</button>
            </div>
        </div>
    );
}

export default Register;