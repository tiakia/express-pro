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
      }
    }
    this.handleMode = this.handleMode.bind(this);
    this.handleValChange = this.handleValChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.validateUserName = this.validateUserName.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateConfirm = this.validateConfirm.bind(this);
  }
  handleMode(){
    this.setState((prevState) => {
      let bool = prevState.mode === 'login';
      return bool ? {mode: "register"} : {mode: "login"};
    });
  }
  //验证数据
  handleValChange(e,name){
    let formData = this.state.form,
        targetVal = e.target.value;
    switch(name){
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
    console.log(formData);
    this.setState({
      formData: formData
    });
    for(let key in formData){
      if(formData[key].error.length != 0){
        alert(formData[key].error);
      }
    }
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
      formData.confirmPassword.error = "俩次输入密码不一致";
    }
    return formData;
  }
  handleLogin(){
    console.log("登录中。。。");
  }
  handleRegister(){

    const data = JSON.stringify({
      username: this.state.userName,
      password: this.state.password,
      confirmpassword: this.state.confirmPassword
    });

    fetch('/api/user/register',{
      method: "POST",
      mode: "cors",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: data
    }).then(response => console.log(response))
      .catch(err => console.error(err));
  }
  render(){
    return(
        <aside className="right" >
          {
            this.state.mode === 'login'?
              <Login changeMode = {this.handleMode}
                     usernameChange = {(e) => this.handleValChange(e,'userName')}
                     passwordChange = {(e) => this.handleValChange(e, 'password')}
                     loginFun = {this.handleLogin}
              /> :
            this.state.mode === 'register'?              
              <Register changeMode={this.handleMode}
                     usernameChange = {(e) => this.handleValChange(e,'userName')}
                     passwordChange = {(e) => this.handleValChange(e,'password')}
                     confirmPasswordChange = {(e) => this.handleValChange(e,'confirmPassword')}
                     registerFun = {this.handleRegister}
              /> :
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
                 handleChange={(e) => this.props.usernameChange(e) }
          />
          <Input labelName="密码"
                 inputName="password"
                 inputType="password"
                 handleChange={ (e) => this.props.passwordChange(e) }
          />
          <Input labelName="确认密码"
                 inputName="confimPassword"
                 inputType="password"
                 handleChange={ (e) => this.props.confirmPasswordChange(e) }
          />
          <Button title="注册" handleClick={this.props.registerFun} />
          <div className="right item-bottom" >有帐号
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
          />
          <Input labelName="密码"
                 inputName='password'
                 inputType="password"
                 handleChange={ (e) => this.props.passwordChange(e) }
          />
          <Button title="登录" handleClick={this.props.loginFun} />
          <div className="right item-bottom" >没有帐号
            <a onClick={this.props.changeMode} >去注册</a>
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
               onBlur={(e) => this.props.handleChange(e) }
        />
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
