import { Link }             from 'react-router-dom'
import { Row, Col, Card }   from 'react-bootstrap';
import { Camera }           from 'react-bootstrap-icons';

export default function()
{
    return (
        <>
            <h2>Dashboard</h2>
            <p>Welcome back to your MyPlace Dashboard.</p>
            <a href="#">My Place</a><br />
            <a href="#">My Account</a><br />

            <Row className="pt-4 mb-4">
                <h3>Inventory</h3>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Items Added</Card.Title>
                            <Card.Text>
                                X items were added this Time Period
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Low Stock</Card.Title>
                            <Card.Text>
                                X items are getting low on stock.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Expiring Soon</Card.Title>
                            <Card.Text>
                                X items are expiring soon
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Link className="pt-2" to='inventory'>See all inventory →</Link>
            </Row>

            <Row className="pt-2 mb-4">
                <h3>Bills</h3>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Total Expenses</Card.Title>
                            <Card.Text>
                                $X have been spend this Time Peroid
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Your Expenses</Card.Title>
                            <Card.Text>
                                $X is the amount you owe this Time Peroid
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Overall Balance</Card.Title>
                            <Card.Text>
                                $X is your balance with the household
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Link className="pt-2" to='bills'>See billing info →</Link>
            </Row>

            <Row className="pt-2 mb-4">
                <h3>Controls</h3>
                <Link className="pt-2" to='scan'>
                    <Camera />
                    <span> Scan an item →</span>
                </Link>
            </Row>
        </>
    )
}