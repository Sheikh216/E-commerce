import React, { useEffect } from 'react';
import { Link, useParams, useLocation,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart } from '../actions/cartActions';

const CartScreen = () => {
  const { id: productId } = useParams();
  const location = useLocation(); // Use useLocation hook to get the location object
  const qty = new URLSearchParams(location.search).get('qty') || 1; // Get qty from search params

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const navigate = useNavigate()

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  console.log(qty);

  const removeFromCartHandler = (id) => {
   console.log('remove')
  }


  const checkoutHandler = () => {
   navigate('/login?redirect=shipping')
 }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty<Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
           {cartItems.map(item => (
            <ListGroupItem key={item.product}>
            <Row>
             <Col md={2}>

             <Image src = {item.image} alt = {item.name} fluid rounded></Image>

             </Col>

             <Col md={3}>
              <Link to ={`/product/${item.product}`}>{item.name}</Link>
             </Col>
             <Col md={2}>
              ${item.price}

             </Col>
             <Col md={2}>

             <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>

             </Col>
             <Col md={2}>

             <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
              <i className='fas fa-trash'></i>
             </Button>

             </Col>
            </Row>

            </ListGroupItem>
           ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>

    </Row>
  );
};

export default CartScreen;