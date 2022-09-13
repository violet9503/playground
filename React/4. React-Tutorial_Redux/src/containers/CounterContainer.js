// import React from 'react';
// import Counter from '../components/Counter';
// import { useSelector, useDispatch, shallowEqual } from 'react-redux';
// import { setDiff, increase, decrease } from '../modules/counter';

// function CounterContainer() {
//   const { number, diff } = useSelector(
//     (state) => ({
//       number: state.counter.number,
//       diff: state.counter.diff,
//     }),
//     shallowEqual
//   );

//   const dispatch = useDispatch();
//   const onIncrease = () => dispatch(increase());
//   const onDecrease = () => dispatch(decrease());
//   const onSetDiff = (diff) => dispatch(setDiff(diff));

//   return (
//     <Counter
//       number={number}
//       diff={diff}
//       onIncrease={onIncrease}
//       onDecrease={onDecrease}
//       onSetDiff={onSetDiff}
//     />
//   );
// }

// export default CounterContainer;

import React from 'react';
import Counter from '../components/Counter';
import { useSelector, useDispatch } from 'react-redux';
import {
  increase,
  decrease,
  increaseAsync,
  decreaseAsync,
} from '../modules/counter';

function CounterContainer() {
  const number = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  // const onIncrease = () => {
  //   dispatch(increase());
  // };

  // const onDecrease = () => {
  //   dispatch(decrease());
  // };

  const onIncrease = () => {
    dispatch(increaseAsync());
  };

  const onDecrease = () => {
    dispatch(decreaseAsync());
  };

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
}

export default CounterContainer;
