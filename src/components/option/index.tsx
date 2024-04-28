import React from 'react'
import { OptionProps } from '../../types/index'
import './style.scss'

export const Option = ({
  id,
  imgSrc,
  name,
  episodeCont,
  isSelected,
  onChange,
}: OptionProps) => {
  return (
    <div className="option" key={id}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onChange?.(id)}
      />
      <img src={imgSrc} alt={name} />
      <div className="name-episode">
      <h1 dangerouslySetInnerHTML={{ __html: name }} />
        <p>{episodeCont + ` ${episodeCont > 1 ? 'Episodes' : 'Episode'}`}</p>
      </div>
    </div>
  )
}
