import {Route, Routes} from 'react-router-dom'
import Product from './componet/Product';
import NewProduct from './componet/NewProduct';
import Sidebar from './componet/Sidebar';
import UpdateProduct from './componet/UpdateProduct';
import ErrorPage from './componet/ErrorPage';

function App() {
  return (
    <div>
        <Routes>
        
           {/* <Route path='/' element={<Sidebar/>}/> */}
           <Route path='/' element={<Sidebar/>}>
              <Route path='' element={<Product/>}/>
              <Route path='dashbord/addproduct' element={<NewProduct/>}/>
              <Route path='dashbord/updateProduct/:id' element={<UpdateProduct/>} />
           </Route>
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
    </div>
  );
}

export default App;
