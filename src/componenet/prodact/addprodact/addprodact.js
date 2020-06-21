import React, { useState,useRef } from 'react'
import { connect } from "react-redux";
import swal from 'sweetalert';

/* componenet */
import { postnewproduct } from '../../../action/produit'
import {setnewhistoriquefromapi} from '../../../action/historiquaction'
import { Navbar } from "../../composant";
import { Background } from "../../composant";
import { Sidebar } from "../../composant";
import { unmountComponentAtNode } from 'react-dom';
function Addprodact(props) {
  const contenu = useRef()
  const [isOpened, setIsOpened] = useState(false);
  let refinput = {};
function unmout()
{
  contenu.current.innerHTML= "<div> Votre Donner A eté ajouter  avec Succeé vous pouvez consulter votre Liste de produit</div>"
}

  function show() {
    let x = Object.values(refinput).map(el => el.value)
    props.postnewproduct(x)
    props.setnewhistoriquefromapi(x,'ajoute produit ')
    swal({
      title: "ajouter un nouvaux Produit?",
      text: "voulez vous ajouter un nouveaux produit!",
      icon: "info",
      buttons: true,
      dangerMode: true,
    })
    .then((okpressed) => {
      if (okpressed) {
       window.location.reload()
        
      } 
      else {
        unmout()
      }
    });

     
  }
  return (
    <div>
      <Navbar toggleMenu={setIsOpened} />
      <Background setIsOpened={setIsOpened} show={isOpened} />
      <Sidebar show={isOpened} setIsOpened={setIsOpened} />
      <div className="Content" ref={contenu}>

        <h1 className="btncentre">Add new  prodact</h1>
        <div className="contenaire centret"><br />
          <div className="ui inverted segment">
            <div className="ui form inverted">
              <div className="three fields">
                <div class="field">
                  <label>Name</label>
                  <p><input ref={e => refinput.name = e} type="text" placeholder="Name" name="name" required /></p>
                </div>
                <div class="field">
                  <label>Type</label>
                  <p>  <input ref={e => refinput.type = e} type="text" placeholder="type" required /></p>
                </div>
                <div class="field">
                  <label> Collection</label>
                  <p> <input ref={e => refinput.collection = e} type="text" placeholder="Collection" required /></p>
                </div>
              </div>
              <div className="three fields">
                <div class="field">
                  <label>Marque</label>
                  <p>  <input ref={e => refinput.marque = e} type="text" placeholder="Marque" required /></p>
                </div>
                <div class="field">
                  <label>Reference</label>
                  <p>  <input ref={e => refinput.reference = e} type="text" placeholder="Reference" required /></p>
                </div>
                <div class="field">
                  <label>image</label>
                  <p>  <input ref={e => refinput.image = e} type="text" placeholder="URL IMAGE" /></p>
                </div>
              </div>
              <div className="three fields">
                <div class="field">
                  <label>Prix</label>
                  <p>  <input ref={e => refinput.prix = e} type="text" placeholder="Prix" /></p>
                </div>
                <div class="field">
                  <label>Quantiter</label>
                  <p>  <input ref={e => refinput.quantiter = e} type="text" placeholder="Quantité" /></p>
                </div>
                <div class="field">
                  <label>Couleur</label>
                  <p>  <input ref={e => refinput.couleur = e} type="text" placeholder="Couleur" /></p>
                </div>
              </div>
              <div class="field">
                <br></br>
                <p> <button className="ui inverted yellow  button" onClick={() => show()}>Add produit</button></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
const stateup = (state) => {
  return {
    stateprodact: state.prodact
  }
}
export default connect(stateup, { postnewproduct , setnewhistoriquefromapi })(Addprodact);
