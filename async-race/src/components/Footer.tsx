import React from 'react';
import { ReactComponent as RSSvg }  from '../assets/images/rs_school_js.svg';
import GitPNG  from '../assets/images/GitHub-Mark-Light-64px.png';


export function Footer() {
  return (
    <footer className="footer">
                <div className="date"><span>2022</span></div>
                <div className="git-link">
                    <a className="https://github.com/Hopechka?tab=stars">
                        {/* <img src="../assets/images/GitHub-Mark-Light-64px.png" alt="GitHub link" /> */}
                        <img src={GitPNG} alt="GitHub link" />
                        
                    </a>
                    <a href="https://github.com/Hopechka?tab=stars">
                        <span>Hopechka</span>
                    </a>
                </div>
                <div className="school-logo">  
                    <a href="https://rs.school/js/"><RSSvg /></a>
                </div>
            </footer>
       
  );
}