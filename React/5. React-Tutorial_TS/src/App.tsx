import React from 'react';
import CounterContainer from './containers/CounterContainer';
import TodoApp from './containers/TodoApp';
import Counter from './Counter';
import ReducerSample from './ReducerSample';
import { SampleProvider } from './SampleContext';

const App: React.FC = () => {
  // const onSubmit = (form: { name: string; description: string }) => {
  //   console.log(form);
  // };
  // return <MyForm onSubmit={onSubmit} />;

  return (
    <>
      <Counter />
      <hr />
      <SampleProvider>
        <ReducerSample />
      </SampleProvider>
      <CounterContainer />
      <hr />
      <TodoApp />
    </>
  );
};

export default App;
