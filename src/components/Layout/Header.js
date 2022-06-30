import image from '../../assests/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'
const Header = props => {
    console.log('hello')
    return (
    <>
        <header className={classes.header}>
            <h2>ReactMels</h2>
                <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={image} alt='A table full of delicious meal'/>  
        </div>
    </>
    )
}

export default Header