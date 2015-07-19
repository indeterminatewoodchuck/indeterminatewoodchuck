var React = require('react');
var textChatStore = require('../stores/textChatStore');
var icecommActions = require('../actions/icecommActions');

var TextChat = React.createClass({
  getInitialState: function() {
    return {
      messages: []
    };
  },

  componentDidMount: function(){
    textChatStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    textChatStore.removeChangeListener(this._onChange);    
  },

  _onChange: function() {
    this.setState({
      messages: textChatStore.getMessages()
    });
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var message = event.target[0].value;
    icecommActions.sendTextMessage(message);
  },

  render: function() {
    var messages = this.state.messages.map(function(message, index) {
      var user = message[0];
      var text = message[1];
      return (<div key={index}>{user}: {text}</div>);
    });

    return (
      <div>
        <div className='send-chat'>
          <form onSubmit={this.handleSubmit}>
            <input name='message-input' type='text' placeholder='Type your message here' />
            <input type='submit' />
          </form>
        </div>
        <div className='message-log'>
          {messages}
        </div>
      </div>
      );
  }
});

module.exports = TextChat;
