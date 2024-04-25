import { useEffect, useState } from 'react'
import './App.css'
import { database } from "./Config/Firebaseconfig.js";
import { addDoc, collection, deleteDoc,doc, getDocs, updateDoc } from 'firebase/firestore';

function App() {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [language, setLanguage] = useState('');
  const [val, setVal] = useState([]);
  const data = collection(database, "student-data");
  const [id,setId] =useState('')
  const [show,setShow] =useState(false)

  useEffect(() => {
    const getData = async () => {
      const dbval = await getDocs(data)
      setVal(dbval.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }
    getData()
  })

  const createData = async () => {
    await addDoc(data, { name: name, age: age, preferedprogramminglanguage: language });
    alert("data added to database !");
    setName("");
    setAge("");
    setLanguage("");
  }

  const deleteData = async(id)=>{
    const deleteVal = doc(database,"student-data",id)
    await deleteDoc(deleteVal)
    alert("data deleted !")
  }
  
  const editData = async(id,name,age,preferedprogramminglanguage)=>{
    setName(name)
    setAge(age)
    setLanguage(preferedprogramminglanguage)
    setId(id)
    setShow(true)
  }

  const handleUpdate = async()=>{
    const updateData = doc(database,"student-data",id)
    await updateDoc(updateData,{name:name,age:age,preferedprogramminglanguage: language})
    alert("data updated successfully in the database!")
    setShow(false)
    setName("")
    setAge("")
    setLanguage("")
    
  }

  return (
    <div className=''>
      <div className="relative my-6">
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="your name" className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border-b outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-green-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
        <label className="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
          Your name
        </label>
      </div>
      <div className="relative my-6">
        <input value={age} onChange={(e) => setAge(e.target.value)} type="text" placeholder="your name" className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border-b outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-green-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
        <label className="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
          Your Age
        </label>
      </div>
      <div className="relative my-6">
        <input value={language} onChange={(e) => setLanguage(e.target.value)} type="text" placeholder="your name" className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border-b outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-green-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
        <label className="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
          Your Favorite Programming Language
        </label>
      </div>
      {!show?<button onClick={createData} className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-green-500 hover:bg-green-600 focus:bg-green-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none">
        <span>Submit</span>
      </button>:<button onClick={handleUpdate} className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-green-500 hover:bg-green-600 focus:bg-green-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none">
        <span>Update Value </span>
      </button>}
      {
        val.map(values =>
          <div>
            <h1>{values.name}</h1>
            <h1>{values.age}</h1>
            <h1>{values.preferedprogramminglanguage}</h1>
            <button onClick={()=>deleteData(values.id)} className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-green-500 hover:bg-green-600 focus:bg-green-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none">
              <span>Delete</span>
            </button>
            <button onClick={()=>editData(values.id,values.name,values.age,values.preferedprogramminglanguage)} className=" ml-8 inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-green-500 hover:bg-green-600 focus:bg-green-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none">
              <span>Edit</span>
            </button>
            <hr></hr>
          </div>
        )
      }
    </div>
  )
}

export default App
