import './App.css'

function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL)
  console.log(import.meta.env.VITE_DATABASE_URL)
  
  // const temp = (import.meta.env.DATABASE_URL) ;
  // console.log(temp, 'this is coming from assign')


  return (
    <>
      <h1>Blog App with Appwrite</h1>
    </>
  )
}

export default App
