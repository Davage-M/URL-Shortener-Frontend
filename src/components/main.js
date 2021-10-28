import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import NavBar from 'react-bootstrap/Navbar';
import { createShortUrl, fetchAllUrls, deleteUrl, updateUrl } from './utils';
import FeedbackMessage from './feedbackMessage';

export default function Main() {
    const [longUrlInputForCreate, setLongUrlInputForCreate] = useState('');
    const [longUrlInputForUpdate, setLongUrlInputForUpdate] = useState('');
    const [shortUrlInputForDelete, setShortUrlInputForDelete] = useState('');
    const [shortUrlInputForUpdate, setShortUrlInputForUpdate] = useState('');
    const [shouldError, setShouldError] = useState(false);
    const [createMessage, setCreateMessage] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');
    const [tableMessage, setTableMessage] = useState('');
    const [shouldShowMessageCreate, setShouldShowMessageCreate] = useState(false);
    const [shouldShowMessageDelete, setShouldShowMessageDelete] = useState(false);
    const [shouldShowMessageUpdate, setShouldShowMessageUpdate] = useState(false);
    const [shouldShowMessageTable, setShouldShowMessageTable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [allUrls, setAllUrls] = useState([]);

    /*
    useEffect(() => {
        fetchAll();
    }, [])
    */

    const createShortUrlHandleSubmit = async function (url) {
        setIsLoading(true);
        const response = await createShortUrl(url);
        //console.log(response);
        if (response.error) {
            setCreateMessage(response.error);
            setShouldError(true);
            setShouldShowMessageCreate(true);
            setIsLoading(false);
            return;
        }

        setCreateMessage(
            <div>
                <div>{response.message}</div>
                <div><a href={`https://short-url-jup.herokuapp.com/${response.shortUrl}`}>{`https://short-url-jup.herokuapp.com/${response.shortUrl}`}</a></div>
            </div>
        );
        setShouldError(false);
        setShouldShowMessageCreate(true);
        setIsLoading(false);
    }

    const deleteShortUrlHandleSubmit = async function (url) {
        setIsLoading(true);
        const response = await deleteUrl(url);

        if (response.error) {
            setDeleteMessage(response.error);
            setShouldError(true);
            setShouldShowMessageDelete(true);
            setIsLoading(false);
            return;
        }

        setDeleteMessage(response.message);
        setShouldError(false);
        setShouldShowMessageDelete(true);


        setIsLoading(false);
    }

    const updateShortUrlHandleSubmit = async function (url, newUrl) {
        setIsLoading(true);
        const response = await updateUrl(url, newUrl)

        if (response.error) {
            setUpdateMessage(response.error);
            setShouldError(true);
            setShouldShowMessageUpdate(true);
            setIsLoading(false);
            return;
        }

        setUpdateMessage(response.message);
        setShouldError(false);
        setShouldShowMessageUpdate(true);

        setIsLoading(false);
    }

    const fetchAll = async function () {
        setIsLoading(true);


        const response = await fetchAllUrls();

        if (!(Array.isArray(response))) {
            setTableMessage(response);
            setShouldError(true);
            setShouldShowMessageTable(true);
            setIsLoading(false);
            return;
        }
        setAllUrls(response);

        setIsLoading(false);
    }

    return (
        <>
            <NavBar bg='primary' variant='dark'>
                <Container>
                    <NavBar.Brand>Url Shortener</NavBar.Brand>
                </Container>

            </NavBar>
            <Container >
                <Row>
                    <Col className="d-flex justify-content-center mb-3">
                        <h1>Enter URL to get started</h1>
                    </Col>
                </Row>

                <Row>
                    <Col
                        className="d-flex justify-content-center mb-3"
                    >
                        <InputGroup className="w-75">
                            <FormControl
                                type="text"
                                size="lg"
                                placeholder="Long URL"
                                required
                                onChange={(e) => { setLongUrlInputForCreate(e.target.value) }}
                            >
                            </FormControl>
                            <Button
                                className="w-25"
                                disabled={isLoading}
                                onClick={() => { createShortUrlHandleSubmit(longUrlInputForCreate); }}
                            >
                                {isLoading ? 'Loading' : 'Create Short URL'}
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>

                <Row>
                    <Col className="d-flex justify-content-center w-50">
                        {shouldShowMessageCreate ? <FeedbackMessage message={createMessage} setShow={setShouldShowMessageCreate} error={shouldError} /> : null}
                    </Col>
                </Row>

                <Row>
                    <Col className="d-flex justify-content-center mb-3">
                        <hr className="w-100" />
                    </Col>
                </Row>

                <Row>
                    <Col
                        className="d-flex justify-content-center mb-3"
                    >
                        <InputGroup className="w-75">
                            <FormControl
                                type="text"
                                size="lg"
                                placeholder="Short URL"
                                required
                                onChange={(e) => { setShortUrlInputForDelete(e.target.value) }}
                            >
                            </FormControl>
                            <Button
                                className="w-25"
                                disabled={isLoading}
                                onClick={() => { deleteShortUrlHandleSubmit(shortUrlInputForDelete) }}
                            >
                                {isLoading ? 'Loading' : 'Delete Short URL'}
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>

                <Row>
                    <Col className="d-flex justify-content-center w-50">
                        {shouldShowMessageDelete ? <FeedbackMessage message={deleteMessage} setShow={setShouldShowMessageDelete} error={shouldError} /> : null}
                    </Col>
                </Row>

                <Row>
                    <Col className="d-flex justify-content-center mb-3">
                        <hr className="w-100" />
                    </Col>
                </Row>


                <Row>
                    <Col
                        className="d-flex justify-content-center"
                    >
                        <InputGroup className="w-75 ml-5">
                            <FormControl
                                type="text"
                                size="lg"
                                placeholder="Short URL"
                                required
                                onChange={(e) => { setShortUrlInputForUpdate(e.target.value) }}
                            >
                            </FormControl>
                        </InputGroup>
                    </Col>
                    <Col
                        className="d-flex justify-content-center mr-5"
                    >
                        <InputGroup className="w-75">
                            <FormControl
                                type="text"
                                size="lg"
                                placeholder="New Long URL"
                                required
                                onChange={(e) => { setLongUrlInputForUpdate(e.target.value) }}
                            >
                            </FormControl>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center mb-5">
                        <Button
                            className="w-25"
                            disabled={isLoading}
                            size="lg"
                            onClick={() => { updateShortUrlHandleSubmit(shortUrlInputForUpdate, longUrlInputForUpdate) }}
                        >
                            {isLoading ? 'Loading' : 'Update Short URL'}
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col className="d-flex justify-content-center w-50">
                        {shouldShowMessageUpdate ? <FeedbackMessage message={updateMessage} setShow={setShouldShowMessageUpdate} error={shouldError} /> : null}
                    </Col>
                </Row>

                <Row>
                    <Col className="d-flex justify-content-center w-50">
                        <Button
                            className="w-25"
                            disabled={isLoading}
                            size="lg"
                            variant="info"
                            onClick={() => { fetchAll() }}
                        >
                            Update Table
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col className="d-flex justify-content-center w-50">
                        {shouldShowMessageTable ? <FeedbackMessage message={tableMessage} setShow={setShouldShowMessageTable} error={shouldError} /> : null}
                    </Col>
                </Row>

                <Row>
                    <Col className="d-flex justify-content-center">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Original Url</th>
                                    <th>Shortened Url</th>
                                    <th>Total Clicks/Visits</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUrls.map((currentUrl, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <a
                                                href={currentUrl.originalUrl}
                                            >
                                                {currentUrl.originalUrl}
                                            </a>
                                        </td>
                                        <td>
                                            <a
                                                href={`https://short-url-jup.herokuapp.com/${currentUrl.shortUrl}`}
                                            >
                                                https://short-url-jup.herokuapp.com/{currentUrl.shortUrl}
                                            </a>
                                        </td>
                                        <td>
                                            {currentUrl.totalClicks}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>


        </>
    )
}