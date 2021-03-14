import axios from "axios";
export default {
  
    addSong: function(song){
        axios.post("/api/song",song);
    },

   
    getSongs:function(){
        return axios.get("/api/songs/")
    }
    
}
