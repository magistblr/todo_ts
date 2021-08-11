import React, { ChangeEvent, KeyboardEvent, useState } from 'react'


type AddItemFormsTypes = {
  callBack: (title: string) => void
}

export const AddItemForms = (props: AddItemFormsTypes) => {

  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const addTask = () => {
      let newTitle = title.trim();
      if (newTitle !== "") {
          props.callBack(newTitle);
          setTitle("");
      } else {
          setError("Title is required");
      }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      if (e.charCode === 13) {
          addTask();
      }
  }


  return (
    <div>
            <input value={title}
              onChange={onChangeHandler}
              onKeyPress={onKeyPressHandler}
              className={error ? "error" : ""}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}

    </div>
  )
}









// import React, { ChangeEvent, KeyboardEvent, useState } from 'react'


// type AddItemFormsTypes = {
//   addTask: (title: string, todolistId: string) => void
//   id: string
// }

// export const AddItemForms = (props: AddItemFormsTypes) => {

//   let [title, setTitle] = useState("")
//   let [error, setError] = useState<string | null>(null)

//   const addTask = () => {
//       let newTitle = title.trim();
//       if (newTitle !== "") {
//           props.addTask(newTitle, props.id);
//           setTitle("");
//       } else {
//           setError("Title is required");
//       }
//   }

//   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//       setTitle(e.currentTarget.value)
//   }

//   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//       setError(null);
//       if (e.charCode === 13) {
//           addTask();
//       }
//   }


//   return (
//     <div>
//             <input value={title}
//               onChange={onChangeHandler}
//               onKeyPress={onKeyPressHandler}
//               className={error ? "error" : ""}
//       />
//       <button onClick={addTask}>+</button>
//       {error && <div className="error-message">{error}</div>}

//     </div>
//   )
// }
