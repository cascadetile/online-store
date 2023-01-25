import React from 'react';

import { GitHub } from 'assets/GitHub';
import { RsSchool } from 'assets/RsSchool';

import './style.css';

export const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <a href='https://rs.school/js/'>
        <RsSchool/>
      </a>
      <p>online store 2022</p>
      <a href='https://github.com/cascadetile/online-store/tree/exp-branch' className='github'>
        <GitHub/>
        </a>
    </footer>
  )
}