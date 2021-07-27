import React, { useState } from 'react';
import { ButtonInput } from './ButtonInput';
import { Input } from './Input';

type AllInputType = {
  addItem: (title: string) => void;
};

export const AllInput = (props: AllInputType) => {
  let [title, setTitle] = useState('');
  let [error, setError] = useState<string | null>(null);

  const addTaskTodo = () => {
    setError(null);
    if (title.trim() !== '') {
      props.addItem(title.trim());
      setTitle('');
    } else {
      setError('Title is required');
    }
  };

  return (
    <div>
      <div className="all_input">
        <Input
          setTitle={setTitle}
          title={title}
          error={error}
          setError={setError}
          addTaskTodo={addTaskTodo}
        />
        <ButtonInput
          setTitle={setTitle}
          title={title}
          error={error}
          setError={setError}
          addTask={props.addItem}
          addTaskTodo={addTaskTodo}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
