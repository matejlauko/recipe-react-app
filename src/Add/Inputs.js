import React from 'react';
import s from './Add.scss';
import Drawing from './Drawing';

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

export default Inputs;
