var React = require('react');
var videoChatStore = require('../stores/videoChatStore');

var VideoChat = React.createClass({
  getInitialState: function(){
    return { 
      localStream: null,
      remoteStream: null
    };
  },

  componentDidMount: function(){
    videoChatStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    videoChatStore.removeChangeListener(this._onChange);    
  },

  _onChange: function() {
    this.setState({
      localStream: videoChatStore.getLocalStream(),
      remoteStream: videoChatStore.getRemoteStream()
    });
  },

  render: function(){
    var videoNodes = function() {
      var nodes = [];
      for (var key in this.state) {
        if (this.state[key]) {
          // must pass unique key property to each child for React to render properly
          nodes.push(<video id={key} key={this.state[key].ID}
          src={this.state[key].stream} autoPlay></video>);
        }
      }
      return nodes;
    }.bind(this);

    return (
      <div>
        <div>This is the Video Chat Hooray Hooray Hooray!</div>
        {videoNodes()}
      </div>
    );
  }
});

module.exports = VideoChat;

// Order of operations in React
// 1. componentWillMount
// 2. render
// 3. componentDidMount
// 4. componentWillReceiveProps is called whenever there is a change to props.
// Used to react to a prop change before render is called
// 5. componentWillUnmount is invoked immediately beore a component is unmounted from the DOM

// document.getElementById(peer.ID).remove();
