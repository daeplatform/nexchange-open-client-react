import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ExchangeWidget from './ExchangeWidget.js';

describe('ExchangeWidget', () => {
  const initialState = {
    wallet: { address: '', valid: false, show: false },
    selectedCoin: { deposit: 'OMG', receive: 'ETH', prev: { deposit: 'OMG', receive: 'ETH' }, lastSelected: 'deposit' },
    price: { pair: 'ETHOMG', deposit: 101, receive: 1.76250023, lastEdited: 'deposit' },
    error: { show: false, type: 'INVALID_AMOUNT' },
  };
  const mockStore = configureStore();
  let store, wrap, wrapShallow;

  beforeEach(() => {
    store = mockStore(initialState);
    wrap = mount(
      <Provider store={store}>
        <ExchangeWidget />
      </Provider>
    );
    wrapShallow = shallow(<ExchangeWidget store={store} />).dive();
  });

  it('renders correctly', () => {
    expect(wrapShallow).toMatchSnapshot();
  });

  it('contains CoinInput, WalletAddress', () => {
    expect(wrapShallow.find('Connect(CoinInput)').length).toBe(2);
    expect(wrapShallow.find('Connect(WalletAddress)').length).toBe(1);
  });

  it('submit button changes on wallet shown', () => {
    expect(wrapShallow.find('button').text()).toEqual('Get Started !');

    wrapShallow.find('button.proceed').simulate('click');
    wrapShallow.setProps({ wallet: { address: '', valid: false, show: true } });

    wrapShallow = wrapShallow.update();

    expect(wrapShallow.find('button').text()).toEqual('Confirm & Place Order');
  });
});
