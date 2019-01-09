import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({adapter: new EnzymeAdapter()});

/**
 * Factory function to create a ShallowWrapper for the App component-
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
*/
const setup = (props={}, state=null) => {
  const wrapper =  shallow(<App {...props} />)
  if (state) wrapper.setState(state);
  return wrapper;
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute fro search.
 * @returns {ShallowWrapper}
*/
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

test('renders without an error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

// the counter starts at 0 by default
test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

// the showError state is false by default
test('error starts with not showing our', () =>{
  const wrapper = setup();
  const initialCounterState = wrapper.state('showError');
  expect(initialCounterState).toBe(false);
})

test('clicking button increments counter display', () =>  {
  const counter = 7;
  const wrapper = setup(null, {counter});

  //find button and click
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');
  wrapper.update();

  //find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1)
});

test('renders decrement counter button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'decrement-button');
  expect(button.length).toBe(1);
});

test('clicking decrement counter button decrements counter display', () => {
  const counter = 5;
  const wrapper = setup(null, {counter});

  //find a button and click
  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');
  wrapper.update();

  //find display and test the value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter - 1);
});

test('we start to show the error message when we are trying to decrement bellow 0', () => {
  const counter = 0;
  const wrapper = setup(null, {counter});
  //find a button and click
  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');
  wrapper.update();
  //find error message
  const errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.text()).toContain('below 0');
});

test('we hide the error message when we increment above 0 after showing it', () => {
  const counter = -1;
  const wrapper = setup(null, {counter});
  //find a button and click
  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');
  wrapper.update();
  //find error message
  const errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.text()).toContain('below 0');
  //wnen increment the error message should dissapear
  const button_incr = findByTestAttr(wrapper, 'increment-button');
  button_incr.simulate('click');
  wrapper.update();
  const errorMessage2 = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage2).toHaveLength(0);
});