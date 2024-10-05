

const AboutSection = () => {
    return (
        <div className='bg-gray-100'>
            <div >
                <div className="text-center ">
                    <h1 className="text-4xl font-Prata font-bold mt-24 py-6" >About Us</h1>
                </div>
            </div>
            <section className="container rounded-xl mx-auto  dark:bg-gray-800 text-gray-800 dark:text-gray-100">

                <div className="container gap-10 flex flex-col justify-center items-center   sm:py-12  lg:flex-row lg:justify-evenly">
                    <div className="flex items-center justify-center p-6 mt-3 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                        <img src="https://i.ibb.co/tX3LkgS/about.png" alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
                    </div>
                    <div className=" flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h1 className="text-5xl font-bold leading-none sm:text-6xl">A Fitness Tracker Website
                        </h1>
                        <hr className='-ml-0 mt-5 h-[1px] border-none bg-slate-400 mx-auto w-[100%]' />
                        <p className="mt-6  text-lg sm:mb-12">
                            Welcome to Pavilion FitFocus – your ultimate fitness companion! At Pavilion FitFocus, we're dedicated to 
                            helping you achieve your fitness goals and lead a healthier lifestyle. Our platform 
                            provides intuitive tools and expert guidance to support you every step of the way. 
                            Join our community today and discover the power of focused fitness for a happier, 
                            healthier you.
                        </p>
                        <hr className='-ml-0 mb-5 h-[1px] border-none bg-slate-400 mx-auto w-[100%]' />
                        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                            <a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold rounded bg-[#1E1743]  text-white dark:text-gray-50">Get Started </a>
                            <a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold border shadow-lg rounded border-gray-100 dark:border-gray-800">Know More</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutSection;