import React from "react";
import styles from "./App.css";

function App() {
  return (
    <div className={styles.App}>
      <header id={styles.banner}>
      </header>
      <div className={styles.titlebar}>

        <a href="#" className={styles.toggle + " fas"}></a>
        <a href="#">blog</a>
      </div>
      <section className={styles.wrapper}>
        <div className={styles.sidebar}>
          <div className={styles.inner}>
            <div className={styles.search}>
              <form className={"fas"}>
                <input type="text" name="query" id="query" placeholder="Search"/>
              </form>
            </div>
            <nav className={styles.menu}>
              <header>
                <h3>Menu</h3>
              </header>
              <ul>
                <li><a href="#">Menu</a></li>
                <li><span className={styles.opener + " fas fa-chevron-down"}>Sub Menu</span></li>
                <li><a href="#">Menu</a></li>
                <li><a href="#">Menu</a></li>
              </ul>
            </nav>
          </div>
        </div>
        
        <section className={styles.contents}>
          <div className={styles.contents_inner}>
            
            <div className={styles.title}>
              <h2>title</h2>
            </div>
            <div className={styles.post}>
              <h3>post title</h3>
              <div className={styles.content}>
                <p>content</p>
              </div>
            </div>
            <div className={styles.post}>
              <h3>post title</h3>
              <div className={styles.content}>
                <p>content</p>
              </div>
            </div>
            <div className={styles.post}>
              <h3>post title</h3>
              <div className={styles.content}>
                <p>content</p>
              </div>
            </div>
            <div className={styles.post}>
              <h3>post title</h3>
              <div className={styles.content}>
                <p>content</p>
              </div>
            </div>
            <div className={styles.post}>
              <h3>post title</h3>
              <div className={styles.content}>
                <p>content</p>
              </div>
            </div>
          </div>
          <div className={styles.slide}>
            <span className={"fas fa-chevron-left "+styles.left}></span>
            <span className={"fas fa-chevron-right "+styles.right}></span>
          </div>
        </section>
      </section>

    </div>
  );
}

export default App;
