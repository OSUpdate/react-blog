import React, {Component} from "react";
import styles from "./App.css";
import PostContainer from "./containers/PostContainer";

class App extends Component {
    render() {
        return(
            <div className={styles.App}>
                <header id={styles.banner}>
                </header>
                <div className={styles.titlebar}>

                    <a href="#" className={styles.toggle + " fas fa-bars"}></a>
                    <a href="#">blog</a>
                </div>
                <section className={styles.wrapper}>
                    <div className={styles.sidebar}>
                        <div className={styles.search}>
                            <form className={"fas"}>
                                <input type="text" name="query" id="query" placeholder="Search"/>
                            </form>
                        </div>
                        <div className={styles.inner}>
            
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
                    <PostContainer/>
        
                </section>

            </div>
        );
    }
}

export default App;
