import api from "../api";

export default{
    getAll: async ()=>{
    const res = await  api.get('/todos')
    return res.data;
    }
}