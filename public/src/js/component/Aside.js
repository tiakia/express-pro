import React, { Component } from 'react';

export default class Aside extends Component{
  constructor(props){
    super(props);
    this.state ={
      mode: 'login',
      form: {
        userName: {
          value: '',
          error: ''
        },
        password: {
          value: '',
          error: ''
        },
        confirmPassword: {
          value: '',
          error: ''
        }
      },
      msg: '',
      userInfo: {}
    }
    this.handleMode = this.handleMode.bind(this);
    this.handleValChange = this.handleValChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.validateUserName = this.validateUserName.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateConfirm = this.validateConfirm.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  componentWillMount(){
    const userInfo = localStorage.getItem('userInfo'),
          userObj = JSON.parse(userInfo);
    //console.log(userObj);
    if(userObj){
      this.setState({
         mode: 'login-success',
         userInfo: userObj
      });
    }
    
  }
  handleMode(){
    this.setState((prevState) => {
      let bool = prevState.mode === 'login';
      return bool ? {mode: "register"} : {mode: "login"};
    });
  }
  //表单获得焦点
  handleFocus(e){
    let formData = this.state.form,
        targetName = e.target.name;
    for(let key in formData){
      if(targetName === key){
        formData[key].error = '';
      }
    }
    this.setState({
      form: formData
    });
  }
  //验证数据
  handleValChange(e,name){
    let formData = this.state.form,
        targetVal = e.target.value,
        targetName = e.target.name;
    switch(targetName){
      case 'userName' :
        this.validateUserName(targetVal,formData);
        break;
      case 'password' :
        this.validatePassword(targetVal,formData);
        break;
      case 'confirmPassword' :
        this.validateConfirm(targetVal,formData);
        break;
    }
    this.setState({
      form: formData
    });
  }
  validateUserName(val,formData){
    if(val === ""){
      formData.userName.error = "用户名不能为空";
    }else{
      formData.userName.error = "";
      formData.userName.value = val;
    }
    return formData;
  }
  validatePassword(val,formData){
    if(/^\w{6,8}$/.test(val)){
      formData.password.error = '';
      formData.password.value = val;
    }else{
      formData.password.value = val;
      formData.password.error = '密码是6-8位，由数字字母下划线组成';
    }
    return formData;
  }
  validateConfirm(val,formData){
    if(/^\w{6,8}$/.test(val) && val === formData.password.value){
      formData.confirmPassword.value = val;
      formData.confirmPassword.error = '';
    }else{
      formData.confirmPassword.value = val;
      formData.confirmPassword.error = "俩次输入密码必须一致";
    }
    return formData;
  }
  handleLogin(){
    const data = JSON.stringify({
      username: this.state.form.userName.value,
      password: this.state.form.password.value
    });

    fetch('/api/user/login',{
      method: "POST",
      mode: 'cors',
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: data,
      credentials: 'include'
    }).then( (response) => response.json())
      .then( (data) => {
        //登录成功
        if(data.code === 3){
          let user_info = data.userInfo;
          setTimeout(()=>{
            this.setState({
              mode: "login-success",
              msg: '',
              userInfo: user_info              
            });
          },800);
          let user_info_data = {
            username: user_info.username,
            date: user_info.date,
            identity: user_info.identity
          }
          localStorage.setItem('userInfo',JSON.stringify(user_info_data));
        }
        this.setState({
          msg: data.msg,
        });
      })
      .catch( (err) => console.log(err));
  }
  handleRegister(){
    let registerDay = new Date().getFullYear() +"年"+(new Date().getMonth()+1) +"月"+new Date().getDate() + "日"; 
    const data = JSON.stringify({
      username: this.state.form.userName.value,
      password: this.state.form.password.value,
      confirmpassword: this.state.form.confirmPassword.value,
      date: registerDay
    });

    fetch('/api/user/register',{
      method: "POST",
      mode: "cors",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: data
    }).then(response => response.json())
      .then(data => {
        //注册成功
        if(data.code === 4){
          setTimeout(()=>{
            this.setState({
              mode: 'login',
              msg: ''
            });
          },800);
        }
        this.setState({
          msg: data.msg,
        });
      })
      .catch(err => console.log(err));
  }
  handleLogOut(){
    fetch('/api/logout',{
      method: 'GET',
      headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
    }).then(response=> response.json())
      .then(data=> {
        if(data.code === 1){//退出成功，清除localStorage
          localStorage.removeItem('userInfo');
          let cookies = document.cookie.split(';'),
              userInfo = '';
          cookies.map((val,item)=>{
            if(val.indexOf('userInfo') === 0){
              userInfo = val.split('=');
            }
          });
          var exp = new Date();
          exp.setTime(exp.getTime() - 1);
          document.cookie = userInfo[0]+"="+userInfo[1] + ";expires="+exp.toGMTString();
          //console.log(userInfo);
          this.setState({
            mode: 'login'
          });
        }else{
          alert('请稍后重试');
        }
      }).catch(err=>console.log(err));
  }
  render(){
    return(
        <aside className="right" >
          {
            this.state.mode === 'login'?
              <Login changeMode = {this.handleMode}
                     usernameChange = {this.handleValChange}
                     passwordChange = {this.handleValChange}
                     loginFun = {this.handleLogin}
                     message = {this.state.msg}
                     formData = {this.state.form}
                     focusFun = {this.handleFocus}
              /> :
            this.state.mode === 'register'?              
              <Register changeMode={this.handleMode}
                        usernameChange = {this.handleValChange}
                        passwordChange = {this.handleValChange}
                        confirmPasswordChange = {this.handleValChange}
                        registerFun = {this.handleRegister}
                        message = {this.state.msg}
                        formData = {this.state.form}
                        focusFun = {this.handleFocus}
              /> :
            this.state.mode === 'login-success' ?
              <LoginSuccess userInfo={this.state.userInfo} logOutFun={this.handleLogOut}/> :
            null
          }
        </aside>
    )
  }
}

class Register extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="aside-item" >
          <AsideHead title="注册"/>
          <Input labelName="用户名"
                 inputName="userName"
                 inputType="text"                   
                 handleChange={this.props.usernameChange}
                 errorInfo={this.props.formData.userName.error}
                 handleFocus={this.props.focusFun}
          />
          <Input labelName="密码"
                 inputName="password"
                 inputType="password"
                 handleChange={this.props.passwordChange}
                 errorInfo={this.props.formData.password.error}
                 handleFocus={this.props.focusFun}
          />
          <Input labelName="确认密码"
                 inputName="confirmPassword"
                 inputType="password"
                 handleChange={this.props.confirmPasswordChange}
                 errorInfo={this.props.formData.confirmPassword.error}
                 handleFocus={this.props.focusFun}
          />
          <Button title="注册" handleClick={this.props.registerFun} />
          <div className="right item-bottom" >
           <strong>{this.props.message}</strong>
            有帐号
            <a onClick={this.props.changeMode} >去登录</a>
          </div>
      </div>
    )
  }
}

class Login extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
        <div className="aside-item" >
          <AsideHead title="登录"/>
          <Input labelName="用户名"
                 inputName="userName"
                 inputType="text"                   
                 handleChange={(e) => this.props.usernameChange(e) }
                 errorInfo={this.props.formData.userName.error}
                 handleFocus={this.props.focusFun}
          />
          <Input labelName="密码"
                 inputName='password'
                 inputType="password"
                 handleChange={ (e) => this.props.passwordChange(e) }
                 errorInfo={this.props.formData.password.error}
                 handleFocus={this.props.focusFun}
          />
          <Button title="登录" handleClick={this.props.loginFun} />
        <div className="right item-bottom" >
           <strong>{this.props.message}</strong>
            有帐号
            <a onClick={this.props.changeMode} >去注册</a>
          </div>        
        </div>
    )
  }
}

class LoginSuccess extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
        <div className="aside-item" >
         <AsideHead title="用户信息" />
          <div className="login-success" >
            <p>
              <span>姓名：</span>
              <strong>{this.props.userInfo.username}</strong>
            </p>
            <p>
              <span>注册日期：</span>
              <strong>{this.props.userInfo.date}</strong>
            </p>
            <p>
              <span>身份：</span>
              <strong>{this.props.userInfo.identity}</strong>
             {
               this.props.userInfo.identity === "管理员" ?
                 <a href="/admin" className="go-admin" >管理后台</a> :
                null
             }
           </p>
           <a javascript="void(0)" className="logout" onClick={this.props.logOutFun}>退出</a>
          </div>
        </div>
    )
  }
}

class AsideHead extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
        <div className="item-title" >
          <span>{this.props.title}</span>
        </div>
    )
  }
}

class Input extends Component{
  constructor(props){
    super(props);
  }
  render(){

    return(
        <div className="input-con" >
        <label>{this.props.labelName}</label>
        <input type={this.props.inputType}
               name={this.props.inputName}
               onBlur={(e) => this.props.handleChange(e)}
               onFocus={(e) => this.props.handleFocus(e)}
        />
        <span className="help-block" >{this.props.errorInfo}</span>
        </div>
    )
  }
}

class Button extends Component {
    constructor(props){
      super(props);    
    }
    render(){
        return(
          <button onClick={ this.props.handleClick } className="btn" >
            {this.props.title}
          </button>
        )
    }
}        
