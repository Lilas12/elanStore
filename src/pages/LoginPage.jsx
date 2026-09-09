/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Importera bakgrundsbilden direkt så att Vite/React hittar den korrekt
import bgImage from "../photos/file.png";

const pageFade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const leftReveal = keyframes`
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
`;

const rightReveal = keyframes`
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
`;

const bottomReveal = keyframes`
  from { opacity: 0; transform: translateY(25px); }
  to { opacity: 1; transform: translateY(0); }
`;

const logoReveal = keyframes`
  from { opacity: 0; letter-spacing: 14px; }
  to { opacity: 1; letter-spacing: 6px; }
`;

const goldPulse = keyframes`
  0% { opacity: 0.3; box-shadow: 0 0 0 rgba(198, 165, 107, 0); }
  50% { opacity: 1; box-shadow: 0 0 18px rgba(198, 165, 107, 0.25); }
  100% { opacity: 0.3; box-shadow: 0 0 0 rgba(198, 165, 107, 0); }
`;

const cursorBlink = keyframes`
  0%, 45% { opacity: 1; }
  46%, 100% { opacity: 0; }
`;

const Page = styled.main`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 45% 55%;
  background: #070707;
  color: #f5f1e8;
  overflow: hidden;
  animation: ${pageFade} 1s ease both;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSide = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 45px 52px;
  background-image:
    linear-gradient(90deg, rgba(0,0,0,0.55), rgba(0,0,0,0.20)),
    linear-gradient(180deg, rgba(0,0,0,0.20), rgba(0,0,0,0.60)),
    url(${bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  animation: ${pageFade} 1.4s ease both;
  @media (max-width: 900px) {
    min-height: 58vh;
    padding: 35px;
  }
  @media (max-width: 500px) {
    min-height: 52vh;
    padding: 28px;
  }
`;

const LeftNav = styled.div`
  display: flex;
  gap: 28px;
  font-family: Arial, sans-serif;
  font-size: 9px;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.6);
  text-transform: uppercase;
  span {
    cursor: pointer;
    transition: color 0.3s ease;
    &:hover {
      color: #c6a56b;
    }
  }
`;

const Logo = styled.div`
  font-family: Georgia, "Times New Roman", serif;
  font-size: 28px;
  font-weight: 400;
  letter-spacing: 6px;
  color: #c6a56b;
  animation: ${logoReveal} 1.3s ease both;
  text-shadow: 0 0 20px rgba(198,165,107,0.1);
`;

const LeftContent = styled.div`
  max-width: 500px;
  margin-bottom: 20px;
  animation: ${leftReveal} 1.1s ease 0.3s both;
`;

const Eyebrow = styled.div`
  margin-bottom: 12px;
  font-family: Arial, sans-serif;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 4px;
  color: #c6a56b;
  text-transform: uppercase;
`;

const MainTitle = styled.h1`
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(38px, 4.2vw, 56px);
  font-weight: 400;
  line-height: 1.04;
  letter-spacing: -1.5px;
  color: #ffffff;
  max-width: 500px;
`;

const Highlight = styled.span`
  color: #c6a56b;
`;

const TypewriterBox = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
  min-height: 40px;
  font-family: Arial, sans-serif;
  font-size: 10px;
  line-height: 1.8;
  letter-spacing: 2.5px;
  color: rgba(255,255,255,0.6);
  text-transform: uppercase;
  animation: ${bottomReveal} 1s ease 0.8s both;
`;

const TypedText = styled.span`
  max-width: 470px;
`;

const Cursor = styled.span`
  width: 1px;
  height: 14px;
  margin-left: 5px;
  margin-top: 3px;
  display: inline-block;
  background: #c6a56b;
  animation: ${cursorBlink} 0.8s infinite;
`;

const LeftFooter = styled.div`
  font-family: Arial, sans-serif;
  font-size: 8px;
  letter-spacing: 3px;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  animation: ${pageFade} 1.5s ease 1.2s both;
`;

const LoginSide = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 55px;
  background: radial-gradient(circle at 50% 45%, rgba(198,165,107,0.06), transparent 42%), #070707;
  animation: ${rightReveal} 1.1s ease both;
  @media (max-width: 900px) {
    min-height: 42vh;
    padding: 55px 30px;
  }
`;

const GoldDivider = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  width: 1px;
  height: 200px;
  transform: translateY(-50%);
  background: linear-gradient(to bottom, transparent, #c6a56b, transparent);
  animation: ${goldPulse} 3.5s ease-in-out infinite;
  @media (max-width: 900px) {
    display: none;
  }
`;

const LoginContainer = styled.div`
  width: min(420px, 88%);
  animation: ${bottomReveal} 1s ease 0.45s both;
`;

const Welcome = styled.div`
  margin-bottom: 6px;
  font-family: Arial, sans-serif;
  font-size: 9px;
  letter-spacing: 4px;
  color: #c6a56b;
  text-transform: uppercase;
`;

const LoginTitle = styled.h2`
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(30px, 3.2vw, 42px);
  font-weight: 400;
  line-height: 1.1;
  color: #ffffff;
  letter-spacing: -0.5px;
  margin-bottom: 4px;
`;

const LoginSub = styled.p`
  font-family: Arial, sans-serif;
  font-size: 11px;
  line-height: 1.6;
  color: rgba(255,255,255,0.4);
  margin-bottom: 32px;
  letter-spacing: 0.3px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Field = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-family: Arial, sans-serif;
  font-size: 8px;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.12);
  outline: none;
  color: #ffffff;
  font-family: Arial, sans-serif;
  font-size: 13px;
  letter-spacing: 0.5px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  &::placeholder {
    color: rgba(255,255,255,0.25);
  }
  &:focus {
    border-bottom-color: #c6a56b;
    box-shadow: 0 5px 15px -15px rgba(198,165,107,0.8);
  }
`;

const ShowButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 9px;
  border: none;
  background: transparent;
  color: rgba(255,255,255,0.3);
  font-family: Arial, sans-serif;
  font-size: 8px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #c6a56b;
  }
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
`;

const Forgot = styled.button`
  border: none;
  background: transparent;
  color: rgba(255,255,255,0.35);
  font-family: Arial, sans-serif;
  font-size: 9px;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #c6a56b;
  }
`;

const SignInButton = styled.button`
  width: 100%;
  padding: 14px;
  margin-top: 8px;
  border: 1px solid #c6a56b;
  background: #c6a56b;
  color: #070707;
  font-family: Arial, sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.35s ease, color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
  &:hover {
    background: transparent;
    color: #c6a56b;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(198,165,107,0.08);
  }
  &:active {
    transform: translateY(0);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 22px 0 18px;
  font-family: Arial, sans-serif;
  font-size: 8px;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.25);
  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.06);
  }
`;

const SocialButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 11px;
`;

const SocialButton = styled.button`
  padding: 12px;
  border: 1px solid rgba(255,255,255,0.08);
  background: transparent;
  color: rgba(255,255,255,0.5);
  font-family: Arial, sans-serif;
  font-size: 9px;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: border-color 0.3s ease, color 0.3s ease, background 0.3s ease;
  &:hover {
    border-color: rgba(198,165,107,0.5);
    color: #c6a56b;
    background: rgba(198,165,107,0.03);
  }
`;

const CreateAccount = styled.div`
  margin-top: 24px;
  text-align: center;
  font-family: Arial, sans-serif;
  font-size: 10px;
  color: rgba(255,255,255,0.35);
  button {
    border: none;
    background: transparent;
    color: #c6a56b;
    font-family: Arial, sans-serif;
    font-size: 10px;
    cursor: pointer;
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 0.65;
    }
  }
`;

const RightFooter = styled.div`
  position: absolute;
  right: 45px;
  bottom: 25px;
  font-family: Arial, sans-serif;
  font-size: 8px;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.15);
  text-transform: uppercase;
  @media (max-width: 900px) {
    display: none;
  }
`;

const ErrorMsg = styled.p`
  color: #ff6b6b;
  font-size: 12px;
  text-align: center;
  margin-top: -8px;
`;

const SuccessMsg = styled.p`
  color: #51cf66;
  font-size: 12px;
  text-align: center;
  margin-top: -8px;
`;

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const text = "ELEVATE YOUR STYLE, EMBRACE ELEGANCE.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, 65);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email === "admin@elan.com" && password === "123456") {
        setSuccess("Login successful! Redirecting...");
        if (onLogin) onLogin();
        setTimeout(() => navigate("/home"), 1000);
      } else {
        setError("Invalid email or password");
      }
    }, 1500);
  };

  return (
    <Page>
      <ImageSide>
        <LeftNav>
          <span>Home</span>
          <span>Collections</span>
          <span>About</span>
          <span>Shop</span>
        </LeftNav>
        <LeftContent>
          <Eyebrow>Luxury Fashion House</Eyebrow>
          <MainTitle>
            <Highlight>ELAN</Highlight>
          </MainTitle>
          <TypewriterBox>
            <TypedText>{typedText}</TypedText>
            <Cursor />
          </TypewriterBox>
        </LeftContent>
        <LeftFooter>EST. 2025 — ÉLAN</LeftFooter>
      </ImageSide>

      <LoginSide>
        <GoldDivider />
        <LoginContainer>
          <Welcome>Welcome Back</Welcome>
          <LoginTitle>Sign in</LoginTitle>
          <LoginSub>Sign in to your account and discover your world.</LoginSub>
          <Form onSubmit={handleSubmit}>
            <Field>
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>
            <Field>
              <Label>Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <ShowButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </ShowButton>
            </Field>
            {error && <ErrorMsg>{error}</ErrorMsg>}
            {success && <SuccessMsg>{success}</SuccessMsg>}
            <Options>
              <Forgot type="button">Forgot password?</Forgot>
            </Options>
            <SignInButton type="submit" disabled={loading}>
              {loading ? "LOADING..." : "Sign In →"}
            </SignInButton>
          </Form>
          <OrDivider>OR</OrDivider>
          <SocialButtons>
            <SocialButton type="button">CONTINUE WITH GOOGLE</SocialButton>
            <SocialButton type="button">CONTINUE WITH APPLE</SocialButton>
          </SocialButtons>
          <CreateAccount>
            New to ÉLAN? <button type="button">Create account</button>
          </CreateAccount>
        </LoginContainer>
        <RightFooter>EST. 2025</RightFooter>
      </LoginSide>
    </Page>
  );
}

export default LoginPage;
