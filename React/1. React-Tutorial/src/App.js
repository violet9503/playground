import React, {
  useRef,
  useReducer,
  useMemo,
  useCallback,
  useState,
} from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';
import useInputs from './hooks/useInputs';

import './App.scss';
import Button from './components/Button';
import Dialog from './components/Dialog';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  console.log(users.filter((user) => user.active).length);
  return users.filter((user) => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: '',
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [{ username, email }, onChange, reset] = useInputs({
    username: '',
    email: '',
  });
  const { users } = state;
  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    reset();
    nextId.current += 1;
  }, [username, email, reset]);

  const count = useMemo(() => countActiveUsers(users), [users]);

  const [dialog, setDialog] = useState(false);
  const onClick = () => {
    setDialog(true);
  };
  const onConfirm = () => {
    console.log('확인');
    setDialog(false);
  };
  const onCancel = () => {
    console.log('취소');
    setDialog(false);
  };

  return (
    <UserDispatch.Provider value={dispatch}>
      <>
        <CreateUser
          username={username}
          email={email}
          onChange={onChange}
          onCreate={onCreate}
        />
        <UserList users={users} />
        <div>활성사용자 수 : {count}</div>

        <div className="App">
          <div className="buttons">
            <Button size="large">BUTTON</Button>
            <Button>BUTTON</Button>
            <Button size="small">BUTTON</Button>
          </div>
          <div className="buttons">
            <Button size="large" color="gray">
              BUTTON
            </Button>
            <Button color="gray">BUTTON</Button>
            <Button size="small" color="gray">
              BUTTON
            </Button>
          </div>
          <div className="buttons">
            <Button size="large" color="pink">
              BUTTON
            </Button>
            <Button color="pink">BUTTON</Button>
            <Button size="small" color="pink">
              BUTTON
            </Button>
          </div>
          <div className="buttons">
            <Button size="large" color="blue" outline>
              BUTTON
            </Button>
            <Button color="gray" outline>
              BUTTON
            </Button>
            <Button size="small" color="pink" outline>
              BUTTON
            </Button>
          </div>

          <div className="buttons">
            <Button size="large" fullWidth>
              BUTTON
            </Button>
            <Button size="large" fullWidth color="gray">
              BUTTON
            </Button>
            <Button size="large" fullWidth color="pink" onClick={onClick}>
              삭제
            </Button>
          </div>
        </div>
        <Dialog
          title="정말로 삭제하시겠습니까?"
          confirmText="삭제"
          cancelText="취소"
          onConfirm={onConfirm}
          onCancel={onCancel}
          visible={dialog}
        >
          데이터를 정말로 삭제하시겠습니까?
        </Dialog>
      </>
    </UserDispatch.Provider>
  );
}

export default App;
