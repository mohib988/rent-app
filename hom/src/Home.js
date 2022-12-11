import React from 'react'
import Nav from './na.js';
import Slider  from './slider.js';

import Linked from './link.js';



 function Home(props) {
  return (
      <>


<Nav productonload={props.productonload}/>     
     
      <Slider/>
      <Linked/>
    
      
</>
  )
}
export default Home;