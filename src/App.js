import React from "react";
import styles from "./App.css";
import {Switch, Route} from "react-router-dom";
import {
    borad,
    login,
    post,
    update,
    write,
    notFound
} from "./page/index.async.js";

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
        <Switch>
            <Route exact path="/" component={borad}/>
            <Route exact path="/:name" component={borad}/>
            <Route exact path="/post/:num" component={post}/>
            <Route exact path="/login" component={login}/>
            <Route exact path="/write" component={write}/>
            <Route exact path="/update" component={update}/>
            <Route component={notFound}/>
        </Switch>
        </section>
      </section>

    </div>
  );
}

export default App;
