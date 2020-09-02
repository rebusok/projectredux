import React from 'react';
import './cart-table.scss';
import { connect } from 'react-redux';
import {deleteToCard, addedToCard} from '../../actions';
import WithRestoService from '../hoc';

const CartTable = ({items, deleteToCard, RestoService, addedToCard}) => {
    if( items.length === 0){
        return (<div className="cart__title"> Ваша корзина пуста :( </div>) 
    }
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.map(item =>{
                        const {title, price, url, id, qtty} = item;
                        return(
                            <div key={id} className="cart__item">
                                <img src={url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$</div>
                                <div className="cart__item-price">
                                <button onClick={() => deleteToCard(id, 'one')} className='minus'>-</button> {`X${qtty}`}
                                <button onClick = {()=>addedToCard(id)} className="plus">+</button>
                                    </div>
                                    
                                <div onClick={() =>deleteToCard(id)} className="cart__close">&times;</div>
                            </div>
                        )
                    })
                }
                <button onClick = {() => {RestoService.setOrder( generateOrder(items))} } className = "order">Оформить заказ</button>
                
            </div>
        </>
    );
};
const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            id: item.id,
            qtty: item.qtty
        }
    })
    return newOrder;
}
const mapStateToProps =  ({items}) =>{
    return {
        items
    }
}

const mapDispatchToProps = {
    deleteToCard,
    addedToCard
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));