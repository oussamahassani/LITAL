import React, { useState,useRef } from 'react'
import { connect } from "react-redux";
import axios from 'axios';
import swal from 'sweetalert';
import {ProgressBar} from  'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
/* componenet */
import { postnewproduct } from '../../../action/produit'
import {setnewhistoriquefromapi} from '../../../action/historiquaction'
import { Navbar } from "../../composant";
import { Background } from "../../composant";
import { Sidebar } from "../../composant";
import { unmountComponentAtNode } from 'react-dom';
let x = ""
function Addprodact(props) {
  const [staselectedFilete, setselectedFile] = useState(null)
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
    props.setnewhistoriquefromapi(x,'ajoute produit')
    onClickHandler()
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
  const  checkMimeType=(event)=>{
    //getting file object
    let files = event.target.files 
    //define message container
    let err = []
    // list allow mime type
   const types = ['image/png', 'image/jpeg', 'image/gif']
    // loop access array
    for(var x = 0; x<files.length; x++) {
     // compare file type find doesn't matach
         if (types.every(type => files[x].type !== type)) {
         // create error message and assign to container   
         err[x] = files[x].type+' is not a supported format\n';
       }
     };
     for(var z = 0; z<err.length; z++) {// if message not same old that mean has error 
         // discard selected file
        toast.error(err[z])
        event.target.value = null
    }
   return true;
  }
 const onChangeHandler=event=>{
   let files = event.target.files
    if(checkMimeType(event) ){ 
    // if return true allow to setState
    setselectedFile(files)
  }
  }
 const onClickHandler = () => {
    const data = new FormData()
      data.append('file',  staselectedFilete)
       console.log(data , staselectedFilete)
    axios.post("http://localhost:8000/upload", data, {
      onUploadProgress: ProgressEvent => {
       
          x =  (ProgressEvent.loaded / ProgressEvent.total*100)
      
      },
    })
      .then(res => { // then print response status
        toast.success('upload success')
        console.log(res)
      })
      .catch(err => { // then print response status
        toast.error('upload fail')
        console.log(err)
      })
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
              <div class="row">
      	  <div class="offset-md-3 col-md-6">
               <div class="form-group files">
                <label>Upload Your File </label>
                <input type="file" class="form-control"  onChange={onChangeHandler}/>
              </div>  
              <div class="form-group">
              <ToastContainer />
              <ProgressBar max="100" color="success" value={x} >{Math.round(x,2) }%</ProgressBar>
        
              </div> 
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
