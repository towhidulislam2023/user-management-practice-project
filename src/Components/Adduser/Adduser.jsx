import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';


const Adduser = () => {
    const handelAddUser = (event) => {
        event.preventDefault()
        const form = event.target
        const name = form.name?.value;
        const email = form.email?.value;
        const gender = form.gender?.value;
        const active = form.active?.value;
        // console.log(name, email, gender, active);
        const newUser = {
            name,
            email,
            gender,
            active
        }
        // console.log(newUser);
        fetch("http://localhost:5000/addUser", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newUser)

        })
            .then(res => res.json())
            .then(data =>{
                if (data.insertedId) {
                    Swal.fire(
                        'Good job!',
                        'User Added !',
                        'success'
                    )
                    form.reset()
                }
                // console.log(data)
            } )
    }
    return (
        <div>
            <h1 className='text-center bg-success py-2 text-white'>User Mamagment system</h1>

            <div className='w-75 mx-auto mt-5 pt-5' >
                <Link className='mb-5' to={"/"}><p className='text-black'> <FaArrowLeft></FaArrowLeft> Back to Home</p></Link>
                <div className='text-center my-5'>
                    <h1>New user</h1>
                    <p>Use the below from to add new users</p>
                </div>

                <Form onSubmit={handelAddUser} className='my-5'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="name" name='name' placeholder="User Name" />
                        <Form.Text className="text-muted">
                            We will never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>User Email</Form.Label>
                        <Form.Control type="email" name='email' placeholder="User Eamil" />
                    </Form.Group>
                    <span className='me-5'>Gender : </span>
                    <input className='me-3' type="radio" name="gender" value="male" /><span className='me-5'>Male</span>
                    <input className='me-3' type="radio" name="gender" value="female" />Female
                    <br />
                    <span className='me-5'>Active : </span>
                    <input className='me-3' type="radio" name="active" value="active" /><span className='me-5'>Active</span>
                    <input className='me-3' type="radio" name="active" value="inactive" />Inactive
                    <br />
                    <br />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            {/* <form>
                <input type="text" name="name" id="" />
                <input type="email" name="email" id="" />
            </form> */}

        </div>
    );
};

export default Adduser;