// import React, { useState } from 'react';

// export default function SignUpModal({ showModal, setShowModal, setUsername }) {
//   const [usernameInput, setUsernameInput] = useState('');

//   const handleSubmit = () => {
//     if (usernameInput) {
//       setUsername(usernameInput);
//       localStorage.setItem('username', usernameInput);
//       setShowModal(false); // Close the modal after submission
//     }
//   };

//   return (
//     showModal && (
//       <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-bold mb-4">Sign Up / Log In</h2>
//           <input
//             type="text"
//             value={usernameInput}
//             onChange={(e) => setUsernameInput(e.target.value)}
//             placeholder="Enter username"
//             className="border p-2 rounded w-full mb-4"
//           />
//           <div className="flex justify-between">
//             <button
//               onClick={handleSubmit}
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Submit
//             </button>
//             <button
//               onClick={() => setShowModal(false)}
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   );
// }
