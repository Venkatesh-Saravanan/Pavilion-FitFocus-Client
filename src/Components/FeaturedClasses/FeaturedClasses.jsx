import useClasses from "../../Hook/useClasses";
import FeaturedClasse from "./FeaturedClasse";

const FeaturedClasses = () => {
    const { classes } = useClasses();
    
    return (
        <>
            <div className="text-center">
                <h1 className="text-4xl font-Prata font-bold mt-24" >Popularity Catagory</h1>
                <p className="mt-2 mb-10 text-slate-500 ">Benefit from custom weight loss plans integrating exercise, diet, and ongoing support, guiding you <br /> towards safe and sustainable weight management.</p>
            </div>
            <div className="container mx-auto lg:grid grid-cols-2 gap-10 w-[95%]">
                {classes && classes.slice(0,6).map((classData) => (
                    <FeaturedClasse key={classData.id} classData={classData} />
                ))}
            </div>
        </>
    );
};

export default FeaturedClasses;