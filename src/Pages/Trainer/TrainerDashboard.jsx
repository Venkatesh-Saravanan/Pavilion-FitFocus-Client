

const TrainerDashboard = () => {
    return (
        <>
        <div className="p-5 mx-auto">
            <h1 className="text-2xl font-bold font-Prata ">Manage Slots: </h1>
        </div>
        <div className="overflow-x-auto p-2">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th className="" ></th>
        <th className="border border-black">Slot Name</th>
        <th className="border border-black">Slot Time</th>
        <th className="border border-black">Booking status</th>
        <th className="border border-black">Slot Name</th>
        <th className="border border-black">Slot Time</th>
        <th className="border border-black">Booking status</th>
      
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th ></th>
        <td className="border-x border-black"></td>
        <td className="border border-black">10:00-11:00</td>
        <td className="border m-2 border-black  ">
        <button className="bg-[#155E75] btn text-white">Add Slot</button>
            <button className="bg-[#155E75] btn text-white">Delete Slot</button>
            </td>
        <td className="border-x border-black"></td>
        <td className="border border-black">10:00-11:00</td>
        <td className="border m-2 border-black  ">
        <button className="bg-[#155E75] btn text-white">Add Slot</button>
            <button className="bg-[#155E75] btn text-white">Delete Slot</button>
            </td>
      </tr>
      {/* row 2 */}
      <tr>
      <th ></th>
        <td className="text-2xl border-x border-black font-bold">Morning </td>
        <td className="border border-black">11:00-12:00</td>
        <td className="border m-2 border-black  ">
        <button className="bg-[#155E75] btn text-white">Add Slot</button>
            <button className="bg-[#155E75] btn text-white">Delete Slot</button>
            </td>
        <td className="text-2xl border-x border-black font-bold">Night </td>
        <td className="border border-black">11:00-12:00</td>
        <td className="border m-2 border-black  ">
            <button className="bg-[#155E75] btn text-white">Add Slot</button>
            <button className="bg-[#155E75] btn text-white">Delete Slot</button>
            
            </td>
      </tr>
      {/* row 3 */}
      <tr>
      <th ></th>
        <td className="border-b border-x border-black"></td>
        <td className="border border-black">12:00-1:00</td>
        <td className="border border-black font-bold">Book by: Tahsin Fahim</td>
        <td className="border-b border-x border-black"></td>
        <td className="border border-black">12:00-1:00</td>
        <td className="border border-black font-bold">Book by: Tahsin Fahim</td>
      </tr>
    </tbody>
  </table>
</div>
        </>
    );
};

export default TrainerDashboard;