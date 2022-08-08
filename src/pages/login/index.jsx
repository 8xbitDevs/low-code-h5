import { useEffect, useState } from 'react'
import axios from 'axios'
import './index.scss'
import useDialog from '../../components/Dialog'

export function getToken() {
  const localStorage = window.localStorage
  const token = JSON.parse(localStorage.getItem('token'))
  if (token == null) return null
  if (token.expiredTime < Date.now()) {
    localStorage.removeItem('token')
    return null
  } else {
    return token.value
  }
}

function Login(props) {
  const [username, setUsername] = useState({
    text: '',
    error: false,
  })

  const [password, setPassword] = useState({
    text: '',
    error: false,
  })

  const [Dialog, openDialog] = useDialog()

  useEffect(() => {
    if (getToken() != null) {
      window.location.href = '/'
    }
  }, [])

  const handleUsernameOnFocus = () => {
    if (username.error) {
      setUsername({
        text: '',
        error: false,
      })
    }
  }

  const handlePasswordOnFocus = () => {
    if (password.error) {
      setPassword({
        text: '',
        error: false,
      })
    }
  }

  const handleUsernameChange = (e) => {
    const text = e.target.value
    setUsername({
      text: text,
    })
  }

  const handlePasswordChange = (e) => {
    const text = e.target.value
    setPassword({
      text: text,
    })
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmitClick()
    }
  }

  const handleSubmitClick = async () => {
    let flag = false
    if (username.text == '') {
      setUsername({
        text: '用户名不能为空',
        error: true,
      })
      flag = true
    }
    if (password.text == '') {
      setPassword({
        text: '密码不能为空',
        error: true,
      })
      flag = true
    }
    if (flag) return
    const postData = {
      username: username.text,
      password: password.text,
    }
    const res = await axios.post(`http://${props.domain}/api/login`, postData)
    const resData = res.data
    const localStorage = window.localStorage
    if (resData.state == 0) {
      // TODO
      // 弹窗提示
      openDialog(resData.msg, () => {
        localStorage.removeItem('token')
      })
    }
    if (resData.state == 1) {
      // TODO
      // 弹窗提示
      openDialog('登录成功，点击确定跳转回首页', () => {
        localStorage.setItem(
          'token',
          JSON.stringify({
            value: resData.token,
            expiredTime: Date.now() + 1000 * 60 * 60 * 24 * 3,
          })
        )
        window.location.href = '/'
      })
    }
  }

  return (
    <div className="container">
      <div id="loginBox">
        <div id="loginTitle">
          <h2>登录到8xbitsDevs</h2>
        </div>
        <a id="toregister" href="/register">
          没有账户？去注册
        </a>
        <div id="username">
          <label className='lable'>用户名：</label>
          <input
            type="text"
            className={'typeBox ' + (username.error ? 'errorType' : '')}
            placeholder="在此键入你的用户名"
            value={username.text}
            onChange={handleUsernameChange}
            onFocus={handleUsernameOnFocus}
            onKeyDown={handleKeyDown}></input>
        </div>
        <div id="password">
          <label className='lable'>密码：</label>
          <input
            type={password.error ? 'text' : 'password'}
            className={'typeBox ' + (password.error ? 'errorType' : '')}
            placeholder="在此键入你的密码"
            value={password.text}
            onChange={handlePasswordChange}
            onFocus={handlePasswordOnFocus}
            onKeyDown={handleKeyDown}></input>
        </div>
        <button id="submitBtn" onClick={handleSubmitClick}>
          登录
        </button>
        <Dialog />
      </div>
    </div>
  )
}

export default Login

