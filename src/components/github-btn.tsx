import { GithubAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth"
import styled from "styled-components"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"



const Button = styled.span`
    background-color: white;
    font-weight: 500;
    padding: 10px 20px;
    border-radius: 50px;
    width: 100%;
    color: black;
    border: 0;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const Logo = styled.img`
    height: 25px;
`

export default function GithubBtn(){

    const navi = useNavigate()
    const onClick = async() =>{

        try{
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider)
            navi("/")
        }catch(error){
            console.log(error)
        }
        
    }   
    return <Button onClick={onClick}>
        <Logo src="/github-logo.svg"/>
        Continue with Github
    </Button>
}