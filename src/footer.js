import React from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer(){
return(
    <>
    <div className="footer py-5 mt-5">
        <Container>
            <Row>
                <Col xl={3} className="">
                <img src={require("./assets/images/coin.png")}  className="img_style"/>
                </Col>
                <Col xl={3} className="mt-4">
                    <ul>
                        <h4 className=""><u> contact </u></h4>
                        <li>
                            link
                        </li>
                        <li>
                            link
                        </li>
                        <li>
                            link
                        </li>
                        <li>
                            link
                        </li>

                    </ul>
                </Col>
                <Col xl={3} className="mt-4">
                    <ul>
                        <h4><u>Usefull Links</u></h4>
                        <li>
                            link
                        </li>
                        <li>
                            link
                        </li>
                        <li>
                            link
                        </li>
                        <li>
                            link
                        </li>

                    </ul>
                </Col>
                <Col xl={3} className="mt-4">
                    <ul>
                        <h4><u>Service</u></h4>
                        <li>
                            link
                        </li>
                        <li>
                            link
                        </li>
                        <li>
                            link
                        </li>
                        <li>
                            link
                        </li>

                    </ul>
                </Col>
            </Row>
        
        </Container>
        


    </div>
    </>
)
}