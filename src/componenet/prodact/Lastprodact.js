import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Pagination } from "../composant";
import { URL } from '../../action/baseurl'
import { Modal, Button } from 'react-bootstrap';
let datas = []

function Lastprodact(props) {

    let [data, setdata] = useState([])
    let [valeur , show] = useState(false)
    const [state, setState] = useState({
        totalRecords: "",
        totalPages: "",
        pageLimit: "",
        currentPage: "",
        startIndex: "",
        endIndex: "",
    })
    useEffect(() => {
        Axios.get(URL + "ListeProduit")
            .then(res => {
                if (res.data.length > 15)
                    setdata([...res.data].reverse().slice(0, 14))
                else
                    setdata([...res.data].reverse())
            })

            .catch((error) => console.log(error))
    }, [])
   const shows = () => {
        show(true)
      }
    const  handleClose = () => {
        show(false)
      }
    const showprodact = (rowsPerPage) => {
        var result = null;
        if (rowsPerPage.length > 0)
        {
           return  result = rowsPerPage.map((el, i) =>  
            <><tr>
                    <td>{el.name}</td>
                    <td>{el.color}</td>
                    <td>{el.categorie}</td>
                    <td>{el.image}</td>
                    <td>{el.id}</td>
                    <td><button onClick={() => shows()} class="ui inverted blue button"><i class="eye icon"></i></button></td>
                </tr>
                
                <Modal show={valeur} onHide={handleClose} dialogClassName="modal-90w"
    aria-labelledby="example-custom-modal-styling-title" size="xl">
    <Modal.Header closeButton>
      <Modal.Title>Produit id:  {el.id}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <table class="ui blue table">
        <thead>
          <tr><th>id</th>
            <th>First_name</th>
            <th>Last_name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Image</th>
            <th>Role</th>
            <th>PosteOcuper</th>
            <th>Date d'ajout</th>
          </tr></thead><tbody>
          <tr>
            <td>{el.id}</td>
            <td>{el.first_name}</td>
            <td>{el.last_name}</td>
            <td>{el.email}</td>
            <td>{el.password}</td>
            <td> <img src={el.image} alt={"image"+el.first_name} width="40px"></img></td>
            <td>{el.role}</td>
            <td>{el.posteOcuper}</td>
            <td>{el.date}</td></tr>
        </tbody>
      </table>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
    </Button>
    </Modal.Footer>
  </Modal>
                
                
                
                
                
                
                
                
                </>
                
                
                )
        
        }
        return result;
    };
    const onChangePage = data => {
        setState({
            pageLimit: data.pageLimit,
            totalPages: data.totalPages,
            currentPage: data.page,
            startIndex: data.startIndex,
            endIndex: data.endIndex
        });
    };
    let rowsPerPage = [];
    rowsPerPage = data.slice(state.startIndex, state.endIndex + 1);
    return (
        <div>
            <div className="col-xs-12 box_change_pagelimit">
                select filter
        <select
                    className="form-control"
                    value={state.pageLimit}
                    onChange={e => setState({ pageLimit: parseInt(e.target.value) })
                    }
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
            <table class="ui blue table">
                <thead>
                    {
                        console.log("data", state)}
                    <tr><th>Id</th>
                        <th>Nom</th>
                        <th>Reference</th>
                        <th>Couleur</th>
                        <th>Quantiter</th>
                        <th>Details</th>
                    </tr></thead><tbody>
                    {/*[...data].reverse().map(el => <><tr>

                        <td>{el.name}</td>
                        <td>{el.color}</td>
                        <td>{el.categorie}</td>
                        <td>{el.image}</td>
                        <td>{el.id}</td>
                    </tr></>)*/
                    showprodact(rowsPerPage)}
                </tbody>
            </table>
            <div className="col-xs-12 dispalyflexbettwen">
  <Pagination
    totalRecords={data.length}
    pageLimit={state.pageLimit || 5}
    initialPage={1}
    pagesToShow={5}
    onChangePage={onChangePage}
  />
</div>
        </div>
    )
}


export default Lastprodact