import { useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as GithubLogo } from './assets/github.svg';
import { ReactComponent as LinkedInLogo } from './assets/linkedin.svg';
import styles from './App.module.scss';

function App() {
    return (
        <div className={styles.App}>
            <div className={styles.title}>Iven Beck</div>
            <div className={styles.welcome}>Hi! 👋🏽</div>
            <div className={styles.logos}>
                <a href="https://github.com/ibveecnk" className={styles.logo}>
                    <GithubLogo />
                </a>
                <a href="https://linkedin.com/in/ipbeck" className={styles.logo}>
                    <LinkedInLogo />
                </a>
            </div>
            <div className={styles.footer}>
                <div className={styles.footerText}>©{new Date().getFullYear()} Iven Beck</div>
            </div>
        </div>
    );
}

export default App;
