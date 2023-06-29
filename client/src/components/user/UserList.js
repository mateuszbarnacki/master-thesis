import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function UserList() {
    return (
        <Card>
            <Card.Body>
                <Card.Text as="h5" className="mt-1">Zarządzaj uprawnieniami
                    użytkowników</Card.Text>
            </Card.Body>
            <Accordion className="border-light ms-3 me-3 mb-3 mt-2">
                <AccordionItem eventKey="0">
                    <AccordionHeader>Użytkownik Testowy</AccordionHeader>
                    <AccordionBody className="text-center">
                        <Table className="m-1">
                            <thead className="border-black">
                            <tr>
                                <th>#</th>
                                <th>Nazwa projektu</th>
                                <th>Czytanie</th>
                                <th>Pisanie</th>
                                <th>Dodawanie offline</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Zanieczyszczenia Kraków</td>
                                <td>x</td>
                                <td></td>
                                <td>x</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Projekt terenowy</td>
                                <td>x</td>
                                <td>x</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Zanieczyszczenia Radom</td>
                                <td>x</td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </Table>
                        <Button variant="dark" className="mt-3">Edytuj
                            uprawnienia</Button>
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem eventKey="1">
                    <AccordionHeader>Adam</AccordionHeader>
                    <AccordionBody className="text-center">
                        <Table className="m-1">
                            <thead className="border-black">
                            <tr>
                                <th>#</th>
                                <th>Nazwa projektu</th>
                                <th>Czytanie</th>
                                <th>Pisanie</th>
                                <th>Dodawanie offline</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Zanieczyszczenia Police</td>
                                <td>x</td>
                                <td>x</td>
                                <td>x</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Klimat Szczecina</td>
                                <td>x</td>
                                <td>x</td>
                                <td></td>
                            </tr>
                            </tbody>
                        </Table>
                        <Button variant="dark" className="mt-3">Edytuj
                            uprawnienia</Button>
                    </AccordionBody>
                </AccordionItem>
            </Accordion>
        </Card>
    );
}

export default UserList;