import { Row, Col, Card, Badge } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
type Table = {
  id: number;
  seats: number;
  status: string;
};

type WaiterContextType = {
  tables: Table[];
  logoName: string;
  setLogoName: React.Dispatch<React.SetStateAction<string>>;
};

const ViewWaiter = () => {
  const navigate = useNavigate();

  const { tables } = useOutletContext<WaiterContextType>();
  const { setLogoName } = useOutletContext<WaiterContextType>();

  useEffect(() => {
    setLogoName("");
  }, []);

  const handleClickCardTable = (id: number) => {
    setLogoName("Bàn số " + id);
    navigate("/waiter/viewOrder");
  };

  return (
    <>
      <Container className="container text-center">
        <Row className="row justify-content-center ">
          {tables.map((table) => {
            return (
              <Col className="col col-lg-3 col-6 col_card_table" key={table.id}>
                <div
                  className="card-wrap"
                  onClick={() => {
                    handleClickCardTable(table.id);
                  }}
                >
                  <Card className="Card-table">
                    <Card.Body>
                      <Card.Title>{table.id}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        table
                      </Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted fs-7 mt-2">
                        seats {table.seats}
                      </Card.Subtitle>
                      <Badge bg="info" className="badge-width">
                        {table.status}
                      </Badge>
                    </Card.Body>
                  </Card>{" "}
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default ViewWaiter;
