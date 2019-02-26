import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { getListStyle, getItemStyle } from '../../lib/dragFuncModule'
import ItemCard from '../ItemCard/ItemCard';
import './ShoppingList.css'
import Price from '../ItemCard/Price';
import calculateTotal from "../../lib/calcTotal";
import Headers from '../Headers';
import Spinner from '../ListOptions/Spinner';

export default class ShoppingList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidUpdate() {
        let trueTotal = calculateTotal(this.props.items)
        if (this.props.total !== trueTotal && !isNaN(this.props.total) && !isNaN(trueTotal)) {
            console.log('Handling Budget: trueTotal = ', trueTotal, typeof trueTotal, " ; givenTotal = ", this.props.total, typeof this.props.total)
            this.props.handleBudget()
        }
    }


    render() {
        return (
            <>
                {this.props.loading ? <Spinner /> :
                    <div>
                        <Headers title={'Shopping List'} />
                        <Droppable droppableId="shoppingList">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    className="list"

                                >
                                    {/* <div className="scrollbox" > */}
                                    {this.props.items.map((item, i, arr) => (<Draggable
                                        key={item.itemcode}
                                        draggableId={"S" + item.itemcode}
                                        index={i}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <ItemCard item={item} remove={() => this.props.remove(i)} Price={<Price item={item} updateQuantity={this.props.updateQuantity} />} classString={arr.slice(0, i + 1).reduce((total, item) => total + item.price * item.quantity * 100, 0) < this.props.budget ? "green" : "red"} />
                                            </div>
                                        )}
                                    </Draggable>
                                    ))}
                                </div>
                            )}
                        </Droppable>
                    </div>
                }
            </>
        )

    }
}