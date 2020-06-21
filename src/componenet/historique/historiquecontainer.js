import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import { Navbar } from "../composant";
import { Background } from "../composant";
import { Pagination } from "../composant";
import { Sidebar } from "../composant";
import {getallhistoriquefromapi ,changestatehistorique} from '../../action/historiquaction'
import Historiqueitem from './historiqueitem'
 function Historiquecontainer(props) {
    const [isOpened, setIsOpened] = useState(false);
    const [input, setinput] = useState("");
    const [historie, hostorieState] =  useState([])
    const [state, setState] = useState({
      totalRecords: "",
      totalPages: "",
      pageLimit: "",
      currentPage: "",
      startIndex: "",
      endIndex: "",
    })
    useEffect(() => {
        props.getallhistoriquefromapi()
        
      }, []);
      function recherche(){
     if (input !== '')
     {
      props.changestatehistorique(input)
     }
     else 
     props.getallhistoriquefromapi()
      }

      function onchange(e){
        setinput(e.target.value)
      }
      const showhistorique = (rowsPerPage) => {
        var result = null;
              if (rowsPerPage.length > 0)
          result = rowsPerPage.map((el, i) => {
            return <Historiqueitem  key ={i} historique={el}></Historiqueitem>;
          });
        
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
      rowsPerPage = props.hist.slice(state.startIndex, state.endIndex + 1);
    return (
        <>
  <Navbar toggleMenu={setIsOpened} />
  <Background setIsOpened={setIsOpened} show={isOpened} />
  <Sidebar show={isOpened} setIsOpened={setIsOpened} />
  <div className="Content">
  <h3>Historique Letal</h3>
  <div className="row">
    <div className="col-xs-12 box_change_pagelimit">
      select filter
           <select
        className="form-control"
        value={state.pageLimit}
        onChange={e =>setState({ pageLimit: parseInt(e.target.value) })
        }
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  </div>
  <span class="ui input">
  <input type="text" placeholder="name,date or action"    onChange={(e) => onchange(e)}></input><button className="ui inverted primary button colorwhite" onClick={recherche}>Recherche</button>
</span>

  <table class="ui blue table">
   <thead>
     <tr><th>id</th>
       <th>nom</th>
       <th>categorie</th>
       <th>couleur</th>
       <th>quantiter</th>
       <th>view detaille</th>
     </tr></thead><tbody>
    { /* props.hist.map(el => <Historiqueitem historique={el}></Historiqueitem>)*/
      showhistorique(rowsPerPage)
    }
     
    
    
    </tbody>
    </table>
    <div className="col-xs-12 box_pagination_info text-right">
    <p>
      {props.hist.length}  items  actuelle : {state.currentPage}/{state.totalPages}
    </p>
     </div>
     <div className="col-xs-12 dispalyflexbettwen">
    <Pagination
      totalRecords={props.hist.length}
      pageLimit={state.pageLimit || 5}
      initialPage={1}
      pagesToShow={5}
      onChangePage={onChangePage}
    />
    </div>
 
       </div>
        </>
    )
}
const mapStateToProps = (state) => ({
    hist : state.historique
})
const mapDispatchToProps = (dispatch) => ({
    getallhistoriquefromapi: () => dispatch(getallhistoriquefromapi()),
    changestatehistorique : (x) => dispatch(changestatehistorique(x))
  })

export default connect(mapStateToProps,mapDispatchToProps)(Historiquecontainer)