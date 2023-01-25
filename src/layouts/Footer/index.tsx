import React from 'react';

import github from 'assets/github.svg';
import rsschool from 'assets/rsschool.svg';
import './style.css';
import { GitHub } from 'assets/GitHub';
import { RsSchool } from 'assets/RsSchool';

export const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <a href='https://rs.school/js/'>
        {/* <img className='footer-img' src={rsschool} alt="" /> */}
        <RsSchool/>
      </a>
      <p>online store 2022</p>
      <a href='https://github.com/cascadetile/online-store/tree/exp-branch' className='github'>
        <GitHub/>
        </a>
    </footer>
  )
}