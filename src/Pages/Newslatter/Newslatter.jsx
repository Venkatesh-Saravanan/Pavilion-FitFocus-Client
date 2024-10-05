import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../Hook/useAxiosSecure";
import useAxiosSecurePrivate from "../../Hook/useAxiosSecurePrivate";

const Newslatter = () => {
    const axiosSecurePrivte = useAxiosSecurePrivate()
    const { data, isLoading, error } = useQuery({
        queryKey: ['newslatter'],
        queryFn: async () => {
            const res = await axiosSecurePrivte.get('/newsLatter',{
                headers:{
                  authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
              });
            return res.data;
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="text-center px-10 ">
            <div className="overflow-x-auto ">
                <table className="table">
                    <thead className="text-[#155E75] text-xl font-semibold">
                        <tr>
                            <th>SN</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subscribe Date</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((singleData, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{singleData.name}</td>
                                <td>{singleData.user_email}</td>
                                <td>{singleData.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Newslatter;