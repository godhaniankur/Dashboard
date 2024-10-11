import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Product = () => {
  const [data, setData] = useState([]);
  const [find, setFind] = useState('');
  const [type, setType] = useState('title');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [result, setResult] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.log('Error fetching products:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    const toastId = toast.loading('waiting...');
    try {
      const deleteResponse = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'DELETE',
      });

      if (deleteResponse.ok) {
        setData(data.filter((product) => product.id !== id));
        setResult(result.filter((product) => product.id !== id)); // In case filtered data
        toast.success('Product deleted successfully.');
      } else {
        toast.error('Failed to delete product.');
      }
    } catch (error) {
      console.log('DELETE API ERROR:', error);
      toast.error('An error occurred while deleting the product.');
    }
    toast.dismiss(toastId);
  };

  const filterByCategory = async (value) => {
    if (value === 'all') {
      setCategory('');
      setResult([]);
    } else {
      setLoading(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${value}`);
        const specific = await response.json();
        setCategory(value);
        setResult(specific);
      } catch (error) {
        console.log('Error fetching category:', error);
      }
      setLoading(false);
    }
  };

  const filteredProducts = category === '' ? data : result;

  const displayedProducts = filteredProducts.filter((product) => {
    if (find === '') return product;
    return type === 'title'
      ? product?.title?.toLowerCase().includes(find.toLowerCase())
      : product?.category?.toLowerCase().includes(find.toLowerCase());
  });

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>

        {/* Search and Filter */}
        <div className="flex w-full m-3">
          <div className="border-2 flex items-center p-2">
            <select onChange={(e) => setType(e.target.value)} className="flex outline-none p-2">
              <option value="title" className="text-blue-500 p-2">Name</option>
              <option value="category">Category</option>
            </select>
          </div>
          <div className="flex items-center justify-center w-full p-2 border-2">
            <input
              type="search"
              className="p-1 w-full flex outline-none"
              onChange={(e) => setFind(e.target.value)}
              placeholder="Search in Category and Name"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="lg:flex w-full mx-auto justify-between gap-x-4">
          <div className="lg:flex lg:w-11/12 w-full mx-auto gap-x-3 gap-y-3 text-center justify-end">
            <div
              className={`border p-2 rounded-md text-white cursor-pointer ${category === '' ? 'bg-blue-700' : 'bg-gray-500'}`}
              onClick={() => filterByCategory('all')}
            >
              All
            </div>
            <div
              className={`border p-2 rounded-md text-white cursor-pointer ${category === "men's clothing" ? 'bg-blue-700' : 'bg-gray-500'}`}
              onClick={() => filterByCategory("men's clothing")}
            >
              Men's Clothing
            </div>
            <div
              className={`border p-2 rounded-md text-white cursor-pointer ${category === 'jewelery' ? 'bg-blue-700' : 'bg-gray-500'}`}
              onClick={() => filterByCategory('jewelery')}
            >
              Jewellery
            </div>
            <div
              className={`border p-2 rounded-md text-white cursor-pointer ${category === "women's clothing" ? 'bg-blue-700' : 'bg-gray-500'}`}
              onClick={() => filterByCategory("women's clothing")}
            >
              Women's Clothing
            </div>
          </div>
        </div>

        {/* Product List */}
        <div>
          {loading ? (
            <div className="loader mt-[13%] m-auto flex items-center justify-center"></div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {displayedProducts.map((product) => (
                <div key={product.id} className="group relative shadow-md p-2 rounded-md border">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.image}
                      alt={product.category}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between w-full">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        {product.title.slice(0, 15)}..
                      </h3>
                      <div className='flex flex-col '>
                        <p className="mt-1 text-sm text-gray-500">Rating: {product.rating.rate}</p>
                        <p className='font-bold'>quantity: {product.rating.count}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">${product.price}</p>
                  </div>
                  <div>
                    <span>{product.description.slice(0, 100)}...</span>
                  </div>
                  <div className="flex flex-col w-full">
                    <button className="border p-2 text-white bg-red-800 rounded-md hover:opacity-80" type="button" onClick={() => deleteProduct(product.id)}>
                      Delete
                    </button>
                    <button type="button" className="border p-2 text-white bg-green-800 rounded-md hover:opacity-80">
                      <Link to={`/dashbord/updateProduct/${product.id}`}>Edit</Link>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
