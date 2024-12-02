//import react from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
        
      const [notes, setNotes] = useState(notesInitial)

      //Get all notes
       const getNotes = async () => {
           //api call
           const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem('token')
            },
         });
           const json = await response.json()
            //console.log(json)
            setNotes(json)
       }

       //Add a note
       const addNote = async (title,description,tag) => {
        //todo  api call
        //api call
        const response = await fetch(`${host}/api/notes/addnote`,{
         method: 'POST',
         headers:{
             'Content-Type': 'application/json',
             "auth-token":localStorage.getItem('token')
         },
         body: JSON.stringify({title, description, tag})
     
      });
        
      const note = await response.json();
      setNotes(notes.concat(note))
     
    }
      //delete a note
      const deleteNote = async (id) => {
        //api call

        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
          method: 'DELETE',
          headers:{
              'Content-Type': 'application/json',
              "auth-token":localStorage.getItem('token')
          },
       });
       const json =  response.json();
       console.log(json)

       

        // console.log("Deleting the node with id" + id)
         const newNotes = notes.filter((note) => {return note._id!==id})
         setNotes(newNotes)
      }

      //edit a note
      const editNote = async (id,title,description, tag) => {
          //API CALL
           
             const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    "auth-token":localStorage.getItem('token')
                },
                body: JSON.stringify({title, description,tag})
             });
             const json = await response.json();
             console.log(json)
              
             let newNotes =  JSON.parse(JSON.stringify(notes))
          //Logic to edit in client
          for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
          
          }
         
          setNotes(newNotes);
      }
  return(
        <NoteContext.Provider value = {{notes,addNote,deleteNote,editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;





















// //import react from "react"; (video 58)
// import NoteContext from "./noteContext";
// import { useState } from "react";
// const NoteState = (props) => {
//     const s1 = {
//         "name": "lucky",
//         "class": "5b"
//     }

//     const [state, setState] = useState(s1);
//     const update = () => {
//         setTimeout(() => {
//            setState({
//               "name": "rahul",
//             "class":"5b"
//            })
//         }, 2000);
//     }
//     return(
//         <NoteContext.Provider value = {{state:state, update:update}}>
//             {props.children}
//         </NoteContext.Provider>
//     )
// }

// export default NoteState;