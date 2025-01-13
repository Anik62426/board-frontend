import Auth from "../components/Auth"
import Greeting from "../components/Greeting"

const Home = () => {
    const token = localStorage.getItem("token") 
  return (
    <div className="h-screen flex justify-center ">
      {token ? <Greeting/> : 
        <Auth/>
        }
    </div>
  )
}

export default Home