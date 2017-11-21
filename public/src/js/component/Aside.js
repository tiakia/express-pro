import React, { Component } from 'react';

export default class Aside extends Component{
  constructor(props){
    super(props);
    this.state ={
      mode: 'login',
      userName: '',
      password: '',
      confirmPassword: ''
    }
    this.handleMode = this.handleMode.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);               
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
  handleMode(){
    this.setState((prevState) => {
      let bool = prevState.mode === 'login';
      return bool ? {mode: "register"} : {mode: "login"};
    });
  }
  handleUsername(e){
     this.setState({userName: e.target.value}); 
  }
  handlePassword(e){
     this.setState({password: e.target.value});
  }
  handleConfirm(e){
     this.setState({confirmPassword: e.target.value});    
  }
  handleLogin(){
    console.log("登录中。。。");
  }
  handleRegister(){
    console.log("注册中。。。");    
  }
  render(){
    return(
        <aside className="right" >
          {
            this.state.mode === 'login'?
              <Login changeMode = {this.handleMode}
                     usernameChange = {this.handleUsername}
                     passwordChange = {this.handlePassword}
                     loginFun = {this.handleLogin}
              /> :
            this.state.mode === 'register'?              
              <Register changeMode={this.handleMode}
                     usernameChange = {this.handleUsername}
                     passwordChange = {this.handlePassword}
                     confirmPasswordChange = {this.handleConfirm}
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
               onChange={(e) => this.props.handleChange(e) }
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
