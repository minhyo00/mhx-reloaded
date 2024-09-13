import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Input, Switcher, Title, Wrapper,Form } from "../components/auth-components";



export default function CreateAccount() {

    const navi = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [error, setError] = useState("")

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        if (name === "name") {
            setName(value)
        } else if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPass(value)
        }
    }

    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("")
        if(isLoading || name==="" || email==="" || pass ==="") return;
        try{
            setLoading(true)
            // accout 생성
            const credentials = await createUserWithEmailAndPassword(auth, email, pass)
            console.log(credentials.user);
            await updateProfile(credentials.user, {// 사용자 프로필이름 지정
                displayName: name
            })
            
            // 홈페이지로 redirecting
            navi("/");

        }catch(e){
            //setError
            if(e instanceof FirebaseError){
                setError(e.message)
            }
        }finally{
            setLoading(false);
        }
        console.log(name,email,pass)
    }

    return <Wrapper>
        <Title>Join 𝕏</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="name" value={name} placeholder="Name" type="text" required />
            <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required />
            <Input onChange={onChange} name="password" value={pass} placeholder="Password" type="password" required />
            <Input type="submit" value={isLoading ? "Loading..." : "Create Account"} />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
            Alreadt hav account?<Link to="/login">Log in &rarr; </Link>
        </Switcher>
    </Wrapper>
}