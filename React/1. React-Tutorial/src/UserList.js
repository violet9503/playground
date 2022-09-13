import React, { useEffect, useContext } from 'react';
import { UserDispatch } from './App';

const User = React.memo(function User({ user }) {
    const dispatch = useContext(UserDispatch);
    useEffect(()=>{
        console.log('appear');
        // console.log('user값이 설정됨');
        console.log(user);
        return () => {
            console.log('disappear');
            // console.log('user 바뀌기전..');
            console.log(user);
        };
    }, [user]);
  return (
    <div>
      <b style={{
          cursor : 'pointer',
          color : user.active ? 'green' : 'black',
      }} onClick={()=>dispatch({type:'TOGGLE_USER', id:user.id})}>{user.username}</b> <span>({user.email})</span>
      <button onClick={() => dispatch({type:'REMOVE_USER', id:user.id})}>삭제</button>
    </div>
  );
})

function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id}/>
      ))}
    </div>
  );
}

export default React.memo(UserList);