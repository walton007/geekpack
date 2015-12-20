import React from 'react';
import './samplePage.less'
import Button from 'react-bootstrap/lib/Button'

import {GetSampleData} from 'backendService/endpoint';

var  SmallSubComponent = ({species}) => (
  <div className="container">
    <div className="row">
        <div className="col-md-8">
          <div> I am a small sub component and have a button wrapped</div>
          <div> input species is: <span className="highlight"> {species} </span>  </div>
        </div>
        <div className="col-md-4">
          <Button bsStyle="primary" onClick = {() => {console.log('Show me the Code!')} } > Click me</Button>
        </div>
    </div>
  </div>
);

export default class SamplePage extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.timer = null;
    this.privateData = 'innerData';
    this.state = {
      serverData: null,
      value: 'hello'
    };
  }
  render() {
    console.log('[SamplePage]: render')
    const {intervalDuration, ...props} = this.props;
    const serverData = this.state.serverData;

    return (
      <div {...props} className="samplePage">
        <div className="container">
          <div className="page-header">
            <h1> Welcome to the sample page <span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"/></h1>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div> Using privateData  <span className="highlight"> {this.privateData} </span> </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div> Properties intervalDuration is <span className="highlight"> {intervalDuration} </span> </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div> Server back data is: <span className="highlight"> {serverData} </span>  </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              Handle onKeydown:
            </div>
            <div className="col-md-8">
              <input type="text" onKeyDown={this.handleKeyDown} />
            </div>
          </div>

          <div className="row">
            <SmallSubComponent species="good"/>
          </div>
        </div>
      </div>
    )
  }

  componentWillMount() {
    console.log('[SamplePage]: componentWillMount')
  }

  componentDidMount() {
    console.log('[SamplePage]: componentDidMount');
    this.yourLogic();
  }

  componentWillUnmount() {
    console.log('[SamplePage]: componentWillUnmount');
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  validationState() {
    let length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  handleKeyDown(event) {
    console.log('[SamplePage]: handleKeyDown:', event.keyCode);
    event.stopPropagation();
    if(event.keyCode == 13){
        alert('SamplePage handle Key Enter....');
     }
  }

  yourLogic() {
    const intervalDuration = this.props.intervalDuration;
    this.asyncGetData();
    this.timer = setInterval(this.asyncGetData.bind(this), 2000);
  }

  asyncGetData() {
    console.log('asyncGetData');
    var self = this;
    GetSampleData(function (dataJson) {
      var serverData = dataJson.data +Math.random() *100;
      self.setState({
        serverData: serverData
      });
    });
  }
}

SamplePage.propTypes = { intervalDuration: React.PropTypes.number };
SamplePage.defaultProps = { intervalDuration: 2000 };