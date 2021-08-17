import React from "react";
import { useState } from "react";
import './index.less'

export const Tags = () => {
  const [tags, SetTargets] = useState([
    'dsaf', '23', '44444', '水电费', '东方饭店'
  ]);
  return (
    <div className='tags-wrap '>
      <div className="tag-container flex container">
        {
          tags.map(tag=>{
            return (
              <div className='tag-item'>
                {tag}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
