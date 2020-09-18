import React, { useState, useEffect } from "react";
import { axiosWithAuth } from './utils/axiosWithAuth';


const MainPage = () => {
  const [user, setUser] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth()
    .get('api/users')
    .then((res)=> {
      setUser(res.data);
    })
    .catch((err) => console.log(err));
  },[])

  return (
    <>
      {/* <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} /> */}
    </>
  );
};

export default MainPage;