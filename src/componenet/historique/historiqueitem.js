import React ,{useEffect,useRef,useState} from 'react'
import Model from '../composant/modal'
import Modasl from '../composant/modal'
import { Modal,Button } from 'react-bootstrap';
export default function Historiqueitem(props) {
    const nameRef = useRef(null);
    const [state, setstate] = useState(false)
    useEffect(() => {
      if (nameRef.current) {
        console.log(nameRef)
      
        nameRef.current.style = 'visibility: hidden';
      }
    
    }, [])
function view (){
  console.log(nameRef)
  setstate(true)
   
}
function handleClose(){
    setstate(false)
}
    return (
        <>
    <tr > 
<td>{props.historique.id}</td>
<td>{props.historique.username}</td>
<td>{props.historique.somme}</td>
<td>{props.historique.nombrearticle}</td>
<td>{props.historique.date}</td>

<td ><button onClick={view } className="bagroundcolortransparent"><i class="eye icon"></i></button></td>
 </tr>
 <Modal show={state} onHide={handleClose} dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title" size="xl">
        <Modal.Header closeButton>
    <Modal.Title>Transaction numero {props.historique.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>
            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            ipsam atque a dolores quisquam quisquam adipisci possimus
            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
            accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
            deleniti rem!
          </p>
        <table class="ui blue table">
     <thead>
    <tr><th>id</th>
      <th>nom</th>
      <th>categorie</th>
      <th>couleur</th>
      <th>quantiter</th>
    </tr></thead><tbody>
        <tr>
    <td>{props.historique.id}</td>
<td>{props.historique.username}</td>
<td>{props.historique.somme}</td>
<td>{props.historique.nombrearticle}</td>
<td>{props.historique.date}</td></tr>
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
