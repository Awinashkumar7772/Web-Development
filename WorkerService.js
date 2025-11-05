import axios from "axios"
const base_url = "http://localhost:3000/workers"
export const WorkerService={
    getAll:async()=>(await axios.get(base_url)).data,
    getById:async(id)=>(await axios.get(`${base_url}/${id}`)).data,
    addWorker:async(rec)=>(await axios.post(base_url,rec)).data,
    updateById:async(rec)=>(await axios.put(`${base_url}/${rec.id}`,rec)).data,
    remove_worker:async(id)=>(await axios.delete(`${base_url}/${id}`)).data
} 