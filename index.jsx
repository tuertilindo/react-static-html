import React from 'react'
import 'whatwg-fetch'
export default class Htmlloader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      src: props.src, // 'src' relative path. example: src:'help.html'
      className: props.className,
      html: null
    }
  }
  render () {
    if (!this.state.html) {
      return (<div className={this.state.className}>
        {this.props.children}
      </div>)
    }
    var htm = {__html: this.state.html}
    return (
      <div>
        <div dangerouslySetInnerHTML={htm} ></div>
      </div>)
  }
  componentDidMount () {
    if (this.props.src) {
      fetch(this.props.src, {mode: 'cors'})
      .then((response) => {
        return response.text()
      }).then((data) => {
        this.setState({ html: data })
      }).catch((ex) => {
        this.setState({html: (<h3>{ex}</h3>)})
      })
    }
  }
}
