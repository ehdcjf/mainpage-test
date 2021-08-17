import style from "./style.module.scss"

const Header = () => {
    return (
        <section className={style.header_container}>
            <ul className={style.header_menu}>
                <li>Intro</li>
                <li>About</li>
                <li>Featuerd</li>
            </ul>
            <h1 className={style.header_text}>President Maker</h1>
        </section>
    );
}

export default Header;