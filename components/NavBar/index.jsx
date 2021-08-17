import style from "./style.module.scss"

const NavBar = () => {
    return (
        <div className={style.navbar}>
            <div>menu</div>
            <div>Flirty Flowers</div>
            <div>Cart</div>
        </div>
    );
}

export default NavBar;