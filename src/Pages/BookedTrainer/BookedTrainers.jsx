import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../Hook/useAxiosSecure";
import UseAuth from "../../Hook/useAuth";
import TrainerInfo from "./TrainerInfo/TrainerInfo";

const BookedTrainers = () => {
  const { user } = UseAuth();

  const { data: bookedTrainers, isLoading, error } = useQuery({
    queryKey: ["BookedTrainer"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/mail/${user.email}`);
      return res.data;
    },
  });

 

  const uniqueTrainers = [...new Set(bookedTrainers?.map(item => item.trainerEmail))];
 

  return (
    <div>
      <div>
        {bookedTrainers?.length > 0 ? (
          uniqueTrainers.map((bookedTrainer) => (
            <TrainerInfo key={bookedTrainer._id} bookedTrainer={bookedTrainer}  />
            
          ))
        ) : (
          <p>No booked trainers found.</p>
        )}
        
      </div>
     
    </div>
  );
};

export default BookedTrainers;