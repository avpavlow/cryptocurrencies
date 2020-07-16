import React from 'react'
import PropTypes from 'prop-types'
import MyEditor from '../../../../../common/wysiwyg-editor/index'

const displayName = 'ArticleFrom'
const propTypes = {
  article: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fileSelectChange: PropTypes.func.isRequired,
}

const Form = ({ article, errors, onChange, onSubmit, fileSelectChange }) => {
  /**
   * При изменении данных поля мнформируем об этом в onChange
   * @param name
   * @param value
   */
  function handleChange(name, value) {
    if (value !== article[name]) {
      onChange(name, value)
    }
  }
  
  return <form onSubmit={e => onSubmit(e)}>
    <div className="form-group row">
      <label htmlFor="title" className="col-sm-2 col-form-label">Название</label>
      <div className="col-sm-10">
        <input type="text"
               id="title"
               name="title"
               className={`form-control ${errors.has('title') && 'is-invalid'}`}
               placeholder="Title"
               value={article.title || ''}
               onChange={e => handleChange(e.target.name, e.target.value)} />
        {errors.has('title') && <div className="invalid-feedback">{errors.first('title')}</div>}
      </div>
    </div>
    <div className="form-group row">
      <label htmlFor="description" className="col-sm-2 col-form-label">Описание</label>
      <div className="col-sm-10">
        <textarea id="description"
                  name="description"
                  className={`form-control ${errors.has('description') && 'is-invalid'}`}
                  rows="3"
                  placeholder="Description"
                  value={article.description}
                  onChange={e => handleChange(e.target.name, e.target.value)} />
        {errors.has('description') && <div className="invalid-feedback">{errors.first('description')}</div>}
      </div>
    </div>
    <div className="form-group row">
      <label htmlFor="content" className="col-sm-2 col-form-label">Контент</label>
      <div className="col-sm-10">
        <MyEditor id="content" value={article.content} onChange={e => handleChange('content', e)} />
        {errors.has('content') && <div className="invalid-feedback">{errors.first('content')}</div>}
      </div>
    </div>
    <div className="form-group row">
      <label htmlFor="file" className="col-sm-2 col-form-label">Файл</label>
      <div className="col-sm-10">
        <input type="file" onChange = {fileSelectChange} />
        {errors.has('file') && <div className="invalid-feedback">{errors.first('file')}</div>}
      </div>
    </div>
    <div className="form-group row">
      <div className="col-sm-10 ml-auto">
        <button disabled={errors.any()} type="submit" className="btn btn-primary">Обновить</button>
      </div>
    </div>
  </form>
}

Form.displayName = displayName
Form.propTypes = propTypes

export default Form
