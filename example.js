import React from 'react'
import {render, createPortal} from 'react-dom'
import './example.css'

const Modal = props => {
    return createPortal(
        <div className="modal">
            <div className="mask"/>
            {props.children}
        </div>,
        document.getElementById('body'))
}

class Pop extends React.Component {
    constructor(props) {
        super(props)
        this.submitHandle = this.submitHandle.bind(this)
    }

    submitHandle() {
        this.props.onSubmit(this.el.value)
    }

    render() {
        const {onCancel} = this.props
        return (
            <div className="pop">
                <div className="title"><span className="close" onClick={onCancel}>X</span></div>
                <textarea className="text" placeholder="input message" ref={ref => this.el = ref}/>
                <div className="pop-bottom">
                    <button className="button pop-btn" onClick={this.submitHandle}>submit</button>
                    <button className="button pop-btn" onClick={onCancel}>cancel</button>
                </div>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {message: 'click button to input message', popShow: false}
        this.clickHandle = this.clickHandle.bind(this)
        this.submitHandle = this.submitHandle.bind(this)
        this.cancelHandle = this.cancelHandle.bind(this)
    }

    clickHandle() {
        this.setState({popShow: true})
    }

    submitHandle(value) {
        this.setState({message: value, popShow: false})
    }

    cancelHandle() {
        this.setState({popShow: false})
    }

    render() {
        return (
            <div className="app">
                <h2>Example</h2>
                <p className="message">Input Message : {this.state.message}</p>
                <button className="button" onClick={this.clickHandle}>Click</button>
                {this.state.popShow && <Modal><Pop onSubmit={this.submitHandle} onCancel={this.cancelHandle}/></Modal>}
            </div>
        )
    }
}

render(<App/>, document.getElementById('root'))