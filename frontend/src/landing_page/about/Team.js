import React from 'react';


function Team() {
    return ( 
       <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center ">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="media/images/Sakshamsingh.jpg"
            style={{ borderRadius: "90%", width: "50%" }}
          />
          <h4 className="mt-5">Saksham singh</h4>
          <h6>B.tech, Student</h6>
        </div>
        <div className="col-6 p-3">
          <p>
           "A final-year B.Tech Computer Science student with hands-on experience in MERN stack development and strong problem-solving skills in Data Structures and Algorithms. Interested in building scalable web applications and learning emerging technologies."
          </p>
          <p>
           actively exploring AI-based applications. Member of [MVIET College/ coding club / GDSC / IEEE / any group if applicable]. 
           Interested in building scalable web applications and learning emerging technologies."
          </p>
          <p>
           <a href="https://www.instagram.com/singh.saksham73?igsh=c3ozem95aTB6aTZm" target="_blank"  style={{ marginRight: "15px" }}>Instagram</a> 
           <a href="https://www.linkedin.com/in/saksham-singh93" target="_blank"  style={{ marginRight: "15px" }}>LinkedIn</a> 
           <a href="https://github.com/saksham9336" target="_blank"  style={{ marginRight: "15px" }}>GitHub</a> 
           <a href="mailto:work.saksham93@gmail.com"  style={{ marginRight: "15px" }}>Email</a>
           <a href="tel:+919336160054"  style={{ marginRight: "15px" }}>Call</a>
          </p>
        </div>
      </div>
    </div>
    );
}

export default Team;