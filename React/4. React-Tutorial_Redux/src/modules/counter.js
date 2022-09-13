// const SET_DIFF = 'counter/SET_DIFF';
// const INCREASE = 'counter/INCREASE';
// const DECREASE = 'counter/DECREASE';

// export const setDiff = (diff) => ({ type: SET_DIFF, diff });
// export const increase = () => ({ type: INCREASE });
// export const decrease = () => ({ type: DECREASE });

// const initialState = {
//   number: 0,
//   diff: 1,
// };

// export default function counter(state = initialState, action) {
//   switch (action.type) {
//     case SET_DIFF:
//       return {
//         ...state,
//         diff: action.diff,
//       };
//     case INCREASE:
//       return {
//         ...state,
//         number: state.number + state.diff,
//       };
//     case DECREASE:
//       return {
//         ...state,
//         number: state.number - state.diff,
//       };
//     default:
//       return state;
//   }
// }

import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const INCREASE_ASYNC = 'INCREASE_ASYNC';
const DECREASE_ASYNC = 'DECREASE_ASYNC';

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// export const increaseAsync = () => (dispatch) => {
//   setTimeout(() => dispatch(increase()), 1000);
// };
// export const decreaseAsync = () => (dispatch) => {
//   setTimeout(() => dispatch(decrease()), 1000);
// };

export const increaseAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync = () => ({ type: DECREASE_ASYNC });

function* increaseSaga() {
  yield delay(1000); // 1초를 기다립니다.
  yield put(increase()); // put은 특정 액션을 디스패치 해줍니다.
}
function* decreaseSaga() {
  yield delay(1000); // 1초를 기다립니다.
  yield put(decrease()); // put은 특정 액션을 디스패치 해줍니다.
}
export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga); // 모든 INCREASE_ASYNC 액션을 처리
  yield takeLatest(DECREASE_ASYNC, decreaseSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
}

const initialState = 0;

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}
