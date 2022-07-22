const UserDetails = () => {
  const [userData,SetUserData] = useState([])
 
  useEffect(() => {
     fetch(("http://localhost:6969/userData"),{
     method:"POST",
     crossDomain:true,
     headers:{
       "content-type":"application/json",
       Accept:"application/json",
       "Acess-Control-Allow-Origin":"*"
     },
     body:JSON.stringify({
      token:window.localStorage.getItem("token"),
     }),
   }).then((res)=>res.json())
   .then((data)=>{
     console.log(data, "userData");
     SetUserData({userData:data.data})
   });
  }, []);
 
   return (
     <div>
       Name<h1>{userData.fname}</h1>
       Email<h1>{userData.email}</h1>
     </div>
   )
 }
 
 export default UserDetails