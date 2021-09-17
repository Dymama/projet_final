import React from "react";
import { UncontrolledCarousel, Row, Col } from "reactstrap";

const items = [
  {
    src:
      "https://demos.creative-tim.com/argon-design-system-pro/assets/img/faces/team-5.jpg",
    altText: "Slide 1",
    caption: "",
    header: "",
    key: "1",
  },
  {
    src:
      "https://demos.creative-tim.com/argon-design-system-pro/assets/img/faces/team-4.jpg",
    altText: "Slide 2",
    caption: "",
    header: "",
    key: "2",
  },
  {
    src:
      "https://demos.creative-tim.com/argon-design-system-pro/assets/img/faces/team-3.jpg",
    altText: "Slide 3",
    caption: "participer à nos differents Evenements.participer à nos differents Evenements participer à nos differents Evenements.participer à nos differents Evenements.participer à nos differents Evenements.participer à nos differents Evenements",
    header: "Title information sur l'Evenement",
    key: "3",
  },
];

const CarousselText = () => (
  <Row>
    <Col md="8" className="mx-auto">
      <UncontrolledCarousel items={items} />
    </Col>
  </Row>
);

export default CarousselText;