import React from 'react'

const About = () => {
  return (
    <div className='my-8 flex flex-col items-center justify-center '>
      <div className='flex my-2 text-xl'>
      <h1 className='font-semibold '>App description :</h1><span>This is a food ordering app created using React.</span>
      </div>
        
        <p className='text-lg font-semibold'>Below are some few details about the App details - :</p>
        <ul className='my-4 text-lg'>
          <li><span className='font-extrabold mx-2'>-</span>Here i used <span className='text-orange-600'>Parcel</span> as bundler to bundle things up.</li>
          <li><span className='font-extrabold mx-2'>-</span>The app is created using functional Components , inbuild hooks and custom hooks .</li>
          <li><span className='font-extrabold mx-2'>-</span>Used inbuilt hooks like <span className='text-orange-600'>useState</span> , <span className='text-orange-600'>useEffect</span> , <span className='text-orange-600'>useContext</span></li>
          <li><span className='font-extrabold mx-2'>-</span>Used <span className='text-orange-600'>Swiggy's Public API</span> for fetching Resturant List and Menu</li>
          <li><span className='font-extrabold mx-2'>-</span>Created custom hooks like <span className='text-orange-600'>useRestaurant</span> to get list of menu items of a selected restaurant</li>
          <li><span className='font-extrabold mx-2'>-</span>Used <span>Shimmer</span> to make the UI friendly for the User.</li>
          <li><span className='font-extrabold mx-2'>-</span>Used <span className='text-orange-600'>Tailwind CSS</span> for designing and styling the UI.</li>
          <li><span className='font-extrabold mx-2'>-</span>Used <span className='text-orange-600'>React Router</span> for routing.</li>
          <li><span className='font-extrabold mx-2'>-</span>Used <span className='text-orange-600'>Redux Toolkit</span> for state management.</li>


        </ul>
    </div>
  )
}

export default About