import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { GoPeople } from 'react-icons/go';
import { BsSpeedometer } from 'react-icons/bs';
import { BsFuelPumpDiesel } from 'react-icons/bs';
import { GiSteeringWheel } from 'react-icons/gi';
import {GrLinkNext} from 'react-icons/gr'
import Data from '../../Data.json';
import {GrLinkPrevious} from 'react-icons/gr'

function Body() {
    const itemsPerPage = 6;
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
  
    const filteredData = Data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
    };
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = filteredData.slice(startIndex, endIndex);
  
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };
    
      const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };

  return (
    <div className='bg-transparent px-4 py-5'>
      <div className='bg-indigo-50 rounded-[20px] w-full px-6 py-3'>
        <div className='flex items-start'>
          <label className='relative block'>
            <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
              <AiOutlineSearch />
            </span>
            <input
              className='placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-[25px] py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
              placeholder='Search...'
              type='text'
              name='search'
              id='searchInput'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </label>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-5  place-items-center py-4'>
        {displayedData.map((item) => {
          return (
            <div className='max-w-md mx-auto bg-indigo-50 rounded-lg overflow-hidden shadow-lg' key={item.id}>
              <img className='w-full h-auto p-2 rounded-2xl' src={item.icon} alt='Card Image' />
              <div className='px-5 py-2 grid grid-cols-2 gap-3 place-items-start'>
                <div className='font-bold text-lg mb-3'>{item.name}</div>
                <span className='text-sm ml-28 outline-dashed outline-2 outline-blue-600 rounded-full px-3 py-1'>{item.year}</span>
                <div className='flex items-center gap-2'>
                  <GoPeople className='text-blue-500' />
                  4 People
                </div>
                <div className='flex items-center gap-2'>
                  <BsFuelPumpDiesel className='text-blue-500' />
                  {item.fuel}
                </div>
                <div className='flex items-center gap-2'>
                  <BsSpeedometer className='text-blue-500' />
                  {item.distance}
                </div>
                <div className='flex items-center gap-2'>
                  <GiSteeringWheel className='text-blue-500' />
                  Automatic
                </div>
              </div>
              <div className='px-4 py-4 text-lg flex items-center mt-3 border-t-2'>
                {item.price}
                <span className='inline-block text-sm text-gray-700'>/month</span>
                <div className='text-blue-500 cursor-pointer bg-gray-200 px-2 py-[.4rem] rounded-[10px] ml-28 text-2xl'>
                  <AiOutlineHeart />
                </div>
                <div className='bg-blue-500 rounded-[12px] cursor-pointer px-4 py-2 text-sm text-white ml-5'>Rent now</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className='flex justify-end mt-4 py-3 bg-indigo-50 rounded-[20px]'>
        <ul className='flex'>
          <li
            className={`mx-2 mt-1 cursor-pointer bg-white py-2 px-2 rounded-xl ${
              currentPage === 1 ? 'text-gray-500' : 'text-black-500 font-semibold'
            }`}
            onClick={handlePrevPage}
          >
            <GrLinkPrevious/>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              className={`mx-2 mt-1 cursor-pointer bg-white py-1 px-3 rounded-xl ${
                currentPage === index + 1 ? 'text-black-500 font-semibold' : 'text-gray-500'
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </li>
          ))}
          <li
            className={`mr-6 mt-1 ml-2 cursor-pointer bg-white py-2 px-2 rounded-xl  ${
              currentPage === totalPages ? 'text-gray-500' : 'text-black-500 font-semibold'
            }`}
            onClick={handleNextPage}
          >
            <GrLinkNext/>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Body;
