import styled from "styled-components";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

const Card = styled.div`
    background-color: #2c3035;
    border-radius: 20px;
    box-shadow: rgba(23, 25, 29, 0.3) 0 2px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 800px;
    width:350px;
    height:350px;
    margin-bottom: 50px;
`

const Profile = styled.image `
    margin-top:20px;
    border:2px solid #646568;
    border-radius:50%;
    height:180px;
    width:180px;
    background: url(${(props)=>props.src});
    background-size: 180px;
`

const Button = styled.button`
  height: 30px;
  width: 175px;
  color:black;
  background: lightcyan;
  font-weight: bold;
  outline:none;
`

const Input = styled.input`
    background-color: #24272b;
    border-radius: 10px;
    border: none;
    color: #b6b7b8;
    font-family: inherit;
    font-size: 1rem;
    padding: 1rem;
    margin-bottom: 2rem;
    width: 320px;
    outline:none;
`

function Main() {
    const [myState, setMystate] = useState({
        login:'',
        avatar_url:'',
        html_url:'',
        name:'',
        company:'',
    });

    const history = useHistory();

    const onIdChange = async evt => {
        try{
            setMystate({
                ...myState,
                login: evt.target.value
            })
        } catch(e){
            console.log("error");
        }
    }

    const getData = async ()=> {
        try{
            const response=await axios.get(`https://api.github.com/users/${myState.login}`);
            console.log(response);
            if(response.status === 200) {
                setMystate({
                    ...myState,
                    avatar_url:response.data.avatar_url,
                    html_url:response.data.html_url,
                    name:response.data.name,
                    company:response.data.componay
                });
                console.log(myState);
                window.localStorage.setItem('ID', myState.login);
            }
        } catch(e) {
            console.log("error");
        }
    }

    return(
        <div>
            <h1 style={{color: "white"}}>Github Finder Service</h1>
            <Card>
                <Profile src={myState.avatar_url}></Profile>
                <h3 style={{color:"white", margin:"7px"}}>{myState.name}</h3>
                <p style={{color:"white", height:"10px", margin:"15px"}}>{myState.company}</p>
                <a href={myState.html_url} style={{color:"lightblue"}}>프로필로 이동</a>
            </Card>
            <Input tyle="text" placeholder="Input Github ID Here" onChange={onIdChange}></Input>
            <div></div>
            <Button onClick={getData}>Find</Button>
            <Button onClick={()=>history.push('./follower')}>Follow List</Button>
        </div>
    )
}

export default Main;