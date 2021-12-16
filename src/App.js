import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch])

  useEffect(() => {
    if(isInitial) {
      isInitial = false;
      return;
      //맨 처음 페이지가 로드되었을 때 빈 카트가 보내지는 것을 막기 위해서 먼저 isInitial이 true이면 sendCartData가 실행되지 않고 끝나도록 하며 isInitial를 false로 바꿔주어 다음 턴에는 카트가 보내지도록 만듬
    }

    if(cart.changed) {
      dispatch(sendCartData(cart));
      //cart에 item이 추가되었거나 삭제되었을 때, 즉 앱 내에서 변경되었을 때만 실행되도록 함. 맨 처음 로딩할 때에도 요청이 보내지는 것을 막기위한 방법.
    }
  }, [cart, dispatch])
  //fetch()는 cart가 변할 때마다 실행됨

  return (
    <React.Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
