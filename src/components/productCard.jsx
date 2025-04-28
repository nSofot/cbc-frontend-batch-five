import "./productCard.css"

export default function ProductCard(props) {
    return (
        <div className="card">
            <img className="productImage" src ={props.picture}/>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <p>Price Rs. {props.price}</p>
            <button className="addToCart">Add to Cart</button>
            <button className="buyNow">Buy Now</button>
        </div>
    )
}