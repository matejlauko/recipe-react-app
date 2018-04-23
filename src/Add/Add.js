import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './Add.scss';
import sB from '../styles/index.scss';
import { updateText, updateTitle, updateDrawing, saveRecipe } from './actions';
import Drawing from './Drawing';
import cx from 'classnames';
import validate from './validate';

const Inputs = ({ title, text, updateText, updateTitle, updateDrawing, canvasRef }) => {
  return (
    <div className={s.inputsContainer}>
      <div className={s.inputCont}>
        <label htmlFor="recipe-title" className={s.inputLabelInvisible}>
          Recipe title
        </label>
        <input
          id="recipe-title"
          className={s.inputTitle}
          type="text"
          value={title}
          onChange={e => updateTitle(e.target.value)}
          placeholder="Recipe title"
          required="required"
          aria-required="true"
          pattern="^[a-zA-Z0-9,.\-/:()]+$"
        />
      </div>
      <div className={s.inputCont}>
        <label htmlFor="recipe-title" className={s.inputLabelInvisible}>
          Recipe title
        </label>
        <textarea
          className={s.inputText}
          placeholder="Recipe text"
          required="required"
          aria-required="true"
          pattern="^[a-zA-Z0-9,.\-/:()]+$"
          value={text}
          onChange={e => updateText(e.target.value)}
        />
      </div>
      <div className={s.inputCont}>
        <label className={s.inputLabel}>Draw an image</label>
        <Drawing ref={canvasRef} onChange={updateDrawing} />
      </div>
    </div>
  );
};

class Add extends Component {
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
    const { title, text, updateText, updateTitle, updateDrawing, saving, saved } = this.props;
    return (
      <div className={cx(s.Add)}>
        <h1 className={s.addTitle}>Add a recipe</h1>
        <form className={s.form} onSubmit={this.handleFormSubmit}>
          <Inputs
            title={title}
            text={text}
            updateText={updateText}
            updateTitle={updateTitle}
            updateDrawing={updateDrawing}
            canvasRef={this.canvas}
          />
          <button className={cx(sB.button, s.saveButton, { [s.buttonSaved]: saved })} disabled={saving}>
            {saving ? 'SAVING..' : saved ? 'SAVED!' : 'SAVE'}
          </button>
        </form>
      </div>
    );
  }
}

export default connect(({ add: { title, text, saving, saved } }) => ({ title, text, saving, saved }), {
  updateText,
  updateTitle,
  saveRecipe,
  updateDrawing,
})(Add);
