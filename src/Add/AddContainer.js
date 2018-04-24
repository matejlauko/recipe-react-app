import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateText, updateTitle, updateDrawing, saveRecipe } from './actions';
import validate from './validate';
import Add from './Add';

class AddContainer extends Component {
  canvas = React.createRef();

  handleFormSubmit = e => {
    e.preventDefault();
    const errors = validate([{ label: 'Title', val: this.props.title }, { label: 'Text', val: this.props.text }]);
    if (errors.length) {
      alert(`Form has errors. Please fix following:\n${errors.join('\n')}`);
    } else {
      this.props.saveRecipe().then(_ => {
        this.canvas.current.clear();

        setTimeout(() => {
          this.props.history.push('/');
        }, 1000);
      });
    }
  };

  render() {
    return (
      <Add
        title={this.props.title}
        text={this.props.text}
        updateText={this.props.updateText}
        updateTitle={this.props.updateTitle}
        updateDrawing={this.props.updateDrawing}
        saving={this.props.saving}
        saved={this.props.saved}
        canvasRef={this.canvas}
        onSubmit={this.handleFormSubmit}
      />
    );
  }
}

export default connect(({ add: { title, text, saving, saved } }) => ({ title, text, saving, saved }), {
  updateText,
  updateTitle,
  saveRecipe,
  updateDrawing,
})(AddContainer);
