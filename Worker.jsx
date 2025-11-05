import { useEffect, useState } from "react";
import {WorkerService}  from "../Services/WorkerService";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Worker() {
  const [workers, setWorkers] = useState([]);
  const [form, setForm] = useState({ id: "", w_name: "", age: 0, address: "" });

  useEffect(() => {
  WorkerService.getAll().then((data) => {
    console.log("Fetched workers:", data);
    setWorkers(data);
  });
}, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd =  () => {
    const newRec = WorkerService.addWorker(form);
    setWorkers([...workers, newRec]);
    setForm({ id: 0, w_name: "", age: 0, address: "" });
  };

  const handleEdit = (data) => {
    setForm(data);
  };

  const handleDelete = async (id) => {
    await WorkerService.remove_worker(id);
    setWorkers(workers.filter((p) => p.id !== id));
  };
  const handleUpdate=()=>{
    WorkerService.updateById(form)
    setWorkers(workers.map((p)=>form.id===p.id?form:p))
    setForm({ id: 0, w_name: "", age: 0, address: "" });
  }

  return (


    
    <div>
      <div className="container">
        <div className="row">
          <div id="check">
            <table border={2}>
        <thead>
          <tr>
            <th className="text-light bg-dark">ID</th>
            <th className="text-light bg-dark">Name</th>
            <th className="text-light bg-dark">Age</th>
            <th className="text-light bg-dark">Address</th>
            <th className="text-light bg-dark">Action</th>
          </tr>
        </thead>
         <tbody>
                  {
                    workers.map(e=>(
                      <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.w_name}</td>
                        <td>{e.age}</td>
                        <td>{e.address}</td>
                        <td>
                          <button onClick={()=>handleEdit(e)} className="btn btn-primary m-3">Edit</button>
                          <button onClick={()=>handleDelete(e.id)} className="btn btn-danger">Delete</button>
                        </td>
                      
                      </tr>
                    ))
                  }
          </tbody>
        
      </table></div>
        </div>
      </div>

    <div className="container"><div className="row"><div className="col-md-8">
        <form>
        <input  name="id" value={form.id} placeholder="Enter ID" onChange={handleChange} />
        <input  name="w_name" value={form.w_name} placeholder="Enter Name" onChange={handleChange} />
        <input  name="age" value={form.age} placeholder="Enter Age" onChange={handleChange} />
        <input  name="address" value={form.address} placeholder="Enter Address" onChange={handleChange} />
        <br />
        <button onClick={handleAdd} className="btn btn-success m-3">Add</button>
        <button onClick={handleUpdate} className="btn btn-dark">Update</button>
      </form></div></div></div>
    </div>
  );
}
