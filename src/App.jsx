import { FaEdit, FaTrashAlt, FaUserPlus } from "react-icons/fa";
import './App.css'
import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Table } from "react-bootstrap";
import Swal from "sweetalert2";


function App() {
  const lodarData = useLoaderData()
  const [userData, setuserData] = useState(lodarData)
  console.log(userData);
  const handelDelletUser = (id) => {

    console.log(id);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/delletusers/${id}`, {
          method: "DELETE"
        })
          .then(res => res.json())
          .then(data => {

            const remainingUser = userData.filter(user => user._id !== id)
            setuserData(remainingUser)
            console.log(data);
            if (data.deletedCount>0) {
              Swal.fire(
                'Deleted!',
                'User  has been deleted.',
                'success'
              )
            }
          })
       
      }
    })

    


  }
  return (
    <>
      <div >
        <h1 className='text-center bg-success py-2 text-white'>User Mamagment system</h1>
        <div className='w-75 mx-auto mt-5 pt-5' >
          <Link to={"/adduser"}> <button className='btn btn-outline-secondary'><FaUserPlus></FaUserPlus> New User</button></Link>

          <div className="my-5">
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  userData && userData.map((data) => <tr key={data._id}>
                    <td>{data._id}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.gender}</td>
                    <td>{data.active}</td>
                    <td><button onClick={() => handelDelletUser(data._id)} className="btn"><FaTrashAlt className="text-danger"> </FaTrashAlt></button> <Link to={`/updateUser/${data._id}`}><button className="btn ms-5"><FaEdit className="text-success"></FaEdit></button></Link></td>
                  </tr>)
                }

              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
