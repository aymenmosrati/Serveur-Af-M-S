import "./datatable.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {URL} from "../../constant/Constant"

const Datatable_consultant = (props) => {

  const { users, setUsers } = props.data;
  // console.log(users.length);
  // const navgite = useNavigate();

  const deleteConsultant = (id) => {
    axios.delete(`${URL}/delete_user/${id}`)
      .then((response) => {
        window.location.reload(false)
      })
      .catch((error) => { console.log(error) })
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Consultant
        <Link to="/consultant/new" className="link" >
          Add New
        </Link>
      </div>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.length === 1 ? <tr key={users[0]?.id}>
              <td>{users[0]?.id}</td>
              <td>{users[0]?.username}</td>
              <td>{users[0]?.email}</td>
              <td>{users[0]?.telephone}</td>
              <td>
                <div className="cellAction">
                  <Link to={`/user_consultant/${users[0].id}`} style={{ textDecoration: "none" }}>
                    <div className="viewButton">View</div>
                  </Link>
                  <div
                    className="deleteButton"
                    onClick={() => deleteConsultant(users[0].id)}
                  >
                    Delete
                  </div>
                </div>
              </td>
            </tr>
              : users.map((user) => (
                <tr key={user?.id}>
                  <td>{user?.id}</td>
                  <td>{user?.username}</td>
                  <td>{user?.email}</td>
                  <td>{user?.telephone}</td>
                  <td>
                    <div className="cellAction">
                      <Link to={`/user_consultant/${user.id}`} style={{ textDecoration: "none" }}>
                        <div className="viewButton">View</div>
                      </Link>
                      <div 
                        className="deleteButton"
                        onClick={() => deleteConsultant(user.id)}
                      >
                        Delete
                      </div>
                    </div>
                  </td>
                </tr>
                //rowspan / colspan
              ))
          ) : <tr><td colSpan='5' className="text-center"> User founded</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default Datatable_consultant;
