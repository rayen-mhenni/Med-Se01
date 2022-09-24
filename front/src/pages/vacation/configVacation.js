// import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
// import axios from "axios";

// class Login extends Component {
//   constructor() {
//     super();

//     this.state = {
//       login: false,
//       selected: "",
//       totale: 0,
//     };
//   }

//   componentWillMount() {
//     let jwtToken = localStorage.getItem("token");

//     if (jwtToken !== undefined) {
//       this.setState({
//         login: true,
//       });
//     }
//   }

//   post(refs) {
//     var self = this;
//     axios
//       .post("http://localhost:4000/login/admin", {
//         email: refs.username.value,
//         password: refs.password.value,
//       })
//       .then(function (response) {
//         console.log(response);
//       })
//       .catch(function (err) {
//         console.log(err);
//       });
//   }

//   render() {
//     if (this.state.login === true) {
//       return <Redirect to="/" />;
//     }

//     return (
//       <div>
//         {" "}
//         <div>
//           <h4> totale congé de l'anneé
//              </h4>
//           <br />

//           <br /> <br />
//           <select>
//             <option value="" disabled>
//               type congé
//             </option>
//             <option value="normal">normal</option>
//             <option value="maladie">maladie</option>
//           </select>
//           <br />
//           <br />
//           <button class="btn btn-primary">envoyer</button>
//         </div>
//       </div>
//     );
//   }
// }

// export default Login;
