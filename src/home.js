import React from "react";
import "./App.css";
import Laptop from "./laptop";
import Slider from "./slider";
import Navbarhome from "./navbar";
import { Container, Row, Col } from "react-bootstrap";
import Footer from './footer';

export default function Home() {
  return (
    <>
      <Navbarhome />
      <Laptop />
      <Slider />
      <Container>
        <Row className="justify-content-center mt-3">
          <Col xl={10}>
            <div className=" text_css">
                <h4 className="text-center">Title</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum numquam blanditiis harum
                quisquam eius sed odit fugiat iusto fuga praesentium optio,
                eaque rerum! Provident similique accusantium nemo autem.
                Veritatis obcaecati tenetur iure eius earum ut molestias
                architecto voluptate aliquam nihil, eveniet aliquid culpa
                officia aut! Impedit sit sunt quaerat, odit, ab laudantium modi
                minima sunt esse temporibus sint culpa, recusandae aliquam
                numquam totam ratione voluptas quod exercitationem fuga.
                Possimus quis earum veniam quasi aliquam eligendi, placeat qui
                corporis!
              </p>
            </div>
          </Col>
        </Row>
        <div className=" bg_img">
          <Row className="justify-content-center mt-3">
            <Col xl={4}>
              <div className=" text_css">
              <h4 className="text-center">Title</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime mollitia, molestiae quas vel sint commodi repudiandae
                  consequuntur voluptatum laborum numquam blanditiis harum
                  quisquam eius sed odit fugiat iusto fuga praesentium optio,
                  eaque rerum! Provident similique accusantium nemo autem.
                </p>
              </div>
            </Col>
            <Col x={4}></Col>
            <Col xl={4}>
              <div className=" text_css">
              <h4 className="text-center">Title</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime mollitia, molestiae quas vel sint commodi repudiandae
                  consequuntur voluptatum laborum numquam blanditiis harum
                  quisquam eius sed odit fugiat iusto fuga praesentium optio,
                  eaque rerum! Provident similique accusantium nemo autem.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Col xl={4}>
              <div className=" text_css">
              <h4 className="text-center">Title</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime mollitia, molestiae quas vel sint commodi repudiandae
                  consequuntur voluptatum laborum numquam blanditiis harum
                  quisquam eius sed odit fugiat iusto fuga praesentium optio,
                  eaque rerum! Provident similique accusantium nemo autem.
                </p>
              </div>
            </Col>
            <Col x={4}></Col>
            <Col xl={4}>
              <div className=" text_css">
              <h4 className="text-center">Title</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime mollitia, molestiae quas vel sint commodi repudiandae
                  consequuntur voluptatum laborum numquam blanditiis harum
                  quisquam eius sed odit fugiat iusto fuga praesentium optio,
                  eaque rerum! Provident similique accusantium nemo autem.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center mt-5">
          <Col xl={10}>
            <div className=" text_css">
            <h4 className="text-center">Title</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum numquam blanditiis harum
                quisquam eius sed odit fugiat iusto fuga praesentium optio,
                eaque rerum! Provident similique accusantium nemo autem.
                Veritatis obcaecati tenetur iure eius earum ut molestias
                architecto voluptate aliquam nihil, eveniet aliquid culpa
                officia aut! Impedit sit sunt quaerat, odit, ab laudantium modi
                minima sunt esse temporibus sint culpa, recusandae aliquam
                numquam totam ratione voluptas quod exercitationem fuga.
                Possimus quis earum veniam quasi aliquam eligendi, placeat qui
                corporis!
              </p>
            </div>
          </Col>
        </Row>
        </div>

     
      </Container>
      <Footer/>

    </>
  );
}
