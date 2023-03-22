import React, { Component, useContext, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export default function Signupform() {
  const {store, actions} = useContext(Context);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("");
  const HandleClick = ()=>{
    actions.registerUser(name, last_name, email, password, phone)
    navigate("/login")
  }
  const token = store.token


  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-danger"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Starwars Encyclopedia</h2>
                  <p className=" mb-5">Please register a new user account</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formName">
                        <Form.Label className="text-center">
                          Name
                        </Form.Label>
                        <Form.Control type="name" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)}/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label className="text-center">
                          Last Name
                        </Form.Label>
                        <Form.Control type="last name" placeholder="Enter your last name" value={last_name} onChange={(e)=>setLast_name(e.target.value)}/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formTelephone">
                        <Form.Label className="text-center">
                          Telephone
                        </Form.Label>
                        <Form.Control type="telephone" placeholder="Enter your telephone number" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                       
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" onClick={HandleClick}>
                          Register
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account?{" "}
                        <a href="/login" className="text-primary fw-bold">
                          Log in
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
