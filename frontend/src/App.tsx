import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";


interface Result {

prediction:string;

probability:number;

recommendation:string;

}


interface Machine {

machine_id:number;

air_temperature:number;

process_temperature:number;

rotational_speed:number;

torque:number;

tool_wear:number;

}



function App(){


const [result,setResult] =
useState<Result | null>(null);


const [machine,setMachine] =
useState<Machine | null>(null);


const [loading,setLoading] =
useState(false);


const [page,setPage] =
useState("dashboard");


const [theme,setTheme] =
useState("dark");




// LOAD REAL DATASET VALUE FIRST

useEffect(()=>{


axios.get(

"http://127.0.0.1:8000/machine"

)


.then((response)=>{


setMachine(response.data);


})


.catch((error)=>{


console.log(error);


});


},[]);




// CHANGE SENSOR VALUES MANUALLY

const updateValue=(field:keyof Machine,value:string)=>{


if(machine){


setMachine({

...machine,

[field]:Number(value)

});


}


};








const runPrediction = async()=>{


if(!machine){


alert("Machine data loading");


return;


}



try{


setLoading(true);



const response =
await axios.post(

"http://127.0.0.1:8000/predict",

{


air_temperature:
machine.air_temperature,


process_temperature:
machine.process_temperature,


rotational_speed:
machine.rotational_speed,


torque:
machine.torque,


tool_wear:
machine.tool_wear


}


);



setResult(response.data);



}


catch(error){


alert("Backend not connected");


console.log(error);


}



finally{


setLoading(false);


}


};







return(

<div className={`dash ${theme}`}>


{/* SIDEBAR */}


<aside className="sidebar">


<div className="brand">


<div className="brand-icon"></div>


<div>


<div className="brand-name">

AI Factory

</div>


<div className="brand-sub">

Predictive System

</div>


</div>


</div>




<div className="nav-section">

SYSTEM STATUS

</div>



<div

className={
page==="dashboard"
?
"nav-item active"
:
"nav-item"
}

onClick={()=>setPage("dashboard")}

>

Live Monitoring

</div>


</aside>







<main className="main">



<header className="header">


<div>


<h1>

Industrial Predictive Maintenance

</h1>


<p>

Real-time machine failure prediction system

</p>


</div>




<div className="top-actions">


<p>

Random Forest Accuracy : 98.4%

</p>



<button

className="theme-btn"

onClick={()=>{


setTheme(

theme==="dark"

?

"light"

:

"dark"

);


}}

>


{

theme==="dark"

?

"☀️ Light Mode"

:

"🌙 Dark Mode"

}


</button>


</div>



</header>








<section className="stats">



<div className="stat-card">

<p className="stat-label">

Dataset Samples

</p>

<h2 className="stat-val blue">

10000

</h2>

</div>




<div className="stat-card">

<p className="stat-label">

Normal Records

</p>

<h2 className="stat-val green">

9661

</h2>

</div>




<div className="stat-card">

<p className="stat-label">

RF Accuracy

</p>

<h2 className="stat-val amber">

98.4%

</h2>

</div>




<div className="stat-card">

<p className="stat-label">

⚠ Failure Records

</p>

<h2 className="stat-val red">

339

</h2>

</div>


</section>










<section className="content">



<div className="card">



<h3 className="card-title">

🖥 Machine MC-{machine?.machine_id}

</h3>




{


machine &&


<>


<div className="sensor-row">

<p>Air Temperature</p>


<input

value={machine.air_temperature}

onChange={(e)=>

updateValue(

"air_temperature",

e.target.value

)

}

/>


</div>





<div className="sensor-row">

<p>Process Temperature</p>


<input

value={machine.process_temperature}

onChange={(e)=>

updateValue(

"process_temperature",

e.target.value

)

}

/>


</div>






<div className="sensor-row">

<p>RPM</p>


<input

value={machine.rotational_speed}

onChange={(e)=>

updateValue(

"rotational_speed",

e.target.value

)

}

/>


</div>






<div className="sensor-row">

<p>Torque</p>


<input

value={machine.torque}

onChange={(e)=>

updateValue(

"torque",

e.target.value

)

}

/>


</div>







<div className="sensor-row">

<p>Tool Wear</p>


<input

value={machine.tool_wear}

onChange={(e)=>

updateValue(

"tool_wear",

e.target.value

)

}

/>


</div>


</>


}








<button

className="run-btn"

onClick={runPrediction}

>


{

loading

?

"Analyzing..."

:

"▶ Run AI Diagnosis"

}


</button>


</div>











<div className="card">


<h3 className="card-title">

AI Prediction Result

</h3>





{


result

?


<div className="result-data">


<div

className={

result.prediction==="Healthy"

?

"status-badge healthy"

:

"status-badge risk"

}

>


{

result.prediction==="Healthy"

?

"🟢 Healthy"

:

"🔴 Failure Risk Detected"

}


</div>





<h1 className="prob-val">


{result.probability}%


</h1>





<div className="rec-box">


AI Recommendation


<br/>

<br/>


{result.recommendation}


</div>


</div>




:


<div className="result-empty">


Waiting for AI Diagnosis


</div>


}


</div>



</section>









<div className="card fleet-card">


<h3 className="card-title">

Machine Prediction Status

</h3>



<table className="fleet-table">

<tbody>


<tr>

<th>ID</th>

<th>Temperature</th>

<th>RPM</th>

<th>Status</th>

</tr>




<tr>


<td>

MC-{machine?.machine_id}

</td>


<td>

{machine?.air_temperature} K

</td>


<td>

{machine?.rotational_speed}

</td>



<td>


<span className="status-pill pill-ok">

Prediction Ready

</span>


</td>


</tr>


</tbody>


</table>


</div>






</main>


</div>


);


}



export default App;