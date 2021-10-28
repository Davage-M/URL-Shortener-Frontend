import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

export default function FeedbackMessage(props) {
    const [show, setShow] = useState(true);

    const toggleShow = () => {
        setShow(!(show));
        props.setShow(!(show));
    }

    if (show) {
        if (props.error) {
            return (
                <>
                    <Alert
                        variant='danger'
                        onClose={() => { toggleShow() }}
                        dismissible
                    >
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>

                        {props.message}

                    </Alert>
                </>
            )
        }
        return (
            <>
                <Alert
                    variant='success'
                    onClose={() => { toggleShow() }}
                    dismissible
                >
                    <Alert.Heading>Action Completed Successfully</Alert.Heading>

                    {props.message}

                </Alert>
            </>
        )
    }
    return null;
}