import { useState } from "react";
import axios from "axios";
import "./App.css";


interface Result {

prediction:string;

probability:number;

recommendation:string;

}



function App(){


const [result,setResult] =
useState<Result | null>(null);


const [loading,setLoading] =
useState(false);


const [page,setPage] =
useState("dashboard");





const runPrediction = async()=>{


try{


setLoading(true);



const response =
await axios.post(

"http://127.0.0.1:8000/predict",

{


air_temperature:345,

process_temperature:355,

rotational_speed:1200,

torque:75,

tool_wear:220


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

<div className="dash">



{/* SIDEBAR */}

<aside className="sidebar">



<div className="brand">


<div className="brand-icon">



</div>



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


{/* MAIN */}

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



<p>

Random Forest Accuracy : 98.4%

</p>



</header>






{/* DASHBOARD PAGE */}


{


page==="dashboard" &&


<>






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








{/* MACHINE CARD */}


<div className="card">



<h3 className="card-title">

🖥 Machine MC-1001

</h3>




{[

["🌡 Air Temperature","345 K","65%","#38bdf8"],

["⚙ Rotational Speed","1200 RPM","55%","#22c55e"],

["⚡ Torque","75 Nm","70%","#f59e0b"],

["🔧 Tool Wear","220 min","85%","#ef4444"]

].map((item)=>(



<div className="sensor-row">


<div>


<p className="sensor-label">

{item[0]}

</p>


<div className="sensor-bar">


<div

className="sensor-fill"

style={{

width:item[2],

background:item[3]

}}

>


</div>



</div>



</div>



<span className="sensor-val">


{item[1]}


</span>



</div>



))}








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











{/* RESULT */}


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


{

result.probability

}

%


</h1>




<div className="rec-box">


 AI Recommendation


<br/>


<br/>


{

result.recommendation

}


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

<td>MC-1001</td>

<td>345 K</td>

<td>1200</td>

<td>

<span className="status-pill pill-ok">

Prediction Ready

</span>

</td>

</tr>




</tbody>


</table>


</div>





</>


}





</main>



</div>


);


}



export default App;