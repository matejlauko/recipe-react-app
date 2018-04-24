import React from 'react';
import PT from 'prop-types';
import s from './Add.scss';
import sB from '../styles/index.scss';
import cx from 'classnames';
import Inputs from './Inputs';

const Add = ({ title, text, updateText, updateTitle, updateDrawing, saving, saved, canvasRef, onSubmit }) => (
  <div className={cx(s.Add)}>
    <h1 className={s.addTitle}>Add a recipe</h1>
    <form className={s.form} onSubmit={onSubmit}>
      <Inputs
        title={title}
        text={text}
        updateText={updateText}
        updateTitle={updateTitle}
        updateDrawing={updateDrawing}
        canvasRef={canvasRef}
      />
      <button className={cx(sB.button, s.saveButton, { [s.buttonSaved]: saved })} disabled={saving}>
        {saving ? 'SAVING..' : saved ? 'SAVED!' : 'SAVE'}
      </button>
    </form>
  </div>
);

Add.propTypes = {
  title: PT.string.isRequired,
  text: PT.string.isRequired,
  updateTitle: PT.func.isRequired,
  updateDrawing: PT.func.isRequired,
  saving: PT.bool.isRequired,
  saved: PT.bool.isRequired,
  canvasRef: PT.object.isRequired,
  onSubmit: PT.func.isRequired,
};

export default Add;
