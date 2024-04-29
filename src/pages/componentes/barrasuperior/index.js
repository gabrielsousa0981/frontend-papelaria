import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import logoicon from '../../../assets/img/logo.png'
import {FiLogOut } from "react-icons/fi";
import {useNavigate} from 'react-router-dom';

export default function Barrasuperior (){
  const navigate =useNavigate();
  const  sair = () => {
      confirmAlert({
        title: 'Saindo do Sistema',
        message: 'Deseja realmente sair do sistema?',
        buttons: [
          {
            label: 'Sim',
            onClick: () => {
              navigate("/")
            }
          },
          {
            label: 'Não',
            onClick: () => alert('Ação cancelada!')
          }
        ]
      });
    };

  return(
      <div className='barrasuperior'>
             <img className='logoicon' src={logoicon} />
              <h1>Papelaria do Futuro</h1>
              <FiLogOut onClick={sair} size={30}/>
 
       </div>
  )
}