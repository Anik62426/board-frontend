import { Link } from "react-router-dom"

const Greeting = () => {
    const User = JSON.parse(localStorage.getItem("user") || '{}');
    const firstName = User.firstName;
  return (
    <div>
    <div className="min-h-screen mt-10">
        <div className="bg-gray-100 p-10 rounded-md">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-black">Welcome, {firstName}!</h1>
        <p className="mt-2 text-lg text-gray-700">
          You have <span className="font-semibold">active Campaigns</span> and 
          <span className="font-semibold"> unpaid Invoices. </span> 
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-black">Campaigns</h2>
          <p className="mt-2 text-gray-600">Track and manage your campaigns effectively.</p>
          <Link to="/campaigns">
          <button className="mt-4 px-4 py-2 bg-[#18181B] text-white font-medium rounded hover:bg-white hover:text-black border-2 border-black">
            View Campaigns
          </button>       
        </Link> 

        </div>
    

    
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-black">Invoices</h2>
          <p className="mt-2 text-gray-600">Stay on top of your payments and billing.</p>
          <Link to="/invoices">
          <button className="mt-4 px-4 py-2 bg-[#18181B] text-white font-medium rounded hover:bg-white hover:text-black border-2 border-black hover:font-base">
            View Invoices
          </button>
          </Link>
        </div>
      </div>
      </div>
    </div>

    </div>
  )
}

export default Greeting